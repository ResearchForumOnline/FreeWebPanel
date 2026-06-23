# Same Server, Same IP Takeover

FreeWebPanel takeover is built for the situation hosting providers actually face: the server is already live, customers already point domains at it, and changing every DNS record or moving every account would create downtime, support tickets, and risk.

The preferred plan is an in-place replacement: keep the hosting node and public IP stable where the server state allows it, then replace the old control panel with FreeWebPanel workflows.

## What Can Stay The Same

- Public server IP.
- Customer domain DNS targets, where records already point at the server.
- Website document roots, after inventory and ownership mapping.
- Database content, after dump/restore planning.
- Mail domains and routing, after mailbox and deliverability checks.
- SSL endpoints, after certificate inventory and AutoSSL reissue planning.

## What Changes

- Admin panel URL and workflow.
- Customer panel workflow.
- Account metadata and FreeWebPanel workspace model.
- File manager, DNS, SSL, mail, SQL, backup, update, and support workflows.
- Security posture and update lane.

## Why This Matters

Moving servers can mean DNS delays, customer confusion, broken mail, lost SSL state, and emergency rollback pressure. An in-place takeover avoids unnecessary server moves when a controlled replacement is enough.

## Preflight Command

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --preflight-only
```

## Proceed Command

Use only after off-server backups are verified:

```bash
curl -fsSL https://raw.githubusercontent.com/ResearchForumOnline/FreeWebPanel/main/install.sh | sudo bash -s -- \
  --hostname panel.example.com \
  --email admin@example.com \
  --replace-panel generic \
  --confirm-panel-replace BACKUP_READY
```

## Non-Negotiable Safety Gates

- Root or emergency SSH access confirmed.
- Off-server backup confirmed.
- DNS records exported.
- Web roots inventoried.
- Database dumps created.
- Mailbox and forward inventory exported.
- SSL certificate state recorded.
- Firewall and allowlist reviewed.
- Rollback note written before the takeover window.

## Plain Promise

FreeWebPanel is designed to take over the hosting control plane in place. It should not require a new server or new IP just because an old panel needs replacing. The final decision still depends on the server health, OS, panel state, backups, and business risk.