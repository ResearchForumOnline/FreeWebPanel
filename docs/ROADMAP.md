# Roadmap

This roadmap describes the public direction for FreeWebPanel. It is not a promise of dates; it is a practical guide for contributors, providers, and early operators.

## Stable Public Core

- Keep the GitHub wrapper simple and auditable.
- Keep Ubuntu 24.04 LTS as the production install lane.
- Improve documentation around DNS, SSL, mail, SQL, backups, and account workflows.
- Keep migration and takeover guides honest about backup and rollback requirements.

## Provider Readiness

- Expand provider runbooks for onboarding, support, backup testing, and incident response.
- Add more screenshots and walkthrough videos for common operator tasks.
- Improve migration checklists for cPanel, CWP, DirectAdmin, Plesk, CyberPanel, Hestia/Vesta, Webmin/Virtualmin, ISPConfig, aaPanel, and custom stacks.
- Document clean upgrade, rollback, and recovery expectations for official bundles.

## Platform Compatibility

- Continue validating the RHEL-family preflight path for AlmaLinux, Rocky Linux, and compatible systems.
- Keep OpenZero AIOS and ZeroMint AIOS wrappers documented for AI server environments.
- Improve compatibility notes for small VPS servers versus provider-grade nodes.

## Security And Trust

- Keep ZSEC as the recommended companion security baseline.
- Improve public guidance around SSH lockout safety, fail2ban, firewall posture, and exposed development ports.
- Keep Pro modules, signing keys, license internals, billing internals, private theme source, customer data, and secrets out of GitHub.

## Commercial Growth

- Keep Free Core useful on its own.
- Make the upgrade path to official Pro/support clear without making the public repo feel like a sales page.
- Publish docs that help providers understand the business value: faster launch, lower license pressure, clearer support workflow, and controlled growth.
