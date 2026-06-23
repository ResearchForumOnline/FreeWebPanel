# cPanel / WHM To FreeWebPanel

FreeWebPanel can plan an in-place takeover from cPanel / WHM so a host can move away from old licensing pressure without automatically moving servers or changing the public IP.

## Positioning

The goal is not to copy the old panel. The goal is to keep the hosting business online while FreeWebPanel takes over the control workflows: accounts, websites, files, domains, DNS, SSL, email, SQL, backups, updates, and customer access.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cpanel \
  --preflight-only
```

## Inventory Focus

- WHM accounts and packages.
- Primary domains, addon domains, aliases, and subdomains.
- Home directories and public document roots.
- DNS zones and nameserver roles.
- Email accounts, forwarders, aliases, and routing.
- MySQL/MariaDB databases and database users.
- PHP versions and per-site handlers.
- SSL certificates and AutoSSL state.
- Cron jobs and app-specific paths.
- Backups and restore points.

## Takeover Plan

1. Export account and domain inventory.
2. Take provider snapshot and off-server backups.
3. Freeze panel changes.
4. Run FreeWebPanel cPanel preflight.
5. Review account mapping and service conflicts.
6. Confirm backups.
7. Run controlled replacement.
8. Validate websites, SSL, mail, SQL, files, and customer logins.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cpanel \
  --confirm-panel-replace BACKUP_READY
```

## Strong Message

A host should not have to move every website to a new machine just to escape a costly control panel. FreeWebPanel is designed to replace the control layer in place when the server is healthy and backups are verified.