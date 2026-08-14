"use client";

import React from "react";
import ThemedImage from "./ThemedImage";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = ({ className = "" }) => {
  const { isLight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={`theme-toggle ${isLight ? "is-light" : "is-dark"} ${className}`}
      aria-label="Toggle theme"
      aria-pressed={isLight}
      onClick={toggleTheme}
    >
      <span className="theme-toggle-icon theme-toggle-icon-sun" aria-hidden="true">
        <ThemedImage src="/assets/dark mode images/figma/theme/sun.svg" alt="" width={32} height={32} className="theme-toggle-img" />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon-moon" aria-hidden="true">
        <ThemedImage src="/assets/dark mode images/figma/theme/moon.svg" alt="" width={32} height={32} className="theme-toggle-img" />
      </span>
      <span className="theme-toggle-knob" aria-hidden="true">
        <ThemedImage src="/assets/dark mode images/figma/theme/ellipse.svg" alt="" width={48} height={48} className="theme-toggle-img" />
      </span>
    </button>
  );
};

export default ThemeToggle;
