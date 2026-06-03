import React from "react";

export const CapabilitiesTicker = () => {
  const capabilities = [
    "Research Databases",
    "Biostatistics Processing",
    "Rental Market Dashboards",
    "Housing Analytics",
    "Delivery Tracking",
    "Custom Data Pipelines",
    "Quantitative Research",
    "Logistics Intelligence"
  ];

  // Repeat the list to create a seamless infinite loop scrolling effect
  const repeatedCapabilities = [...capabilities, ...capabilities, ...capabilities];

  return (
    <div className="ticker-container" aria-label="Capabilities Overview">
      <div className="ticker-track">
        {repeatedCapabilities.map((cap, index) => (
          <span key={index} className="ticker-item">
            {index > 0 && <span className="ticker-bullet">•</span>}
            {cap}
          </span>
        ))}
      </div>
    </div>
  );
};
