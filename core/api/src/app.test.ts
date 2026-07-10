import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createCoreApp } from './app.js'

let directory: string
let runtime: Awaited<ReturnType<typeof createCoreApp>>

beforeEach(async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'freewebpanel-core-'))
  runtime = await createCoreApp({
    stateFile: path.join(directory, 'state.json'),
    siteRoot: path.join(directory, 'sites'),
    ownerUsername: 'owner',
    ownerPassword: 'Long-Unique-Test-Password!',
  })
})

afterEach(async () => {
  await runtime.app.close()
  await fs.rm(directory, { recursive: true, force: true })
})

async function ownerToken(): Promise<string> {
  const response = await runtime.app.inject({
    method: 'POST',
    url: '/v1/auth/login',
    payload: { username: 'owner', password: 'Long-Unique-Test-Password!' },
  })
  expect(response.statusCode).toBe(200)
  return (response.json() as { token: string }).token
}

describe('FreeWebPanel Core API', () => {
  it('initializes one owner without demo customers or plaintext sessions', async () => {
    const token = await ownerToken()
    const state = await runtime.store.getState()

    expect(state.users.map((user) => user.username)).toEqual(['owner'])
    expect(state.accounts).toHaveLength(1)
    expect(state.sites).toEqual([])
    expect(state.domains).toEqual([])
    expect(JSON.stringify(state)).not.toContain(token)

    if (process.platform !== 'win32') {
      const mode = (await fs.stat(runtime.config.stateFile)).mode & 0o777
      expect(mode).toBe(0o600)
    }
  })

  it('creates a customer and provisions a site inside the configured root', async () => {
    const token = await ownerToken()
    const headers = { authorization: `Bearer ${token}` }
    const accountResponse = await runtime.app.inject({
      method: 'POST',
      url: '/v1/accounts',
      headers,
      payload: {
        name: 'Example Customer',
        slug: 'example-customer',
        contactEmail: 'owner@example.test',
        ownerUsername: 'example-owner',
        ownerDisplayName: 'Example Owner',
        ownerPassword: 'Another-Long-Test-Password!',
      },
    })
    expect(accountResponse.statusCode).toBe(201)
    const account = accountResponse.json() as { id: string }

    const siteResponse = await runtime.app.inject({
      method: 'POST',
      url: '/v1/sites',
      headers,
      payload: {
        accountId: account.id,
        name: 'Example Site',
        primaryDomain: 'WWW.Example.COM.',
        phpVersion: '8.4',
      },
    })
    expect(siteResponse.statusCode).toBe(201)
    const result = siteResponse.json() as { site: { documentRoot: string; primaryDomain: string } }
    const root = path.resolve(runtime.config.siteRoot)
    expect(result.site.primaryDomain).toBe('www.example.com')
    expect(path.resolve(result.site.documentRoot).startsWith(`${root}${path.sep}`)).toBe(true)
    await expect(fs.readFile(path.join(result.site.documentRoot, 'index.html'), 'utf8')).resolves.toContain(
      'Provisioned by FreeWebPanel Core',
    )
  })

  it('rejects unsafe domains before any filesystem write', async () => {
    const token = await ownerToken()
    const state = await runtime.store.getState()
    const response = await runtime.app.inject({
      method: 'POST',
      url: '/v1/sites',
      headers: { authorization: `Bearer ${token}` },
      payload: {
        accountId: state.accounts[0]?.id,
        name: 'Unsafe Site',
        primaryDomain: '../../outside.example',
        phpVersion: '8.4',
      },
    })
    expect(response.statusCode).toBe(400)
    await expect(fs.readdir(runtime.config.siteRoot)).rejects.toMatchObject({ code: 'ENOENT' })
  })
})
