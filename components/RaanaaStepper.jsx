"use client";

import Image from "next/image";
import { useState } from "react";

const steps = ["Getting Started", "Email Verification", "Set preferences", "Summary"];

export default function RaanaaStepper({ mode }) {
  const [current, setCurrent] = useState(2);
  const [error, setError] = useState(false);
  const finished = current === steps.length;
  const visit = index => { setCurrent(index); setError(false); };
  return <div className="raanaa-stepper">
    <ol className="raanaa-stepper-list" aria-label="Setup progress">
      {steps.map((name, index) => {
        const state = index < current ? "completed" : index === current ? error ? "error" : "current" : "upcoming";
        return <li key={name} data-state={state}><button type="button" aria-current={index === current ? "step" : undefined} aria-label={`${name}, ${state}`} onClick={() => visit(index)}>
          <span className="raanaa-stepper-marker">{state === "completed" || state === "error" ? <Image src={`/assets/case-studies/raanaa/playground/stepper-${mode.toLowerCase()}-${state === "completed" ? "complete" : "error"}.svg`} alt="" width={16} height={16} /> : <span>{index + 1}</span>}</span>
          <span>{name}</span>
        </button></li>;
      })}
    </ol>
    <div className="raanaa-stepper-actions">
      <button type="button" disabled={current === 0} onClick={() => visit(Math.max(0, current - 1))}>Back</button>
      <button type="button" disabled={finished} onClick={() => setError(value => !value)}>{error ? "Clear error" : "Mark as error"}</button>
      <button type="button" className="raanaa-stepper-continue" onClick={() => visit(finished ? 0 : current + 1)}>{finished ? "Restart" : "Continue"}</button>
    </div>
    <span className="sr-only" role="status">{finished ? "All steps completed." : `${steps[current]}: ${error ? "error" : `step ${current + 1} of ${steps.length}`}`}</span>
  </div>;
}
