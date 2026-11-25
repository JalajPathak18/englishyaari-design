# EnglishYaari Design

Design prototype for the EnglishYaari Admin console, built with **React + Vite + Tailwind CSS v4**.

- Font: [Urbanist](https://fonts.google.com/specimen/Urbanist) (self-hosted via `@fontsource-variable/urbanist`)
- Brand colour: `#6D28D9` (`brand`, with `brand-50` … `brand-900` shades)
- Sidebar colour: `#28253B` (`sidebar`)

## Screens

- **Call Audit** – review tutor–learner calls, filter by status, and inspect score, AI flags, rubric checklist and transcript (mock data in `src/data/mockCalls.js`).

## Getting started

```bash
npm install
npm run dev     # start dev server
npm run build   # production build
```

CI (`.github/workflows/ci.yml`) runs `npm ci` and `npm run build` on every push and pull request to `main`.
