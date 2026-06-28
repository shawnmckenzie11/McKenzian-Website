import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";
import { caseStudies } from "../data/caseStudies";

export const CaseStudyDetail = () => {
  const { slug } = useParams();

  // Find the requested case study
  const study = caseStudies.find((cs) => cs.slug === slug);

  // Fallback metadata if not found
  useDocumentMetadata(
    study ? study.title : "Case Study",
    study ? study.summary : "McKenzian Solutions Case Study detail."
  );

  if (!study) {
    return (
      <main id="main-content" className="container section-padding" style={{ paddingTop: "120px" }}>
        <h2>Case Study Not Found</h2>
        <p style={{ margin: "1.5rem 0" }}>The requested project history file could not be resolved.</p>
        <Link to="/work" style={{ color: "var(--color-accent)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={16} /> Back to case studies
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content">
      {/* Case Study Hero */}
      <section className="case-study-hero" aria-labelledby="case-study-title">
        <div className="container">
          <Link to="/work" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            <ArrowLeft size={16} /> Back to work
          </Link>
          <h1 id="case-study-title" className="case-study-hero-title">{study.title}</h1>
          <p className="case-study-hero-outcome">Outcome: {study.outcome}</p>

          {(study.liveDemoUrl || study.reportUrl) && (
            <div className="case-study-action-row">
              {study.liveDemoUrl && (
                <Button href={study.liveDemoUrl} variant="solid" external ariaLabel="View live demo">
                  View Live Demo
                </Button>
              )}
              {study.reportUrl && (
                <Button href={study.reportUrl} variant="ghost" external ariaLabel="Read pipeline audit report">
                  Read Pipeline Audit
                </Button>
              )}
            </div>
          )}

          <div className="case-study-meta-strip">
            <div className="case-study-meta-item">
              <span className="case-study-meta-label">Client</span>
              <span className="case-study-meta-value">{study.client}</span>
            </div>
            <div className="case-study-meta-item">
              <span className="case-study-meta-label">Domain</span>
              <span className="case-study-meta-value">{study.badge}</span>
            </div>
          </div>

          {study.heroImage && (
            <div className="case-study-hero-image-wrap">
              <img
                src={study.heroImage}
                alt={`${study.title} dashboard preview`}
                className="case-study-hero-image"
                width={1200}
                height={675}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </section>

      {/* Case Study Content Layout */}
      <section className="section-padding">
        <div className="container">
          <div className="case-study-layout">
            
            {/* Left Main column */}
            <div className="case-study-body reveal-element">
              <section aria-labelledby="problem-heading">
                <h2 id="problem-heading">The Problem</h2>
                <p>{study.problem}</p>
              </section>

              <section aria-labelledby="approach-heading">
                <h2 id="approach-heading">Our Approach</h2>
                <ol>
                  {study.approach.map((step, idx) => (
                    <li key={idx}>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="result-heading">
                <h2 id="result-heading">The Result</h2>
                <p>{study.result}</p>
              </section>

              {study.techStack && study.techStack.length > 0 && (
                <section aria-labelledby="tech-stack-heading">
                  <h2 id="tech-stack-heading">Technology</h2>
                  <div className="tech-tag-list">
                    {study.techStack.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                </section>
              )}

              {/* Inline CTA */}
              <div style={{ backgroundColor: "var(--color-surface)", padding: "3rem", border: "1px solid var(--color-rule)", marginTop: "4rem" }}>
                <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "1.8rem", marginBottom: "1rem" }}>
                  Working on something similar?
                </h3>
                <p style={{ color: "var(--color-muted)", marginBottom: "2rem" }}>
                  Let's discuss how we can adapt these architectures to optimize your own data operations.
                </p>
                <Button to="/contact" variant="solid">
                  Schedule a Briefing
                </Button>
              </div>
            </div>

            {/* Right sidebar metrics */}
            <aside className="case-study-sidebar-metrics reveal-element" aria-label="Key Outcomes & Statistics">
              <h3 style={{ fontFamily: "var(--font-headings)", fontSize: "1.5rem", marginBottom: "2.5rem", borderBottom: "1px solid var(--color-rule)", paddingBottom: "0.5rem" }}>
                Key Metrics
              </h3>
              {study.metrics.map((metric, index) => (
                <div key={index} className="sidebar-metric-box">
                  <div className="sidebar-metric-val">{metric.value}</div>
                  <div className="sidebar-metric-lbl">{metric.label}</div>
                </div>
              ))}
            </aside>

          </div>
        </div>
      </section>
    </main>
  );
};
