import { Database, Truck, BarChart3 } from "lucide-react";

export const services = [
  {
    id: "data-analysis",
    title: "Data Analysis & Engineering",
    shortDesc: "We build custom research databases, biostatistics pipelines, and housing dashboards that transform raw logs into actionable intelligence.",
    iconName: "Database",
    path: "/services/data-analysis",
    benefits: [
      "Custom PostGIS-enabled database schemas for geographic and rental analytics",
      "Robust data scraping, parsing, and semantic pgvector database indexing pipelines",
      "Automated biostatistics cleaning and academic ingestion applications"
    ]
  },
  {
    id: "logistics",
    title: "Logistics & Operations",
    shortDesc: "We implement real-time delivery tracking systems, route optimization algorithms, and dispatch alerts to keep shipments accounted for.",
    iconName: "Truck",
    path: "/services/logistics",
    benefits: [
      "API integrations unifying data across multiple third-party courier APIs",
      "Real-time geographical tracking dashboards with active Leaflet mapping",
      "Automated SMS/email alert triggers for exception tracking and SLA preservation"
    ]
  },
  {
    id: "custom-research",
    title: "Custom Quantitative Research",
    shortDesc: "We engineer customized statistical pipelines and model-based integrations for unique, domain-specific operations.",
    iconName: "BarChart3",
    path: "/contact",
    benefits: [
      "Faceted academic paper scraper systems with integrated citation exporters",
      "Predictive vector scoring models tracking data-point state transitions",
      "Zero-trust secure cloud tunnels hosting local SQLite structures without exposure"
    ]
  }
];
