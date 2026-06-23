# ISPConfig To FreeWebPanel

FreeWebPanel takeover planning can help replace ISPConfig on single-server hosting nodes. Multi-server ISPConfig setups require extra caution because services may be split across web, DNS, mail, and database nodes.

## Preflight

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel ispconfig \
  --preflight-only
```

## Inventory Focus

- Clients and websites.
- Web roots and vhost state.
- DNS zones and whether DNS is local or remote.
- Mail domains, mailboxes, aliases, and spam settings.
- Databases and database users.
- FTP/SFTP users.
- Cron jobs.
- SSL certificates.
- Whether the installation is single-server or multi-server.

## Multi-Server Warning

If ISPConfig is managing multiple machines, do not run a single-node takeover until you know which services are local. A web-only node is different from a combined web/mail/DNS/SQL node.

## Proceed

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel ispconfig \
  --confirm-panel-replace BACKUP_READY
```