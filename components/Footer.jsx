"use client";

import Image from "next/image";
import React, { useRef } from "react";
import BackToTopArrow from "../public/assets/dark mode images/figma/icons/back-to-top-arrow.svg";
import PortfolioLogo from "../public/assets/dark mode images/portfolio-logo.svg";
import ThemedImage from "./ThemedImage";

const SOCIAL_LINKS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
  },
];

const Footer = () => {
  const scrollAnimationRef = useRef(null);

  const handleBackToTop = (event) => {
    event.preventDefault();

    if (scrollAnimationRef.current) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const start = window.scrollY;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || start <= 0) {
      window.scrollTo(0, 0);
      window.history.replaceState(null, "", "#top");
      return;
    }

    const duration = 700;
    const startTime = window.performance.now();
    const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      window.scrollTo(0, start * (1 - eased));

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(tick);
      } else {
        scrollAnimationRef.current = null;
        window.history.replaceState(null, "", "#top");
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(tick);
  };

  return (
    <footer className="footer-section md:pb-[320px]">
      <a className="footer-back" href="#top" onClick={handleBackToTop}>
        Back to top
        <span className="footer-back-icon" aria-hidden="true">
          <Image
            src={BackToTopArrow}
            width={9}
            height={14}
            alt=""
            aria-hidden="true"
          />
        </span>
      </a>

      <nav className="footer-socials" aria-label="Social links">
        {SOCIAL_LINKS.map((link) => (
          <a href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="footer-avatars">
        <a
          className="footer-avatar-link footer-avatar-link--credit"
          href="https://x.com/the_Tychicus"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Built by Eniolorunda Toluwanimi on X"
        >
          <span className="footer-credit" aria-hidden="true">
            <span>Built by Eniolorunda Toluwanimi</span>
            <span>@the_Tychicus</span>
          </span>
          <span className="footer-avatar footer-avatar-photo">
            <ThemedImage
              src="/assets/dark mode images/figma/footer-avatar.png"
              fill
              sizes="48px"
              alt=""
            />
          </span>
        </a>
        <a
          className="footer-avatar-link footer-avatar-link--owner"
          href="https://x.com/ikeogoliishie"
          aria-label="Ikeogoli Ishie portfolio"
        >
          <span className="footer-credit" aria-hidden="true">
            <span>Ikeogoli Ishie</span>
            <span>@ikeogoliishie</span>
          </span>
          <span className="footer-avatar footer-avatar-logo">
            <Image src={PortfolioLogo} width={48} height={48} alt="" />
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
