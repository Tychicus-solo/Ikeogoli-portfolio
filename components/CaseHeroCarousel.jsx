"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ThemedImage from "./ThemedImage";

const DEFAULT_DELAY = 2400;
// The website viewport occupies 1440px of the 1648px hero canvas.
const WEBSITE_VIEWPORT_WIDTH_RATIO = 1440 / 1648;

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
  scrollPreview,
  width = 1648,
}) => {
  const slides = useMemo(() => images?.filter(Boolean) || [], [images]);
  const [activeIndex, setActiveIndex] = useState(scrollPreview ? -1 : 0);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [inView, setInView] = useState(!scrollPreview);
  const carouselRef = useRef(null);
  const previewContentWidth = scrollPreview
    ? scrollPreview.width - 2 * (scrollPreview.cropSides || 0)
    : 0;

  useEffect(() => {
    if (!scrollPreview) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, [scrollPreview]);

  useEffect(() => {
    if (slides.length + (scrollPreview ? 1 : 0) <= 1 || !inView || (scrollPreview && !previewLoaded) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((index) => index + 1 < slides.length ? index + 1 : scrollPreview ? -1 : 0);
    }, activeIndex === -1 ? scrollPreview.duration : delay);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, delay, inView, previewLoaded, scrollPreview, slides.length]);

  if (!slides.length) {
    return null;
  }

  return (
    <div
      className="case-hero-carousel"
      ref={carouselRef}
      style={{ "--case-hero-aspect": `${width} / ${height}`, "--case-hero-delay": `${delay}ms` }}
    >
      {scrollPreview && (
        <div
          className={`case-hero-website ${activeIndex === -1 ? "is-active" : ""} ${inView && previewLoaded ? "is-playing" : ""}`}
          aria-hidden={activeIndex !== -1}
          style={{
            "--website-scroll-duration": `${scrollPreview.duration}ms`,
            "--website-preview-background": scrollPreview.backgroundColor,
            "--website-scroll-end": `${(height / (width * WEBSITE_VIEWPORT_WIDTH_RATIO) * previewContentWidth / scrollPreview.height - 1 + (scrollPreview.cropTop || 0) / scrollPreview.height) * 100}%`,
            "--website-crop-top": `${-(scrollPreview.cropTop || 0) / previewContentWidth * 100}%`,
            "--website-page-width": `${scrollPreview.width / previewContentWidth * 100}%`,
            "--website-page-offset": `${-(scrollPreview.cropSides || 0) / previewContentWidth * 100}%`,
          }}
        >
          <div className="case-hero-website-viewport">
            <Image
              src={scrollPreview.src}
              width={scrollPreview.width}
              height={scrollPreview.height}
              alt={`${alt} — website preview`}
              className="case-hero-website-page"
              sizes={sizes}
              priority={priority}
              quality={100}
              unoptimized
              onLoad={() => setPreviewLoaded(true)}
            />
          </div>
        </div>
      )}
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
