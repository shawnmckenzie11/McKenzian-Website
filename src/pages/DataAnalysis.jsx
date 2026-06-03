import React from "react";
import { Database, Cpu, Layout, FileJson, ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";
import { RentalChart } from "../components/RentalChart";
import { caseStudies } from "../data/caseStudies";

export const DataAnalysis = () => {
  useDocumentMetadata(
    "Data Analysis & Engineering",
    "Tailored research databases, biostatistics processors, and dynamic D3 analytics dashboards."
  );

  // Find Academic Research Database case study for inline inclusion
  const inlineStudy = caseStudies.find(
    (cs) => cs.slug === "academic-research-database"
  );

  const capabilities = [
    {
      icon: <Database size={24} />,
      title: "Research Databases",
      desc: "Architecting Postgres, PostGIS, and pgvector schemas structured specifically for clinical paper metadata and spatial listings."
    },
    {
      icon: <Cpu size={24} />,
      title: "Biostatistics Pipelines",
      desc: "Automated parsing, duplicate isolation, and semantic vector indexing utilizing Node.js and custom ingestion layers."
    },
    {
      icon: <Layout size={24} />,
      title: "Housing & Rental Dashboards",
      desc: "Interactive dashboards presenting real-time pricing analysis, deduplicated listings, and geographic trends."
    },
    {
      icon: <FileJson size={24} />,
      title: "Custom Analytics APIs",
      desc: "Designing fast REST/GraphQL endpoints that serve formatted JSON data directly into your research environments."
    }
  ];

  return (
    <main id="main-content">
      {/* Hero Header */}
      <section className="page-intro-header" aria-labelledby="analysis-title">
        <div className="container">
          <span className="hero-subtitle">Specialization</span>
          <h1 id="analysis-title" className="page-intro-title">From Raw Data to Decisions</h1>
          <p className="page-intro-lead">
            We build automated data acquisition channels and analytical models that handle dirty, scattered spreadsheets and turn them into structured assets.
          </p>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="section-padding">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "center", marginBottom: "6rem" }}>
            <div className="reveal-element">
              <span className="hero-subtitle">Engineering</span>
              <h2 style={{ fontSize: "2.5rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                Interactive Analytics Infrastructure
              </h2>
              <p className="text-muted" style={{ marginBottom: "2rem", fontSize: "1.05rem" }}>
                Experience our D3-powered dashboard mockup below. This demonstrates our capacity to geocode, average, and visualize temporal trend data in real time.
              </p>
            </div>
            <div className="reveal-element">
              <RentalChart />
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
      <section className="prefooter-cta section-padding" aria-labelledby="analysis-cta-heading">
        <div className="container reveal-element">
          <h2 id="analysis-cta-heading" className="prefooter-heading">
            Need clarity on your datasets?
          </h2>
          <Button to="/contact" variant="white">
            Schedule a Systems Audit
          </Button>
          <p className="prefooter-microcopy">
            A 30-minute structured dialogue to review your system requirements.
          </p>
        </div>
      </section>
    </main>
  );
};
