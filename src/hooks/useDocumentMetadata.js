import { useEffect } from "react";

export const useDocumentMetadata = (title, description) => {
  useEffect(() => {
    // Update Document Title
    const baseTitle = "McKenzian Solutions";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateOGTag("og:title", title ? `${title} | ${baseTitle}` : baseTitle);
    if (description) {
      updateOGTag("og:description", description);
    }
  }, [title, description]);
};
