import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { ContactForm } from "../components/ContactForm";
import { MARKETING } from "../config/marketing";

/**
 * Minimalist contact view: Email, OR divider, and inquiry form card.
 */
export const Contact = () => {
  useDocumentMetadata(
    "Contact",
    "Email McKenzian or submit a project inquiry."
  );

  return (
    <main id="main-content" className="linktree-page linktree-page--contact">
      <HeroAnimation />
      <div className="linktree-stack contact-stack">
        <Link to="/" className="linktree-home">
          Home
        </Link>
        <div className="contact-flow">
          <a
            className="linktree-contact"
            href={`mailto:${MARKETING.contactEmail}`}
          >
            Email
          </a>
          <span className="contact-or" aria-hidden="true">
            OR
          </span>
          <section className="contact-form-card" aria-labelledby="contact-form-title">
            <h1 id="contact-form-title" className="contact-form-card-title">
              Submit Project Details
            </h1>
            <ContactForm />
          </section>
        </div>
      </div>
    </main>
  );
};
