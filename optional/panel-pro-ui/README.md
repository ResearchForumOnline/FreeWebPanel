# FreeWebPanel Pro UI overlay

Scoped dark admin/user shell enhancements for production FreeWebPanel.

## What it does

- Dark, dense, modern admin + end-user shell (cPanel-class density)
- Command palette: `Ctrl/Cmd+K`
- Owner automation strip on `/admin/*` (PayPal / health / invoices)
- **Does not** modify marketing SEO markup (meta, JSON-LD, robots, sitemap)

## Files

- `/assets/pro/fwp-pro-ui.css`
- `/assets/pro/fwp-pro-ui.js`
- Injected from `index.html` only as two tags before `</head>` / `</body>`

## Rollback

Restore previous `index.html` from `index.html.bak-ui-*` and remove `/assets/pro/`.
