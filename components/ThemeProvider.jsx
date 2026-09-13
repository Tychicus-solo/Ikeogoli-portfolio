"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
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

  useLayoutEffect(() => {
    // The head script applies the saved theme before paint. Synchronize React
    // before hydration paints without writing the default theme to storage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const applyTheme = useCallback((nextTheme) => {
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Theme switching still works when browser storage is unavailable.
    }
  }, []);

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
