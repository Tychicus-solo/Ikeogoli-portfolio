"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const emptyCode = () => Array(6).fill("");

export default function RaanaaOTP() {
  const [digits, setDigits] = useState(emptyCode);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const inputs = useRef([]);
  const id = useId();
  const focus = index => { inputs.current[index]?.focus(); inputs.current[index]?.select(); };
  const resetFeedback = () => { setStatus("idle"); setMessage(""); };

  const enterDigits = (raw, index) => {
    const incoming = raw.replace(/\D/g, "").slice(0, 6);
    if (!incoming) return;
    const start = incoming.length === 6 ? 0 : index;
    setDigits(current => {
      const next = [...current];
      incoming.split("").forEach((digit, offset) => { if (start + offset < 6) next[start + offset] = digit; });
      return next;
    });
    resetFeedback();
    focus(Math.min(start + incoming.length, 5));
  };
  const clearDigit = index => {
    setDigits(current => current.map((digit, position) => position === index ? "" : digit));
    resetFeedback();
  };
  const verify = event => {
    event.preventDefault();
    if (digits.some(digit => !digit)) {
      setStatus("error");
      setMessage("Enter all 6 digits.");
      focus(digits.findIndex(digit => !digit));
    } else if (digits.join("") !== "123456") {
      setStatus("error");
      setMessage("You entered a wrong PIN.");
      setDigits(emptyCode());
      focus(0);
    } else {
      setStatus("success");
      setMessage("Code verified.");
    }
  };

  return <form className="raanaa-otp" data-status={status} onSubmit={verify}>
    <div className="raanaa-otp-content">
      <span className="raanaa-otp-label" id={`${id}-label`}>Enter the 6-digit code</span>
      <div className="raanaa-otp-slots" role="group" aria-labelledby={`${id}-label`}>
        {digits.map((digit, index) => <input key={index} ref={element => { inputs.current[index] = element; }}
          type="text" inputMode="numeric" autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={6} value={digit} aria-label={`Digit ${index + 1} of 6`}
          aria-describedby={`${id}-message`} aria-invalid={status === "error"}
          onFocus={event => event.target.select()}
          onChange={event => event.target.value ? enterDigits(event.target.value, index) : clearDigit(index)}
          onPaste={event => { event.preventDefault(); enterDigits(event.clipboardData.getData("text"), index); }}
          onKeyDown={event => {
            if (event.key === "Backspace") {
              event.preventDefault();
              const position = digit ? index : Math.max(0, index - 1);
              clearDigit(position);
              focus(position);
            } else if (event.key === "Delete") {
              event.preventDefault(); clearDigit(index);
            } else if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              focus(event.key === "Home" ? 0 : event.key === "End" ? 5 : Math.max(0, Math.min(5, index + (event.key === "ArrowRight" ? 1 : -1))));
            }
          }} />)}
      </div>
      <p className="raanaa-otp-message" id={`${id}-message`} role="status">{message || "Don’t see it? Try 123456"}</p>
    </div>
    <button type="submit" className="raanaa-otp-verify">Verify<Image src="/assets/case-studies/raanaa/playground/otp-arrow.svg" alt="" width={20} height={20} /></button>
  </form>;
}
