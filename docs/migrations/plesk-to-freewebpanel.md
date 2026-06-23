# Plesk To FreeWebPanel

FreeWebPanel takeover planning can help a host move from Plesk to a FreeWebPanel control layer while keeping the same server and IP where the platform state allows it.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel plesk \
  --preflight-only
```

## Inventory Focus

- Subscriptions, service plans, customers, and domains.
- Webspaces and document roots.
- DNS zones and external DNS dependencies.
- Mailboxes, forwards, aliases, and spam settings.
- Databases and users.
- PHP versions and handler choices.
- SSL certificate state.
- Scheduled tasks, backups, and app installer state.

## Takeover Notes

Plesk uses subscription and service-plan concepts that should be mapped into FreeWebPanel accounts and packages before replacement. Do not assume every subscription is a simple one-domain account.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel plesk \
  --confirm-panel-replace BACKUP_READY
```