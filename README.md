# EnglishYaari Design

Design prototype for the EnglishYaari Admin console, built with **Vite** (single-page HTML/CSS/JS prototype).

- Font: [Urbanist](https://fonts.google.com/specimen/Urbanist) (Google Fonts)
- Brand colour: `#6D28D9`
- Sidebar colour: `#28253B` (`sidebar`)

## Screens

The app lives in `index.html` and routes with the URL hash:

- `/#call-audit` – Call logs (sales and support), filters, outcomes
- `/#learners-calls` – Learners' calls grouped by subscription
- `/#report-<id>` – Call report with player, scores and transcript
- `/#successful-calls` – Calls marked successful or failed
- `/#call-analytics` – Team call analytics

`/call-audit/` redirects to `/#call-audit`. All data is sample data inside `index.html`.

## Getting started

```bash
npm install
npm run dev     # start dev server
npm run build   # production build
```

CI (`.github/workflows/ci.yml`) runs `npm ci` and `npm run build` on every push and pull request to `main`.
