# Changelog

Notable public repository updates are tracked here. Production release bundles remain controlled by FreeWebPanel.com.

## 2026-07-10

- Published the first buildable Free Core control-plane source under `core/api`.
- Added production-clean state initialization with no demo customers or fake billing records.
- Added scrypt owner authentication, hashed sessions, atomic mode-`0600` state, login throttling, account creation, strict domain validation, and constrained site-root provisioning.
- Added Core API lint, tests, and build checks to GitHub Actions.
- Documented the exact public/private boundary instead of implying that private Pro or production assets are open source.

## 2026-07-04

- Added Softaculous bridge documentation for provider-owned Remote and custom-panel integrations.
- Updated README, feature map, and provider operations docs to show built-in installers plus optional licensed Softaculous catalogue support.
- Added public project governance docs for contributors, operators, and providers.
- Linked the public roadmap and provider operations guide from the README.
- Clarified the GitHub repository boundary around Free Core, documentation, public installers, and protected official release assets.
- Kept the installer wrapper unchanged so the official FreeWebPanel.com release channel remains authoritative.

## Earlier

- Added ZSEC Auto Updates as the companion security updater.
- Added migration and takeover guides for common hosting panels.
- Added public install guidance, feature map, video links, and licensing/protection notes.
