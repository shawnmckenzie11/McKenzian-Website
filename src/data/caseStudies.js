export const caseStudies = [
  {
    slug: "rental-market-dashboard",
    title: "Rental Market Dashboard",
    client: "GTA Property Management Group",
    badge: "Data Analysis",
    category: "Data Analysis",
    summary: "Real-time rental price trends across Hamilton using scraped listing data.",
    outcome: "85% reduction in market research time, adopted as the client's primary underwriting tool.",
    metrics: [
      { value: "85%", label: "Research Time Saved" },
      { value: "4", label: "Scraped Sources" },
      { value: "10k+", label: "Listings Processed" }
    ],
    problem: `Our client, GTA Property Management Group, was manually monitoring rental market trends across Hamilton. Analysts spent over 12 hours a week browsing individual rental boards, copy-pasting listings, and compiled spreadsheets that were outdated before they could be used. This manual approach severely delayed their underwriting decisions, resulting in lost acquisition bids in a fast-paced market. They needed a consolidated, real-time platform to visualize localized price variations, historical appreciation, and inventory velocity.`,
    approach: [
      "Designed and deployed an automated scraping pipeline targeting four major listing platforms (Kijiji, Facebook Marketplace, PadMapper, and local property portals).",
      "Constructed a robust backend leveraging PostgreSQL with PostGIS extensions to geocode and index listings into localized neighborhood boundaries.",
      "Developed a custom data deduplication algorithm to prevent multi-listed properties from skewing the market averages.",
      "Built a highly interactive React front-end using D3.js to render an interactive map and temporal pricing charts."
    ],
    result: `The automated pipeline now scrapes, geocodes, and updates over 10,000 active rental records daily. By introducing dynamic neighborhood averages, GTA Property Management reduced their acquisition underwriting time from 12 hours to less than 90 minutes. The dashboard is now displayed on their operations floor and serves as their primary tool for underwriting all property acquisitions and pricing models.`
  },
  {
    slug: "academic-research-database",
    title: "Academic Research Catalog",
    client: "Biomedical Research Consortium",
    badge: "Research",
    category: "Research",
    summary: "Production PubMed literature intelligence — node-based classification, faceted search, and RL calibration loops.",
    outcome: "11/11 golden-endpoint guard passes; mean 92.2% holdout alignment; literature review cycles cut from 12 hours to under 90 minutes.",
    metrics: [
      { value: "21k+", label: "Papers Indexed" },
      { value: "92.2%", label: "Mean Holdout Alignment" },
      { value: "11/11", label: "Golden Guard Pass Rate" }
    ],
    problem: `A biomedical research consortium was managing an expanding corpus of PubMed literature with no centralized indexing, no auditable classification pipeline, and no quality gates on extracted metadata. Graduate researchers spent up to 12 hours per literature review manually searching scattered exports, extracting study characteristics by hand, and cross-referencing citations. At scale, manual review was unsustainable — duplicate efforts accumulated and clinical report submissions were delayed.`,
    approach: [
      "Built an automated PubMed harvest pipeline with a Node 0–2C decision tree routing papers through relevance gating, secondary literature detection, and clinical / in vivo / in vitro extraction tiers.",
      "Deployed a hybrid Maude deterministic classifier with Claude LLM and PDF-tier fallback for ambiguous records, with sub-threshold papers routed to an expert review queue rather than silently accepted.",
      "Architected Fly Postgres production storage with FTS5/BM25 full-text search, expert field locking, and per-record build-ID traceability.",
      "Implemented three closed-loop learning systems: subnode calibration (Loop A), golden-endpoint RL across 78 holdout endpoints (Loop B), and a manual edit cycle harvesting expert-drawer corrections between scheduled batches.",
      "Gated every production push with blast-radius analysis and cohort validation to quantify field-level impact and routing changes before deployment.",
      "Delivered a faceted search dashboard enabling instantaneous filtering by exposure method, species, outcome domain, and 28+ structured extraction fields."
    ],
    result: `The Academic Research Catalog is deployed in production on Fly.io, indexing 21,000+ PubMed papers. Eleven golden-endpoint calibration cycles completed with a 100% guard pass rate, achieving 90.0–100.0% batch alignment (mean 92.2%) against expert-validated holdouts. The flagship endpoint reached 100% alignment after three guard iterations, pushing 486 classification deltas with a +78 cohort routing improvement on a 1,420-paper validation pool. Researchers cut literature compilation cycles from 12 hours to under 90 minutes, and the platform was adopted across additional consortium laboratories within the same semester.`,
    liveDemoUrl: "https://paperscraper.mckenzian.com",
    reportUrl: "https://shawnmckenzie11.github.io/Cannabis-Paper-Scraper/reports/classification_pipeline_audit_report.html",
    techStack: ["Python", "Flask", "PostgreSQL", "Fly.io", "Anthropic Claude", "PubMed API", "FTS5/BM25"],
    heroImage: "/images/dashboard_preview.png"
  },
  {
    slug: "last-mile-delivery-tracker",
    title: "Last-Mile Delivery Tracker",
    client: "IAW Courier",
    badge: "Logistics",
    category: "Logistics",
    summary: "Real-time delivery visibility and SLA alerting mapping integrated across 3 courier APIs.",
    outcome: "Exception visibility increased from 30% to 97%; delivery complaints fell by 41% in Q1.",
    metrics: [
      { value: "97%", label: "Exception Visibility" },
      { value: "41%", label: "Complaints Reduced" },
      { value: "22%", label: "Exception Rate Drop" }
    ],
    problem: `IAW Courier was losing visibility without an online integrated delivery request and processing dashboard. They needed a unified system to collect and compile courier data, organize delivery routes, and alert operations to delays before they impacted the client.`,
    approach: [
      "Designed and built an online integrated delivery request and processing dashboard to centralize and manage incoming courier dispatches.",
      "Implemented a unified system to collect and compile real-time tracking data from three major courier networks.",
      "Developed a routing engine to systematically organize delivery routes and calculate optimal dispatch sequences.",
      "Wired automated alert triggers to notify operations of transit delays before they impacted end-users."
    ],
    result: `The online integrated delivery request and processing dashboard successfully unified tracking data, routing coordination, and delay alerts into a single console. Following deployment, dispatchers gained complete operational visibility, reducing exception times by 22%, improving delivery SLA alignment, and cutting delivery-related complaints by 41% in the first quarter.`
  }
];
