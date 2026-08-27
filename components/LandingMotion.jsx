"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LandingMotion = () => {
  useEffect(() => {
    const setMainNavVisible = (visible) => {
      document.querySelector(".main-nav")?.classList.toggle("is-visible", visible);
      document.querySelector(".hero-nav-desktop")?.classList.toggle("is-hidden", visible);
    };

    const getMainNavHeight = () => {
      const mainNav = document.querySelector(".main-nav");

      return mainNav?.offsetHeight || 112;
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const root = document.querySelector(".landing-page");

    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".selected-works-section",
        start: () => `top ${getMainNavHeight()}px`,
        end: "max",
        invalidateOnRefresh: true,
        onEnter: () => setMainNavVisible(true),
        onEnterBack: () => setMainNavVisible(true),
        onLeaveBack: () => setMainNavVisible(false),
        onRefresh: (self) => setMainNavVisible(self.isActive),
      });

      if (reduceMotion) {
        return;
      }

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
    }, root);

    return () => context.revert();
  }, []);

  return null;
};

export default LandingMotion;
