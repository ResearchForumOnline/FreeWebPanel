export type Role = 'platform_owner' | 'customer'

export type UserRecord = {
  id: string
  username: string
  displayName: string
  role: Role
  accountId: string
  passwordHash: string
  createdAt: string
}

export type SessionRecord = {
  id: string
  tokenHash: string
  userId: string
  createdAt: string
  expiresAt: string
}

export type AccountRecord = {
  id: string
  name: string
  slug: string
  contactEmail: string
  ownerUserId: string
  createdAt: string
}

export type SiteRecord = {
  id: string
  accountId: string
  name: string
  primaryDomain: string
  documentRoot: string
  phpVersion: string
  publishStatus: 'staging' | 'live'
  sslStatus: 'pending' | 'ready'
  createdAt: string
  updatedAt: string
}

export type DomainRecord = {
  id: string
  accountId: string
  siteId: string
  fqdn: string
  dnsStatus: 'pending' | 'ready'
  sslStatus: 'pending' | 'ready'
  createdAt: string
}

export type AuditRecord = {
  id: string
  actorUserId: string
  action: string
  resourceType: string
  resourceId: string
  timestamp: string
}

export type CoreState = {
  version: 1
  users: UserRecord[]
  sessions: SessionRecord[]
  accounts: AccountRecord[]
  sites: SiteRecord[]
  domains: DomainRecord[]
  audit: AuditRecord[]
}
