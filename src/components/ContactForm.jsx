import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";
import { getStoredUtmParams } from "../config/marketing";
import { trackLeadSubmit } from "../utils/analytics";
import { appendCrmLead } from "../utils/crm";

const directions = [
  { value: "research", label: "Teach it", note: "Turn complexity into something people can understand." },
  { value: "data-analysis", label: "Build it", note: "Make the information, workflow, or system work." },
  { value: "logistics", label: "Move it", note: "Connect the operational pieces and keep them moving." },
];

const startingPoints = ["A rough idea", "Something stuck", "Ready to build"];

/** Maps a marketing lane to the contact direction used by the project signal. */
function laneToDirection(lane) {
  if (lane === "research") return "research";
  if (lane === "logistics") return "logistics";
  return "data-analysis";
}

/** A compact, brand-aligned project signal that replaces the conventional inquiry form. */
export const ContactForm = ({ defaultLane = "" }) => {
  const [searchParams] = useSearchParams();
  const laneFromQuery = searchParams.get("lane") || defaultLane || "";
  const [formData, setFormData] = useState({
    name: "", email: "", organization: "",
    service: laneToDirection(laneFromQuery),
    lane: laneFromQuery || "general",
    stage: "A rough idea", description: "",
  });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!laneFromQuery) return;
    setFormData((previous) => ({ ...previous, lane: laneFromQuery, service: laneToDirection(laneFromQuery) }));
  }, [laneFromQuery]);

  /** Updates a text field from its element id. */
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((previous) => ({ ...previous, [id]: value }));
  };

  /** Updates a project-signal choice while preserving its acquisition lane. */
  const choose = (field, value) => {
    setFormData((previous) => ({
      ...previous, [field]: value,
      ...(field === "service" ? { lane: value === "research" || value === "logistics" ? value : "general" } : {}),
    }));
  };

  /** Validates and delivers the project signal. */
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.description.trim()) {
      setStatus({ type: "error", message: "Add your name, email, and the one thing you want to change." });
      return;
    }
    setLoading(true);
    setStatus({ type: null, message: "" });
    try {
      const utm = getStoredUtmParams();
      appendCrmLead({ ...formData, source: "project_signal", utm });
      trackLeadSubmit({ formId: "project_signal", lane: formData.lane, service: formData.service, organization: formData.organization, source: utm.utm_source || "website" });
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "/api/contact";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, utm }),
      });
      if (!response.ok) throw new Error("Contact delivery failed");
      setStatus({ type: "success", message: "Signal received. We’ll reply with a useful next move." });
      setFormData({ name: "", email: "", organization: "", service: laneToDirection(laneFromQuery), lane: laneFromQuery || "general", stage: "A rough idea", description: "" });
    } catch {
      setStatus({ type: "error", message: "That signal didn’t get through. Try again or email solutions@mckenzian.com." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container project-signal" onSubmit={handleSubmit} noValidate>
      {status.type && <div className={`form-status-msg ${status.type}`} role="alert">{status.message}</div>}
      <fieldset className="signal-step">
        <legend><span>01</span> Point us toward the work</legend>
        <div className="signal-directions">
          {directions.map((direction) => (
            <button key={direction.value} type="button" className={formData.service === direction.value ? "is-selected" : ""} aria-pressed={formData.service === direction.value} onClick={() => choose("service", direction.value)} disabled={loading}>
              <strong>{direction.label}</strong><span>{direction.note}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <fieldset className="signal-step signal-step--compact">
        <legend><span>02</span> Where are you starting?</legend>
        <div className="signal-stages">
          {startingPoints.map((stage) => (
            <button key={stage} type="button" className={formData.stage === stage ? "is-selected" : ""} aria-pressed={formData.stage === stage} onClick={() => choose("stage", stage)} disabled={loading}>{stage}</button>
          ))}
        </div>
      </fieldset>
      <div className="signal-step">
        <div className="signal-step-label"><span>03</span> Leave a return path</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Your name</label>
            <input id="name" type="text" autoComplete="name" value={formData.name} onChange={handleChange} required disabled={loading} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your email</label>
            <input id="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required disabled={loading} />
          </div>
        </div>
        <div className="form-group signal-organization">
          <label htmlFor="organization">Organization <span>optional</span></label>
          <input id="organization" type="text" autoComplete="organization" value={formData.organization} onChange={handleChange} disabled={loading} />
        </div>
        <div className="form-group">
          <label htmlFor="description">What’s the one thing you want clearer or working?</label>
          <textarea id="description" placeholder="A sentence or two is enough." value={formData.description} onChange={handleChange} required disabled={loading} />
        </div>
      </div>
      <div className="form-submit-row signal-submit">
        <Button type="submit" variant="solid" disabled={loading}>{loading ? "Sending signal…" : "Send project signal"}</Button>
        <p>No pitch deck required. Expect a human reply.</p>
      </div>
    </form>
  );
};
