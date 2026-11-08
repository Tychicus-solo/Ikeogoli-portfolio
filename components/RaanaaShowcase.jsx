"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";

const asset = (name) => `/assets/case-studies/raanaa/${name}`;
const componentNames = ["Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge", "Breadcrumbs", "Button", "Calendar", "Card", "Chips", "Charts", "Checkbox", "Combobox", "Command", "Context Menu", "Date Picker", "Dialog", "Drawer", "Dropdown Menu", "File Upload", "Form", "Hover Card", "Input", "Input OTP", "Label", "List Item", "Menubar", "Modal", "Modal Backdrop", "Navigation Menu", "Pagination", "Progress", "Popover", "Radio Group", "Resizable", "Scroll Area", "Search", "Select", "Separator", "Sheet", "Sidebar", "Skeleton", "Slider", "Sonner", "Stepper", "Switch", "Table", "Tabs", "Text Area", "Toggle", "Toggle Group", "Tooltip"];
const newComponents = new Set(["Chips", "Input OTP", "Modal", "Modal Backdrop", "Search", "Stepper"]);
const demoNames = ["Badge", "Toast", "Modal", "Command", "Input", "Table", "Textarea", "Tooltip", "Sidebar"];
const actions = ["Buy data", "Recharge airtime", "Check balance", "Gift a bundle", "Profile", "Notifications", "Payment methods", "Help and support"];

function Segments({ label, options, value, onChange }) {
  return <div className="raanaa-segments" role="group" aria-label={label}>
    {options.map((option) => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}
  </div>;
}

function Audit() {
  return <div className="raanaa-audit">
    <div className="raanaa-before" aria-label="MTN partner and staff portals before Raanaa">
      <div className="raanaa-before-stack">
        <Image src={asset("before-partner.png")} alt="MTN partner portal before Raanaa" width={1440} height={922} quality={95} sizes="(max-width: 767px) 120vw, 1000px" />
        <Image src={asset("before-staff.png")} alt="MTN staff portal before Raanaa" width={1440} height={922} quality={95} sizes="(max-width: 767px) 120vw, 1000px" />
      </div>
    </div>
    <div className="raanaa-audit-buttons raanaa-widget">
      <p>Four products, one &quot;Buy bundle&quot; button. They look the same until you inspect them, which is what the audit did.</p>
      <div>{["Staff portal", "Partner portal", "Self-service app", "Sales tool"].map((name, index) => <div className="raanaa-audit-product" key={name}><small>{name}</small><span className={`raanaa-old-button raanaa-old-button--${index}`}>Buy bundle</span></div>)}</div>
    </div>
  </div>;
}

function Tokens() {
  const [brand, setBrand] = useState("MTN");
  const [mode, setMode] = useState("Light");
  const [period, setPeriod] = useState("Daily");
  const [renew, setRenew] = useState(true);
  const [notice, setNotice] = useState("");
  const primary = brand === "MTN" ? (mode === "Light" ? "#F9C600" : "#F5C100") : "#7FE4DF";
  const columns = [
    ["Raw value", brand === "MTN" ? "#F9C600" : "#7FE4DF", brand === "MTN" ? "#F5C100" : "#59CBC6"],
    ["Primitive", brand === "MTN" ? "Sunshine Light 10" : "SME Hive mint", brand === "MTN" ? "Sunshine Dark 10" : "SME Hive dark mint"],
    ["Theme", brand], ["Mode", "Light", "Dark"],
  ];
  return <div className="raanaa-widget raanaa-tokens" style={{ "--raanaa-primary": primary }}>
    <div className="raanaa-widget-heading"><p>Follow one colour, primary, from a raw value to the screen.</p><div className="raanaa-controls"><Segments label="Token brand" options={["MTN", "SME Hive"]} value={brand} onChange={setBrand} /><Segments label="Token preview mode" options={["Light", "Dark"]} value={mode} onChange={setMode} /></div></div>
    <div className="raanaa-token-flow">
      <div className="raanaa-token-lines" aria-hidden="true"><Image src={asset("token-icon.svg")} alt="" width={1216} height={152.5} /></div>
      {columns.map(([title, ...values]) => <div key={title}><h3>{title}</h3>{values.map((value, index) => <div className="raanaa-token-value" key={value}><i style={{ background: title === "Mode" ? (index === 0 ? "#fff" : "#090909") : title === "Raw value" ? value : title === "Primitive" && brand === "MTN" ? (index === 0 ? "#F9C600" : "#F5C100") : primary }} />{value}</div>)}</div>)}
    </div>
    <div className="raanaa-token-preview" data-demo-theme={mode.toLowerCase()}>
      <div className="raanaa-preview-cards">
        <div className="raanaa-preview-card"><div className="raanaa-preview-card-title"><div><strong>1GB data bundle</strong><p>Valid for 30 days</p></div><strong>₦500</strong></div><div className="raanaa-preview-actions"><button className="raanaa-primary" onClick={() => setNotice("Bundle selected — 1GB for ₦500")}>Buy bundle</button><button onClick={() => setNotice("Gift selected — enter your friend's phone number")}>Gift a friend</button></div><div className="raanaa-auto-renew"><span>Auto-renew every month</span><button type="button" role="switch" aria-label="Auto-renew every month" aria-checked={renew} onClick={() => setRenew(!renew)} className="raanaa-switch"><span /></button></div></div>
        <div className="raanaa-preview-card"><div className="raanaa-preview-card-title"><div><strong>Recharge</strong><p>For you or someone else</p></div><span className="raanaa-status">Active</span></div><label>Phone number<input type="tel" defaultValue="0803 000 0000" /></label><div className="raanaa-periods">{["Daily", "Weekly", "Monthly"].map(p => <button key={p} className={period === p ? "raanaa-primary" : ""} aria-pressed={period === p} onClick={() => setPeriod(p)}>{p}</button>)}</div></div>
      </div>
      <p className="raanaa-token-caption" aria-live="polite">{notice || `primary → ${brand === "MTN" ? `Sunshine ${mode} 10` : "SME Hive mint"} → ${primary} · radius 12px`}</p>
    </div>
  </div>;
}

function Foundations() {
  const spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24];
  const sizes = [["xs", 12], ["sm", 14], ["base", 16], ["lg", 18], ["xl", 20], ["2xl", 24], ["3xl", 30]];
  return <div className="raanaa-foundations"><div className="raanaa-widget"><h3>Spacing · Tailwind’s number scale</h3><div className="raanaa-spacing-rows">{spaces.map(n => <div key={n}><span>{n}</span><span>{n * 4}px</span><i style={{ width: `${n / 24 * 100}%` }} /></div>)}</div></div><div className="raanaa-widget"><h3>Type · Tailwind’s scale, in MTN Brighter Sans</h3>{sizes.map(([name, size]) => <div className="raanaa-type-row" key={name}><small>text-{name} · {size}px</small><p style={{ fontSize: size }}>Buy 1GB for ₦500</p></div>)}</div></div>;
}

function Components() {
  return <div className="raanaa-widget raanaa-component-library" id="raanaa-components"><p><strong>53 components</strong> in the Figma library, built and documented with their variants and states. The six marked new are the latest additions.</p><ul>{componentNames.map(name => <li key={name}><span>{name}</span>{newComponents.has(name) && <small>NEW</small>}</li>)}</ul><p className="raanaa-library-note">Also: Empty States (in progress), Data Table and Page Layout templates, and pattern explorations.</p></div>;
}

function Command({ onSelect }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const id = useId();
  const filtered = actions.filter(item => item.toLowerCase().includes(query.toLowerCase()));
  return <div className="raanaa-command"><div className="raanaa-command-search"><Image src={asset("playground-icon-9.svg")} width={16} height={16} alt="" /><input aria-label="Search actions" role="combobox" aria-autocomplete="list" aria-expanded="true" aria-controls={id} aria-activedescendant={filtered.length ? `${id}-${active}` : undefined} placeholder="Search actions…" value={query} onChange={e => { setQuery(e.target.value); setActive(0); }} onKeyDown={e => { if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); setActive(i => filtered.length ? (i + (e.key === "ArrowDown" ? 1 : -1) + filtered.length) % filtered.length : 0); } if (e.key === "Enter" && filtered[active]) onSelect(filtered[active]); if (e.key === "Escape") setQuery(""); }} /><kbd>esc</kbd></div><div className="raanaa-command-list" id={id} role="listbox" aria-label="Actions">{!query && <small>Suggestions</small>}{filtered.map((name, i) => <div key={name}>{!query && i === 4 && <small>Account</small>}<button id={`${id}-${i}`} role="option" aria-selected={active === i} className={active === i ? "is-selected" : ""} onMouseEnter={() => setActive(i)} onClick={() => onSelect(name)}><Image src={asset(`playground-icon-${Math.min(10 + actions.indexOf(name), 17)}.svg`)} alt="" width={16} height={16} /><span>{name}</span>{active === i && <kbd>↵</kbd>}</button></div>)}{!filtered.length && <p>No actions found.</p>}</div><div className="raanaa-command-footer"><span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Select</span><span>{filtered.length} results</span></div></div>;
}

function ModalDemo() {
  const dialog = useRef(null);
  return <><button className="raanaa-primary" onClick={() => dialog.current.showModal()}>Open modal</button><dialog ref={dialog} className="raanaa-modal" onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}><form method="dialog"><button className="raanaa-modal-close" aria-label="Close modal">×</button><h3>Buy a data bundle</h3><p>Get 1GB of data, valid for 30 days, for ₦500.</p><div className="raanaa-preview-actions"><button>Cancel</button><button className="raanaa-primary">Continue</button></div></form></dialog></>;
}

function Playground() {
  const [tab, setTab] = useState("Command");
  const [mode, setMode] = useState("Light");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState(false);
  const [badge, setBadge] = useState("Active");
  const [sidebar, setSidebar] = useState("Overview");
  const [sort, setSort] = useState(false);
  const [text, setText] = useState("");
  const id = useId();
  const hints = { Badge: ["choose a status", "semantic colours"], Toast: ["trigger a toast", "dismiss to close"], Modal: ["click to open", "Esc to close"], Command: ["type to filter", "↑ ↓ to move", "Enter to pick"], Input: ["type a phone number", "visible focus"], Table: ["click amount to sort", "select a row"], Textarea: ["type a message", "live character count"], Tooltip: ["hover or focus", "accessible hint"], Sidebar: ["select a destination", "active state"] };
  let content;
  if (tab === "Command") content = <Command onSelect={name => setMessage(`${name} selected`)} />;
  if (tab === "Badge") content = <div className="raanaa-badge-demo"><Segments label="Badge status" options={["Active", "Pending", "Failed"]} value={badge} onChange={setBadge} /><span className={`raanaa-badge raanaa-badge--${badge.toLowerCase()}`}>{badge}</span></div>;
  if (tab === "Toast") content = <><button className="raanaa-primary" onClick={() => setToast(true)}>Show toast</button>{toast && <div className="raanaa-toast" role="status"><strong>Bundle purchased</strong><p>Your 1GB data bundle is ready to use.</p><button onClick={() => setToast(false)} aria-label="Dismiss notification">×</button></div>}</>;
  if (tab === "Modal") content = <ModalDemo />;
  if (tab === "Input") content = <label className="raanaa-input-demo">Phone number<input type="tel" placeholder="0803 000 0000" /><small>Enter the number you want to recharge.</small></label>;
  if (tab === "Table") content = <table className="raanaa-table"><thead><tr><th>Select</th><th>Transaction</th><th><button onClick={() => setSort(!sort)}>Amount {sort ? "↑" : "↓"}</button></th><th>Status</th></tr></thead><tbody>{(sort ? [500, 1000, 2500] : [2500, 1000, 500]).map((amount, index) => <tr key={amount}><td><input type="checkbox" aria-label={`Select transaction ${index + 1}`} /></td><td>Data bundle</td><td>₦{amount.toLocaleString()}</td><td><span className="raanaa-badge raanaa-badge--active">Successful</span></td></tr>)}</tbody></table>;
  if (tab === "Textarea") content = <label className="raanaa-input-demo">Message<textarea value={text} maxLength={240} onChange={e => setText(e.target.value)} placeholder="How can we help?" /><small>{text.length} / 240 characters</small></label>;
  if (tab === "Tooltip") content = <div className="raanaa-tooltip-wrap"><button aria-describedby={`${id}-tooltip`}>Auto-renew information</button><span role="tooltip" id={`${id}-tooltip`}>Your bundle renews every month. You can cancel at any time.</span></div>;
  if (tab === "Sidebar") content = <nav className="raanaa-sidebar-demo" aria-label="Example product navigation"><strong>MTN</strong>{["Overview", "Buy data", "Transactions", "Settings"].map(name => <button aria-current={sidebar === name ? "page" : undefined} key={name} onClick={() => setSidebar(name)}>{name}</button>)}<p>{sidebar}</p></nav>;
  return <div className="raanaa-widget raanaa-playground" id="raanaa-playground"><Image className="raanaa-playground-decoration" src={asset("playground-decoration.png")} alt="" width={48} height={24} /><div className="raanaa-widget-heading"><p>A few of the components I worked on with the team. They’re rebuilt here in Raanaa’s MTN tokens, so you can try them.</p><Segments label="Component preview mode" options={["Light", "Dark"]} value={mode} onChange={setMode} /></div><div className="raanaa-playground-body"><div className="raanaa-demo-nav"><small>9 components</small><div role="tablist" aria-label="Component examples" aria-orientation="vertical" onKeyDown={e => { if (!["ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return; e.preventDefault(); const next = e.key === "Home" ? 0 : e.key === "End" ? 8 : (demoNames.indexOf(tab) + (e.key === "ArrowDown" ? 1 : -1) + 9) % 9; setTab(demoNames[next]); document.getElementById(`${id}-tab-${next}`)?.focus(); }}>{demoNames.map((name, index) => <button id={`${id}-tab-${index}`} role="tab" aria-selected={tab === name} aria-controls={`${id}-panel`} tabIndex={tab === name ? 0 : -1} key={name} onClick={() => { setTab(name); setMessage(""); }}><span><Image src={asset(`playground-icon-${index}.svg`)} alt="" width={16} height={16} /></span><div>{name}{tab === name && <small>{name === "Command" ? "Search across actions, from the keyboard" : hints[name][0]}</small>}</div></button>)}</div><small className="raanaa-nav-hint"><kbd>↑</kbd> <kbd>↓</kbd> to switch</small></div><div className="raanaa-demo-preview" data-demo-theme={mode.toLowerCase()} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${demoNames.indexOf(tab)}`}><div className={`raanaa-demo-canvas${tab === "Command" ? " raanaa-demo-canvas--command" : ""}`}>{content}{message && <span className="raanaa-selection-message" role="status">{message}</span>}</div><div className="raanaa-demo-hints"><div>{hints[tab].map(hint => <kbd key={hint}>{hint}</kbd>)}</div><small>{tab}</small></div></div></div></div>;
}

function Products() {
  const [product, setProduct] = useState(0);
  const [visibleProduct, setVisibleProduct] = useState(0);
  const selectedProduct = useRef(0);
  const loadedProducts = useRef(new Set());
  const names = ["MTN Cloud", "VivaPay", "SIM Reg Universe"];
  const selectProduct = (index) => {
    selectedProduct.current = index;
    setProduct(index);
    if (loadedProducts.current.has(index)) setVisibleProduct(index);
  };

  return <div className="raanaa-widget raanaa-products">
    <div className="raanaa-widget-heading">
      <p>Screens from the first products built on Raanaa. Pick a product, then a screen.</p>
      <div className="raanaa-segments" role="group" aria-label="Product previews">
        {names.map((name, index) => <button key={name} type="button" aria-pressed={product === index} onClick={() => selectProduct(index)}>{name}</button>)}
      </div>
    </div>
    <div className="raanaa-product-stage" aria-busy={product !== visibleProduct}>
      {names.map((name, index) => <Image key={name}
        src={asset(`product-${index + 1}@3x.png`)}
        alt={["Raanaa product overview dashboard", "MTN Cloud portal", "SIM Reg Universe dashboard"][index]}
        aria-hidden={visibleProduct !== index}
        className={visibleProduct === index ? "is-visible" : ""}
        width={[3642, 4062, 3642][index]} height={[2158, 2539, 2353][index]}
        style={{ width: `${[1214, 1354, 1214][index] / 1216 * 100}%` }}
        onLoad={() => {
          loadedProducts.current.add(index);
          if (selectedProduct.current === index) setVisibleProduct(index);
        }} unoptimized />)}
    </div>
    <div className="raanaa-product-caption" key={visibleProduct}>
      <p>{["Redesigning MTN Cloud’s portal so onboarding, verification and billing feel effortless.", "Make cross border payments around the world easily", "Redesigning MTN Cloud’s portal so onboarding, verification and billing feel effortless."][visibleProduct]}</p>
      <small>{visibleProduct === 1 ? "VIVAPAY APP · MTN THEME, MOBILE" : "MTN CLOUD · MTN THEME, WEB APP"}</small>
    </div>
  </div>;
}

export default function RaanaaShowcase({ kind }) {
  const shows = { audit: Audit, tokens: Tokens, foundations: Foundations, components: Components, playground: Playground, products: Products };
  const Showcase = shows[kind];
  return Showcase ? <div className={`raanaa-showcase raanaa-showcase--${kind}`}><Showcase /></div> : null;
}
