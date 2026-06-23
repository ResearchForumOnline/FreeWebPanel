# Control Web Panel / CWP To FreeWebPanel

FreeWebPanel can plan an in-place takeover from Control Web Panel / CWP so the server can keep its public role while the old panel layer is replaced.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cwp \
  --preflight-only
```

## Inventory Focus

- CWP users and domains.
- Web roots and ownership.
- Apache/Nginx layout and PHP-FPM versions.
- DNS zones and nameserver hostnames.
- Postfix/Dovecot mailboxes and forwards.
- MariaDB databases and users.
- SSL certificates and renewal state.
- Cron jobs, backups, custom vhosts, and firewall rules.

## Why In-Place Matters

Many CWP servers already host live customer domains on the server IP. FreeWebPanel takeover planning is built to avoid needless DNS churn where the same server can safely continue hosting the websites.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cwp \
  --confirm-panel-replace BACKUP_READY
```

## Validation

After takeover, verify admin login, customer login, website loading, SSL, mail routing, SQL connections, file manager access, update lane, and firewall allowlists.