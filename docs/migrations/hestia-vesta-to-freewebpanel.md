# HestiaCP / VestaCP To FreeWebPanel

FreeWebPanel takeover planning can replace HestiaCP or VestaCP while preserving the same server and IP where the server is healthy and backups are verified.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel hestia \
  --preflight-only
```

Use `--replace-panel vesta` only when the installer lane supports it. Otherwise use the Hestia/Vesta inventory path and `generic` as the safe planning flag.

## Inventory Focus

- Users and domains.
- Web templates and document roots.
- DNS zones.
- Mail domains, accounts, forwarders, aliases, and spam settings.
- Databases and users.
- Cron jobs and backup archives.
- SSL certificate state.
- Firewall and fail2ban rules.

## Takeover Notes

Hestia/Vesta-style servers can be clean to inventory, but mail, DNS, and template customisation still need careful mapping. Keep old backups until customer workflows are confirmed stable.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel hestia \
  --confirm-panel-replace BACKUP_READY
```