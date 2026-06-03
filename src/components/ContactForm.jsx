import React, { useState } from "react";
import { Button } from "./Button";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    service: "data-analysis",
    description: "",
  });
  
  const [status, setStatus] = useState({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validations
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
      // Simulate API submit call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      console.log("Contact Form Submitted successfully:", formData);

      // Track in Google Analytics
      if (window.gtag) {
        window.gtag("event", "form_submit", {
          form_id: "contact_form",
          service_of_interest: formData.service,
          organization: formData.organization,
        });
      }

      setStatus({
        type: "success",
        message: "Thank you. Your message has been received. A senior consultant will contact you within 24 hours.",
      });

      // Clear Form
      setFormData({
        name: "",
        organization: "",
        email: "",
        service: "data-analysis",
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
    <div className="form-container">
      {status.type && (
        <div className={`form-status-msg ${status.type}`} role="alert">
          {status.message}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
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
            placeholder="Acme Corp"
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
            placeholder="john@company.com"
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
            <option value="data-analysis">Data Analysis & Pipelines</option>
            <option value="logistics">Logistics & Tracking Solutions</option>
            <option value="custom-research">Custom Quantitative Research</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Project Description & Constraints *</label>
        <textarea
          id="description"
          placeholder="Briefly describe the quantitative challenges, systems constraints, and target timeline..."
          value={formData.description}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-submit-row">
        <Button onClick={handleSubmit} variant="solid" disabled={loading}>
          {loading ? "Submitting Inquiry..." : "Submit Inquiry"}
        </Button>
        <span className="form-trust-copy">
          Typical response within 24 hours. All conversations are confidential.
        </span>
      </div>
    </div>
  );
};
