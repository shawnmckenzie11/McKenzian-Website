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
    title: "Academic Research Database",
    client: "Ontario Academic Consortium",
    badge: "Research",
    category: "Research",
    summary: "Faceted search and semantic indexing for managing 4,000+ scientific publications.",
    outcome: "Literature review cycles cut from 12 hours to 90 minutes; system scaled to 3 additional labs.",
    metrics: [
      { value: "90 min", label: "Avg. Literature Review" },
      { value: "4,000+", label: "Papers Indexed" },
      { value: "3x", label: "Lab Adoption Rate" }
    ],
    problem: `The consortium's principal academic laboratory was managing a repository of over 4,000 peer-reviewed research papers and database tables with zero indexing. Graduate researchers were spending up to 12 hours per literature review searching through scattered folders, manually extracting keywords, and cross-referencing citations. The lack of centralized indexing led to duplicate research efforts and severely delayed clinical report submissions.`,
    approach: [
      "Built a custom Python ingestion pipeline that performs text extraction, metadata parsing, and OCR processing on raw research PDFs.",
      "Implemented a vector database layer using PostgreSQL with the pgvector extension, generating semantic embeddings of paper abstracts.",
      "Created a React-based faceted search portal, enabling instantaneous filtering by exposure method, compound concentration, and study quality scores.",
      "Integrated BibTeX citation exporting and dynamic cross-referencing graphs."
    ],
    result: `The system was deployed within two weeks of prototype confirmation. By utilizing semantic vector search, researchers cut literature compilation cycles down from 12 hours to under 90 minutes. Due to the rapid success and high usability, three additional regional academic laboratories adopted the platform within the same semester, consolidating their research catalog into a single, federated data hub.`
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
