import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { tools } from "../data/tools";

/** Display width for screenshot thumbnails; height matches delivery aspect ratio. */
const CARD_THUMB_WIDTH = 100;
const CARD_THUMB_HEIGHT = Math.round(CARD_THUMB_WIDTH * (698 / 460));

/**
 * Full-viewport link tree: thumbnail opens More page; More opens live tool.
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
        <span className="linktree-brand">McKenzian Solutions</span>
        <div className="linktree-row">
          {tools.map((tool) => (
            <div key={tool.id} className="linktree-item">
              <Link
                to={`/more/${tool.id}`}
                className={`linktree-card${tool.cardClass ? ` ${tool.cardClass}` : ""}`}
                aria-label={`More about ${tool.title}`}
                style={{
                  "--card-w": tool.nativeWidth,
                  "--card-h": tool.nativeHeight,
                }}
              >
                <img
                  src={tool.image}
                  alt=""
                  width={CARD_THUMB_WIDTH}
                  height={CARD_THUMB_HEIGHT}
                />
              </Link>
              <a
                className="linktree-more"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${tool.title}`}
              >
                More
              </a>
            </div>
          ))}
        </div>
        <Link to="/contact" className="linktree-contact linktree-cta">
          Get Started
        </Link>
      </div>
    </main>
  );
};
