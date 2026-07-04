# Softaculous Bridge For FreeWebPanel

FreeWebPanel includes built-in one-click installer workflows for common PHP applications. It can also connect to Softaculous as an optional provider-owned, licensed app catalogue.

## What This Adds

When a hosting provider configures Softaculous, FreeWebPanel can present an expanded installer lane for:

- The wider Softaculous app catalogue.
- WordPress Manager style maintenance.
- Clone and staging workflows.
- Remote import.
- Backups and restore.
- Script upgrades and customer app lifecycle actions.

The built-in FreeWebPanel installers remain available. Softaculous is an additional lane, not a replacement.

## Integration Modes

### Softaculous Remote

Softaculous Remote runs as a separate service and can install apps onto hosting targets through FTP, FTPS, or SFTP. FreeWebPanel stores the provider API pass in its masked integration vault and uses provider-controlled server-side endpoints.

### Custom Panel / Native Adapter

Softaculous also documents a custom control panel integration path. This requires the Softaculous custom package on servers where customer files are stored and a `softpanel.php` adapter that maps FreeWebPanel users, domains, document roots, databases, disk space, and panel URLs.

## Admin Setup Summary

1. Confirm the current Softaculous licence and deployment model.
2. Install Softaculous Remote on a dedicated management host, or install the custom package on each web node that stores customer files.
3. Create or rotate the Softaculous API pass.
4. In FreeWebPanel, open Admin -> Integrations -> Softaculous Remote.
5. Save `SOFTACULOUS_API_PASS` and the provider-owned Remote endpoint.
6. Test against a staging account before exposing the lane to customers.

## Security Boundary

- FreeWebPanel never asks customers for arbitrary Softaculous server URLs.
- API passes are stored in the protected integration vault and shown only as masked previews.
- Customer pages can show availability and features, but not raw endpoint or API-pass data.
- Native adapter mode should be validated on a staging node before production use.

## Commercial Notice

Softaculous is a third-party commercial script installer. FreeWebPanel support for a bridge does not include a Softaculous licence. Providers should review the current official Softaculous documentation and pricing before offering this lane.

## Official References

- Custom panel integration: https://www.softaculous.com/docs/developers/custom-integration/
- Softaculous Remote: https://www.softaculous.com/docs/admin/softaculous-remote/
- API documentation: https://www.softaculous.com/docs/api/api/
- Feature overview: https://softaculous.com/features/

