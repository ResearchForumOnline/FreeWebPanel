import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export function createId(prefix: string): string {
  return `${prefix}_${randomBytes(12).toString('hex')}`
}

export function createToken(): string {
  return randomBytes(32).toString('base64url')
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex')
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16)
  const derived = scryptSync(password, salt, 32)
  return `scrypt$${salt.toString('base64url')}$${derived.toString('base64url')}`
}

export function verifyPassword(password: string, encoded: string): boolean {
  const [algorithm, saltText, hashText] = encoded.split('$')
  if (algorithm !== 'scrypt' || !saltText || !hashText) {
    return false
  }

  const expected = Buffer.from(hashText, 'base64url')
  const actual = scryptSync(password, Buffer.from(saltText, 'base64url'), expected.length)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}
