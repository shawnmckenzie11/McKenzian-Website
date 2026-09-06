import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { getToolSummary } from "../data/toolSummaries";

/**
 * Tool explainer page: Back, scrollable summary card, Contact.
 */
export const ToolMore = () => {
  const { id } = useParams();
  const summary = getToolSummary(id);

  useDocumentMetadata(
    summary?.title ?? "More",
    summary?.summary ?? "Project summary."
  );

  if (!summary) {
    return <Navigate to="/" replace />;
  }

  return (
    <main id="main-content" className="linktree-page linktree-page--more">
      <HeroAnimation />
      <div className="more-stack">
        <Link to="/" className="linktree-contact">
          Back
        </Link>

        <article className="more-card" aria-labelledby="more-title">
          <h1 id="more-title" className="more-card-title">
            {summary.title}
          </h1>
          <p className="more-card-lead">{summary.summary}</p>

          <section className="more-section">
            <h2>Problem</h2>
            <p>{summary.problem}</p>
          </section>

          <section className="more-section">
            <h2>Approach</h2>
            <ul>
              {summary.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="more-section">
            <h2>Result</h2>
            <p>{summary.result}</p>
          </section>

          <p className="more-live-link">
            <a href={summary.liveUrl} target="_blank" rel="noopener noreferrer">
              Open live tool →
            </a>
          </p>
        </article>

        <Link to="/contact" className="linktree-contact">
          Contact
        </Link>
      </div>
    </main>
  );
};
