"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const LandingMotion = ({ children }) => {
  const rootRef = useRef(null);

  useGSAP(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const setMainNavVisible = (visible) => {
      const shouldShowMainNav = Boolean(visible);
      root.querySelector(".main-nav")?.classList.toggle("is-visible", shouldShowMainNav);
      root.querySelector(".hero-nav-desktop")?.classList.toggle("is-hidden", shouldShowMainNav);
    };

    const getMainNavHeight = () => {
      const mainNav = root.querySelector(".main-nav");

      return mainNav?.offsetHeight || 112;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const works = root.querySelector(".selected-works-section");
    let navFrame = null;
    const syncNavigation = () => {
      navFrame = null;
      setMainNavVisible(
        window.scrollY > 0 &&
          works !== null &&
          works.getBoundingClientRect().top <= getMainNavHeight()
      );
    };
    const scheduleNavigationSync = () => {
      if (navFrame === null) {
        navFrame = window.requestAnimationFrame(syncNavigation);
      }
    };

    // Use the rendered layout, independent of ScrollTrigger initialization.
    syncNavigation();
    scheduleNavigationSync();
    window.addEventListener("scroll", scheduleNavigationSync, { passive: true });
    window.addEventListener("resize", scheduleNavigationSync);
    window.addEventListener("pageshow", scheduleNavigationSync);
    window.addEventListener("load", scheduleNavigationSync);
    const navResizeObserver = new ResizeObserver(scheduleNavigationSync);
    [root, root.querySelector(".hero-section"), root.querySelector(".main-nav")]
      .filter(Boolean)
      .forEach((element) => navResizeObserver.observe(element));

    const cleanupNavigation = () => {
      window.removeEventListener("scroll", scheduleNavigationSync);
      window.removeEventListener("resize", scheduleNavigationSync);
      window.removeEventListener("pageshow", scheduleNavigationSync);
      window.removeEventListener("load", scheduleNavigationSync);
      navResizeObserver.disconnect();
      if (navFrame !== null) window.cancelAnimationFrame(navFrame);
      setMainNavVisible(false);
    };

    if (reduceMotion) return cleanupNavigation;

    const revealItems = gsap.utils.toArray(
      [
        ".section-header",
        ".stack-tools-panel",
        ".experience-copy",
        ".experience-item",
        ".ui-gallery-item",
        ".about-copy",
        ".about-photo",
        ".contact-header",
        ".contact-actions",
        ".footer-section",
      ].join(", ")
    );

    revealItems.forEach((item) => {
      gsap.fromTo(
        item,
        {
          autoAlpha: 0,
          y: 34,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.72,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: item,
            start: "top 86%",
            once: true,
          },
        }
      );
    });

    gsap.utils.toArray(".selected-work-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          autoAlpha: 0,
          y: 42,
          filter: "blur(10px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.78,
          delay: (index % 2) * 0.08,
          ease: "power3.out",
          clearProps: "filter",
          scrollTrigger: {
            trigger: card,
            start: "top 84%",
            once: true,
          },
        }
      );
    });

    gsap.utils.toArray(".selected-work-media, .ui-gallery-item").forEach((frame) => {
      gsap.fromTo(
        frame,
        {
          clipPath: "inset(7% 0% 7% 0% round 16px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: frame,
            start: "top 88%",
            once: true,
          },
        }
      );
    });

    gsap.utils.toArray(".selected-work-img, .ui-gallery-img, .about-photo-img").forEach((image) => {
      gsap.fromTo(
        image,
        { yPercent: -4, scale: 1.04 },
        {
          yPercent: 4,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".selected-work-media, .ui-gallery-item, .about-photo") || image,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.7,
          },
        }
      );
    });

    gsap.to(".main-nav .nav-list", {
      y: -4,
      boxShadow: "0 18px 42px rgba(11, 15, 26, 0.18)",
      ease: "none",
      scrollTrigger: {
        trigger: ".main-nav",
        start: "top top",
        end: "+=180",
        scrub: true,
      },
    });

    gsap.to(".contact-wreath-left", {
      y: -22,
      rotation: -5,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    gsap.to(".contact-wreath-right", {
      y: -22,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return cleanupNavigation;
  }, { scope: rootRef });

  return (
    <div className="landing-page" id="top" ref={rootRef}>
      {children}
    </div>
  );
};

export default LandingMotion;
