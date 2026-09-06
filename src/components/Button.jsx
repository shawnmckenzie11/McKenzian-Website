import React from "react";
import { Link } from "react-router-dom";

export const Button = ({
  children,
  to,
  href,
  variant = "solid", // solid, ghost, dark, white
  onClick,
  type = "button",
  ariaLabel,
  className = "",
  external = false,
  disabled = false,
}) => {
  const getUTMLink = (url) => {
    try {
      const stored = sessionStorage.getItem("mckenzian_utm_params");
      if (!stored) return url;
      
      const utm = JSON.parse(stored);
      if (Object.keys(utm).length === 0) return url;
      
      const urlObj = new URL(url, window.location.origin);
      Object.entries(utm).forEach(([key, val]) => {
        urlObj.searchParams.set(key, val);
      });
      return urlObj.toString();
    } catch (e) {
      console.warn("Failed parsing UTM parameters:", e);
      return url;
    }
  };

  const btnClass = `btn btn-${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={btnClass} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    const finalHref = external || href.startsWith("http") ? getUTMLink(href) : href;
    return (
      <a
        href={finalHref}
        className={btnClass}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={btnClass}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
