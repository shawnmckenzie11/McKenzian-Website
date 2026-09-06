/**
 * Explainer / justification copy for each tool More page.
 * @typedef {{ title: string, summary: string, problem: string, approach: string[], result: string, liveUrl: string }} ToolSummary
 */

/** @type {Record<string, ToolSummary>} */
export const toolSummaries = {
  research: {
    title: "Academic Research",
    summary:
      "Production PubMed literature catalog with structured classification, faceted search, and calibration loops that keep extraction quality measurable.",
    problem:
      "A biomedical research consortium needed a single, auditable catalog for an expanding PubMed corpus. Literature reviews were assembled from scattered exports, study characteristics were extracted by hand, and there were no quality gates on metadata. At scale, duplicate effort accumulated and report cycles stretched to a full working day.",
    approach: [
      "Automated PubMed harvest pipeline with relevance gating and tiered extraction for clinical, in vivo, and in vitro records.",
      "Hybrid deterministic classifier with LLM and PDF-tier fallback; sub-threshold papers route to an expert review queue.",
      "Fly Postgres storage with full-text search, expert field locking, and per-record build-ID traceability.",
      "Closed-loop calibration: golden-endpoint evaluation across holdout endpoints and a manual edit cycle between batches.",
      "Faceted search dashboard for study design, species, outcome domain, and structured extraction fields.",
    ],
    result:
      "21,000+ papers indexed in production. Eleven golden-endpoint calibration cycles completed with a 100% guard pass rate, achieving 90.0–100.0% batch alignment (mean 92.2%) against expert-validated holdouts. Literature compilation cycles fell from 12 hours to under 90 minutes.",
    liveUrl: "https://paperscraper.mckenzian.com",
  },
  delivery: {
    title: "Delivery tracker",
    summary:
      "Offline-first ops portal for IAW Courier — digital waybills, proof of delivery, route-based pricing, and dispatcher accounting in a React PWA.",
    problem:
      "IAW Courier, a regional last-mile operator in Greater Sudbury / Northern Ontario, ran jobs on paper waybills. Destinations were typed from scratch, rates were looked up by hand, and accounting re-keyed every completed job — about $2,000 per year in forms and 25 hours of data entry each month.",
    approach: [
      "Mobile-first React PWA for drivers and a dispatcher portal, backed by Express, Prisma, and PostgreSQL.",
      "Digital waybills at job creation, with pickup chips seeded from historical destinations.",
      "Route rates encoded in the database; unmatched jobs land in a Pending Price queue for dispatcher quote.",
      "Pickup, transit, and proof-of-delivery captured as append-only waybill events for accounting and SLA audits.",
      "Dual auth — driver username + PIN, dispatcher email + password — with JWT RBAC and offline IndexedDB sync queues.",
    ],
    result:
      "Material spend on forms dropped by about $2,000 per year. Monthly data entry fell from 25 hours to 5. Accounting no longer waits on re-keyed paper, and delivery timing is logged when a job is reviewed.",
    liveUrl: "https://iaw.mckenzian.com",
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
