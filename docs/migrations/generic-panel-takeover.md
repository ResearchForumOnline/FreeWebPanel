# Generic Panel Takeover

Use the generic takeover path when the server has a custom panel, a small unmanaged stack, an unsupported panel, or a mixed hosting environment.

Generic does not mean careless. It means FreeWebPanel starts with inventory instead of panel-specific assumptions.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --preflight-only
```

## Inventory Focus

- OS version and package manager.
- Web server: Nginx, Apache, OpenLiteSpeed, or mixed.
- PHP-FPM versions and handlers.
- Website roots and ownership.
- DNS server role or external DNS provider.
- Mail server role or external mail provider.
- Database engine and database users.
- Cron jobs and background workers.
- SSL certificate storage and renewal method.
- Firewall and SSH rules.
- Backups and restore path.

## When Generic Is The Right Choice

- The current panel is not listed in the migration matrix.
- The server was hand-built.
- The old panel was partially removed.
- The server has custom app routes or reverse proxies.
- The server is a web-only node with mail/DNS/SQL elsewhere.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --confirm-panel-replace BACKUP_READY
```

## Rule

If FreeWebPanel cannot confidently map a service, it should stop and ask for operator review rather than destroy unknown state.