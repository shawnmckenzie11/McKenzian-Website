import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "./Button";
import { getStoredUtmParams } from "../config/marketing";
import { trackLeadSubmit } from "../utils/analytics";
import { appendCrmLead } from "../utils/crm";

/**
 * Maps a marketing lane to the contact form service select value.
 * @param {string} lane
 * @returns {string}
 */
function laneToService(lane) {
  if (lane === "research") return "custom-research";
  if (lane === "logistics") return "logistics";
  return "data-analysis";
}

/**
 * Contact inquiry form with lane tagging, UTM capture, GA4 lead events,
 * and local CRM buffer for pipeline export.
 */
export const ContactForm = ({ defaultLane = "" }) => {
  const [searchParams] = useSearchParams();
  const laneFromQuery = searchParams.get("lane") || defaultLane || "";

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    service: laneToService(laneFromQuery),
    lane: laneFromQuery || "general",
    description: "",
  });

  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (laneFromQuery) {
      setFormData((prev) => ({
        ...prev,
        lane: laneFromQuery,
        service: laneToService(laneFromQuery),
      }));
    }
  }, [laneFromQuery]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [id]: value };
      if (id === "service") {
        if (value === "custom-research") next.lane = "research";
        else if (value === "logistics") next.lane = "logistics";
        else next.lane = "general";
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.description) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields (Name, Email, Project Description).",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const utm = getStoredUtmParams();
      appendCrmLead({
        name: formData.name,
        email: formData.email,
        organization: formData.organization,
        lane: formData.lane,
        service: formData.service,
        description: formData.description,
        source: "contact_form",
        utm,
      });

      trackLeadSubmit({
        formId: "contact_form",
        lane: formData.lane,
        service: formData.service,
        organization: formData.organization,
        source: utm.utm_source || "website",
      });

      // Optional webhook (Formspree / Worker) when configured
      const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...formData, utm }),
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been received.",
      });

      setFormData({
        name: "",
        organization: "",
        email: "",
        service: laneToService(laneFromQuery),
        lane: laneFromQuery || "general",
        description: "",
      });
    } catch (err) {
      setStatus({
        type: "error",
        message: "An error occurred while submitting. Please try again or email us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      {status.type && (
        <div className={`form-status-msg ${status.type}`} role="alert">
          {status.message}
        </div>
      )}

      <input type="hidden" id="lane" value={formData.lane} readOnly />

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            type="text"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="organization">Organization (Optional)</label>
          <input
            id="organization"
            type="text"
            placeholder="Lab, courier, or company name"
            value={formData.organization}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Work Email *</label>
          <input
            id="email"
            type="email"
            placeholder="you@organization.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service of Interest *</label>
          <select
            id="service"
            value={formData.service}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="custom-research">Academic Research Catalog</option>
            <option value="logistics">Ops Portal / Logistics</option>
            <option value="data-analysis">Data Analysis & Pipelines</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Project Description & Constraints *</label>
        <textarea
          id="description"
          placeholder="Describe the workflow, systems in place, and target timeline..."
          value={formData.description}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-submit-row">
        <Button type="submit" onClick={handleSubmit} variant="solid" disabled={loading}>
          {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
        </Button>
      </div>
    </form>
  );
};
