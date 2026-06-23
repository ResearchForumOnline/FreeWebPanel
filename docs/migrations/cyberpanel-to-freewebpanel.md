# CyberPanel To FreeWebPanel

FreeWebPanel takeover planning can help replace a CyberPanel control layer while keeping the same server and public IP where safe.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cyberpanel \
  --preflight-only
```

## Inventory Focus

- Website list and document roots.
- OpenLiteSpeed vhost configuration.
- LSCache and rewrite expectations.
- DNS zones and nameserver state.
- Email accounts, forwards, and mail routing.
- Databases and users.
- SSL certificate state.
- Package limits, FTP/SFTP users, cron jobs, and backup location.

## Takeover Notes

CyberPanel servers often depend on OpenLiteSpeed-specific configuration. Preflight should identify where site behaviour depends on LiteSpeed rules, cache settings, or panel-managed vhosts before FreeWebPanel replacement.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cyberpanel \
  --confirm-panel-replace BACKUP_READY
```