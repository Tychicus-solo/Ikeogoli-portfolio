import { ButtonSparkles } from "./ButtonEffects";
import React from "react";
import MessageIcon from "../public/assets/dark mode images/message-icon.svg";
import Image from "next/image";

const ContactMeBtn = ({ tabIndex }) => {
  return (
    <a className="contact-btn primary-button-effects" href="mailto:ikeogoli.ishie@gmail.com" tabIndex={tabIndex}>
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
  );
};

export default ContactMeBtn;
