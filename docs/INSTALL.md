# FreeWebPanel Installation Guide

FreeWebPanel is designed to start simple: one clean Linux server, one panel hostname, direct DNS, and a managed installer that prepares the web stack, panel API, panel UI, update lane, and account workflow.

## Minimum Recommended Server

For a production hosting node, start with:

- Ubuntu 24.04 LTS
- 4+ CPU cores for provider use
- 8 GB+ RAM for a serious shared hosting node
- 100 GB+ SSD/NVMe storage
- A public IPv4 address
- A DNS-only panel hostname
- Fresh OS install, not a mixed server full of old panels

Small and micro profiles exist for tests or tiny VPS servers, but provider servers should use the `provider` profile.

## DNS Setup

Before install, point the panel hostname and nameserver hostnames at the server IP.

Example for `panel.example.com`:

```text
panel.example.com      A     203.0.113.10
ns1.panel.example.com  A     203.0.113.10
ns2.panel.example.com  A     203.0.113.10
```

Cloudflare users: use **DNS only / grey cloud** for the panel hostname and nameserver hostnames. Do not proxy these through the orange cloud.

## Ubuntu Production Install

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile provider
```

After install, open:

- Admin panel: `https://panel.example.com:2087/admin/login`
- User/customer panel: `https://panel.example.com:2083/user/login`
- Credentials file: `/root/THCZ_PANEL_CREDENTIALS.txt`

## Smaller Profiles

Tiny test node:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile micro
```

Modest VPS:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile small
```

## Safe Preflight

Run a preflight when checking DNS, ports, server profile, or an existing host before installing packages.

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile provider \
  --preflight-only
```

## AlmaLinux / RockyLinux / RHEL-Family

Production installation is Ubuntu-first today. RHEL-family hosts should use preflight mode while the RPM/dnf lane is validated.

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile provider \
  --allow-rhel-family \
  --preflight-only
```

Dedicated wrapper:

```bash
curl -fsSL https://freewebpanel.com/downloads/freewebpanel-rhel-family-preflight.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com
```

## ZeroMint AIOS / OpenZero AIOS

Use the AIOS wrapper when the server is also part of a ZeroMint/OpenZero environment.

```bash
curl -fsSL https://freewebpanel.com/downloads/freewebpanel-openzero-aios-install.sh | sudo bash -s -- \
  --hostname web.example.com \
  --email admin@example.com
```

## Existing Panel Replacement

FreeWebPanel can help plan migrations from legacy hosting panels, but replacing a panel is destructive if you do it without verified backups. Use preflight first.

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cwp \
  --preflight-only
```

Supported planner names include:

```text
cpanel, cwp, directadmin, plesk, cyberpanel, hestia, webmin, virtualmin, ispconfig, aapanel, generic
```

Only proceed with a replacement after verified off-server backups:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel cwp \
  --confirm-panel-replace BACKUP_READY
```

## Manual Updates

Admins can update from the panel when the manual update route is enabled. The update lane pulls the official FreeWebPanel bundle, stages it, keeps rollback pointers, validates services, and restarts the panel API only after checks pass.

## What GitHub Installs

The GitHub wrapper downloads the official installer from:

```text
https://freewebpanel.com/downloads/thcz-install.sh
```

The installer then downloads the official release bundle from:

```text
https://freewebpanel.com/downloads/thcz-foundation-latest.tar.gz
```

GitHub is the public entry point. FreeWebPanel.com remains the official release and support channel.
