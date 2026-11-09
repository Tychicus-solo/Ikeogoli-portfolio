"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  document.addEventListener("visibilitychange", callback);
  window.addEventListener("motionpreferencechange", callback);
  return () => {
    media.removeEventListener("change", callback);
    document.removeEventListener("visibilitychange", callback);
    window.removeEventListener("motionpreferencechange", callback);
  };
}

function getSnapshot() {
  return !document.hidden && document.documentElement.dataset.motionPaused !== "true" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function useAutomaticMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
