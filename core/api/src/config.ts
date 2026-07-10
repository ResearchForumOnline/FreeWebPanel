import path from 'node:path'

export type CoreConfig = {
  host: string
  port: number
  stateFile: string
  siteRoot: string
  ownerUsername: string
  ownerPassword: string
  sessionHours: number
}

function positiveNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

export function resolveConfig(overrides: Partial<CoreConfig> = {}): CoreConfig {
  const config: CoreConfig = {
    host: overrides.host ?? process.env.FREEWEBPANEL_HOST ?? '127.0.0.1',
    port: overrides.port ?? positiveNumber(process.env.FREEWEBPANEL_PORT, 4080),
    stateFile:
      overrides.stateFile ??
      process.env.FREEWEBPANEL_STATE_FILE ??
      path.join(process.cwd(), '.data', 'core-state.json'),
    siteRoot:
      overrides.siteRoot ??
      process.env.FREEWEBPANEL_SITE_ROOT ??
      path.join(process.cwd(), '.data', 'sites'),
    ownerUsername: overrides.ownerUsername ?? process.env.FREEWEBPANEL_OWNER_USERNAME ?? 'panel-admin',
    ownerPassword:
      overrides.ownerPassword ??
      process.env.FREEWEBPANEL_OWNER_PASSWORD ??
      'ChangeMe-FreeWebPanel-Now!',
    sessionHours: overrides.sessionHours ?? positiveNumber(process.env.FREEWEBPANEL_SESSION_HOURS, 12),
  }

  if (process.env.NODE_ENV === 'production' && config.ownerPassword === 'ChangeMe-FreeWebPanel-Now!') {
    throw new Error('FREEWEBPANEL_OWNER_PASSWORD must be a unique production password.')
  }
  if (config.ownerPassword.length < 14) {
    throw new Error('FREEWEBPANEL_OWNER_PASSWORD must contain at least 14 characters.')
  }

  return config
}
