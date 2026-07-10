import fs from 'node:fs/promises'
import path from 'node:path'
import type { CoreConfig } from './config.js'
import { createId, hashPassword } from './crypto.js'
import type { CoreState } from './model.js'

function initialState(config: CoreConfig): CoreState {
  const createdAt = new Date().toISOString()
  const ownerId = createId('user')
  const accountId = createId('account')

  return {
    version: 1,
    users: [
      {
        id: ownerId,
        username: config.ownerUsername,
        displayName: 'FreeWebPanel Owner',
        role: 'platform_owner',
        accountId,
        passwordHash: hashPassword(config.ownerPassword),
        createdAt,
      },
    ],
    sessions: [],
    accounts: [
      {
        id: accountId,
        name: 'FreeWebPanel Operator',
        slug: 'operator',
        contactEmail: 'owner@localhost.invalid',
        ownerUserId: ownerId,
        createdAt,
      },
    ],
    sites: [],
    domains: [],
    audit: [
      {
        id: createId('audit'),
        actorUserId: ownerId,
        action: 'core.initialized',
        resourceType: 'system',
        resourceId: 'freewebpanel-core',
        timestamp: createdAt,
      },
    ],
  }
}

function normalizeState(value: Partial<CoreState>): CoreState {
  return {
    version: 1,
    users: value.users ?? [],
    sessions: value.sessions ?? [],
    accounts: value.accounts ?? [],
    sites: value.sites ?? [],
    domains: value.domains ?? [],
    audit: value.audit ?? [],
  }
}

export class CoreStore {
  private writeQueue: Promise<void> = Promise.resolve()

  constructor(private readonly config: CoreConfig) {}

  async getState(): Promise<CoreState> {
    return this.readState()
  }

  async update<T>(mutator: (state: CoreState) => T | Promise<T>): Promise<T> {
    const operation = this.writeQueue.then(async () => {
      const state = await this.readState()
      const result = await mutator(state)
      await this.writeState(state)
      return result
    })
    this.writeQueue = operation.then(
      () => undefined,
      () => undefined,
    )
    return operation
  }

  private async readState(): Promise<CoreState> {
    await fs.mkdir(path.dirname(this.config.stateFile), { recursive: true, mode: 0o700 })
    try {
      const raw = await fs.readFile(this.config.stateFile, 'utf8')
      return normalizeState(JSON.parse(raw) as Partial<CoreState>)
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error
      }
      const state = initialState(this.config)
      await this.writeState(state)
      return state
    }
  }

  private async writeState(state: CoreState): Promise<void> {
    const directory = path.dirname(this.config.stateFile)
    await fs.mkdir(directory, { recursive: true, mode: 0o700 })
    const temporary = path.join(directory, `.${path.basename(this.config.stateFile)}.${process.pid}.tmp`)
    await fs.writeFile(temporary, `${JSON.stringify(state, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 })
    await fs.rename(temporary, this.config.stateFile)
    await fs.chmod(this.config.stateFile, 0o600)
  }
}
