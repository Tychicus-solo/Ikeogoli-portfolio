"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "./ThemeProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function TestimonialGlow() {
  const glowRef = useRef(null);
  const { isLight } = useTheme();

  useGSAP(() => {
    // The light-mode shading must be visible immediately, including when
    // switching themes while the testimonials are already pinned.
    if (isLight) return;

    const glow = glowRef.current;
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(glow.querySelector(".testimonial-glow-reveal"), {
        opacity: 0,
        y: 48,
        scale: 0.97,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: glow.closest(".testimonials-section"),
          start: "top 95%",
          once: true,
        },
      });
    });

    return () => media.revert();
  }, { scope: glowRef, dependencies: [isLight], revertOnUpdate: true });

  return (
    <div className="testimonial-glow" ref={glowRef} aria-hidden="true">
      <div className="testimonial-glow-reveal">
        <div className="testimonial-glow-shape">
          <Image
            className="testimonial-glow-art testimonial-glow-art--dark"
            src="/assets/figma/glow/testimonial-dark.svg"
            alt=""
            width={2425.42}
            height={2258.23}
            loading="eager"
            unoptimized
          />
          <Image
            className="testimonial-glow-art testimonial-glow-art--light"
            src="/assets/figma/glow/testimonial-light.svg"
            alt=""
            width={2425.42}
            height={2258.23}
            loading="eager"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
