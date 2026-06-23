# Theme Asset Protection

FreeWebPanel themes took serious design work. The public GitHub repository is therefore an installer and documentation entry point, not a complete public dump of private theme source.

## What Gets Installed

Installed servers receive the runtime assets needed to render the panel:

- Compiled JavaScript
- Minified CSS
- Public images/icons required by the panel
- `THEME-ASSET-LICENSE.txt`

These files are enough to run the admin and customer panels.

## What Does Not Ship Publicly

The public repository and release bundle should not include:

- Private React/TypeScript theme source
- Source maps
- Test/spec files
- Internal design drafts
- Pro theme modules
- Release signing keys
- Billing or license server internals

## Why It Cannot Be Perfectly Hidden

Any browser-rendered panel must send CSS and JavaScript to the browser. A determined person with panel access can inspect rendered CSS and JS. FreeWebPanel therefore protects the theme work by shipping only compiled runtime assets, keeping source private, preserving official trademarks, and controlling the official update and Pro channel through FreeWebPanel.com.

## Allowed Use

Server owners may use the installed themes as part of an official FreeWebPanel installation or update.

## Not Allowed

Users may not extract, resell, rebrand, redistribute, or package the official FreeWebPanel themes as a separate theme product or unofficial panel clone.

## Release Checks

Before publishing a release bundle, verify:

```bash
tar -tzf thcz-foundation-latest.tar.gz | grep -Ei '\.(map|test\.js|spec\.js|tsx?|tsbuildinfo)$|/src/'
```

The command should return no private source or source-map files.
