"use client";

import { useEffect, useRef } from "react";

const clamp = (value) => Math.min(Math.max(value, 0), 1);

const CaseScrollProgress = () => {
  const progressRef = useRef(null);

  useEffect(() => {
    const progress = progressRef.current;
    let frame = null;

    if (!progress) {
      return undefined;
    }

    const updateProgress = () => {
      frame = null;

      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = documentHeight - viewportHeight;
      const scrollProgress =
        scrollableHeight > 0 ? window.scrollY / scrollableHeight : 1;

      progress.style.setProperty(
        "--case-scroll-progress",
        clamp(scrollProgress).toString()
      );
    };

    const requestUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      className="case-progress"
      style={{ "--case-scroll-progress": 0 }}
      aria-hidden="true"
      ref={progressRef}
    />
  );
};

export default CaseScrollProgress;
