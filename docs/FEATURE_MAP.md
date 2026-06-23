# FreeWebPanel Feature Map

FreeWebPanel is built around the daily jobs a hosting admin and a website owner actually need.

## Admin Panel

- Server dashboard with health, capacity, SSL, security, disk, and bandwidth views.
- Hosting account creation and customer workspace controls.
- Website roots, domains, subdomains, aliases, DNS records, and AutoSSL workflows.
- File manager with upload, extract, rename, move, delete, edit, and guarded write actions.
- Mailboxes, forwards, webmail launchers, and email deliverability checks.
- SQL database and database-user workflows with phpMyAdmin/Adminer launch paths.
- Backups, restore points, logs, metrics, repair checks, and update posture.
- Firewall and lockout safety guidance for admin and customer IPs.
- Theme selection: Light, Dark, Midnight, and official compiled runtime themes.
- Manual update route plus automatic FreeWebPanel update checks.

## Customer Panel

- Customer dashboard for websites, domains, files, mail, SQL, apps, billing, and support.
- Website management without SSH.
- File manager for public web roots.
- DNS and SSL visibility for owned domains.
- Email and mailbox management where enabled by the provider.
- Database workflows where enabled by the provider.
- Installers and app routes where enabled by the provider.
- Usage visibility for disk, websites, databases, mailboxes, backups, and traffic.

## Server Stack Direction

FreeWebPanel is designed to work as a practical Linux hosting stack, with installer lanes and future options for:

- Nginx and PHP-FPM hosting.
- Apache compatibility planning where needed.
- Reverse proxy and app routes.
- Open-source database and webmail tools.
- Security patch automation.
- Controlled updates that keep rollback pointers.
- ZeroMint AIOS and OpenZero AIOS compatibility wrappers.

## Install And Migration Lanes

- Ubuntu 24.04 LTS production install lane.
- Micro, small, and provider server profiles.
- RHEL-family preflight for AlmaLinux, RockyLinux, and related systems.
- ZeroMint AIOS / OpenZero AIOS install wrapper.
- Existing-panel replacement planning with preflight and backup confirmation.

## Public Repository Boundary

This GitHub repository is the public entry point. It includes install wrappers, documentation, public diagrams, and safe explanations. It does not publish private Pro modules, private theme source, signing keys, payment internals, license server internals, or production secrets.
