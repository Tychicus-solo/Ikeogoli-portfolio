"use client";

import { useEffect, useState } from "react";
import useAutomaticMotion from "./useAutomaticMotion";

export default function AccessibilityControls() {
  const [paused, setPaused] = useState(false);
  const automaticMotion = useAutomaticMotion();
  useEffect(() => {
    document.documentElement.dataset.autoMotionPaused = String(!automaticMotion);
  }, [automaticMotion]);
  useEffect(() => {
    document.documentElement.dataset.motionPaused = String(paused);
    window.dispatchEvent(new Event("motionpreferencechange"));
  }, [paused]);
  return <div className="accessibility-controls">
    <a href="#main-content">Skip to content</a>
    <button type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>
      {paused ? "Resume automatic motion" : "Pause automatic motion"}
    </button>
  </div>;
}
