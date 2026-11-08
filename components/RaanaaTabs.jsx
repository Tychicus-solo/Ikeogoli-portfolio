"use client";

import { useId, useRef, useState } from "react";

const styles = ["Segmented", "Line", "Pills"];
const views = ["Overview", "Analytics", "Reports"];
const copy = [
  "A snapshot of usage across your services this month.",
  "Trends, top consumers and week-on-week change.",
  "Trends, top consumers and week-on-week change.",
];

export default function RaanaaTabs() {
  const [style, setStyle] = useState(0);
  const [view, setView] = useState(0);
  const styleButtons = useRef([]);
  const tabs = useRef([]);
  const id = useId();
  const navigate = (event, current, update, refs) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (current + (event.key === "ArrowRight" ? 1 : -1) + 3) % 3;
    update(next);
    refs.current[next]?.focus();
  };

  return <div className="raanaa-tabs-demo">
    <div className="raanaa-tabs-style" role="radiogroup" aria-label="Tab appearance" style={{ "--active-tab": style }} onKeyDown={event => navigate(event, style, setStyle, styleButtons)}>
      <span className="raanaa-tabs-indicator" aria-hidden="true" />
      {styles.map((name, index) => <button type="button" role="radio" aria-checked={style === index} tabIndex={style === index ? 0 : -1} key={name} ref={element => { styleButtons.current[index] = element; }} onClick={() => setStyle(index)}>{name}</button>)}
    </div>
    <div className="raanaa-tabs-example">
      <div className={`raanaa-tabs-list raanaa-tabs-list--${styles[style].toLowerCase()}`} role="tablist" aria-label="Service information" style={{ "--active-tab": view }} onKeyDown={event => navigate(event, view, setView, tabs)}>
        <span className="raanaa-tabs-indicator" aria-hidden="true" />
        {views.map((name, index) => <button type="button" role="tab" key={name} id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={view === index} tabIndex={view === index ? 0 : -1} ref={element => { tabs.current[index] = element; }} onClick={() => setView(index)}>{name}</button>)}
      </div>
      <div className="raanaa-tabs-panels">{views.map((name, index) => <div key={name} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} tabIndex={view === index ? 0 : -1} data-active={view === index} aria-hidden={view !== index} inert={view !== index}><p>{copy[index]}</p></div>)}</div>
    </div>
  </div>;
}
