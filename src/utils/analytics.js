/**
 * GA4 helper for dual-lane acquisition events.
 * No-ops safely when gtag is unavailable.
 */

/**
 * Fires a GA4 event if gtag is loaded.
 * @param {string} eventName - Event name (e.g. book_call_click)
 * @param {Record<string, string|number|boolean>} [params] - Event parameters
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/**
 * Tracks a discovery-call CTA click with lane and placement context.
 * @param {object} opts
 * @param {string} opts.lane - research | logistics | general
 * @param {string} opts.placement - hero | prefooter | nav | contact
 * @param {string} [opts.page] - Current page path
 */
export function trackBookCallClick({ lane, placement, page }) {
  trackEvent("book_call_click", {
    lane,
    placement,
    page_path: page || (typeof window !== "undefined" ? window.location.hash : ""),
  });
}

/**
 * Tracks a qualified lead form submission for CRM / conversion goals.
 * @param {object} opts
 * @param {string} opts.formId
 * @param {string} opts.lane
 * @param {string} [opts.service]
 * @param {string} [opts.organization]
 * @param {string} [opts.source]
 */
export function trackLeadSubmit({ formId, lane, service, organization, source }) {
  trackEvent("generate_lead", {
    form_id: formId,
    lane,
    service_of_interest: service || "",
    organization: organization || "",
    lead_source: source || "website",
  });
  trackEvent("form_submit", {
    form_id: formId,
    lane,
    service_of_interest: service || "",
    organization: organization || "",
  });
}
