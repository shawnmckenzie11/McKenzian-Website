import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

/** A computation-free resting screen while public nodeWeb training is locked. */
export const NodeWebLab = () => {
  useDocumentMetadata("nodeWeb is resting", "nodeWeb training is temporarily locked.");

  return (
    <main id="main-content" className="nodeweb-rest" aria-labelledby="nodeweb-rest-title">
      <Link to="/" className="nodeweb-rest-back">← McKenzian</Link>
      <section className="nodeweb-rest-message">
        <span className="nodeweb-rest-point" aria-hidden="true" />
        <p className="systems-overline">Training locked</p>
        <h1 id="nodeweb-rest-title">nodeWeb is resting.</h1>
        <p>Comfortably positioned on the imaginary axis.</p>
      </section>
    </main>
  );
};
