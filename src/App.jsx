import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { ToolMore } from "./pages/ToolMore";
import { MARKETING } from "./config/marketing";

import "./styles/globals.css";

if (typeof window !== "undefined" && MARKETING.ga4Id && MARKETING.ga4Id !== "G-XXXXXXXXXX") {
  if (window.gtag) {
    window.gtag("config", MARKETING.ga4Id, { send_page_view: false });
  }
}

/**
 * Scrolls to top and records a page view on hash-route changes.
 */
const RouteHandler = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.hash,
        page_title: document.title,
      });
    }
  }, [location]);

  return null;
};

/**
 * Public routes: home, contact, everything else redirects home.
 */
const AppChrome = () => {
  return (
    <div className="shell-home">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more/:id" element={<ToolMore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/nodeweb-lab" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  useEffect(() => {
    try {
      const utmParams = {};
      const urlParams = new URLSearchParams(window.location.search);

      const hashParts = window.location.hash.split("?");
      const hashParams = hashParts.length > 1 ? new URLSearchParams(hashParts[1]) : new URLSearchParams();

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
      }
    } catch (e) {
      console.warn("Failed capturing UTM parameters:", e);
    }
  }, []);

  return (
    <Router>
      <RouteHandler />
      <AppChrome />
    </Router>
  );
}
