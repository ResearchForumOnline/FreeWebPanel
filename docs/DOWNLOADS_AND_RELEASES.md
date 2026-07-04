# Downloads, Releases, And Updates

FreeWebPanel has two public paths:

- the public GitHub repository for Free Core source, install wrappers, docs, diagrams, and issue-facing material;
- the official website for branded release delivery, Pro licensing, paid support, and protected runtime assets.

## Public Links

| Need | Link |
| --- | --- |
| Website | <https://freewebpanel.com/> |
| GitHub repository | <https://github.com/ResearchForumOnline/FreeWebPanel> |
| GitHub source ZIP | <https://github.com/ResearchForumOnline/FreeWebPanel/archive/refs/heads/main.zip> |
| GitHub releases | <https://github.com/ResearchForumOnline/FreeWebPanel/releases> |
| Install guide | [INSTALL.md](INSTALL.md) |
| Release channel | [RELEASE_CHANNEL.md](RELEASE_CHANNEL.md) |
| Feature map | [FEATURE_MAP.md](FEATURE_MAP.md) |

## Install

Use a clean Ubuntu 24.04 LTS server with a DNS-only hostname pointed at the server IP.

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --server-profile provider
```

After installation:

- admin panel: `https://panel.example.com:2087/admin/login`
- user panel: `https://panel.example.com:2083/user/login`
- credentials file on the server: `/root/THCZ_PANEL_CREDENTIALS.txt`

## Update And Release Notes

Read [RELEASE_CHANNEL.md](RELEASE_CHANNEL.md) before relying on an update lane for production. Public Free Core material is visible in GitHub. Official Pro releases, protected runtime assets, update signing, commercial support, and license services are controlled by <https://freewebpanel.com/>.

## Search-Friendly Summary

FreeWebPanel is a free-core Linux hosting control panel for users searching for cPanel alternatives, DirectAdmin alternatives, free web hosting panels, DNS and SSL automation, email hosting panels, SQL hosting panels, customer hosting workspaces, and provider-ready server control panels.
