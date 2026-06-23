# Licensing and Protection Model

FreeWebPanel uses an open-core model.

## Free Core

Free Core is the public entry point for hosting providers and server owners who want to install a modern Linux hosting control panel from GitHub or FreeWebPanel.com.

Free Core includes the public installer path, panel shell, account workflow, domain/DNS tools, file manager, security guidance, update lane, and the normal hosting controls required to start operating a server.

The Free Core repository is licensed under Apache License 2.0.

## What Is Not Granted By The Free Core License

The Apache License for Free Core does not grant rights to:

- Sell official FreeWebPanel licenses
- Claim to be the official FreeWebPanel vendor
- Use FreeWebPanel names, logos, trade dress, theme identity, or service marks in a misleading way
- Extract, resell, rebrand, or redistribute official FreeWebPanel themes as a separate product
- Distribute paid Pro modules as if they were Free Core
- Access private release signing keys, billing keys, vendor infrastructure, or support systems
- Bypass official Pro licensing, support, or update channels

## Official Commercial Channel

The official commercial channel is:

```text
https://freewebpanel.com/
```

Only FreeWebPanel.com is authorised to sell official FreeWebPanel Pro access, commercial licenses, paid support, managed update services, vendor support, and official branded services.

A server owner may install Free Core and host their own customers. They may not sell fake FreeWebPanel licenses or claim that unofficial modified builds are official FreeWebPanel releases.

## Theme Asset Boundary

The public GitHub repository is not a full source release of the private panel theme work. Official FreeWebPanel panel themes are delivered to installed servers as compiled/minified runtime assets only. Source maps, private React/TypeScript source, Pro theme modules, signing keys, and vendor release internals stay outside the public repository and install bundle.

Installed servers can run the official panel UI. They may not extract or resell the themes as a separate theme pack or unofficial panel clone.

## Copy Protection Reality

Public web software cannot be made impossible to copy, especially when an open-source core is published. Browser-delivered CSS and JavaScript can always be inspected by someone with access to the rendered panel. The practical protection model is:

- Keep Pro modules outside the public repository.
- Keep private theme source outside the public repository and release bundle.
- Ship minified production runtime assets without source maps.
- Strip test/spec/source-adjacent files from install and update bundles.
- Keep update signing keys and release credentials outside GitHub.
- Keep payment, license, and billing systems controlled by FreeWebPanel.com.
- Use official release checksums and staged updates.
- Keep FreeWebPanel trademarks and official vendor identity protected.
- Make official updates, support, and Pro features better than unofficial copies.

## Recommended Repository Boundary

Safe to publish here:

- Install wrapper
- Documentation
- Free Core public code
- Public test fixtures
- Public issue templates
- Security policy

Keep private or separately distributed:

- Pro module source
- Private theme source
- License server internals
- Private signing keys
- Payment provider credentials
- Customer data
- Hosted support tooling credentials
- Production server SSH keys
- Private deployment secrets

## Forks and Modified Builds

Forks must comply with the Apache License and must not misrepresent themselves as official FreeWebPanel releases. Modified builds should clearly identify that they are modified and unsupported by the official FreeWebPanel vendor unless a written commercial agreement says otherwise.
