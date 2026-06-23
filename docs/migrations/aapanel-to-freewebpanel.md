# aaPanel To FreeWebPanel

FreeWebPanel takeover planning can replace aaPanel on a hosting server while aiming to keep the same server and IP when the web, DNS, mail, and database state is clear.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel aapanel \
  --preflight-only
```

## Inventory Focus

- Websites and document roots.
- Nginx/Apache choice and vhost files.
- PHP versions and extensions.
- Databases and database users.
- Cron tasks.
- Firewall and security plugins.
- SSL certificates.
- File manager permissions.
- Any app-store installed services.

## Takeover Notes

aaPanel environments can vary because many services are installed through its app manager. Preflight should identify which services are actually present before replacement.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel aapanel \
  --confirm-panel-replace BACKUP_READY
```