# DirectAdmin To FreeWebPanel

FreeWebPanel takeover planning can replace a DirectAdmin control layer while aiming to preserve the live server and public IP.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel directadmin \
  --preflight-only
```

## Inventory Focus

- Admin, reseller, and user accounts.
- Domains, pointers, subdomains, and aliases.
- User home paths and document roots.
- DNS zones and local/remote DNS role.
- Email accounts, forwarders, autoresponders, and routing.
- Databases and database users.
- PHP selector/custombuild state.
- SSL certificate state.
- Backups, cron jobs, and custom service changes.

## Takeover Notes

DirectAdmin servers can vary widely depending on custombuild, web server choice, PHP mode, and mail stack customisation. Run preflight and review the generated report before any replacement.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel directadmin \
  --confirm-panel-replace BACKUP_READY
```