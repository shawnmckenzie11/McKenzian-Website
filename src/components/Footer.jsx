import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer" aria-label="Site Footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h4>McKenzian <span style={{ fontWeight: 300 }}>Solutions</span></h4>
            <p>Precision analysis. Decisive outcomes.</p>
          </div>
          
          <div className="footer-col">
            <h5>Services</h5>
            <ul>
              <li><Link to="/services/data-analysis">Data Analysis</Link></li>
              <li><Link to="/services/logistics">Logistics & Operations</Link></li>
              <li><Link to="/work">Featured Work</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h5>Contact</h5>
            <ul>
              <li><a href="mailto:solutions@mckenzian.com">solutions@mckenzian.com</a></li>
              <li><span style={{ fontSize: "0.95rem", color: "var(--color-muted)" }}>Toronto, ON</span></li>
              <li style={{ marginTop: "1rem" }}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label="McKenzian Solutions LinkedIn Profile"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {currentYear} McKenzian Solutions. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
