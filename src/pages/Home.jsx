import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { tools } from "../data/tools";

/** Display width for full-screenshot thumbnails (height follows aspect ratio). */
const CARD_THUMB_WIDTH = 100;

/**
 * Full-viewport link tree: small screenshot thumbnails and Contact, centered.
 */
export const Home = () => {
  useDocumentMetadata(
    "",
    "Academic Research and Delivery tracker."
  );

  return (
    <main id="main-content" className="linktree-page">
      <HeroAnimation />
      <div className="linktree-cluster">
        {tools.map((tool) => (
          <a
            key={tool.id}
            className={`linktree-card${tool.cardClass ? ` ${tool.cardClass}` : ""}`}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${tool.title}`}
            style={{
              "--card-w": tool.nativeWidth,
              "--card-h": tool.nativeHeight,
            }}
          >
            <img
              src={tool.image}
              alt=""
              width={CARD_THUMB_WIDTH}
              height={Math.round(CARD_THUMB_WIDTH * (tool.nativeHeight / tool.nativeWidth))}
            />
            <span>{tool.title}</span>
          </a>
        ))}
        <Link to="/contact" className="linktree-contact">
          Contact
        </Link>
      </div>
    </main>
  );
};
