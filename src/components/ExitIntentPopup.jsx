import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if dismissed previously
    const dismissed = localStorage.getItem("mckenzian_exit_intent_dismissed");
    if (dismissed === "true") return;

    // Mouse leave event handler to detect exit intent
    const handleMouseLeave = (e) => {
      // Trigger if cursor exits through the top border of viewport
      if (e.clientY <= 10) {
        setIsVisible(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("mckenzian_exit_intent_dismissed", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Track event in Google Analytics
    if (window.gtag) {
      window.gtag("event", "form_submit", {
        form_id: "exit_intent_form",
        email: email,
      });
    }

    console.log("Exit Intent Form submitted with email:", email);
    setSubmitted(true);
    
    // Automatically close after a short delay
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isVisible) return null;

  return (
    <div className={`exit-intent-overlay ${isVisible ? "active" : ""}`} role="dialog" aria-modal="true" aria-labelledby="exit-modal-title">
      <div className="exit-intent-modal">
        <button
          className="exit-intent-close"
          onClick={handleClose}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        <span className="exit-intent-tag">Exclusive Resource</span>
        <h3 id="exit-modal-title" className="exit-intent-title">Is your organization data-ready?</h3>
        
        {submitted ? (
          <div className="form-status-msg success">
            Checklist sent. Please inspect your inbox shortly.
          </div>
        ) : (
          <>
            <p className="exit-intent-desc">
              Download our proprietary <strong>5-Point Data Readiness Checklist</strong>. Learn how top-tier firms audit, parse, and structure databases for rapid operational modeling.
            </p>
            <div className="exit-intent-form">
              <div className="form-group">
                <label htmlFor="exit-email">Professional Email Address</label>
                <input
                  id="exit-email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button onClick={handleSubmit} variant="solid" type="submit">
                Get the Checklist
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
