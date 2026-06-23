# FreeWebPanel In-Place Panel Takeover Center

FreeWebPanel is designed for hosts that want to replace an old hosting control panel without rebuilding their whole business around a new server.

The goal is simple:

- Keep the same server where possible.
- Keep the same public IP where possible.
- Keep customer domains pointed at the same hosting node where possible.
- Replace the control plane, account workflow, file manager, DNS, SSL, mail, SQL, update lane, and customer panel with FreeWebPanel.

This is not a blind one-click wipe. Hosting servers carry websites, mailboxes, databases, SSL state, DNS zones, customers, and money. FreeWebPanel takeover planning therefore starts with preflight, inventory, backups, and rollback notes before the installer is allowed to make destructive changes.

## Start Here

- [Same Server, Same IP Takeover](same-server-same-ip.md)
- [Backup And Rollback Checklist](backup-and-rollback.md)
- [Migration Matrix](migration-matrix.md)
- [Customer Communication Template](customer-communication.md)

## Panel-Specific Takeover Pages

- [cPanel / WHM to FreeWebPanel](cpanel-whm-to-freewebpanel.md)
- [Control Web Panel / CWP to FreeWebPanel](control-web-panel-cwp-to-freewebpanel.md)
- [DirectAdmin to FreeWebPanel](directadmin-to-freewebpanel.md)
- [Plesk to FreeWebPanel](plesk-to-freewebpanel.md)
- [CyberPanel to FreeWebPanel](cyberpanel-to-freewebpanel.md)
- [HestiaCP / VestaCP to FreeWebPanel](hestia-vesta-to-freewebpanel.md)
- [Webmin / Virtualmin to FreeWebPanel](webmin-virtualmin-to-freewebpanel.md)
- [ISPConfig to FreeWebPanel](ispconfig-to-freewebpanel.md)
- [aaPanel to FreeWebPanel](aapanel-to-freewebpanel.md)
- [Generic Panel Takeover](generic-panel-takeover.md)

## Universal Preflight Pattern

Run preflight before any takeover:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --preflight-only
```

Only proceed after verified off-server backups:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --confirm-panel-replace BACKUP_READY
```

Replace `generic` with `cpanel`, `cwp`, `directadmin`, `plesk`, `cyberpanel`, `hestia`, `webmin`, `virtualmin`, `ispconfig`, or `aapanel` when targeting a known panel.

## Public Safety Boundary

These pages describe the public planning model. They do not publish private takeover internals, hidden scripts, customer data extraction code, exploit details, or destructive panel-removal logic.