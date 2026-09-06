/**
 * Marketing funnel configuration for dual-lane acquisition.
 * Override via Vite env vars in `.env` / `.env.local` (see `.env.example`).
 */
export const MARKETING = {
  /** GA4 measurement ID — replace placeholder before production tracking. */
  ga4Id: import.meta.env.VITE_GA4_MEASUREMENT_ID || "G-XXXXXXXXXX",

  /**
   * Discovery-call booking URL (Calendly, SavvyCal, etc.).
   * Leave empty to fall back to the contact form + mailto flow.
   */
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || "",

  /** Primary inbound email for CRM fallback and mailto CTAs. */
  contactEmail: "solutions@mckenzian.com",

  /** Lane identifiers used in UTM content and form fields. */
  lanes: {
    research: "research",
    logistics: "logistics",
  },

  /** Canonical landing paths (HashRouter). */
  landings: {
    research: "/",
    logistics: "/",
  },

  /** External demos. Research live UI stays off student-facing pages until chrome is retitled. */
  demos: {
    research: "https://paperscraper.mckenzian.com",
  },
};

/**
 * Returns stored UTM params from sessionStorage, if any.
 * @returns {Record<string, string>}
 */
export function getStoredUtmParams() {
  try {
    const stored = sessionStorage.getItem("mckenzian_utm_params");
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Builds a booking or contact deep-link with lane + UTM context.
 * @param {string} lane - research | logistics
 * @returns {string} Absolute or hash route for booking CTA
 */
export function getBookCallHref(lane) {
  const utm = getStoredUtmParams();
  if (MARKETING.calendlyUrl) {
    try {
      const url = new URL(MARKETING.calendlyUrl);
      url.searchParams.set("utm_campaign", lane);
      Object.entries(utm).forEach(([k, v]) => url.searchParams.set(k, v));
      return url.toString();
    } catch {
      return MARKETING.calendlyUrl;
    }
  }
  const params = new URLSearchParams({ lane, intent: "discovery_call", ...utm });
  return `/contact?${params.toString()}`;
}
