# Security Policy

FreeWebPanel is a hosting control panel. Treat every install as security-sensitive.

## Supported Channel

Security fixes are delivered through the official FreeWebPanel update channel:

```text
https://freewebpanel.com/
```

GitHub provides the public install wrapper and project documentation. The official release bundle, staged updater, Pro support, and commercial response channel are served by FreeWebPanel.com.

## Reporting A Vulnerability

Report suspected vulnerabilities privately to:

```text
security@freewebpanel.com
```

If that mailbox is not available, use the contact route on:

```text
https://freewebpanel.com/
```

Please include:

- Affected version or install date
- OS and server profile
- Panel URL/port affected, if relevant
- Reproduction steps
- Whether the issue affects admin, user, API, installer, update, mail, SQL, file manager, DNS, or SSL flows
- Logs or screenshots with secrets removed

Do not publish exploit details before the project has had time to investigate and release a fix.

## Installer Safety

Use FreeWebPanel on a clean server whenever possible. Before replacing an existing panel, take verified off-server backups.

Recommended production install target:

- Ubuntu 24.04 LTS
- Direct public IPv4
- DNS-only panel hostname
- SSH access retained on the correct port
- Firewall rules checked before changing services

## Secrets

Never commit or post:

- SSH private keys
- API keys
- Payment provider credentials
- License server credentials
- Database passwords
- Customer account data
- `/root/THCZ_PANEL_CREDENTIALS.txt`
- Production `.env` files

## Update Security

FreeWebPanel updates are staged before activation. A safe update should:

- Download from the official channel
- Keep rollback pointers
- Validate services before switching
- Restart only the panel services that need it
- Leave customer websites and data untouched unless the update explicitly says otherwise

## Scope

This policy covers FreeWebPanel Free Core, the public installer wrapper, documentation, and public release channel. Paid Pro modules and commercial support may have additional private response routes.
