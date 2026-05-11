# Ajuni — Enterprise AI Agent Platform

Multi-page React marketing site for Ajuni (a Webority Technologies product).

## Stack

- **Vite + React 18** (no SSR, fast dev experience)
- **React Router v6** for client-side routing
- **lucide-react** for icons
- **Pure CSS** with design tokens (no Tailwind, no CSS-in-JS) — easy for any frontend dev to pick up

## Setup

```bash
cd ajuni-platform
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Routes

| Route                       | Page                       |
| --------------------------- | -------------------------- |
| `/`                         | Home                       |
| `/platform`                 | Platform deep dive         |
| `/agents`                   | Agent roster (filterable)  |
| `/industries/:slug`         | Industry pages (6 slugs)   |
| `/functions/:slug`          | Function pages (6 slugs)   |
| `/pricing`                  | Pricing                    |
| `/security`                 | Security & compliance      |
| `/customers`                | Customer logos & quotes    |
| `/integrations`             | Integration directory      |
| `/about`                    | About                      |
| `/resources`                | Resource library           |
| `/contact`                  | Contact form               |
| `*`                         | 404                        |

### Industry slugs
`bfsi`, `healthcare`, `government`, `retail`, `manufacturing`, `it-saas`

### Function slugs
`sales`, `marketing`, `hr`, `support`, `finance`, `procurement`

## File structure

```
src/
├── App.jsx              — Router with all routes
├── main.jsx             — React entry
├── styles/
│   └── globals.css      — Design tokens, base styles, primitives
├── data/
│   └── content.js       — All marketing copy (industries, agents, etc.)
├── components/
│   ├── Primitives.jsx   — Mark, Reveal, ScrollProgress, hooks
│   ├── Nav.jsx + .css   — Top nav with mega-menus
│   ├── Footer.jsx + .css
│   └── Widgets.jsx + .css — Cookie, chat, scroll-top
└── pages/
    ├── Home.jsx + .css  — Landing page
    ├── Inner.css        — Shared inner-page styles
    ├── Platform.jsx
    ├── Agents.jsx
    ├── Industry.jsx     — Dynamic via :slug
    ├── Function.jsx     — Dynamic via :slug
    ├── Pricing.jsx
    ├── Security.jsx
    ├── Customers.jsx
    ├── About.jsx
    ├── Contact.jsx
    ├── Integrations.jsx
    ├── Resources.jsx
    └── NotFound.jsx
```

## Editing content

All marketing copy lives in `src/data/content.js`. Edit there, not in JSX.
Update the brand color in `src/styles/globals.css` (`--accent` token).

## Production notes for the dev team

1. **Cookie consent** uses in-memory `useState`. Swap to `localStorage('ajuni_cookie_consent')` per the brand spec.
2. **Chat widget** has a hand-rolled local responder. Wire to your real AI endpoint.
3. **Newsletter form** in footer doesn't POST anywhere yet. Connect to your ESP.
4. **Contact form** logs locally only. Wire to CRM (Salesforce, HubSpot, Apollo) or your inbound API.
5. **Logo** — replace `<AjuniMark />` SVG inside `src/components/Primitives.jsx` with the export from your Figma file. Used everywhere via that single component.
6. For deployment behind a CDN with SPA routing, configure server fallback to `index.html`.
