import React from "react";
import { Mail, MapPin, Calendar } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { ContactForm } from "../components/ContactForm";
import { Button } from "../components/Button";

export const Contact = () => {
  useDocumentMetadata(
    "Contact Us",
    "Submit an inquiry or schedule a strategy call to discuss your data analysis or logistics requirements."
  );

  return (
    <main id="main-content">
      {/* Intro Header */}
      <section className="page-intro-header" aria-labelledby="contact-title">
        <div className="container">
          <span className="hero-subtitle">Engage Us</span>
          <h1 id="contact-title" className="page-intro-title">Get in Touch</h1>
          <p className="page-intro-lead">
            Select a pathway to discuss your data analysis or logistics operations. Book a scheduled calendar slot below or submit an inquiry using our secure form.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="section-padding">
        <div className="container">
          <div className="contact-layout">
            {/* Left Column: Info & Calendly CTA */}
            <div className="contact-info-col reveal-element">
              <h3>Office & Scheduling</h3>
              <p className="contact-info-text">
                We work with clients across North America. Initial conversations are typically held over secure video links or telephone.
              </p>

              <ul className="contact-details-list">
                <li>
                  <Mail size={18} className="text-muted" />
                  <div>
                    <strong>Email</strong>
                    <a href="mailto:solutions@mckenzian.com" style={{ color: "var(--color-ink)", textDecoration: "none" }}>
                      solutions@mckenzian.com
                    </a>
                  </div>
                </li>
                <li>
                  <MapPin size={18} className="text-muted" />
                  <div>
                    <strong>Location</strong>
                    <span>Toronto, Ontario</span>
                  </div>
                </li>
              </ul>

              <div style={{ borderTop: "1px solid var(--color-rule)", paddingTop: "2.5rem" }}>
                <h4 style={{ marginBottom: "1rem", fontFamily: "var(--font-headings)" }}>Instant Booking</h4>
                <p className="contact-info-text" style={{ marginBottom: "1.5rem" }}>
                  Skip the form and reserve a slot directly in our calendar for a 30-minute structured data strategy session.
                </p>
                <Button
                  href="https://calendly.com/mckenzian-solutions/30min"
                  variant="solid"
                  external
                  ariaLabel="Book a 30-min strategy call"
                >
                  <Calendar size={16} style={{ marginRight: "0.75rem" }} />
                  Book 30-Min Strategy Call
                </Button>
              </div>
            </div>

            {/* Right Column: React State Form */}
            <div className="reveal-element">
              <h3 style={{ marginBottom: "2rem" }}>Submit Project Details</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
