import React from "react";
import { Link } from "react-router-dom";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";
import { HeroAnimation } from "../components/HeroAnimation";
import { tools } from "../data/tools";

/** Display width for screenshot thumbnails; height matches delivery aspect ratio. */
const CARD_THUMB_WIDTH = 100;
const CARD_THUMB_HEIGHT = Math.round(CARD_THUMB_WIDTH * (698 / 460));

/**
 * Full-viewport link tree: brand, tool thumbnails with More links, Contact below.
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
              <div
                className={`linktree-card${tool.cardClass ? ` ${tool.cardClass}` : ""}`}
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
              </div>
              <Link
                to={`/more/${tool.id}`}
                className="linktree-more"
                aria-label={`More about ${tool.title}`}
              >
                More
              </Link>
            </div>
          ))}
        </div>
        <Link to="/contact" className="linktree-contact">
          Contact
        </Link>
      </div>
    </main>
  );
};
