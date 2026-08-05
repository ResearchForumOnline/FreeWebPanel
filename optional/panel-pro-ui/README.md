# FreeWebPanel Pro UI overlay (safe)

Scoped enhancements for `/admin` and `/user` only.

## Safety rules
- Never inject DOM into React-managed trees (body only)
- Do not wrap `history.pushState` / `replaceState`
- Marketing/SEO pages stay unstyled by pro shell

## Features
- Gentle visual polish (sidebar, cards, buttons)
- Command palette: Ctrl/Cmd+K
- Owner automation strip (admin): PayPal / health / invoices

## Install
Copy files to `/assets/pro/` and link from `index.html` before `</head>` / `</body>`.
