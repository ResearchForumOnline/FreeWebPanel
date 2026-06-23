# Backup And Rollback Checklist

A panel takeover is powerful because it changes the operating layer of a live hosting server. That power needs guardrails.

## Required Before Any Takeover

- Full server snapshot if the provider supports it.
- Off-server backup of website files.
- Off-server SQL dumps.
- Export of DNS zones.
- Export of mailboxes, forwarders, aliases, and routing settings.
- List of customer accounts and primary domains.
- List of PHP versions, app runtimes, cron jobs, and special paths.
- List of SSL certificates and domains covered.
- Current firewall rules and SSH port noted.
- Contact path for customers if maintenance affects them.

## Good Backup Layout

```text
/backups/panel-takeover/YYYY-MM-DD/
  accounts.csv
  domains.csv
  dns-zones/
  webroots/
  sql-dumps/
  mail-inventory/
  ssl-inventory/
  firewall-before.txt
  services-before.txt
  rollback-notes.md
```

## Rollback Questions

Before the takeover, answer these:

- Can the provider snapshot be restored?
- Can the old panel be restarted if FreeWebPanel preflight fails?
- Can DNS be reverted quickly?
- Can websites be served read-only during the window?
- Can customers be told the truth in one short update?

## Takeover Window

- Freeze panel changes.
- Pause scheduled migrations or app deployments.
- Take final database dumps.
- Run FreeWebPanel takeover with the correct panel flag.
- Validate panel, websites, SSL, DNS, mail, SQL, and file manager.
- Keep monitoring logs open until traffic looks normal.

## After Takeover

- Confirm customer domains load.
- Confirm admin and user panel logins.
- Confirm SSL status.
- Confirm mail send/receive where mail is hosted on the server.
- Confirm SQL apps connect.
- Confirm backups and update lane.
- Keep old-panel backups until the new panel has survived normal operations.