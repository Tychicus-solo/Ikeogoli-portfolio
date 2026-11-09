"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import ThemedImage from "./ThemedImage";
import useAutomaticMotion from "./useAutomaticMotion";

const DEFAULT_DELAY = 2400;
// The website viewport occupies 1440px of the 1648px hero canvas.
const WEBSITE_VIEWPORT_WIDTH_RATIO = 1440 / 1648;

const getSlideSrc = (slide) => (typeof slide === "string" ? slide : slide.src);
const getSlideLightSrc = (slide) =>
  typeof slide === "string" ? undefined : slide.lightSrc;

const CaseHeroCarousel = ({
  alt,
  delay = DEFAULT_DELAY,
  deferImages = true,
  height = 1024,
  images,
  priority = false,
  quality = 100,
  sizes,
  scrollPreview,
  width = 1648,
}) => {
  const slides = useMemo(() => images?.filter(Boolean) || [], [images]);
  // Show the image slides first; -1 is the scroll preview at the end of each loop.
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [inView, setInView] = useState(!scrollPreview);
  const carouselRef = useRef(null);
  const automaticMotion = useAutomaticMotion();
  const [loadedSlides, setLoadedSlides] = useState(() => new Set());
  const [requestedThrough, setRequestedThrough] = useState(1);
  const nextIndex = activeIndex + 1 < slides.length ? activeIndex + 1 : scrollPreview ? -1 : 0;
  const previewContentWidth = scrollPreview
    ? scrollPreview.width - 2 * (scrollPreview.cropSides || 0)
    : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { threshold: 0.15 });
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slides.length + (scrollPreview ? 1 : 0) <= 1 || !inView || !automaticMotion || (nextIndex === -1 ? !previewLoaded : !loadedSlides.has(nextIndex))) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex(nextIndex);
      setRequestedThrough(previous => Math.max(previous, nextIndex + 1));
    }, activeIndex === -1 ? scrollPreview.duration : delay);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, automaticMotion, delay, inView, loadedSlides, nextIndex, previewLoaded, scrollPreview, slides.length]);

  if (!slides.length) {
    return null;
  }

  return (
    <div
      className="case-hero-carousel"
      data-auto-paused={!automaticMotion || !inView}
      ref={carouselRef}
      style={{ "--case-hero-aspect": `${width} / ${height}`, "--case-hero-delay": `${delay}ms` }}
    >
      {scrollPreview && (!deferImages || inView || previewLoaded) && (
        <div
          className={`case-hero-website ${activeIndex === -1 ? "is-active" : ""} ${previewLoaded ? "is-playing" : ""}`}
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
              loading="eager"
              quality={scrollPreview.quality || 100}
              unoptimized={!scrollPreview.optimized}
              onLoad={() => setPreviewLoaded(true)}
            />
          </div>
        </div>
      )}
      {slides.map((slide, index) => {
        // Keep only the current and next slides downloading ahead of playback.
        if (deferImages && index > requestedThrough) return null;
        const src = getSlideSrc(slide);
        const isActive = index === activeIndex;
        const shouldLoadEarly = priority && index === 0;

        return (
          <ThemedImage
            src={src}
            lightSrc={getSlideLightSrc(slide)}
            alt={isActive ? slide.alt || alt : ""}
            fill
            preload={shouldLoadEarly}
            onLoad={() => setLoadedSlides(previous => previous.has(index) ? previous : new Set([...previous, index]))}
            loading={shouldLoadEarly ? undefined : "eager"}
            quality={quality}
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
