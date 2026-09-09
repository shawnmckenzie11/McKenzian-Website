/**
 * Explainer / justification copy and stills for each More page.
 * Walkthrough video sources live on the matching tool in `tools.js`
 * (`/videos/{id}-preview`); the first screenshot is used as the video poster.
 * @typedef {{ src: string, alt: string, caption: string }} ToolScreenshot
 * @typedef {{ title: string, summary: string, problem: string, approach: string[], result: string, liveUrl: string, screenshots: ToolScreenshot[] }} ToolSummary
 */

/** @type {Record<string, ToolSummary>} */
export const toolSummaries = {
  research: {
    title: "Academic Research",
    summary:
      "Production PubMed literature catalog with structured classification, faceted search, and review loops that keep extraction quality measurable.",
    problem:
      "A biomedical research consortium needed a single, auditable catalog for an expanding PubMed corpus. Literature reviews were assembled from scattered exports, study characteristics were extracted by hand, and there were no quality gates on metadata. At scale, duplicate effort accumulated and report cycles stretched to a full working day.",
    approach: [
      "Automated PubMed harvest pipeline with relevance gating and tiered extraction for clinical, in vivo, and in vitro records.",
      "Hybrid deterministic classifier with LLM and PDF-tier fallback; uncertain papers route to an expert review queue.",
      "One searchable library with locked expert fields and a clear audit trail so teams trust what they cite and export.",
      "Continuous quality review between batches so classification improves without silent drift.",
      "Faceted search dashboard for study design, species, outcome domain, and structured extraction fields.",
    ],
    result:
      "21,000+ papers indexed in production with 90.0–100.0% batch alignment (mean 92.2%) against expert-validated holdouts. Literature compilation cycles fell from 12 hours to under 90 minutes. Studies can be planned and evaluated far more intentionally, cross-referenced quickly, and shared across collaborators to advance work with less duplicate effort.",
    liveUrl: "https://paperscraper.mckenzian.com",
    screenshots: [
      {
        src: "/images/work/research/catalog.png",
        alt: "Faceted search across a structured PubMed catalog",
        caption: "Faceted search across structured fields, not a keyword box.",
      },
      {
        src: "/images/work/research/analysis.png",
        alt: "My Analyses view with distribution charts across study dimensions",
        caption: "Analysis dashboard with interactive charts across study dimensions.",
      },
    ],
  },
  delivery: {
    title: "Delivery Tracking",
    summary:
      "Operations portal for IAW Courier with digital waybills, proof of delivery, route-based pricing, and dispatcher accounting in a mobile-friendly web app.",
    problem:
      "IAW Courier, a regional operator, ran jobs on paper waybills. Destinations were typed from scratch, rates were looked up by hand, and accounting re-keyed every completed job, about $2,000 per year in forms and 25 hours of data entry each month.",
    approach: [
      "Mobile-friendly web app for drivers and a dispatcher portal, backed by Express, Prisma, and PostgreSQL.",
      "Digital waybills at job creation, with pickup chips seeded from historical destinations.",
      "Route rates encoded in the database; unmatched jobs land in a Pending Price queue for dispatcher quote.",
      "Pickup, transit, and proof-of-delivery captured as a timestamped event history for accounting and delivery-time review.",
      "Separate secure sign-in for drivers (username and PIN) and dispatchers (email and password), each role seeing only the screens and actions they need.",
    ],
    result:
      "Saved $2,000 annually on form materials and reduced monthly data entry by 20 hours",
    liveUrl: "https://iaw.mckenzian.com",
    screenshots: [
      {
        src: "/images/work/iaw/04-dispatch.png",
        alt: "Dispatcher board with active jobs and pricing queues",
        caption: "Dispatcher board with active jobs, pricing, and assignment in one view.",
      },
      {
        src: "/images/work/iaw/03-pickup.png",
        alt: "Pickup wizard with historical location chips",
        caption: "Pickup wizard with location chips so crews stop retyping addresses.",
      },
    ],
  },
};

/**
 * Returns the explainer record for a tool id, if defined.
 * @param {string} id
 * @returns {ToolSummary | undefined}
 */
export function getToolSummary(id) {
  return toolSummaries[id];
}
