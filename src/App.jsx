import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

// Pages
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { DataAnalysis } from "./pages/DataAnalysis";
import { Logistics } from "./pages/Logistics";
import { Work } from "./pages/Work";
import { CaseStudyDetail } from "./pages/CaseStudyDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";

import "./styles/globals.css";

// Helper component to handle route changes: Scroll to Top, track Analytics, set up Scroll Reveals
const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // 1. Scroll to top on route change
    window.scrollTo(0, 0);

    // 2. Track Page View in Google Analytics
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.hash,
        page_title: document.title,
      });
    }
  }, [location]);

  useEffect(() => {
    // 3. Scroll Reveals using IntersectionObserver (disabled if prefers-reduced-motion is active)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target); // Trigger only once
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = document.querySelectorAll(".reveal-element");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [location]); // Re-observe new elements after route switches

  return null;
};

export default function App() {
  // Capture UTM parameters on initial load and store them in sessionStorage
  useEffect(() => {
    try {
      const utmParams = {};
      const urlParams = new URLSearchParams(window.location.search);
      
      // Also extract from hash if they are appended to the hash route (e.g. /#/services?utm_source=xyz)
      const hashParts = window.location.hash.split("?");
      const hashParams = hashParts.length > 1 ? new URLSearchParams(hashParts[1]) : new URLSearchParams();

      // Collect all parameters starting with utm_
      for (const [key, value] of urlParams.entries()) {
        if (key.toLowerCase().startsWith("utm_")) {
          utmParams[key] = value;
        }
      }
      for (const [key, value] of hashParams.entries()) {
        if (key.toLowerCase().startsWith("utm_")) {
          utmParams[key] = value;
        }
      }

      if (Object.keys(utmParams).length > 0) {
        sessionStorage.setItem("mckenzian_utm_params", JSON.stringify(utmParams));
        console.log("Captured UTM parameters:", utmParams);
      }
    } catch (e) {
      console.warn("Failed capturing UTM parameters:", e);
    }
  }, []);

  return (
    <Router>
      <RouteHandler />
      <Nav />
      <div style={{ flex: 1, paddingTop: "80px" }}> {/* Offset for sticky nav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/data-analysis" element={<DataAnalysis />} />
          <Route path="/services/logistics" element={<Logistics />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
