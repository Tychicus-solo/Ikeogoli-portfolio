"use client";

import { ButtonSparkles } from "./ButtonEffects";
import React from "react";
import NavList from "./NavList";
import MascotImg from "../public/assets/dark mode images/portfolio-logo.svg";
import MessageIcon from "../public/assets/dark mode images/message-icon.svg";
import Image from "next/image";

const MainNav = ({ homePath = "", alwaysVisible = false }) => {
  const handleBackToTop = (event) => {
    if (homePath) return;
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };

  return (
    <nav aria-label="Main navigation" className={`main-nav flex items-center justify-between w-full px-[160px] py-[28px] ${alwaysVisible ? "is-visible" : ""}`}>
      <div className="flex flex-1 justify-start">
        <a
          href={`${homePath}#top`}
          aria-label="Ikeogoli Ishie — back to top"
          onClick={handleBackToTop}
        >
          <Image
            src={MascotImg}
            width={56}
            height={56}
            alt=""
          />
        </a>
      </div>
      <div className="flex flex-1 justify-center">
        <NavList homePath={homePath} />
      </div>
      <div className="flex flex-1 justify-end">
        <a
          className="contact-btn-main primary-button-effects"
          href="mailto:ikeogoli.ishie@gmail.com"
        >
          <ButtonSparkles />
          <span className="contact-btn-icon-window" aria-hidden="true">
            <span className="contact-btn-icon-stack">
              <Image src={MessageIcon} width={24} height={24} alt="" />
              <Image src={MessageIcon} width={24} height={24} alt="" />
            </span>
          </span>
          <span className="contact-btn-label-window">
            <span className="contact-btn-label-stack" aria-hidden="true">
              <span>Contact me</span>
              <span>Contact me</span>
            </span>
            <span className="sr-only">Contact me</span>
          </span>
        </a>
      </div>
    </nav>
  );
};

export default MainNav;
