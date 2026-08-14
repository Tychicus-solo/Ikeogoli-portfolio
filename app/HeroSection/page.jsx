

import React from "react";
import PortfolioLogo from "../../public/assets/dark mode images/portfolio-logo.svg"
import Image from "next/image";
import {
  HeroNavigation,
  ContactMeBtn,
  Tags,
  ThemeToggle,
  TrustedBrands,
  WorkScrollMask,
} from "../../components";


const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="left-col">
        <HeroNavigation />
        <div className="hero-copy">
          <Image src={PortfolioLogo} width={88} height={88} alt="Ike Ogoli portfolio logo" />
          <div className="mt-[40px]">
            <h1 className="header-text">
              Phenomenal Product <br /> designer
            </h1>
            <h3 className="mt-[16px] text-white font-medium text-[20px] leading-[32px] tracking-normal font-suisse">
              Creating impactful web and mobile experiences that drive <br />{" "}
              business growth through human-centered solutions.
            </h3>
          </div>
          <div className="mt-[40px] flex gap-x-[24px]">
            <ContactMeBtn />
            <Tags />
          </div>
        </div>
        <TrustedBrands />
      </div>
      <div className="right-col">
        <WorkScrollMask />
      </div>
      <ThemeToggle className="theme-toggle-hero" />

    </section>
  );
};

export default HeroSection;
