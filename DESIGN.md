# Ajuni — Design System & Site Architecture

A reference document for designers, engineers, and copywriters working on the
Ajuni marketing site. Covers brand foundations, design tokens, component
library, page architecture, motion, accessibility, and editorial guidelines.

> **Stack:** Vite + React 18, React Router v6, lucide-react, pure CSS with
> design tokens (no Tailwind, no CSS-in-JS).

---

## 1. Brand Foundations

### 1.1 Positioning

**Ajuni is the control plane for enterprise AI agents — born in India,
deployed globally.**

The product is built for regulated enterprises (banks, hospitals, governments,
manufacturers). India is the proof point — Parliament of India, DRDO,
HDFC Bank, Apollo, Cipla — but the platform is sold and deployed worldwide.

**Voice & tone**

- Confident, never boastful. Specific over generic.
- Short sentences. Real numbers. Named customers.
- "Pre-built agents in production in 4–8 weeks" beats "fast time to value."
- Acknowledge regulators by name (RBI, SEBI, HIPAA, GDPR, CERT-In) when relevant.
- Avoid: "revolutionary", "leveraging", "synergies", "unlock", "empower."

### 1.2 Logo

The official mark lives in **two SVG files** — both reference these directly,
do not redraw.

| File | Use |
|---|---|
| `/public/ajuni-mark.svg` | Mark only. Favicon, brand-only contexts, mega-menu featured panel, dark surfaces. |
| `/public/ajuni-wordmark.svg` | Mark + "ajuni" wordmark. Nav, footer, light surfaces. |

**Components** — wrap the assets so layout, alt text, and fallback are consistent:

- `<AjuniMark size={48} />` — loads `/ajuni-mark.svg` via `<img>`. Falls back to a styled placeholder square if the asset 404s (never to a different design).
- `<AjuniWordmark size={32} />` — loads `/ajuni-wordmark.svg`. Falls back to inline mark + serif "ajuni" text.

Both live in `src/components/Primitives.jsx`.

**Don't:**
- Recolor the gradient (purples are baked into the asset).
- Render the mark on top of busy imagery without a glass-pill backdrop.
- Use a hexagram or any other geometric stand-in.

---

## 2. Design Tokens

All tokens are CSS custom properties on `:root` in `src/styles/globals.css`.
**OKLCH everywhere** — no `#fff`, no `#000`. Every neutral is tinted toward
the brand hue (285°).

### 2.1 Color

**Brand**
```
--brand-h: 285               # OKLCH hue used to tint all neutrals
--accent:     oklch(0.50 0.24 285)
--accent-600: oklch(0.44 0.24 285)
--accent-100: oklch(0.94 0.04 285)
--accent-50:  oklch(0.97 0.02 285)
```

**Surfaces (light theme)**
```
--bg:        oklch(0.972 0.005 285)
--surface:   oklch(0.995 0.003 285)
--surface-2: oklch(0.985 0.005 285)
```

**Ink — never pure black**
```
--text:   oklch(0.20 0.045 285)
--text-2: oklch(0.42 0.030 285)
--text-3: oklch(0.60 0.020 285)
```

**Borders**
```
--border:        oklch(0.92 0.006 285)
--border-strong: oklch(0.84 0.010 285)
```

**Status**
```
--success: oklch(0.66 0.16 152)   # green
--warn:    oklch(0.78 0.14 78)    # amber
--danger:  oklch(0.62 0.21 25)    # red
```

**Dark zone (hero, footer, feature bands)**
```
--bg-dark:        oklch(0.16 0.045 285)
--bg-dark-2:      oklch(0.21 0.060 285)
--text-on-dark:   oklch(0.97 0.008 285)
--text-on-dark-2: oklch(0.97 0.008 285 / 0.72)
--accent-on-dark: oklch(0.78 0.14 285)
```

**Dark theme** — opt-in via `<html data-theme="dark">` (set by a no-flash script in `index.html`). All tokens above are re-bound under `[data-theme="dark"]`. The user toggle lives in the nav; choice persists in `localStorage`.

### 2.2 Typography

**Families**
- **Inter** — body, UI, headings (weights 400, 500, 600, 700, 800)
- **Instrument Serif (italic)** — accent words inside H1/H2 (`<span class="serif">`); brand wordmark
- **Menlo** — `code` elements and `font-variant-numeric: tabular-nums` displays via `.tabular`

**Type scale (clamp-fluid)**
| Use | Class | Size |
|---|---|---|
| Display H1 (hero) | inline | `clamp(36px, 5vw, 64px)` line 1.05 |
| Section H2 | `.section-h` | `clamp(32px, 4.4vw, 56px)` line 1.04 |
| Body lede | `.lede` | 17–18px line 1.6 |
| Body | base | 14–15px line 1.55 |
| Eyebrow | `.section-tag` | 11.5px uppercase, 0.06em tracking, 600 |
| Caption | varies | 11–12.5px, color `--text-3` |

**Letter-spacing convention** — tighten as type gets bigger. H1 = `-0.032em`. Eyebrows = `+0.06em`.

**Tabular numerals** — apply `.tabular` to any number that ticks or compares (counters, prices, latencies). Uses `font-feature-settings: "tnum", "cv11"`.

### 2.3 Spacing & Layout

```
--space-section-tight: 64px
--space-section:       96px
--space-section-wide:  128px
```

Not a uniform scale — variation creates rhythm. Use `--section-tight` for FAQ/marquee, `--section` for default, `--section-wide` for the hero.

**Containers**
- `.container` — `max-width: 1240px; padding: 0 24px`
- `.section-inner` — `max-width: 1180px` for content within `.section`
- `.section-head` — `max-width: 720px; text-align: center`

### 2.4 Radii

```
--r-sm: 8px    # buttons, pills, small inputs
--r-md: 12px   # cards, mock chrome
--r-lg: 16px   # mega menu, panels
--r-xl: 24px   # hero card, large feature cards
```

### 2.5 Shadows

**Tinted toward ink, not black.** Tighter scale than typical SaaS.

```
--shadow-xs: subtle 1px line — sticky-nav drop, focus rings
--shadow-sm: minimal lift — input focus, mega menu items
--shadow-md: cards on hover
--shadow-lg: floating panels (mega menu open, modals)
--shadow-purple: signature brand glow (primary CTA, featured cards)
```

### 2.6 Motion

**Easing — exponential ease-outs, no bounce.**

```
--ease-out:      cubic-bezier(0.22, 1, 0.36, 1)   # ease-out-quart
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)
```

**Durations**
```
--dur-fast: 140ms   # hover, focus
--dur-base: 220ms   # most state changes
--dur-slow: 360ms   # entry/exit on big surfaces
```

**Honor `prefers-reduced-motion`.** A media-query block in `globals.css` collapses every animation to ~0 duration.

---

## 3. Component Library

### 3.1 Buttons

| Class | Use | Min height |
|---|---|---|
| `.btn-primary` | Primary action on light surfaces | 40px |
| `.btn-on-dark` | Primary action on dark surfaces | 48px |
| `.btn-outline` | Secondary action on light surfaces | 44px |
| `.btn-outline-dark` | Secondary action on dark surfaces | 48px |
| `.btn-ghost` | Tertiary (e.g. "Sign in") | 40px |
| `.btn-large` | Increase any of the above | 48px |

**Touch target ≥ 40px** on every variant. Arrow icons inside buttons get a `translateX(3px)` nudge on hover.

**Magnetic CTAs** — wrap a button in `<Magnetic>` to add a subtle pull-toward-cursor effect on the hero. Disabled under reduced motion + on coarse pointers (touch devices).

### 3.2 Sections

```jsx
<section className="section">
  <div className="section-inner">
    <Reveal className="section-head">
      <span className="section-tag">Eyebrow</span>
      <h2 className="section-h">Headline <span className="serif">accent.</span></h2>
      <p className="section-sub">Lede paragraph.</p>
    </Reveal>
    {/* content */}
  </div>
</section>
```

Modifiers: `.section-tight`, `.section-wide`.

### 3.3 Reveal & Counters

- `<Reveal delay={120}>` — IntersectionObserver-based opacity + translateY entry.
  Failsafe at 1.5s in case IO never fires (slow JS, headless tools).
- `useReveal()` — base hook returning `{ ref, visible }` for custom transitions.
- `useCounter(target, duration?, decimals?)` — animated number ticker tied to `useReveal`. Returns `{ ref, display }` formatted with `en-IN` locale.
- `<ScrollProgress />` — 2px solid bar at top of viewport.
- `<ScrollToTop />` — scrolls to top on route change.
- `useParallax(factor)` — translates ref Y by `factor * scrollY` using rAF.
- `useSpotlight()` — tracks mouse over wrapped element; sets `--mx` / `--my` so a `.spotlight::after` radial gradient follows the cursor. Used on the hero + final CTA.
- `useTheme()` — returns `{ theme, setTheme, toggle }` for the dark-mode switch.

### 3.4 Nav (Mega Menu)

`src/components/Nav.jsx`. Three triggers — **Solutions**, **Platform**, **Resources** — each opens a rich panel.

**Architecture**
- Sticky on scroll; tinted background at `oklch(0.972 0.005 285 / 0.92)` with `backdrop-filter: blur(8px)` once `scrolled` state is true.
- Mega panels are absolutely positioned children of `.nav-trigger`, centered with `left: 50%; transform: translateX(-50%)`.
- An invisible `::before` bridge (10px above the panel) prevents the cursor from hitting the dim scrim while crossing the visual gap.
- A `mega-scrim` (`position: fixed; inset: 0; z-index: 49`) softly dims the page underneath when any menu is open.
- A 140ms grace timer on `header.onMouseLeave` lets the user dart from trigger to panel without losing hover.

**Solutions panel** — tab between *Industry* / *Function*. Hovering a card updates a **live preview pane** on the right (no remount — content swaps inline so the scale-in animation doesn't re-fire). Customer logo strip at the bottom.

**Platform panel** — three groups (Build / Govern / Run) with module cards on the left, dark featured callout on the right (mark + serif wordmark + "Explore platform" CTA + 3 feature pills).

**Resources panel** — two columns (Learn / Trust) with link rows + "Customer spotlight" card.

**CSS gotcha already fixed:** `min-width: 0` on grid children so `white-space: nowrap` taglines don't blow out columns.

### 3.5 Cards

| Class | Use |
|---|---|
| `.shb-card` | Solutions bento (Industry tab on Home) |
| `.shf-card` | Solutions function card (Function tab on Home) |
| `.mod-card-rich` | Platform module card |
| `.cs-card`, `.cs-quote-card` | Case-study index |
| `.csd-related-card` | Related-content cards on case-study detail |
| `.trust-card` | Security pillars |

**Hover convention** — `border-color: var(--accent)`, `transform: translateY(-2px)`, `box-shadow: var(--shadow-md)`.

### 3.6 Hero Mock Dashboard

`HeroMock` in `src/pages/Home.jsx`. Live-feeling product demo, not a screenshot.

- **Live pill** in the chrome bar with a pinging dot.
- **Counter stats** (`<LiveStat>`) tick up on scroll using `useCounter`.
- **Activity feed** — `FEED_EVENTS` pool. A new entry slides in every 3.2s with `feedSlide` + `feedGlow` keyframes. Hovering the dashboard pauses the loop.
- **AI panel** at the bottom — clicking "Approve & route" flips state, swaps the message to a confirmation, and fires a green flash (`aiApproveFlash` keyframe).

---

## 4. Site Architecture

### 4.1 Routes

| Path | Page | File |
|---|---|---|
| `/` | Home | `pages/Home.jsx` |
| `/platform` | Platform overview | `pages/Platform.jsx` |
| `/agents` | Agent roster (filterable) | `pages/Agents.jsx` |
| `/industries/:slug` | Industry deep-dive | `pages/Industry.jsx` |
| `/functions/:slug` | Function deep-dive | `pages/Function.jsx` |
| `/modules/:slug` | Platform module page | `pages/Module.jsx` |
| `/pricing` | Pricing + ROI calculator | `pages/Pricing.jsx` |
| `/security` | Security + global deployment map | `pages/Security.jsx` |
| `/customers` | Customer logos | `pages/Customers.jsx` |
| `/case-studies` | Case study library | `pages/CaseStudies.jsx` |
| `/case-studies/:slug` | Case study detail | `pages/CaseStudy.jsx` |
| `/integrations` | Integration directory | `pages/Integrations.jsx` |
| `/about` | About | `pages/About.jsx` |
| `/contact` | Contact form | `pages/Contact.jsx` |
| `/resources` | Resource library | `pages/Resources.jsx` |
| `/privacy`, `/terms`, `/dpa`, `/cookies` | Legal | `pages/Legal.jsx` |
| `*` | 404 | `pages/NotFound.jsx` |

**Slugs**

- Industries: `bfsi`, `healthcare`, `government`, `retail`, `manufacturing`, `it-saas`
- Functions: `sales`, `marketing`, `hr`, `support`, `finance`, `procurement`

### 4.2 Inner page template

Every inner page opens with the same dark hero (`.inner-hero`):

```jsx
<section className="inner-hero">
  <div className="inner-hero-grid" aria-hidden="true" />
  <div className="hero-orbs" aria-hidden="true">
    <div className="orb orb-1" />
    <div className="orb orb-3" />
  </div>
  <div className="inner-hero-inner">
    <div className="crumbs">
      <Link to="/">Home</Link><span>/</span>
      <span style={{ color: "var(--text-on-dark)" }}>Page name</span>
    </div>
    <h1>Headline <br /><span className="serif">accent.</span></h1>
    <p className="lede">Lede paragraph.</p>
  </div>
</section>
```

**TODO** — per-page accent tints (Pricing → green, Security → red/steel, Industries → industry color from `industryAccent` map). Currently every inner hero looks the same.

### 4.3 Content data

All marketing copy lives in **`src/data/content.js`** — never inline JSX.

Exports:
- `INDUSTRIES`, `FUNCTIONS`, `AGENTS`, `MODULES`, `INTEGRATIONS`
- `CUSTOMERS` (string array)
- `TESTIMONIALS` (real, attributed quotes)
- `CASE_STUDIES` (slug + status: `testimonial` or `logo` — never `published` until backed by a real story)
- `DEPLOYMENT_REGIONS` (factual cloud-region availability for the world map)
- `PRICING`

**Honesty rule** — never invent a customer story, metric, or quote. New case studies go in as `status: "logo"` with a "Request the deck" CTA until real content lands.

---

## 5. Page-Specific Notes

### 5.1 Home

Sections in order: `Hero` → `Marquee` → `StatsBand` → `SolutionsHome` → `ModulesSection` → `How` → `Comparison` → `Carousel` → `FAQ` → `FinalCTA`.

- **Rotator** — measures the active word's width and animates the wrapper; the comma stays glued to the right edge of the word.
- **SolutionsHome** has a featured BFSI bento card with a fake "loan underwriting" mock; other industries are rich cards.
- **Comparison** lists Ajuni vs Lyzr / Kore.ai / "Generic AI" across 8 dimensions. Update both the row label and the cell whenever positioning shifts.

### 5.2 Pricing — ROI Calculator

Section ID `#roi`. Five-currency selector (₹ / $ / € / £ / AED). Four sliders:

1. Tasks per month (100 – 50,000)
2. Minutes per task today (2 – 120)
3. Fully-loaded hourly cost (per-currency default, ±6×)
4. % Ajuni handles autonomously (30 – 95)

Outputs:
- Headline net monthly saving (gradient text)
- Yearly saving
- Hours returned to the team
- Payback months on the Business plan
- Side-by-side cost bar (Today vs With Ajuni)

The math is illustrative — every panel ends with a "talk to us for a tailored model" disclaimer.

### 5.3 Security — Global Deployment Map

Stylised SVG continents (1000×540 viewBox) with pulsing region dots from `DEPLOYMENT_REGIONS`. Hovering a dot updates the side panel (city, country, providers, region code). A dotted line connects the selected region to all others. A pill-strip below mirrors the dots for keyboard / touch users.

**Adding a region** — edit `DEPLOYMENT_REGIONS` in `data/content.js`. Coordinates are in the SVG's 1000×540 space.

### 5.4 Case Studies

Index page: real testimonials at the top, then all customers as cards with status tags (`Read story` for `testimonial`, `Request deck` for `logo`).

Detail page (`/case-studies/:slug`):
- If status is `testimonial`, renders the quote block + "Request the full case study" note.
- Otherwise renders the "Case study in production" placeholder + related-content cards.

---

## 6. SEO & Performance

`index.html` ships with:

- Full Open Graph + Twitter Card meta tags (image references `/og-image.svg`).
- Two JSON-LD blocks: `Organization` and `SoftwareApplication`.
- `theme-color` for both light and dark schemes.
- Font preconnect + preload.
- A no-flash inline script that reads `localStorage["ajuni-theme"]` (or `prefers-color-scheme`) and sets `<html data-theme>` before paint.

Static assets in `/public`:
- `ajuni-mark.svg` — favicon + Apple touch icon
- `ajuni-wordmark.svg` — used by `<AjuniWordmark>`
- `og-image.svg` — 1200×630 share preview
- `site.webmanifest` — PWA manifest
- `robots.txt`, `sitemap.xml`

**Known to-dos** — convert `og-image.svg` to PNG for LinkedIn/Slack, add JSON-LD `FAQPage` to security/pricing pages, code-split routes with `React.lazy`.

---

## 7. Accessibility

- **Focus visible** — 2px accent outline with 3px offset, 6px radius.
- **Reduced motion** — global media-query collapses durations; `useParallax`, `useSpotlight`, `Magnetic` all early-return.
- **Coarse-pointer detection** — `Magnetic` and `useSpotlight` skip on touch devices.
- **Touch targets** — all buttons ≥ 40px min-height.
- **`aria-hidden`** on decorative SVGs (orbs, grid, brand mark inside wordmark).
- **`aria-expanded`** on mega-menu trigger buttons.
- **`aria-live="polite"`** on the hero rotator.
- **Escape key** closes mega menus and the mobile drawer.

**TODO** — skip-to-content link, focus trap in mobile drawer, audit `<h1>` count per page.

---

## 8. Editorial Checklist

Before pushing copy changes:

- [ ] No "Indian enterprises" without a global counterpart phrase nearby.
- [ ] Customer name in any claim must appear in `CUSTOMERS` or `TESTIMONIALS`.
- [ ] Numbers: include unit and basis ("4–8 weeks", "84% auto-resolution").
- [ ] No invented metrics. If unverified, frame as "typical" or "indicative."
- [ ] H1: one per page. H2: section heads. H3: subsections.
- [ ] Italic accent in display headings uses `<span class="serif">`, never CSS-italic Inter.

---

## 9. Where to find things

```
ajuni-app/
├── index.html              # Meta tags, JSON-LD, no-flash theme script
├── public/
│   ├── ajuni-mark.svg          # Brand mark (favicon)
│   ├── ajuni-wordmark.svg      # Mark + wordmark
│   ├── og-image.svg            # Social share preview
│   ├── site.webmanifest, robots.txt, sitemap.xml
├── src/
│   ├── App.jsx                  # Router
│   ├── styles/globals.css       # Tokens, base, primitives, .spotlight, .magnetic
│   ├── data/content.js          # All marketing copy + structured data
│   ├── components/
│   │   ├── Primitives.jsx       # AjuniMark/Wordmark, Reveal, useParallax,
│   │   │                        # useSpotlight, useTheme, Magnetic, useCounter
│   │   ├── Nav.jsx + .css       # Sticky nav + mega menus + theme toggle
│   │   ├── Footer.jsx + .css
│   │   └── Widgets.jsx + .css   # Cookie banner, chat, scroll-top
│   └── pages/
│       ├── Home.jsx + .css      # Landing
│       ├── Inner.css            # Shared inner-page styles + ROI + map
│       ├── CaseStudies.jsx      # Case study index
│       ├── CaseStudy.jsx        # Case study detail
│       ├── CaseStudies.css      # Case study styles
│       └── ... (one per route)
└── DESIGN.md               # This document
```
