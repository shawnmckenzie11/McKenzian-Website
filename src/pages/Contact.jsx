import React from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { ContactForm } from "../components/ContactForm";

/**
 * Minimalist contact view: inquiry form card over the hero animation.
 * Clicking outside the card returns to the home link tree.
 */
export const Contact = () => {
  const navigate = useNavigate();

  useDocumentMetadata(
    "Get Started",
    "Submit a project inquiry or book a consultation with McKenzian."
  );

  /**
   * Navigates home when the user clicks the backdrop outside the form card.
   */
  const handleBackdropClick = () => {
    navigate("/");
  };

  /**
   * Keeps clicks inside the form card from triggering backdrop navigation.
   * @param {React.MouseEvent<HTMLElement>} event
   */
  const handleCardClick = (event) => {
    event.stopPropagation();
  };

  return (
    <main id="main-content" className="linktree-page linktree-page--contact">
      <HeroAnimation />
      <div
        className="linktree-stack contact-stack contact-stack--dismissible"
        onClick={handleBackdropClick}
        role="presentation"
      >
        <section
          className="contact-form-card"
          aria-labelledby="contact-form-title"
          onClick={handleCardClick}
        >
          <h1 id="contact-form-title" className="contact-form-card-title">
            Submit Project Details
          </h1>
          <ContactForm />
        </section>
      </div>
    </main>
  );
};
