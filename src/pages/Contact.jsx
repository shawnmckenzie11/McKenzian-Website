import React from "react";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { ContactForm } from "../components/ContactForm";

/**
 * Minimalist contact view: inquiry form card over the hero animation.
 */
export const Contact = () => {
  useDocumentMetadata(
    "Get Started",
    "Submit a project inquiry to McKenzian."
  );

  return (
    <main id="main-content" className="linktree-page linktree-page--contact">
      <HeroAnimation />
      <div className="linktree-stack contact-stack">
        <section className="contact-form-card" aria-labelledby="contact-form-title">
          <h1 id="contact-form-title" className="contact-form-card-title">
            Submit Project Details
          </h1>
          <ContactForm />
        </section>
      </div>
    </main>
  );
};
