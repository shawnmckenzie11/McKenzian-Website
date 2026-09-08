/**
 * Lightweight CRM buffer: persists inquiry rows to localStorage
 * and mirrors them as a downloadable CSV for the pipeline sheet.
 */

const CRM_STORAGE_KEY = "mckenzian_crm_leads";

/**
 * Reads all buffered CRM leads from localStorage.
 * @returns {Array<Record<string, string>>}
 */
export function getCrmLeads() {
  try {
    const raw = localStorage.getItem(CRM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Appends a lead record to the local CRM buffer.
 * @param {object} lead
 * @param {string} lead.name
 * @param {string} lead.email
 * @param {string} [lead.organization]
 * @param {string} lead.lane - research | logistics | general
 * @param {string} [lead.service]
 * @param {string} [lead.description]
 * @param {string} [lead.stage]
 * @param {string} [lead.source]
 * @param {Record<string, string>} [lead.utm]
 * @returns {Record<string, string>} Persisted lead row
 */
export function appendCrmLead(lead) {
  const row = {
    id: `lead_${Date.now()}`,
    created_at: new Date().toISOString(),
    name: lead.name || "",
    email: lead.email || "",
    organization: lead.organization || "",
    lane: lead.lane || "general",
    service: lead.service || "",
    description: lead.description || "",
    project_stage: lead.stage || "",
    source: lead.source || "website",
    stage: "new",
    utm_source: lead.utm?.utm_source || "",
    utm_medium: lead.utm?.utm_medium || "",
    utm_campaign: lead.utm?.utm_campaign || "",
    utm_content: lead.utm?.utm_content || "",
  };

  const existing = getCrmLeads();
  existing.push(row);
  localStorage.setItem(CRM_STORAGE_KEY, JSON.stringify(existing));
  return row;
}

/**
 * Builds a CSV string from buffered CRM leads for export.
 * @returns {string}
 */
export function crmLeadsToCsv() {
  const leads = getCrmLeads();
  const headers = [
    "id",
    "created_at",
    "name",
    "email",
    "organization",
    "lane",
    "service",
    "description",
    "project_stage",
    "source",
    "stage",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ];
  const escape = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  leads.forEach((row) => {
    lines.push(headers.map((h) => escape(row[h])).join(","));
  });
  return lines.join("\n");
}
