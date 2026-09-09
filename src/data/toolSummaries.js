/**
 * Explainer / justification copy and capability screenshots for each More page.
 * @typedef {{ src: string, alt: string, caption: string }} ToolScreenshot
 * @typedef {{ title: string, summary: string, problem: string, approach: string[], result: string, liveUrl: string, screenshots: ToolScreenshot[] }} ToolSummary
 */

/** @type {Record<string, ToolSummary>} */
export const toolSummaries = {
  research: {
    title: "Academic Research",
    summary:
      "PubMed catalog with structured classification, faceted search, and review loops that keep extraction quality measurable.",
    problem:
      "A biomedical research consortium assembled literature reviews from scattered PubMed exports. Study characteristics were extracted by hand, with no quality gates on metadata, and report cycles stretched to a full working day.",
    approach: [
      "PubMed harvest pipeline with relevance gating and tiered extraction for clinical, in vivo, and in vitro records.",
      "Hybrid deterministic classifier with LLM and PDF-tier fallback; uncertain papers route to an expert review queue.",
      "One searchable library with locked expert fields and an audit trail.",
      "Quality review between batches so classification improves without silent drift.",
      "Faceted search for study design, species, outcome domain, and structured extraction fields.",
    ],
    result:
      "Indexed 21,000+ papers with 92.2% mean holdout alignment and cut review cycles from 12 hours to under 90 minutes",
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
        caption: "Analysis dashboard with charts across study dimensions.",
      },
    ],
  },
  delivery: {
    title: "Delivery Tracking",
    summary:
      "IAW Courier operations portal with digital waybills, proof of delivery, route-based pricing, and dispatcher accounting.",
    problem:
      "IAW Courier ran jobs on paper waybills. Destinations were typed from scratch, rates looked up by hand, and accounting re-keyed every job — $2,000 a year in forms and 25 hours of data entry each month.",
    approach: [
      "Driver web app and dispatcher portal, backed by Express, Prisma, and PostgreSQL.",
      "Digital waybills at job creation, with pickup chips seeded from historical destinations.",
      "Route rates encoded in the database; unmatched jobs land in a Pending Price queue for dispatcher quote.",
      "Timestamped pickup, transit, and proof-of-delivery events for accounting and delivery-time review.",
      "Driver sign-in with username and PIN; dispatcher sign-in with email and password. Each role sees only its screens.",
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
