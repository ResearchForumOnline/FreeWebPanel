import fs from 'node:fs/promises'
import path from 'node:path'
import { domainToASCII } from 'node:url'
import Fastify, { type FastifyRequest } from 'fastify'
import { z } from 'zod'
import { resolveConfig, type CoreConfig } from './config.js'
import { createId, createToken, hashPassword, hashToken, verifyPassword } from './crypto.js'
import type { UserRecord } from './model.js'
import { CoreStore } from './store.js'

const loginSchema = z.object({ username: z.string().min(1).max(80), password: z.string().min(1).max(512) })
const accountSchema = z.object({
  name: z.string().min(2).max(120),
  slug: z.string().regex(/^[a-z0-9][a-z0-9-]{1,62}$/),
  contactEmail: z.string().email().max(200),
  ownerUsername: z.string().regex(/^[a-zA-Z0-9._-]{3,80}$/),
  ownerDisplayName: z.string().min(2).max(120),
  ownerPassword: z.string().min(14).max(512),
})
const siteSchema = z.object({
  accountId: z.string().min(1).max(100),
  name: z.string().min(2).max(120),
  primaryDomain: z.string().min(3).max(253),
  phpVersion: z.enum(['8.2', '8.3', '8.4']).default('8.4'),
})

type LoginWindow = { failures: number; resetsAt: number }

function safeDomain(value: string): string {
  const ascii = domainToASCII(value.trim().toLowerCase().replace(/\.+$/, ''))
  if (!ascii || ascii.length > 253 || !/^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(ascii)) {
    throw new Error('invalid_domain')
  }
  return ascii
}

function siteDirectory(root: string, accountSlug: string, domain: string): string {
  const resolvedRoot = path.resolve(root)
  const resolved = path.resolve(resolvedRoot, accountSlug, domain, 'public_html')
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error('unsafe_site_path')
  }
  return resolved
}

function bearerToken(request: FastifyRequest): string | null {
  const header = request.headers.authorization
  return header?.startsWith('Bearer ') ? header.slice(7).trim() : null
}

export async function createCoreApp(overrides: Partial<CoreConfig> = {}) {
  const config = resolveConfig(overrides)
  const store = new CoreStore(config)
  const app = Fastify({ logger: false, trustProxy: true, bodyLimit: 128 * 1024 })
  const loginWindows = new Map<string, LoginWindow>()

  app.addHook('onSend', async (_request, reply, payload) => {
    reply.header('X-Content-Type-Options', 'nosniff')
    reply.header('X-Frame-Options', 'DENY')
    reply.header('Referrer-Policy', 'no-referrer')
    reply.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    reply.header('Cache-Control', 'no-store')
    return payload
  })

  async function owner(request: FastifyRequest): Promise<UserRecord> {
    const token = bearerToken(request)
    if (!token) {
      throw new Error('unauthorized')
    }
    const state = await store.getState()
    const tokenDigest = hashToken(token)
    const session = state.sessions.find(
      (candidate) => candidate.tokenHash === tokenDigest && Date.parse(candidate.expiresAt) > Date.now(),
    )
    const user = session ? state.users.find((candidate) => candidate.id === session.userId) : undefined
    if (!user || user.role !== 'platform_owner') {
      throw new Error('unauthorized')
    }
    return user
  }

  app.setErrorHandler((error, _request, reply) => {
    const message = error instanceof Error ? error.message : 'unknown_error'
    if (message === 'unauthorized') {
      return reply.status(401).send({ error: 'unauthorized' })
    }
    if (message === 'invalid_domain' || error instanceof z.ZodError) {
      return reply.status(400).send({ error: 'invalid_request' })
    }
    if (['account_not_found', 'duplicate_account', 'duplicate_site'].includes(message)) {
      return reply.status(409).send({ error: message })
    }
    return reply.status(500).send({ error: 'internal_error' })
  })

  app.get('/health', async () => ({ status: 'ok', product: 'FreeWebPanel Core', version: '0.2.0' }))
  app.get('/v1/profile', async () => ({
    product: 'FreeWebPanel Core',
    license: 'Apache-2.0',
    capabilities: ['owner authentication', 'customer accounts', 'site roots', 'domain inventory'],
    excluded: ['Pro automation', 'payment settlement', 'vendor signing keys'],
  }))

  app.post('/v1/auth/login', async (request, reply) => {
    const key = request.ip
    const now = Date.now()
    const window = loginWindows.get(key)
    if (window && window.resetsAt > now && window.failures >= 5) {
      return reply.status(429).send({ error: 'login_rate_limited' })
    }
    const input = loginSchema.parse(request.body)
    const state = await store.getState()
    const user = state.users.find((candidate) => candidate.username === input.username)
    if (!user || !verifyPassword(input.password, user.passwordHash)) {
      const next = window && window.resetsAt > now ? window : { failures: 0, resetsAt: now + 15 * 60 * 1000 }
      next.failures += 1
      loginWindows.set(key, next)
      return reply.status(401).send({ error: 'invalid_credentials' })
    }

    loginWindows.delete(key)
    const token = createToken()
    const createdAt = new Date()
    const expiresAt = new Date(createdAt.getTime() + config.sessionHours * 60 * 60 * 1000)
    await store.update((nextState) => {
      nextState.sessions = nextState.sessions.filter((session) => Date.parse(session.expiresAt) > now)
      nextState.sessions.push({
        id: createId('session'),
        tokenHash: hashToken(token),
        userId: user.id,
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
      })
    })
    return { token, expiresAt: expiresAt.toISOString(), user: { id: user.id, username: user.username, role: user.role } }
  })

  app.post('/v1/auth/logout', async (request, reply) => {
    const token = bearerToken(request)
    if (!token) {
      return reply.status(204).send()
    }
    const digest = hashToken(token)
    await store.update((state) => {
      state.sessions = state.sessions.filter((session) => session.tokenHash !== digest)
    })
    return reply.status(204).send()
  })

  app.get('/v1/accounts', async (request) => {
    await owner(request)
    return (await store.getState()).accounts
  })

  app.post('/v1/accounts', async (request, reply) => {
    const actor = await owner(request)
    const input = accountSchema.parse(request.body)
    const createdAt = new Date().toISOString()
    const result = await store.update((state) => {
      if (state.accounts.some((account) => account.slug === input.slug) || state.users.some((user) => user.username === input.ownerUsername)) {
        throw new Error('duplicate_account')
      }
      const userId = createId('user')
      const account = {
        id: createId('account'),
        name: input.name,
        slug: input.slug,
        contactEmail: input.contactEmail,
        ownerUserId: userId,
        createdAt,
      }
      state.users.push({
        id: userId,
        username: input.ownerUsername,
        displayName: input.ownerDisplayName,
        role: 'customer',
        accountId: account.id,
        passwordHash: hashPassword(input.ownerPassword),
        createdAt,
      })
      state.accounts.push(account)
      state.audit.unshift({ id: createId('audit'), actorUserId: actor.id, action: 'account.create', resourceType: 'account', resourceId: account.id, timestamp: createdAt })
      return account
    })
    return reply.status(201).send(result)
  })

  app.get('/v1/sites', async (request) => {
    await owner(request)
    return (await store.getState()).sites
  })

  app.post('/v1/sites', async (request, reply) => {
    const actor = await owner(request)
    const input = siteSchema.parse(request.body)
    const domain = safeDomain(input.primaryDomain)
    const state = await store.getState()
    const account = state.accounts.find((candidate) => candidate.id === input.accountId)
    if (!account) {
      throw new Error('account_not_found')
    }
    if (state.sites.some((site) => site.primaryDomain === domain)) {
      throw new Error('duplicate_site')
    }

    const documentRoot = siteDirectory(config.siteRoot, account.slug, domain)
    await fs.mkdir(documentRoot, { recursive: true, mode: 0o750 })
    try {
      await fs.writeFile(
        path.join(documentRoot, 'index.html'),
        `<!doctype html><html lang="en"><meta charset="utf-8"><title>${domain}</title><h1>${domain}</h1><p>Provisioned by FreeWebPanel Core.</p>\n`,
        { encoding: 'utf8', flag: 'wx', mode: 0o640 },
      )
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') {
        throw error
      }
    }

    const createdAt = new Date().toISOString()
    const result = await store.update((nextState) => {
      const site = {
        id: createId('site'),
        accountId: account.id,
        name: input.name,
        primaryDomain: domain,
        documentRoot,
        phpVersion: input.phpVersion,
        publishStatus: 'staging' as const,
        sslStatus: 'pending' as const,
        createdAt,
        updatedAt: createdAt,
      }
      const domainRecord = {
        id: createId('domain'),
        accountId: account.id,
        siteId: site.id,
        fqdn: domain,
        dnsStatus: 'pending' as const,
        sslStatus: 'pending' as const,
        createdAt,
      }
      nextState.sites.push(site)
      nextState.domains.push(domainRecord)
      nextState.audit.unshift({ id: createId('audit'), actorUserId: actor.id, action: 'site.create', resourceType: 'site', resourceId: site.id, timestamp: createdAt })
      return { site, domain: domainRecord }
    })
    return reply.status(201).send(result)
  })

  app.get('/v1/domains', async (request) => {
    await owner(request)
    return (await store.getState()).domains
  })

  return { app, store, config }
}
