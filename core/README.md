# FreeWebPanel Core Source

This directory is the public, buildable Free Core control-plane source. It is intentionally smaller than the hosted FreeWebPanel release and intentionally excludes Pro automation, payment settlement, vendor signing keys, customer data, private themes, and production deployment inventory.

The first public source slice provides:

- production-clean initialization with one owner and no demo customers;
- scrypt password hashing and rate-limited owner login;
- SHA-256 hashed bearer sessions stored in an atomic mode-`0600` state file;
- owner-managed customer accounts;
- strict international-domain normalization and validation;
- site roots derived beneath one configured directory, never accepted from request input;
- a real initial `public_html/index.html` write with restrictive permissions;
- audit records and tests for the security boundaries above.

It does not claim to publish Nginx, DNS, mail, SQL, certificate, or privileged system changes yet. Those need a separately reviewed privileged worker and will be opened in auditable slices rather than hidden behind marketing claims.

## Run

```bash
cd core/api
cp .env.example .env
npm install
npm test
npm run build
FREEWEBPANEL_OWNER_PASSWORD='use-a-long-unique-secret' npm start
```

The API binds to `127.0.0.1:4080` by default. Put it behind an authenticated HTTPS reverse proxy; do not expose the development process directly to the Internet.

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/health` | Process health |
| `GET` | `/v1/profile` | Public Core boundary |
| `POST` | `/v1/auth/login` | Owner login |
| `POST` | `/v1/auth/logout` | Revoke current session |
| `GET/POST` | `/v1/accounts` | List or create customer accounts |
| `GET/POST` | `/v1/sites` | List or create constrained site roots |
| `GET` | `/v1/domains` | List the domain inventory |

Bearer-authenticated routes require the owner session returned by `/v1/auth/login`.
