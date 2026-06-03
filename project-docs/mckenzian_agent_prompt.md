# McKenzian Solutions — Agent Build Prompt

Build the full McKenzian Solutions marketing website per project settings. Below are the page-by-page specs and feature requirements.

---

## Pages

### Home (`/`)

**Hero** — full viewport height, two columns (60/40 split):
- Left: Playfair Display heading ~80px: *"We turn complex data into decisions that move."* Subheading in DM Sans 18px muted. Two CTAs: `Explore Our Work` (ghost, cobalt border) and `Book a Strategy Call` (solid cobalt).
- Right: Animated SVG — slowly connecting network nodes or a minimal rendering line chart. No stock photos.
- Scroll indicator: pulsing chevron-down.

**Capabilities ticker** — full-width `--color-ink` background, white text, slow auto-scrolling marquee (pauses on hover):
`Research Databases · Biostatistics Processing · Rental Market Dashboards · Housing Analytics · Delivery Tracking · Custom Data Pipelines · Quantitative Research · Logistics Intelligence`

**Services cards** — two or three cards (white bg, 1px `--color-rule` border, sharp corners). Hover: border transitions to `--color-accent`. Cards: Data Analysis, Logistics, (optional) Custom Research.

**Trust band** — warm `--color-surface` bg. Four metric cards: `12+ Domains served` · `40+ Databases deployed` · `100% Client satisfaction` · `5 Avg. hours to first deliverable`. Below: two pull-quote testimonials (Playfair italic 22px, attribution in DM Sans below).

**Featured case study** — alternating image/text layout. One case study: name, two-sentence problem, bolded result metric, `Read Full Case Study →`.

**Pre-footer CTA** — `--color-ink` background. Centered Playfair 48px white heading: *"Ready to bring clarity to your data?"* Single CTA button. Micro-copy: *"No commitment. No pitch. Just a focused conversation about your problem."*

**Footer** — four columns: wordmark + tagline | service links | company links | contact. Bottom bar: copyright · Privacy · Terms. LinkedIn icon (SVG, no emoji).

---

### Services (`/services`)

Intro paragraph + two cards linking to detail pages. Each card: title, icon, 3-bullet benefit list, `Learn more →`.

---

### Data Analysis (`/services/data-analysis`)

1. Hero: *"From raw data to decisions"*
2. What we build — icon grid: research databases · biostatistics pipelines · housing/rental dashboards · custom analytics APIs
3. How we work — 4-step horizontal process diagram: `Discover → Architect → Build → Deliver`
4. Inline mini case study card (Case Study 2 — Academic Research Database)
5. CTA: Book a call

---

### Logistics (`/services/logistics`)

1. Hero: *"Every shipment, accounted for."*
2. What we build: delivery tracking dashboards · route optimization · fleet analytics · SLA alerting
3. How we work — same 4-step diagram
4. Inline mini case study card (Case Study 3 — Last-Mile Delivery Tracker)
5. CTA

---

### Work (`/work`)

Filterable card grid. Filter tabs: `All · Data Analysis · Logistics · Research`. Each card: project name, client type, domain badge (cobalt pill), two-sentence problem, bolded result metric, `Read case study →`. On hover: card reveals result metric with smooth CSS transition.

**Case study detail** (`/work/[slug]`):
- Hero: project name + one-line outcome
- Section: The Problem (2–3 paragraphs)
- Section: Our Approach (numbered steps)
- Section: The Result (large-type metric callouts + narrative)
- Inline CTA: *"Working on something similar? Let's talk."*

Include all three placeholder case studies with realistic consulting copy drawn from project settings.

---

### About (`/about`)

1. Founder block: circle avatar placeholder, name, 3-sentence bio (cross-domain expertise, analytical rigor, client-first)
2. Philosophy — 3 principles with icon + heading + 2-sentence explanation: *Precision over speed* · *Systems thinking* · *Client as partner*
3. Capabilities tag list (two columns): Python · R · SQL · PostgreSQL · PostGIS · React · D3.js · Node.js · dbt · pgvector · Leaflet · Tailwind
4. CTA

---

### Contact (`/contact`)

Two-column layout. Left: contact info + Calendly CTA (`Book a 30-min strategy call`). Right: React state form (no `<form>` tag) with fields: Name · Organization (optional) · Email · Service of interest (select) · Project description (textarea). Submit: POST or console.log with inline success/error state. Trust micro-copy below: *"Typical response within 24 hours. All conversations are confidential."*

---

## Features to implement

**Lead generation:**
- `Book a Call` always visible in nav (desktop) and sticky bottom bar (mobile)
- Exit-intent popup on desktop (cursor near top of viewport): email capture for "5-point data readiness checklist"
- Lead magnet micro-section on homepage: email input + button

**Analytics:**
- GA4 gtag.js in `index.html`, tracking `page_view` and `form_submit` events
- UTM parameter preservation on all outbound CTA links

**SEO (every page):**
- Unique `<title>` and `<meta name="description">`
- Open Graph tags: og:title, og:description, og:image
- `application/ld+json` Organization schema on homepage
- `sitemap.xml` in `/public`

**Accessibility:**
- Skip-to-content as first focusable element
- `aria-label` on all icon-only buttons
- Keyboard navigation with visible focus ring on all interactive elements

**Scroll animations:**
- `IntersectionObserver` for fade-up reveals (300ms, staggered children)
- Disabled when `prefers-reduced-motion` is set

---

## Definition of done

- [ ] All 7 pages render without errors on desktop and mobile
- [ ] Nav sticky, collapses mobile, CTA always visible
- [ ] Hero animation loads; pauses with `prefers-reduced-motion`
- [ ] All 3 case studies readable with result metrics
- [ ] Contact form validates and shows success/error state
- [ ] Lighthouse: Performance ≥ 90 · Accessibility ≥ 90 · SEO ≥ 90
- [ ] WCAG AA contrast passes on all text
- [ ] OG tags and LD+JSON on homepage
