import React from "react";
import { Database, Truck, ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";
import { services } from "../data/services";

export const Services = () => {
  useDocumentMetadata(
    "Our Services",
    "Explore our core consulting services: Data Analysis & Pipelines and Logistics & Operations tracking."
  );

  // We only show the primary detail-page services (Data Analysis & Logistics)
  const primaryServices = services.filter((s) => s.id !== "custom-research");

  // Helper to render lucide icon dynamically
  const renderIcon = (name) => {
    if (name === "Database") return <Database size={40} className="service-card-icon" />;
    if (name === "Truck") return <Truck size={40} className="service-card-icon" />;
    return <Database size={40} className="service-card-icon" />;
  };

  return (
    <main id="main-content">
      {/* Intro Header */}
      <section className="page-intro-header" aria-labelledby="services-title">
        <div className="container">
          <span className="hero-subtitle">What We Do</span>
          <h1 id="services-title" className="page-intro-title">Consulting Services</h1>
          <p className="page-intro-lead">
            We architect and deploy custom software and data infrastructure for enterprise logistics and academic research. We prioritize systems that establish clarity and scale without administrative friction.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2 stagger-parent">
            {primaryServices.map((service) => (
              <div key={service.id} className="service-card reveal-element" style={{ minHeight: "440px" }}>
                <div>
                  {renderIcon(service.iconName)}
                  <h2 className="service-card-title" style={{ fontFamily: "var(--font-headings)", marginTop: "1rem" }}>
                    {service.title}
                  </h2>
                  <p className="service-card-desc" style={{ marginTop: "1rem" }}>
                    {service.shortDesc}
                  </p>
                  <ul style={{ listStyle: "square", marginLeft: "1.5rem", marginBottom: "2.5rem", color: "var(--color-muted)" }}>
                    {service.benefits.map((benefit, index) => (
                      <li key={index} style={{ marginBottom: "0.5rem", fontSize: "0.95rem", lineHeight: "1.4" }}>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button to={service.path} variant="ghost" className="service-card-link" style={{ border: "none", padding: 0, justifyContent: "flex-start" }}>
                  Explore Capabilities <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="prefooter-cta section-padding" aria-labelledby="services-cta-heading">
        <div className="container reveal-element">
          <h2 id="services-cta-heading" className="prefooter-heading">
            Need a bespoke engineering solution?
          </h2>
          <Button to="/contact" variant="white">
            Get in touch
          </Button>
          <p className="prefooter-microcopy">
            We respond within one business day. All inquiries are covered under NDA.
          </p>
        </div>
      </section>
    </main>
  );
};
