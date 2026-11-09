"use client";

import Image from "next/image";
import React, { useId, useRef, useState } from "react";
import { NAV_LINKS } from "../constants/heroconstants";
import PortfolioLogo from "../public/assets/dark mode images/portfolio-logo.svg";
import ContactMeBtn from "./ContactMeBtn";
import NavList from "./NavList";

const SOCIAL_LINKS = [
  { label: "X (Twitter)", href: "https://x.com/ikeogoliishie" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
];

const MobileMenuLink = ({ href, isOpen, label, onClick }) => {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={onClick}
      tabIndex={isOpen ? 0 : -1}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
    >
      <span className="mobile-menu-label-window">
        <span className="mobile-menu-label-stack" aria-hidden="true">
          <span>{label}</span>
          <span>{label}</span>
        </span>
        <span className="sr-only">{label}</span>
      </span>
    </a>
  );
};

const HeroNavigation = ({ mobile = false, homePath = "" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef(null);
  const closeMenu = () => {
    setIsMenuOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  };

  const handleBackToTop = (event) => {
    if (homePath) return;
    event.preventDefault();
    setIsMenuOpen(false);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <>
      {!mobile && <div className="hero-nav-desktop flex items-center w-full justify-between">
        <p className="hero-name font-inter font-medium text-[20px] leading-[32px] tracking-normal text-neutral-250 ">
          Ikeogoli Ishie
        </p>
        <NavList homePath={homePath} />
      </div>}

      {mobile && <div className="hero-nav-mobile" onKeyDown={(event) => {
        if (event.key === "Escape" && isMenuOpen) {
          event.preventDefault();
          closeMenu();
        }
      }}>
        <div className="mobile-nav-header">
          <a className="mobile-nav-logo" href={`${homePath}#top`} aria-label="Ikeogoli Ishie — back to top" onClick={handleBackToTop}>
            <Image src={PortfolioLogo} width={48} height={48} alt="" />
          </a>
          <button
            className={`mobile-menu-button ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            ref={menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div id={menuId} inert={!isMenuOpen} className={`mobile-menu-panel ${isMenuOpen ? "is-open" : ""}`} aria-hidden={!isMenuOpen}>
          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <MobileMenuLink
                href={link.href.startsWith("#") ? `${homePath}${link.href}` : link.href}
                isOpen={isMenuOpen}
                key={link.label}
                label={link.label}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </nav>
          <div className="mobile-menu-divider" />
          <div className="mobile-menu-socials">
            <p>Connect with me</p>
            {SOCIAL_LINKS.map((link) => (
              <a href={link.href} key={link.label} tabIndex={isMenuOpen ? 0 : -1}>
                {link.label}
              </a>
            ))}
          </div>
          <div className="mobile-menu-divider" />
          <ContactMeBtn tabIndex={isMenuOpen ? 0 : -1} />
        </div>
      </div>}
    </>
  );
};

export default HeroNavigation;
