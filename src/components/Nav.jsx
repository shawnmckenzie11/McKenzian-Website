import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./Button";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className={`sticky-header ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-container">
          <Link to="/" className="logo-link" aria-label="McKenzian Solutions Home">
            McKenzian <span style={{ fontWeight: 300 }}>Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links" aria-label="Main Navigation">
            <Link to="/" className={isActive("/") ? "active" : ""}>
              Home
            </Link>
            <Link to="/services" className={isActive("/services") ? "active" : ""}>
              Services
            </Link>
            <Link to="/work" className={isActive("/work") ? "active" : ""}>
              Work
            </Link>
            <Link to="/about" className={isActive("/about") ? "active" : ""}>
              About
            </Link>
            <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
              Contact
            </Link>
            <Button to="/contact" variant="ghost" className="nav-cta">
              Book a Call
            </Button>
          </nav>

          {/* Mobile Hamburguer Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} aria-label="Mobile Navigation">
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
          <Link to="/services" className={isActive("/services") ? "active" : ""}>
            Services
          </Link>
          <Link to="/work" className={isActive("/work") ? "active" : ""}>
            Work
          </Link>
          <Link to="/about" className={isActive("/about") ? "active" : ""}>
            About
          </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}>
            Contact
          </Link>
        </div>
      </header>

      {/* Sticky Bottom Bar on Mobile */}
      <div className="mobile-sticky-cta" aria-hidden="false">
        <Button to="/contact" variant="solid" className="btn-solid" ariaLabel="Book a Strategy Call">
          Book a Strategy Call
        </Button>
      </div>
    </>
  );
};
