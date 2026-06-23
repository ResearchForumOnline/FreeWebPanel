# Panel Takeover Matrix

| Current panel | FreeWebPanel flag | Best first action | Notes |
| --- | --- | --- | --- |
| cPanel / WHM | `--replace-panel cpanel` | Preflight inventory | Account packages, home dirs, DNS zones, mailboxes, databases, and AutoSSL state need careful mapping. |
| Control Web Panel / CWP | `--replace-panel cwp` | Preflight inventory | Check Apache/Nginx, PHP-FPM, Postfix/Dovecot, DNS, and user home paths. |
| DirectAdmin | `--replace-panel directadmin` | Preflight inventory | Map users, domains, email, SQL, and custombuild-era service layout. |
| Plesk | `--replace-panel plesk` | Preflight inventory | Watch subscriptions, service plans, mail, webspaces, and panel-specific app metadata. |
| CyberPanel | `--replace-panel cyberpanel` | Preflight inventory | OpenLiteSpeed, LSCache, DNS, mail, and website vhost mappings need explicit checks. |
| HestiaCP / VestaCP | `--replace-panel hestia` | Preflight inventory | Account backups, Nginx/Apache templates, mail, DNS, and user cron state matter. |
| Webmin / Virtualmin | `--replace-panel virtualmin` | Preflight inventory | Virtual servers, mail, databases, BIND, and Apache/Nginx choices vary by setup. |
| ISPConfig | `--replace-panel ispconfig` | Preflight inventory | Multi-server setups need extra caution; identify whether services are local or remote. |
| aaPanel | `--replace-panel aapanel` | Preflight inventory | Website roots, Nginx/Apache, database, cron, app manager, and firewall state vary heavily. |
| Unknown/custom | `--replace-panel generic` | Manual inventory | Use generic takeover when the current system is custom or not a supported profile. |

## Recommended Order

1. Inventory current panel.
2. Export backups.
3. Run FreeWebPanel preflight.
4. Review takeover report.
5. Confirm backups.
6. Run controlled takeover.
7. Validate all customer-facing services.
8. Keep rollback material until stable.

## Important

Do not run a destructive replacement because a server merely looks similar to a supported panel. Use the exact flag only when the panel is confirmed.