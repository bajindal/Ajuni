# Overnight changelog

High-level summary of everything I touched while you were asleep, with file
pointers so you can spot-check or revert any single change.

## TL;DR

- **8 new module detail pages** at `/modules/:slug` (Agent Studio, Orchestration, Knowledge Base, Knowledge Graph, Hallucination Manager, Responsible AI, Observability, Audit Trail)
- **4 new legal pages** at `/privacy`, `/terms`, `/dpa`, `/cookies` (these used to 404 — they were linked from the footer fineprint with no destination)
- **Subtle motion added** across hero, cards, nav, and brand mark — all kept professional and low-key (no bounce, no flashy effects)
- **Bug fix**: cards on Platform and Resources pages had ~60% empty space because of a global `min-height: 360px` I'd added earlier for richer agent cards. Now scoped only to cards that have the rich content
- **Build status**: production build passes in ~1.8s, 14.4 kB gzipped CSS, 93.6 kB gzipped JS, 0 errors
- **All 24 routes** screenshotted, 0 runtime errors

## What changed, in detail

### 1. Module detail pages (NEW)

8 dedicated pages, one per platform module:

| URL | Module |
|---|---|
| `/modules/agent-studio` | Agent Studio |
| `/modules/orchestration` | Orchestration |
| `/modules/knowledge-base` | Knowledge Base |
| `/modules/knowledge-graph` | Knowledge Graph |
| `/modules/hallucination-manager` | Hallucination Manager |
| `/modules/responsible-ai` | Responsible AI |
| `/modules/observability` | Observability |
| `/modules/audit-trail` | Audit Trail |

Each page has:
- Dark inner-hero with crumbs (Home / Platform / [Module]), an icon-tile + layer-tag eyebrow ("LAYER 1 · BUILD" etc.), big "[Name]." h1 with serif period, tagline lede, two CTAs
- Two-col overview: long-form copy on the left + dark stat card on the right with metric + "Plays nicely with" integration pills
- 4-feature grid with serif italic 01/02/03/04 numbers, name, and 1–2 sentence description per feature
- "Where [Module] earns its keep" use-case pill row (3 use cases per module)
- "The rest of the platform" rich-card grid (other 3 modules, links to their pages)
- Final dark CTA with "Ship [module] into production." headline

Files touched:
- `src/data/content.js` — `MODULES` enriched with `slug`, `layer`, `tagline`, `longDesc`, `features` (4 each), `useCases` (3 each), `integrations` (4 each), `metric: { n, l }`
- `src/pages/Module.jsx` — NEW (190 lines)
- `src/App.jsx` — added `<Route path="/modules/:slug" element={<Module />} />`
- `src/pages/Platform.jsx` — module cards now `<Link to={/modules/${m.slug}}>` with the richer agent-card-page treatment (icon + layer pill + name + tagline + description + metric block + arrow CTA)
- `src/pages/Inner.css` — added `.module-hero-eyebrow`, `.module-features`, `.module-feature`, `.module-feature-num`, `.module-cases` etc.

### 2. Legal pages (NEW)

Single `Legal.jsx` component handling 4 routes via `useLocation()`. Each variant has:
- Title with serif italic suffix ("Privacy *Policy.*", "Terms of *Service.*", "Data Processing *Addendum.*", "Cookie *Policy.*")
- Effective-date tag in the eyebrow
- Tailored lede paragraph
- 5–6 substantive sections with concrete content (DPDP / GDPR aware, Indian-jurisdiction governing law, sub-processor reference at /trust-center, sensible retention defaults, breach notification within 24 hours, etc.)
- Footer card with `legal@ajuni.ai` mailto + "Talk to us" CTA

Content is **realistic legal scaffolding**, not boilerplate Lorem Ipsum. Have your legal counsel review before going live — I wrote it to be defensible but it's not a substitute for advice.

Files touched:
- `src/pages/Legal.jsx` — NEW (~160 lines, content + render)
- `src/App.jsx` — added 4 routes (`/privacy`, `/terms`, `/dpa`, `/cookies`) all pointing at `<Legal />`
- `src/pages/Inner.css` — added `.legal-inner`, `.legal-section`, `.legal-foot` styles

### 3. Cards-blank-space fix

**Bug**: Earlier in the session I'd given `.agent-card-page` a `min-height: 360px` so the redesigned agent cards (with capability bullets + metric block + arrow) felt substantial. But the SAME class is used on Platform.jsx (8 module cards), Resources.jsx, and Customers.jsx (testimonials) — those cards only have `icon + h4 + p` and were left with ~60% empty space.

**Fix**: scoped the min-height with `:has()`:
```css
.agent-card-page:has(.acp-caps),
.agent-card-page:has(.acp-foot) {
  min-height: 360px;
}
```
Cards with capabilities or a metric block keep their tall height. Sparse cards (Platform modules pre-link) collapse to natural content height. Verified visually on `/platform` and `/resources`.

File: `src/pages/Inner.css`.

### 4. Subtle motion (NEW)

Added four low-key motion bits, all transform/opacity-based and reduced-motion-safe:

- **Hero grid drift**: the `.hero-grid` (and `.inner-hero-grid` on inner pages) background pattern slowly drifts diagonally. Loop is 24-28s, exactly one grid cell so it's seamless.
- **Card hover shimmer**: a diagonal light sweep crosses `.agent-card-page` and `.rich-card` once on hover (1.1s ease-out). Catches the eye without being noisy.
- **Nav link underline draw**: `.nav-link` and `.nav-link-btn` now have an `::after` underline that animates `scaleX(0) → scaleX(1)` from the left on hover or active. 1.5px height, accent color.
- **Brand mark hover treatment**: the AjuniMark in the nav now `rotate(60deg) scale(1.05)` with a stronger drop-shadow on hover (existing 60° rotation kept but slowed and softened with a glow).

New keyframes in `src/styles/globals.css`: `gridDrift`, `cardSweep`, `markPulse` (latter is defined but not yet wired — I left it for future use).

Files touched:
- `src/styles/globals.css` — new keyframes
- `src/pages/Home.css` — `.hero-grid { animation: gridDrift 24s linear infinite }`
- `src/pages/Inner.css` — `.inner-hero-grid` animation, card-shimmer pseudo-elements on `.agent-card-page` and `.rich-card`
- `src/components/Nav.css` — link underline `::after`, brand-mark hover

### 5. Footer Platform column updated

The Platform column had two awkward links (Modules → /platform was redundant; API docs → /resources was a stub). Replaced with two real module links so users can drill into the highest-traffic ones directly:

Before:
```
Overview, Agents, Modules, Integrations, Security, Pricing, API docs
```
After:
```
Overview, Agents, Agent Studio, Audit Trail, Integrations, Security, Pricing
```

File: `src/components/Footer.jsx`.

### 6. AjuniMark SVG enhancement

You said the logo was missing wow factor. The mark was a simple 2-facet hexagram. I bumped it to **4 visible facets per arm** for proper impossible-figure depth:
- Top crown ribbon (brightest, catches the light)
- Lit front face (right flank, main body of the arm)
- Shadow side face (left flank, receding plane)
- Underbelly (deepest shadow at the inner notch)

Plus a soft Gaussian glow filter on the whole mark, a specular crease along each arm's spine, an outer-edge rim highlight, and a small tip catchlight circle. All gradients use 3-stop curves for richer transitions.

The `AjuniWordmark` component now also tries to load `/ajuni-wordmark.png` first and falls back to the inline SVG via `onError`. **If you save the wordmark image as `ajuni-app/public/ajuni-wordmark.png` it'll just appear automatically** — no code change needed.

File: `src/components/Primitives.jsx`.

## Routes audit (orphan check)

All 11 page components now have routes, plus 8 module pages and 4 legal pages = **24 routes total**, all reachable. Footer fineprint links no longer 404.

| Route | Page file | Linked from |
|---|---|---|
| `/` | Home | nav brand, footer brand |
| `/platform` | Platform | nav, footer Platform col |
| `/agents` | Agents | nav, footer Platform col |
| `/industries/:slug` (×6) | Industry | footer Industries col, /customers, /home |
| `/functions/:slug` (×6) | Function | footer Functions col, /home |
| `/modules/:slug` (×8) | Module *(new)* | /platform module cards, footer Platform col, related-module cards on each detail page |
| `/pricing` | Pricing | nav, footer Platform col |
| `/security` | Security | nav, footer Platform col + fineprint |
| `/customers` | Customers | nav, footer Resources col + Company col |
| `/about` | About | footer Company col |
| `/contact` | Contact | nav CTA, footer brand block, Book-a-demo buttons everywhere |
| `/resources` | Resources | footer Resources col (multiple sub-items all land here) |
| `/integrations` | Integrations | footer Platform col |
| `/privacy` | Legal *(new)* | footer fineprint |
| `/terms` | Legal *(new)* | footer fineprint |
| `/dpa` | Legal *(new)* | footer fineprint |
| `/cookies` | Legal *(new)* | footer fineprint |
| `*` | NotFound | catch-all |

## What I deliberately *didn't* do

- **`/trust-center`** — referenced from the legal copy but not built. Same with **`/trust-center/sub-processors`** and **`status.ajuni.ai`**. These are real things you'd build later; for now they're dangling references inside legal text, which is normal even on production sites.
- **AjuniWordmark PNG asset** — you wanted to use a custom wordmark image but I can't save the binary you pasted into chat. The component is wired to use `/ajuni-wordmark.png` if you drop the file there; until then it falls back to the SVG mark + serif "ajuni" text composition.
- **Real customer logos** — marquee/customers grid still uses initials-monogram tiles. Real logos need permissioned brand assets you'd source per customer.
- **Form submission backend** — the contact form does state-only "submit" and shows a success card. No server-side wiring, no email send. That's a backend change you'd do separately.
- **Em-dash sweep** — Impeccable bans em dashes and your copy uses them. I left them alone because rewriting copy is your call, not a polish task.

## How to verify

1. **Dev server**: `http://localhost:5175/` (it's been running the whole session, task ID `bw19xyx0a`). Hard-refresh with Ctrl+Shift+R if cached.
2. **Hit each new route**: `/modules/agent-studio` through `/modules/audit-trail`, plus `/privacy`, `/terms`, `/dpa`, `/cookies`. Check the layouts, scroll behavior, and link integrity (every page's "rest of the platform" cards should jump to other module pages).
3. **Screenshot reference**: I full-paged every route into `C:\Users\WB0196~1\AppData\Local\Temp\ajuni-screenshots\overnight\` — 24 PNG files. Pop them open if you want to review without clicking through the live site.
4. **Production build**: `npm run build` from `ajuni-app/`. Should complete in ~2s with 0 warnings, output to `ajuni-app/dist/`.

## File-change manifest

```
src/
├── App.jsx                                 [edit] new routes
├── data/content.js                         [edit] MODULES enriched
├── components/
│   ├── Footer.jsx                          [edit] Platform col links
│   ├── Nav.css                             [edit] motion + brand hover
│   └── Primitives.jsx                      [edit] AjuniMark SVG, AjuniWordmark fallback
├── pages/
│   ├── Module.jsx                          [NEW]  module detail page
│   ├── Legal.jsx                           [NEW]  privacy/terms/dpa/cookies
│   ├── Platform.jsx                        [edit] cards link to module pages
│   ├── Home.css                            [edit] hero-grid drift
│   └── Inner.css                           [edit] module styles, legal styles, motion, min-height fix
└── styles/globals.css                      [edit] new keyframes
```

That's the lot. Sleep well.
