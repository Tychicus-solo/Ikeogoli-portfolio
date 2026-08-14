"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);
const STORAGE_KEY = "ikeogoli-theme";

export const toLightModeAsset = (src) => {
  if (typeof src !== "string") {
    return src;
  }

  return src.replace("/assets/dark mode images/", "/assets/light mode images/");
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
      window.requestAnimationFrame(() => setTheme(savedTheme));
    }
  }, []);

  const applyTheme = useCallback((nextTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem(STORAGE_KEY, nextTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [applyTheme, theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "light" ? "dark" : "light";
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const updateTheme = () => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      applyTheme(nextTheme);
    };

    if (!document.startViewTransition || prefersReducedMotion) {
      updateTheme();
      return;
    }

    document.documentElement.classList.add("theme-transitioning");

    const transition = document.startViewTransition(updateTheme);

    transition.finished.finally(() => {
      document.documentElement.classList.remove("theme-transitioning");
    });
  }, [applyTheme, theme]);

  const getThemedAsset = useCallback(
    (src, lightSrc) => {
      if (theme !== "light") {
        return src;
      }

      return lightSrc || toLightModeAsset(src);
    },
    [theme]
  );

  const value = useMemo(
    () => ({
      getThemedAsset,
      isLight: theme === "light",
      theme,
      toggleTheme,
    }),
    [getThemedAsset, theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
};
