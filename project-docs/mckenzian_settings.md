# McKenzian Solutions — Project Settings

## Brand

**Company:** McKenzian Solutions  
**Tagline:** Precision analysis. Decisive outcomes.  
**Services:** Data analysis (research databases, biostatistics, faceted literature catalogs) and logistics (offline-first courier ops portals).  
**Tone:** Confident, rigorous, direct. Never corporate-fluffy. Minimal adjective overload.  
**Aesthetic:** Refined minimalism with editorial gravitas. Modest 8–12px radius on cards and screenshots; tighter corners on buttons.

## Color system

```css
--color-ink:     #0F0F0F;
--color-surface: #F7F5F0;
--color-white:   #FFFFFF;
--color-accent:  #1A4FBF;   /* cobalt — primary CTA/links */
--color-accent-2:#B8960C;   /* muted gold — sparingly */
--color-muted:   #6B6B6B;
--color-rule:    #E2DFDA;
```

## Typography

- Headings: `"Playfair Display", serif`
- UI/body/nav: `"DM Sans", sans-serif`
- Data labels / code: `"JetBrains Mono", monospace`
- Load all from Google Fonts with `display=swap`.

## Stack

- React + Vite, functional components and hooks
- Tailwind CSS (or globals.css with CSS variables for non-Tailwind flows)
- React Router v6 (hash routing is fine for MVP)
- D3.js for charts/visualizations, Leaflet.js for maps
- No Next.js required

## File structure

```
/src
  /components     Nav, Footer, Button, SnapshotGallery, ContactForm, CapabilitiesTicker, HeroAnimation
  /pages          Home, Services, DataAnalysis, Logistics, Work, CaseStudy,
                  About, Contact, Privacy, Terms
  /data           caseStudies.js  services.js
  /styles         globals.css
  App.jsx  main.jsx
/public
  favicon.ico  og-image.png  sitemap.xml
index.html  vite.config.js  package.json
```

## Site map

```
/                       Home
/services               Services overview
/services/data-analysis Data Analysis detail
/services/logistics     Logistics detail
/work                   Case studies (filterable grid)
/work/[slug]            Case study detail (dynamic)
/about                  About
/contact                Contact + booking
/privacy                Privacy policy
/terms                  Terms of use
```

## Global standards (apply to every page)

- Sticky nav: transparent → white on scroll past 80px, 1px bottom border
- Nav CTA (`Book a Call`) always visible: pinned in nav desktop, sticky bottom bar mobile
- Modest radius (`--radius-card` 12px) on cards, images, and snapshot frames; buttons stay tighter (4px)
- `prefers-reduced-motion`: disable all animations
- Semantic HTML: `<header>` `<nav>` `<main>` `<section>` `<article>` `<footer>`
- Single `<h1>` per page, logical heading hierarchy
- WCAG AA color contrast on all text (≥ 4.5:1)
- All images: descriptive `alt`, `loading="lazy"`, explicit `width`/`height`
- All forms: associated `<label>`, no HTML `<form>` tag — use React state + fetch
- GA4 gtag.js snippet in `index.html`

## Shipped case studies (problem → approach → result)

Do not invent client quotes. Home proof metrics must come from these two products.

1. **Academic Research Catalog** — Production PubMed literature catalog with structured classification, faceted search, and calibration loops. 21k+ papers indexed; mean 92.2% holdout alignment; review cycles 12 hours → under 90 minutes. Public chrome: “Academic Research Catalog” only.

2. **Last-Mile Delivery Tracker (IAW-SAAS)** — Contract build for IAW Courier (Greater Sudbury / Northern Ontario). Offline-first React PWA: digital waybills, historical pickup chips, route-based pricing, POD signatures, dispatcher accounting. Result: ~$2,000/yr materials saved; data entry 25 → 5 hours/month. Snapshots from seeded synthetic data only — never live customer records.
