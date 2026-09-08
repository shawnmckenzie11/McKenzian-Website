import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { ContactForm } from "../components/ContactForm";
import { tools } from "../data/tools";

const capabilityDetails = {
  research: {
    kicker: "Lateral / Explore",
    title: "Teaching & Research",
    description: "Logic and automation for reinforcing learning pathways and concept synthesis",
    metric: "Teach ↔ build",
    metricLabel: "model · demonstrate",
  },
  delivery: {
    kicker: "Vertical / Scale",
    title: "Workflow Automation",
    description: "Build, solve, grow, and integrate—from useful assets and operating systems toward durable scale.",
    metric: "Build → scale",
    metricLabel: "assets · integration",
  },
};

/**
 * Full-viewport link tree: thumbnail opens More page; More opens live tool.
 */
export const Home = () => {
  const [activeCapability, setActiveCapability] = useState(null);
  const [contactVisible, setContactVisible] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const section = contactRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setContactVisible(entry.isIntersecting),
      { threshold: 0.18 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useDocumentMetadata(
    "",
    "Research and operations systems that turn complex work into clear decisions."
  );

  return (
    <main
      id="main-content"
      className="systems-page"
      data-active-capability={activeCapability || "none"}
    >
      <HeroAnimation activeNode={activeCapability} />

      <header className="systems-header">
        <Link to="/" className="systems-brand" aria-label="McKenzian Solutions home">
          McKenzian Solutions
        </Link>
        <a href="#contact" className="systems-contact">
          Contact
        </a>
      </header>

      <section className="systems-intro" aria-labelledby="systems-title">
        <p className="systems-overline">Vertical + Lateral</p>
        <h1 id="systems-title">Solutions<br />Engineering.</h1>
        <p className="systems-promise">Build upward. Think sideways. Make complex work clear.</p>
        <Link to="/nodeweb-lab" className="nodeweb-lab-link">
          Train nodeWeb
        </Link>
      </section>

      <section className="capability-map" aria-label="Capabilities">
        <span className="capability-map-line" aria-hidden="true" />
        {tools.map((tool) => {
          const detail = capabilityDetails[tool.id];
          return (
            <article
              key={tool.id}
              className={`capability-node capability-node--${tool.id}`}
              onMouseEnter={() => setActiveCapability(tool.id)}
              onMouseLeave={() => setActiveCapability(null)}
              onFocus={() => setActiveCapability(tool.id)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveCapability(null);
                }
              }}
            >
              <Link to={`/more/${tool.id}`} className="capability-node-main">
                <span className="capability-kicker">{detail.kicker}</span>
                <span className="capability-title">{detail.title}</span>
                <span className="capability-description">{detail.description}</span>
                <span className="capability-metric">
                  <strong>{detail.metric}</strong>
                  <span>{detail.metricLabel}</span>
                </span>
                <span className="capability-action">See a working system <span aria-hidden="true">↗</span></span>
              </Link>
              <div className="capability-preview" aria-hidden="true">
                <span className="capability-preview-label">
                  <span /> Live workflow
                </span>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={tool.image}
                  tabIndex="-1"
                >
                  <source src={`${tool.previewVideo}.webm`} type="video/webm" />
                  <source src={`${tool.previewVideo}.mp4`} type="video/mp4" />
                </video>
                <img className="capability-preview-fallback" src={tool.image} alt="" width={tool.nativeWidth} height={tool.nativeHeight} />
              </div>
            </article>
          );
        })}
      </section>

      <section
        id="contact"
        ref={contactRef}
        className={`systems-contact-section${contactVisible ? " is-visible" : ""}`}
        aria-labelledby="home-contact-title"
      >
        <div className="systems-contact-card">
          <p className="systems-contact-kicker">Send a project signal.</p>
          <h2 id="home-contact-title">What should we make clearer?</h2>
          <ContactForm />
        </div>
      </section>
    </main>
  );
};
