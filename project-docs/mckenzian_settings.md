# McKenzian Solutions — Project Settings

## Brand

**Company:** McKenzian Solutions  
**Tagline:** Precision analysis. Decisive outcomes.  
**Services:** Data analysis (research databases, biostatistics, housing/rental dashboards) and logistics (delivery tracking, route analytics).  
**Tone:** Confident, rigorous, direct. Never corporate-fluffy. Minimal adjective overload.  
**Aesthetic:** Refined minimalism with editorial gravitas.

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
  /components     Nav, Footer, Button, CaseStudyCard, MetricCard, ServiceCard,
                  ContactForm, CapabilitiesTicker, HeroAnimation
  /pages          Home, Services, DataAnalysis, Logistics, Work, CaseStudy,
                  About, Contact
  /data           caseStudies.js  services.js  testimonials.js
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
```

## Global standards (apply to every page)

- Sticky nav: transparent → white on scroll past 80px, 1px bottom border
- Nav CTA (`Book a Call`) always visible: pinned in nav desktop, sticky bottom bar mobile
- Sharp corners on all buttons (no border-radius) — signals precision
- `prefers-reduced-motion`: disable all animations
- Semantic HTML: `<header>` `<nav>` `<main>` `<section>` `<article>` `<footer>`
- Single `<h1>` per page, logical heading hierarchy
- WCAG AA color contrast on all text (≥ 4.5:1)
- All images: descriptive `alt`, `loading="lazy"`, explicit `width`/`height`
- All forms: associated `<label>`, no HTML `<form>` tag — use React state + fetch
- GA4 gtag.js snippet in `index.html`

## Placeholder content

**Testimonials:**
> "McKenzian rebuilt our property data pipeline from scratch. We went from weekly spreadsheet exports to a live dashboard we check every morning."  
> — Director of Operations, GTA Property Management Group

> "The literature database they built for our lab is the kind of thing we'd have waited 18 months for from an internal IT team. They had a working prototype in two weeks."  
> — Research Lead, Ontario Academic Consortium

> "Their delivery tracker gave us visibility we simply didn't have before. Exception rates dropped 22% in the first quarter."  
> — VP Logistics, Regional Distribution Operator

**Case studies (problem → approach → result):**

1. **Rental Market Dashboard** — Client needed real-time rental price trends across Hamilton. Built a PostGIS + PostgreSQL backend scraping 4 listing sources, with a React + D3.js choropleth dashboard. Result: 85% reduction in market research time; adopted as primary underwriting tool.

2. **Academic Research Database** — University lab managing 4,000+ papers with no cross-referencing. Built a Python ingestion pipeline (PDF parsing, pgvector semantic search) with a React faceted-search front-end and BibTeX export. Result: Literature review time cut from 12 hours to 90 minutes; adopted across 3 additional labs.

3. **Last-Mile Delivery Tracker** — Distributor losing visibility on 15–20% of deliveries post-handoff. Integrated 3 courier APIs, built a Node.js aggregation layer and real-time React dashboard with SMS/email alerting. Result: Exception visibility 30% → 97%; delivery-related complaints down 41%.
