# FreeWebPanel

FreeWebPanel Free Core is the entry point for a real Linux hosting business: install on a clean Ubuntu server, create hosting accounts, publish websites, manage mail, SQL, files, domains, and security, then grow into paid Pro or official support when the server starts earning.

This repository is the public GitHub front door for FreeWebPanel installs. The production bundle, update channel, Pro licensing, paid support, and official release checks are served from [freewebpanel.com](https://freewebpanel.com/).

## Quick Install

Use a clean Ubuntu 24.04 LTS server with a DNS-only hostname pointed at the server IP.

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile provider
```

After installation:

- Admin panel: `https://panel.example.com:2087/admin/login`
- User panel: `https://panel.example.com:2083/user/login`
- Credentials file on the server: `/root/THCZ_PANEL_CREDENTIALS.txt`

## What Free Core Includes

- Hosting account creation and customer workspaces
- Website and document-root management
- File manager with guarded write actions
- Domain, DNS, AutoSSL, redirect, and nameserver workflows
- Mailboxes, forwards, webmail launchers, and deliverability checks
- SQL databases and phpMyAdmin/Adminer launcher flow
- Security posture checks, firewall guidance, and update lane
- Light, Dark, Midnight, and Studio panel themes as compiled official runtime assets
- Automatic FreeWebPanel core update checks
- Manual update route for admins

## Install Lanes

1. **Ubuntu 24.04 LTS** - production install lane.
2. **AlmaLinux / RockyLinux / RHEL-family** - preflight validation today, RPM/dnf lane planned.
3. **ZeroMint AIOS / OpenZero AIOS** - compatibility wrapper for AIOS servers.
4. **Existing panel replacement** - preflight and guarded takeover planning for hosts migrating away from legacy panels.

See [docs/INSTALL.md](docs/INSTALL.md) for the full install guide.

## DNS Before Install

Create DNS-only A records before running the installer:

```text
panel.example.com      -> your server IPv4
ns1.panel.example.com  -> your server IPv4
ns2.panel.example.com  -> your server IPv4
```

If using Cloudflare, keep these records **DNS only / grey cloud**. Do not proxy the panel hostname or nameserver hostnames through the orange cloud.

## Free, Pro, and Official Licensing

Free Core is public and installable from GitHub. Pro features, official licensing, paid support, branded releases, update signing, and commercial support are controlled by [freewebpanel.com](https://freewebpanel.com/).

Only FreeWebPanel.com is authorised to sell official FreeWebPanel licenses, Pro access, hosted update services, and support. Hosting providers can use Free Core on their own servers, but they may not sell unofficial FreeWebPanel licenses or represent themselves as the official vendor.

The public installer does not publish private theme source. Installed servers receive compiled/minified runtime assets only. See [docs/THEME_ASSET_PROTECTION.md](docs/THEME_ASSET_PROTECTION.md).

See [docs/LICENSING_AND_PROTECTION.md](docs/LICENSING_AND_PROTECTION.md).

## Security

FreeWebPanel is a hosting control panel and should be installed only on a clean server you control. Do not run public install commands on a production host until you have backups and have reviewed the flags you are using.

Security reports: [SECURITY.md](SECURITY.md)

## License

Free Core is distributed under the Apache License 2.0. FreeWebPanel names, logos, official service marks, Pro modules, paid licensing flows, update signing keys, commercial support channels, and official theme trade dress are not granted by the Apache license.
