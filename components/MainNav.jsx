import React from "react";
import NavList from "./NavList";
import MascotImg from "../public/assets/dark mode images/portfolio-logo.svg";
import MessageIcon from "../public/assets/dark mode images/message-icon.svg";
import Image from "next/image";

const MainNav = () => {
  return (
    <div className="main-nav flex items-center justify-between w-full px-[160px] py-[28px]">
      <div className="flex flex-1 justify-start">
        <Image
          src={MascotImg}
          width={56}
          height={56}
          alt="Ike Ogoli portfolio logo"
        />
      </div>
      <div className="flex flex-1 justify-center">
        <NavList />
      </div>
      <div className="flex flex-1 justify-end">
        <a
          className="contact-btn-main"
          href="mailto:ikeogoli.ishie@gmail.com"
        >
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
    </div>
  );
};

export default MainNav;
