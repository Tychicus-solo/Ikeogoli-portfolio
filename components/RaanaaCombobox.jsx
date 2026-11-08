"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

const statuses = [
  { name: "Backlog", icon: "backlog" },
  { name: "Todo", icon: "todo" },
  { name: "In Progress", icon: "progress" },
  { name: "Completed", icon: "completed" },
  { name: "Canceled", icon: "canceled" },
];

export default function RaanaaCombobox({ mode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [active, setActive] = useState(1);
  const root = useRef(null);
  const trigger = useRef(null);
  const search = useRef(null);
  const id = useId();
  const filtered = statuses.filter(status => status.name.toLowerCase().includes(query.trim().toLowerCase()));
  const icon = name => `/assets/case-studies/raanaa/playground/combo-${mode.toLowerCase()}-${name}.svg`;

  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const closeOutside = event => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const show = (last = false) => {
    setQuery("");
    setActive(last ? statuses.length - 1 : selected ? statuses.indexOf(selected) : 1);
    setOpen(true);
  };
  const choose = status => {
    setSelected(status);
    setOpen(false);
    setQuery("");
    trigger.current?.focus();
  };

  return <div className="raanaa-combobox" ref={root} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <span className="raanaa-combobox-label" id={`${id}-label`}>Task Status</span>
    <button className="raanaa-combobox-trigger" type="button" ref={trigger}
      aria-labelledby={`${id}-label ${id}-value`} aria-haspopup="listbox"
      aria-expanded={open} aria-controls={`${id}-list`}
      onClick={() => open ? setOpen(false) : show()}
      onKeyDown={event => {
        if (["ArrowDown", "ArrowUp"].includes(event.key)) {
          event.preventDefault();
          show(event.key === "ArrowUp");
        }
      }}>
      <Image src={icon(selected?.icon || "plus")} width={16} height={16} alt="" />
      <span id={`${id}-value`}>{selected?.name || "Set status..."}</span>
    </button>
    <div className="raanaa-combobox-menu" data-open={open} aria-hidden={!open} inert={!open}>
      <div className="raanaa-combobox-search">
        <Image src={icon("search")} width={16} height={16} alt="" />
        <input ref={search} role="combobox" aria-label="Search task statuses"
          aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-list`}
          aria-activedescendant={open && filtered[active] ? `${id}-option-${filtered[active].icon}` : undefined}
          autoComplete="off" spellCheck={false} value={query}
          onChange={event => { setQuery(event.target.value); setActive(0); }}
          onKeyDown={event => {
            if (event.nativeEvent.isComposing) return;
            if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
              event.preventDefault();
              if (!filtered.length) return;
              setActive(index => event.key === "Home" ? 0 : event.key === "End" ? filtered.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + filtered.length) % filtered.length);
            } else if (event.key === "Enter") {
              event.preventDefault();
              if (filtered[active]) choose(filtered[active]);
            } else if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
              trigger.current?.focus();
            }
          }} />
      </div>
      <div className="raanaa-combobox-options" role="listbox" aria-labelledby={`${id}-label`} id={`${id}-list`}>
        {filtered.map((status, index) => <div role="option" id={`${id}-option-${status.icon}`}
          aria-selected={selected === status} data-active={active === index} key={status.icon}
          onPointerMove={() => setActive(index)} onPointerDown={event => event.preventDefault()}
          onClick={() => choose(status)}>
          <Image src={icon(status.icon)} width={16} height={16} alt="" />{status.name}
        </div>)}
      </div>
      {!filtered.length && <p className="raanaa-combobox-empty" role="status">No results</p>}
    </div>
    <span className="sr-only" role="status">{selected ? `Task status: ${selected.name}` : ""}</span>
  </div>;
}
