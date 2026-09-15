"use client";

import React, { useEffect, useMemo, useState } from "react";
import ThemedImage from "./ThemedImage";

const DEFAULT_DELAY = 2400;

const getSlideSrc = (slide) => (typeof slide === "string" ? slide : slide.src);
const getSlideLightSrc = (slide) =>
  typeof slide === "string" ? undefined : slide.lightSrc;

const CaseHeroCarousel = ({
  alt,
  delay = DEFAULT_DELAY,
  height = 1024,
  images,
  priority = false,
  sizes,
  width = 1648,
}) => {
  const slides = useMemo(() => images?.filter(Boolean) || [], [images]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, delay);

    return () => window.clearInterval(intervalId);
  }, [delay, slides.length]);

  if (!slides.length) {
    return null;
  }

  return (
    <div
      className="case-hero-carousel"
      style={{ "--case-hero-aspect": `${width} / ${height}`, "--case-hero-delay": `${delay}ms` }}
    >
      {slides.map((slide, index) => {
        const src = getSlideSrc(slide);
        const isActive = index === activeIndex;
        const shouldLoadEarly = priority && index < 2;

        return (
          <ThemedImage
            src={src}
            lightSrc={getSlideLightSrc(slide)}
            alt={isActive ? slide.alt || alt : ""}
            fill
            priority={shouldLoadEarly}
            loading={shouldLoadEarly ? undefined : "eager"}
            quality={100}
            aria-hidden={!isActive}
            className={`case-hero-img case-hero-carousel-img ${
              isActive ? "is-active" : ""
            }`}
            sizes={sizes}
            key={src}
          />
        );
      })}
    </div>
  );
};

export default CaseHeroCarousel;
