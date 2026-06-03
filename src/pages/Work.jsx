import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { caseStudies } from "../data/caseStudies";

export const Work = () => {
  useDocumentMetadata(
    "Our Work & Case Studies",
    "Read through our consulting case studies on rental market scraping, semantic database search, and route optimization."
  );

  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filters = ["All", "Data Analysis", "Logistics", "Research"];

  const filteredCaseStudies = activeFilter === "All"
    ? caseStudies
    : caseStudies.filter((cs) => cs.category === activeFilter);

  const handleCardClick = (slug) => {
    navigate(`/work/${slug}`);
  };

  return (
    <main id="main-content">
      {/* Intro Header */}
      <section className="page-intro-header" aria-labelledby="work-title">
        <div className="container">
          <span className="hero-subtitle">Our Impact</span>
          <h1 id="work-title" className="page-intro-title">Case Studies</h1>
          <p className="page-intro-lead">
            Explore our project history. We design custom scraping platforms, vector search models, and logistics dispatch engines that solve concrete operational problems.
          </p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="section-padding">
        <div className="container">
          {/* Filter Tabs */}
          <div className="filter-tabs reveal-element" role="tablist" aria-label="Filter case studies by service category">
            {filters.map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={activeFilter === filter}
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Grid List */}
          <div className="card-grid stagger-parent">
            {filteredCaseStudies.map((study) => (
              <div
                key={study.slug}
                className="work-card reveal-element"
                onClick={() => handleCardClick(study.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(study.slug);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Read case study: ${study.title}`}
              >
                <div>
                  <div className="work-card-header">
                    <span className="work-client">{study.client}</span>
                    <span className="work-badge">{study.badge}</span>
                  </div>
                  
                  <h2 className="work-card-title">{study.title}</h2>
                  <p className="work-card-problem">{study.summary}</p>
                </div>

                <div>
                  <div className="work-card-metric-reveal">
                    <span className="work-card-metric-label">Key Outcome</span>
                    <span className="work-card-metric-value">{study.metrics[0].value} {study.metrics[0].label}</span>
                  </div>
                  <div className="work-card-link-arrow">
                    Read Case Study <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
