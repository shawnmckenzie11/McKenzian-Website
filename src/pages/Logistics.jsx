import React from "react";
import { Truck, Map, ShieldAlert, BarChart, ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";
import { LogisticsMap } from "../components/LogisticsMap";
import { caseStudies } from "../data/caseStudies";

export const Logistics = () => {
  useDocumentMetadata(
    "Logistics & Operations",
    "Shipment tracking dashboards, route optimization architectures, and real-time SLA breach alerting."
  );

  // Find Last-Mile Delivery Tracker case study for inline inclusion
  const inlineStudy = caseStudies.find(
    (cs) => cs.slug === "last-mile-delivery-tracker"
  );

  const capabilities = [
    {
      icon: <Truck size={24} />,
      title: "Delivery Tracking Dashboards",
      desc: "Aggregating multiple third-party courier APIs into a single, unified operations dashboard."
    },
    {
      icon: <Map size={24} />,
      title: "Route Optimization",
      desc: "Constructing spatial analytics engines utilizing PostGIS to minimize transit loops and fuel burns."
    },
    {
      icon: <BarChart size={24} />,
      title: "Fleet Operations Analytics",
      desc: "Synthesizing vehicle coordinate streams to isolate high-congestion bottlenecks and delivery delays."
    },
    {
      icon: <ShieldAlert size={24} />,
      title: "SLA Risk Alerting",
      desc: "Setting predictive automated threshold alerts (via SMS/email) before delivery timelines lapse."
    }
  ];

  return (
    <main id="main-content">
      {/* Hero Header */}
      <section className="page-intro-header" aria-labelledby="logistics-title">
        <div className="container">
          <span className="hero-subtitle">Specialization</span>
          <h1 id="logistics-title" className="page-intro-title">Every Shipment, Accounted For.</h1>
          <p className="page-intro-lead">
            We integrate courier endpoints and build dispatch maps that elevate shipment visibility from blind spots to active tracking logs.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", marginBottom: "6rem" }}>
            <div className="reveal-element">
              <span className="hero-subtitle">Operations</span>
              <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                Real-Time Route Tracking Map
              </h2>
              <p className="text-muted" style={{ marginBottom: "2rem", fontSize: "1.05rem" }}>
                Inspect our Southern Ontario tracking dashboard. Toggle between active dispatches to view live telemetry updates, ETA metrics, and SLA status alerts.
              </p>
            </div>
            <div className="reveal-element">
              <LogisticsMap />
            </div>
          </div>

          <div style={{ marginBottom: "3.5rem" }} className="reveal-element">
            <h3 style={{ fontSize: "1.8rem" }}>What We Build</h3>
          </div>

          <div className="capability-service-grid stagger-parent">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="capability-service-card reveal-element">
                <div className="capability-service-icon">{cap.icon}</div>
                <h4 className="capability-service-title">{cap.title}</h4>
                <p className="capability-service-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="process-section section-padding" aria-labelledby="process-heading">
        <div className="container">
          <div style={{ marginBottom: "4rem", textAlign: "center" }} className="reveal-element">
            <span className="hero-subtitle">Methodology</span>
            <h2 id="process-heading" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
              How We Work
            </h2>
          </div>

          <div className="process-grid stagger-parent">
            <div className="process-step reveal-element">
              <span className="process-num">01</span>
              <h3 className="process-title">Discover</h3>
              <p className="process-desc">We audit existing logs and document workflow constraints.</p>
            </div>
            <div className="process-step reveal-element">
              <span className="process-num">02</span>
              <h3 className="process-title">Architect</h3>
              <p className="process-desc">We design database schemas and map out the data pipelines.</p>
            </div>
            <div className="process-step reveal-element">
              <span className="process-num">03</span>
              <h3 className="process-title">Build</h3>
              <p className="process-desc">We construct the scraper codes, APIs, and dashboard frames.</p>
            </div>
            <div className="process-step reveal-element">
              <span className="process-num">04</span>
              <h3 className="process-title">Deliver</h3>
              <p className="process-desc">We deploy the solution and transfer full code ownership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Case Study Card */}
      {inlineStudy && (
        <section className="section-padding" aria-labelledby="related-study-heading">
          <div className="container">
            <div style={{ marginBottom: "3rem" }} className="reveal-element">
              <span className="hero-subtitle">Proven Case</span>
              <h2 id="related-study-heading" style={{ fontSize: "2rem", marginTop: "0.5rem" }}>
                Related Case Study
              </h2>
            </div>
            <div className="service-card reveal-element" style={{ border: "1px solid var(--color-rule)" }}>
              <div>
                <span className="work-client" style={{ display: "block", marginBottom: "0.5rem" }}>{inlineStudy.client}</span>
                <h3 className="service-card-title">{inlineStudy.title}</h3>
                <p className="service-card-desc">{inlineStudy.summary}</p>
                <div style={{ margin: "1.5rem 0", paddingLeft: "1rem", borderLeft: "3px solid var(--color-accent)" }}>
                  <strong>Key Result:</strong> {inlineStudy.outcome}
                </div>
              </div>
              <Button to={`/work/${inlineStudy.slug}`} variant="solid">
                Read Full Case Study <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Pre-footer CTA */}
      <section className="prefooter-cta section-padding" aria-labelledby="logistics-cta-heading">
        <div className="container reveal-element">
          <h2 id="logistics-cta-heading" className="prefooter-heading">
            Need active tracking controls?
          </h2>
          <Button to="/contact" variant="white">
            Schedule an Operations Audit
          </Button>
          <p className="prefooter-microcopy">
            A 30-minute structured dialogue to review your system requirements.
          </p>
        </div>
      </section>
    </main>
  );
};
