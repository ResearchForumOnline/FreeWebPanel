# Webmin / Virtualmin To FreeWebPanel

FreeWebPanel takeover planning can move a Webmin or Virtualmin server into a FreeWebPanel control layer while aiming to keep the same server/IP and hosted domains in place.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel virtualmin \
  --preflight-only
```

For a Webmin-only host without Virtualmin virtual servers, use:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel webmin \
  --preflight-only
```

## Inventory Focus

- Virtual servers and owners.
- Apache/Nginx configuration.
- BIND zones or external DNS usage.
- Postfix/Dovecot mail domains.
- MySQL/PostgreSQL databases.
- SSL certificate state.
- Scheduled jobs and backups.
- Any Webmin modules managing services outside normal hosting.

## Takeover Notes

Webmin is broad and can manage many system services. Preflight should identify non-hosting services so FreeWebPanel does not assume every managed service is a website/mail/SQL workload.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel virtualmin \
  --confirm-panel-replace BACKUP_READY
```