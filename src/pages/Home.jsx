import React, { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { Button } from "../components/Button";
import { HeroAnimation } from "../components/HeroAnimation";
import { services } from "../data/services";
import { testimonials } from "../data/testimonials";
import { caseStudies } from "../data/caseStudies";

export const Home = () => {
  useDocumentMetadata(
    "Data Analysis & Logistics Consulting",
    "We deliver custom data analysis, research databases, biostatistics dashboards, and logistics route optimization for high-trust industries."
  );

  const [leadEmail, setLeadEmail] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadEmail) return;

    if (window.gtag) {
      window.gtag("event", "form_submit", {
        form_id: "lead_magnet_home",
        email: leadEmail,
      });
    }

    console.log("Home Lead Magnet submitted with email:", leadEmail);
    setLeadSubmitted(true);
  };

  // Find the featured case study
  const featuredCaseStudy = caseStudies.find(
    (cs) => cs.slug === "academic-research-database"
  ) || caseStudies[0];

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero-section" aria-label="Introduction">
        <HeroAnimation />
        <div className="container">
          <div className="reveal-element" style={{ display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "680px" }}>
            <span className="hero-subtitle">Precision Analytics</span>
            <h1 className="hero-heading">
              We turn complex data into decisions that move.
            </h1>
            <p className="hero-desc">
              Precision engineering for data systems and logistics operations. We deliver analytics architectures that establish high trust and accelerate outcomes.
            </p>
            <div className="hero-ctas">
              <Button to="/contact" variant="solid">
                Book a Strategy Call
              </Button>
              <Button to="/work" variant="ghost">
                Explore Our Work
              </Button>
            </div>
          </div>
        </div>

        <a href="#services-heading" className="scroll-indicator" aria-label="Scroll to content">
          <span>Scroll</span>
          <ChevronDown size={18} className="scroll-chevron" />
        </a>
      </section>

      {/* Services Section */}
      <section className="section-padding" aria-labelledby="services-heading">
        <div className="container">
          <div style={{ marginBottom: "4rem", maxWidth: "600px" }} className="reveal-element">
            <span className="hero-subtitle">Capabilities</span>
            <h2 id="services-heading" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
              Engineered for Rigorous Environments
            </h2>
          </div>

          <div className="card-grid stagger-parent">
            {services.map((service) => (
              <div key={service.id} className="service-card reveal-element">
                <div>
                  <h3 className="service-card-title">{service.title}</h3>
                  <p className="service-card-desc">{service.shortDesc}</p>
                </div>
                <Button to={service.path} variant="ghost" className="service-card-link" style={{ border: "none", padding: 0, justifyContent: "flex-start" }}>
                  Learn More <ArrowRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Band & Testimonials */}
      <section className="trust-band section-padding" aria-labelledby="trust-heading">
        <div className="container">
          <h2 id="trust-heading" className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>
            Our Track Record
          </h2>
          
          <div className="metric-grid stagger-parent">
            <div className="metric-card reveal-element">
              <div className="metric-number">12+</div>
              <div className="metric-label">Domains Served</div>
            </div>
            <div className="metric-card reveal-element">
              <div className="metric-number">40+</div>
              <div className="metric-label">Databases Deployed</div>
            </div>
            <div className="metric-card reveal-element">
              <div className="metric-number">100%</div>
              <div className="metric-label">Client Satisfaction</div>
            </div>
            <div className="metric-card reveal-element">
              <div className="metric-number">2-4 Days</div>
              <div className="metric-label">Avg. to First Deliverable</div>
            </div>
          </div>

          <div className="testimonials-section reveal-element">
            <h2>What Our Clients Say</h2>
            <div className="testimonials-grid stagger-parent">
              {testimonials.slice(0, 2).map((t, idx) => (
                <div key={idx} className="testimonial-card reveal-element">
                  <blockquote className="testimonial-quote">
                    "{t.quote}"
                  </blockquote>
                  <cite className="testimonial-attribution">
                    — {t.author}, {t.organization}
                  </cite>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lead Magnet Micro-Section */}
      <section className="lead-magnet-section section-padding" aria-labelledby="lead-magnet-heading">
        <div className="container">
          <div className="lead-magnet-box reveal-element">
            <div>
              <h2 id="lead-magnet-heading" className="lead-magnet-title">
                Establish analytical control.
              </h2>
              <p className="lead-magnet-desc">
                Subscribe to receive our regular briefs on data engineering, scraping pipeline architecture, and logistics system audits.
              </p>
            </div>
            <div>
              {leadSubmitted ? (
                <div className="form-status-msg success">
                  Thank you. You have been subscribed.
                </div>
              ) : (
                <div className="lead-magnet-form">
                  <label htmlFor="home-lead-email" className="sr-only" style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}>Email Address</label>
                  <input
                    id="home-lead-email"
                    type="email"
                    placeholder="Enter your email"
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    required
                  />
                  <Button onClick={handleLeadSubmit} variant="dark">
                    Subscribe
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="section-padding" aria-labelledby="featured-heading">
        <div className="container">
          <div style={{ marginBottom: "4rem" }} className="reveal-element">
            <span className="hero-subtitle">Featured Case Study</span>
            <h2 id="featured-heading" style={{ fontSize: "2.5rem", marginTop: "0.5rem" }}>
              Systemic Impact in Action
            </h2>
          </div>

          <div className="showcase-container reveal-element">
            <div className="showcase-image-box">
              <img
                src="/images/dashboard_preview.png"
                alt="McKenzian Research Catalog dashboard preview"
                width={1200}
                height={675}
                loading="lazy"
              />
            </div>
            <div className="showcase-text-box">
              <span className="showcase-tag">{featuredCaseStudy.badge}</span>
              <h3 className="showcase-title">{featuredCaseStudy.title}</h3>
              <p className="showcase-problem">{featuredCaseStudy.summary}</p>
              <div className="showcase-metric">
                Result: {featuredCaseStudy.metrics[0].value} {featuredCaseStudy.metrics[0].label}
              </div>
              <Button to={`/work/${featuredCaseStudy.slug}`} variant="solid">
                Read Full Case Study &rarr;
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <section className="prefooter-cta section-padding" aria-labelledby="prefooter-heading">
        <div className="container reveal-element">
          <h2 id="prefooter-heading" className="prefooter-heading">
            Ready to bring clarity to your data?
          </h2>
          <Button to="/contact" variant="white">
            Book a Strategy Call
          </Button>
          <p className="prefooter-microcopy">
            No commitment. No pitch. Just a focused conversation about your problem.
          </p>
        </div>
      </section>
    </main>
  );
};
