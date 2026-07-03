# Provider Operations Guide

FreeWebPanel is designed for hosting providers, agencies, VPS owners, and server operators who need a practical control panel path without starting with a license bill.

## Operating Model

Use this order when preparing a production server:

1. Start from a clean Ubuntu 24.04 LTS server.
2. Point DNS-only panel and nameserver records at the server IP.
3. Run preflight if replacing an existing panel or testing a provider profile.
4. Install FreeWebPanel with the `provider` profile.
5. Save the generated credentials file in a private password manager.
6. Create the first hosting account and test a real website, SSL certificate, mailbox, database, backup, and restore path.
7. Add ZSEC Auto Updates for security-only patching and SSH lockout guardrails.
8. Document customer support and rollback procedures before onboarding customers.

## Daily Admin Checks

- Confirm disk space, memory, load, and service status.
- Review failed logins and firewall posture.
- Check SSL renewal status for hosted domains.
- Confirm backup jobs are completing and can be restored.
- Review mail deliverability records for new customer domains.
- Keep public DNS and nameserver records consistent.
- Check pending panel and operating system updates.

## Customer Onboarding

For each customer, record:

- primary domain and any aliases
- site root and PHP/app requirements
- mailbox list, forwards, and recovery email
- DNS provider and nameserver plan
- SSL expectations and redirect preference
- backup retention expectation
- support contact and escalation route

## Existing Panel Replacement

Panel takeover should be treated as a migration project, not a blind install.

Minimum safe sequence:

1. Inventory websites, DNS zones, mailboxes, databases, cron jobs, SSL certificates, backups, and customer accounts.
2. Create verified off-server backups.
3. Run the FreeWebPanel replacement preflight.
4. Review the generated service mapping.
5. Schedule the replacement window.
6. Keep rollback material until every customer service has been tested.

Start with [migrations/README.md](migrations/README.md).

## ZSEC Companion Security

ZSEC Auto Updates is the companion security utility:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/ZSEC/main/install.sh | sudo bash
sudo zsec status
```

ZSEC is separate from FreeWebPanel. It focuses on security-only operating system updates, SSH guardrails, fail2ban direction, conservative hardening, and local exposure checks.

## Support Positioning

Free Core is public and usable. Official Pro, paid support, release bundles, update signing, and commercial response are controlled by FreeWebPanel.com.

This helps keep the open-source entry point useful while protecting the service work needed to maintain a hosting product responsibly.
