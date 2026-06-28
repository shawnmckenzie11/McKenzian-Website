import React from "react";
import { ShieldCheck, Layers, Users } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";

export const About = () => {
  useDocumentMetadata(
    "About Us",
    "Learn about McKenzian Solutions, our founder, core philosophy, and technical capabilities."
  );

  const capabilities = [
    "Python", "R", "SQL", "PostgreSQL",
    "PostGIS", "React", "D3.js", "Node.js",
    "dbt", "pgvector", "Leaflet", "Tailwind"
  ];

  return (
    <main id="main-content">
      {/* Intro Header */}
      <section className="page-intro-header" aria-labelledby="about-title">
        <div className="container">
          <span className="hero-subtitle">Our Firm</span>
          <h1 id="about-title" className="page-intro-title">About McKenzian Solutions</h1>
          <p className="page-intro-lead">
            We are a consulting firm dedicated to building high-trust data solutions. We partner with leaders in logistics, research, and property underwriting to design software that delivers precision outcomes.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="section-padding">
        <div className="container">
          <div className="founder-block reveal-element">
            <div className="founder-avatar">
              {/* SVG silhouette placeholder for founder avatar as requested */}
              <svg viewBox="0 0 100 100" fill="var(--color-muted)" style={{ width: "120px", height: "120px", opacity: 0.6 }}>
                <path d="M50 15a20 20 0 1 0 0 40 20 20 0 0 0 0-40zm-35 60c0-10 15-15 35-15s35 5 35 15v10H15V75z" />
              </svg>
            </div>
            <div className="founder-info">
              <h3>Gordon McKenzie</h3>
              <span className="founder-title">Principal & Founder</span>
              <p className="founder-bio">
                Shawn brings over 15 years of cross-domain expertise engineering data pipelines and modeling complex distribution systems. Committed to analytical rigor and client-first engineering, he ensures every project directly resolves critical bottlenecks. He works alongside clients from scoping to final delivery to align technology with strategic outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="process-section section-padding" aria-labelledby="philosophy-heading">
        <div className="container">
          <div style={{ marginBottom: "4rem", textAlign: "center" }} className="reveal-element">
            <span className="hero-subtitle">Principles</span>
            <h2 id="philosophy-heading" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
              Our Operating Philosophy
            </h2>
          </div>

          <div className="philosophy-grid stagger-parent">
            <div className="philosophy-card reveal-element">
              <ShieldCheck size={32} className="philosophy-icon" />
              <h3 className="philosophy-title">Precision over Speed</h3>
              <p className="philosophy-desc">
                We believe that writing the right query once is better than debugging a rushed script for a week. We take the time to model databases and pipelines correctly the first time.
              </p>
            </div>
            <div className="philosophy-card reveal-element">
              <Layers size={32} className="philosophy-icon" />
              <h3 className="philosophy-title">Systems Thinking</h3>
              <p className="philosophy-desc">
                No pipeline exists in isolation. We architect databases and map flows by analyzing the upstream constraints and downstream applications of your business.
              </p>
            </div>
            <div className="philosophy-card reveal-element">
              <Users size={32} className="philosophy-icon" />
              <h3 className="philosophy-title">Client as Partner</h3>
              <p className="philosophy-desc">
                We do not drop a dashboard off and disappear. We build open systems, train internal teams, and ensure you maintain absolute ownership over your datasets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Ticker */}
      <section className="section-padding" aria-labelledby="capabilities-heading">
        <div className="container grid-2">
          <div className="reveal-element" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <span className="hero-subtitle">Stack</span>
            <h2 id="capabilities-heading" style={{ fontSize: "2.5rem", marginTop: "0.5rem", marginBottom: "1.5rem" }}>
              Our Technical Competencies
            </h2>
            <p className="text-muted" style={{ fontSize: "1.05rem", lineHeight: "1.6" }}>
              We build on top of industry-standard open technologies. We avoid vendor lock-in, prioritizing tools that run locally, deploy securely, and remain serviceable by standard engineering teams.
            </p>
          </div>
          <div className="capabilities-tag-container stagger-parent">
            {capabilities.map((tech, idx) => (
              <div key={idx} className="capability-tag reveal-element">
                <span className="capability-tag-bullet" />
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="prefooter-cta section-padding" aria-labelledby="about-cta-heading">
        <div className="container reveal-element">
          <h2 id="about-cta-heading" className="prefooter-heading">
            Work with us to streamline your data operations.
          </h2>
          <Button to="/contact" variant="white">
            Schedule a Strategy Session
          </Button>
          <p className="prefooter-microcopy">
            A 30-minute structured dialogue to review your system requirements.
          </p>
        </div>
      </section>
    </main>
  );
};
