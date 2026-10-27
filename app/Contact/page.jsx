"use client";

import Image from "next/image";
import { ButtonSparkles, FlipLabel } from "../../components/ButtonEffects";
import React, { useState } from "react";
import { ThemedImage } from "../../components";
import CopyIcon from "../../public/assets/dark mode images/copy-icon.svg";
import MessageIcon from "../../public/assets/dark mode images/message-icon.svg";

const EMAIL = "ikeogoli.ishie@gmail.com";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="contact-header">
        <div className="contact-status">
          <span />
          <span className="available-label-window">
            <FlipLabel>Available for work</FlipLabel>
          </span>
        </div>
        <h2 className="contact-title" id="contact-title">
          To talk about potential projects and collaboration, you can reach out
          to me.
        </h2>
        <ThemedImage
          src="/assets/dark mode images/left-wreath.svg"
          lightSrc="/assets/light mode images/left-wreath-light.svg"
          width={85}
          height={131}
          alt=""
          className="contact-wreath contact-wreath-left"
          aria-hidden="true"
        />
        <ThemedImage
          src="/assets/dark mode images/right-wreath.svg"
          lightSrc="/assets/light mode images/right-wreath-light.svg"
          width={85}
          height={131}
          alt=""
          className="contact-wreath contact-wreath-right"
          aria-hidden="true"
        />
      </div>

      <div className="contact-actions">
        <a className="contact-email primary-button-effects" href={`mailto:${EMAIL}`}>
          <ButtonSparkles />
          <span className="contact-email-icon-window" aria-hidden="true">
            <span className="contact-email-icon-stack">
              <Image src={MessageIcon} width={20} height={20} alt="" />
              <Image src={MessageIcon} width={20} height={20} alt="" />
            </span>
          </span>
          <span className="contact-email-label-window">
            <span className="contact-email-label-stack" aria-hidden="true">
              <span>{EMAIL}</span>
              <span className="underline">{EMAIL}</span>
            </span>
            <span className="sr-only">{EMAIL}</span>
          </span>
        </a>
        <button
          className={`cursor-pointer contact-copy ${copied ? "is-copied" : ""}`}
          type="button"
          aria-label={copied ? "Email copied" : "Copy email address"}
          onClick={handleCopy}
        >
          <span className="copy-icon-window cursor-pointer" aria-hidden="true">
            <span className="copy-icon-stack">
              <Image src={CopyIcon} width={24} height={24} alt="" />
              <Image src={CopyIcon} width={24} height={24} alt="" />
            </span>
          </span>
          <span className="contact-copy-success" aria-hidden={!copied}>
            <svg
              className="contact-copy-check"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="10" fill="#1dd78d" />
              <path d="m6 10 3 3 5-7" stroke="#091225" strokeWidth="2" />
            </svg>
            <span>Email copied!</span>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Contact;
