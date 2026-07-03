# Contributing

FreeWebPanel welcomes useful public contributions to the Free Core installer entry point, documentation, diagrams, migration guides, and issue reports.

## Good Public Contributions

- Clear install notes for supported Linux versions.
- Migration guide fixes for real panel replacement workflows.
- Documentation that helps providers understand DNS, SSL, mail, backups, and rollback.
- Bug reports with logs, OS version, install command, and server profile.
- Small installer wrapper improvements that keep the official FreeWebPanel.com release channel intact.

## Repository Boundary

Do not submit:

- production secrets, SSH keys, API keys, customer data, or screenshots containing private domains
- private Pro modules, billing internals, license server internals, signing keys, or source maps
- copied third-party panel code or assets without a license
- destructive scripts that touch live hosting data without explicit backup and review steps

## Local Checks

Before opening a pull request:

```bash
bash -n install.sh
find . -name "*.md" -print
```

For documentation-only changes, make sure links are relative where possible and public URLs use HTTPS.

## Pull Request Style

- Keep one topic per pull request.
- Explain the operator problem being solved.
- Mention the tested OS, if installer behavior changed.
- Keep public copy written for server owners and hosting providers, not just developers.
