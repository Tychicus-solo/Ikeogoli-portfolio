"use client";

import Image from "next/image";
import RaanaaCombobox from "./RaanaaCombobox";
import RaanaaFileUpload from "./RaanaaFileUpload";
import RaanaaOTP from "./RaanaaOTP";
import RaanaaTabs from "./RaanaaTabs";
import RaanaaStepper from "./RaanaaStepper";
import { useId, useRef, useState } from "react";

const asset = (name) => `/assets/case-studies/raanaa/${name}`;
const componentNames = ["Accordion", "Alert", "Alert Dialog", "Aspect Ratio", "Avatar", "Badge", "Breadcrumbs", "Button", "Calendar", "Card", "Chips", "Charts", "Checkbox", "Combobox", "Command", "Context Menu", "Date Picker", "Dialog", "Drawer", "Dropdown Menu", "File Upload", "Form", "Hover Card", "Input", "Input OTP", "Label", "List Item", "Menubar", "Modal", "Modal Backdrop", "Navigation Menu", "Pagination", "Progress", "Popover", "Radio Group", "Resizable", "Scroll Area", "Search", "Select", "Separator", "Sheet", "Sidebar", "Skeleton", "Slider", "Sonner", "Stepper", "Switch", "Table", "Tabs", "Text Area", "Toggle", "Toggle Group", "Tooltip"];
const newComponents = new Set(["Chips", "Input OTP", "Modal", "Modal Backdrop", "Search", "Stepper"]);

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
      <p>Three products, one &quot;Get started&quot; button. They look the same until you inspect them, which is what the audit did.</p>
      <div className="raanaa-audit-comparison">
        <div className="raanaa-audit-variants">
          {[0, 1, 2].map(index => <div className="raanaa-audit-variant" key={index}>
            {index > 0 && <span className="raanaa-audit-divider"><Image src={asset("audit-divider.svg")} width={520} height={1} alt="" /></span>}
            <small>Staff portal</small><span className={`raanaa-old-button raanaa-old-button--${index}`}>Get started</span>
          </div>)}
        </div>
        <div className="raanaa-audit-arrow"><Image src={asset("audit-arrow.svg")} width={24} height={24} alt="Becomes" /></div>
        <div className="raanaa-audit-result"><small>After: one global component</small><span className="raanaa-old-button raanaa-old-button--0">Get started</span></div>
      </div>
    </div>
  </div>;
}

function Tokens() {
  const [mode, setMode] = useState("Dark");
  const value = (label, color) => <div className="raanaa-token-value" key={label}>{color && <i style={{ background: color }} />}{label}</div>;
  return <div className="raanaa-widget raanaa-tokens">
    <p>1,000+ variables, so one change flows through every component</p>
    <div className="raanaa-token-flow" data-token-mode={mode.toLowerCase()}>
      <div className="raanaa-token-card"><h3>1. Raw value</h3><div>{value("#F9C600", "#F9C600")}{value("#F5C100", "#F5C100")}{value("#000000", "#000000")}</div></div>
      <div className="raanaa-token-card"><h3>2. Primitives</h3><div><div className="raanaa-primitive-swatches" aria-label="Yellow, neutral, red, green and blue primitives">{["#F9C600", "#2B2B27", "#EC1A36", "#008D4A", "#2C64FF"].map(color => <i key={color} style={{ background: color }} />)}</div>{value("Colors")}{value("Spacing & Radius")}</div></div>
      <div className="raanaa-token-card"><h3>3. Themes</h3><div>{value("MTN", "#F9C600")}{value("SME HIVE", "#7FE4DF")}{value("MY LAGOS APP", "#095328")}</div></div>
      <div className="raanaa-token-card"><h3>Modes</h3><Segments label="Token preview mode" options={["Light", "Dark"]} value={mode} onChange={setMode} /></div>
    </div>
  </div>;
}

function Foundations() {
  const colors = ["#FFFDEF", "#FFF9D3", "#FFF2A7", "#FFEA73", "#FFE009", "#FFD500", "#FEC200", "#E5AC00", "#C08D00", "#906800", "#604600", "#302400"];
  const sizes = [["xs", 12, 16], ["base", 16, 24], ["xl", 20, 28], ["2xl", 24, 32], ["4xl", 36, 40]];
  return <div className="raanaa-widget raanaa-foundations">
    <p>Swap colors, type scale and spacing</p>
    <div className="raanaa-foundation-colors"><h3>1. Raw value</h3><div aria-label="12-step Sunshine colour scale">{colors.map(color => <i key={color} style={{ background: color }} title={color} />)}</div></div>
    <div className="raanaa-foundation-scales">
      <div><h3>Type scale · MTN Brighter Sans</h3><div className="raanaa-type-samples">{sizes.map(([name, size, lineHeight]) => <p key={name} style={{ fontSize: size, lineHeight: `${lineHeight}px` }}>text-{name} · The quick brown fox</p>)}</div></div>
      <div><h3>Spacing</h3><div className="raanaa-spacing-rows">{[[4, 15], [8, 61], [16, 137], [32, 301], [48, 482]].map(([space, width]) => <div key={space}><span>{space}px</span><i style={{ width: `${width / 516 * 100}%` }} /></div>)}</div></div>
    </div>
  </div>;
}

function Components() {
  return <div className="raanaa-widget raanaa-component-library" id="raanaa-components"><p><strong>53 components</strong> in the Figma library, built and documented with their variants and states. The six marked new are the latest additions.</p><ul>{componentNames.map(name => <li key={name}><span>{name}</span>{newComponents.has(name) && <small>NEW</small>}</li>)}</ul><p className="raanaa-library-note">Also: Empty States (in progress), Data Table and Page Layout templates, and pattern explorations.</p></div>;
}

const playgroundItems = [
  { name: "Accordion", icon: "accordion-off.svg", activeIcon: "sidebar-imgKanbanView.svg", description: "Show or hide content, one section at a time." },
  { name: "Combobox", icon: "sidebar-imgMarker.svg", activeIcon: "combobox-on.svg", description: "Search a list and pick one option." },
  { name: "File upload", icon: "sidebar-imgMarker1.svg", activeIcon: "file-on.svg", description: "Drop or browse files, with upload progress." },
  { name: "Input OTP", icon: "sidebar-imgMarker2.svg", activeIcon: "otp-on.svg", description: "Enter a one-time code, one digit per box." },
  { name: "Tabs", icon: "sidebar-imgMarker3.svg", activeIcon: "tabs-on.svg", description: "Switch between related views in place." },
  { name: "Stepper", icon: "sidebar-imgMarker4.svg", activeIcon: "stepper-on.svg", description: "Track progress through a multi-step flow." },
];
const playgroundAsset = name => asset(`playground/${name}`);

function Playground() {
  const [tab, setTab] = useState(0);
  const [mode, setMode] = useState("Dark");
  const [showIcons, setShowIcons] = useState(true);
  const [openItem, setOpenItem] = useState(0);
  const id = useId();
  const item = playgroundItems[tab];
  const questions = ["What is Raanaa?", "Is it accessible?", "Does it support dark mode?"];
  const answers = ["MTN’s design system: tokens, components and templates shared across products.", "Each component page carries accessibility guidance, so contrast, focus and keyboard use are considered before the build.", "Every component ships in light and dark from the same tokens."];
  const selectTab = index => setTab(index);
  return <div className="raanaa-widget raanaa-playground" id="raanaa-playground">
    <Image className="raanaa-playground-decoration" src={playgroundAsset("sidebar-imgText.png")} alt="" width={48} height={24} />
    <div className="raanaa-widget-heading"><p>A few of the components I collaborated on with the team, now rebuilt using Raanaa’s MTN design tokens for you to explore and interact with.</p><Segments label="Component preview mode" options={["Light", "Dark"]} value={mode} onChange={setMode} /></div>
    <div className="raanaa-playground-body">
      <div className="raanaa-demo-nav">
        <small>6 components</small>
        <div role="tablist" aria-label="Component examples" aria-orientation="vertical" onKeyDown={event => {
          if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
          event.preventDefault();
          const count = playgroundItems.length;
          const index = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (tab + (["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1) + count) % count;
          selectTab(index);
          document.getElementById(`${id}-tab-${index}`)?.focus();
        }}>{playgroundItems.map((entry, index) => <button type="button" id={`${id}-tab-${index}`} role="tab" aria-selected={tab === index} aria-controls={`${id}-panel`} tabIndex={tab === index ? 0 : -1} key={entry.name} onClick={() => selectTab(index)}>
          <span><Image className="raanaa-tab-icon-off" src={playgroundAsset(entry.icon)} alt="" width={16} height={16} loading="eager" /><Image className="raanaa-tab-icon-on" src={playgroundAsset(entry.activeIcon)} alt="" width={16} height={16} loading="eager" /></span>
          <div>{entry.name}<small className="raanaa-tab-description" aria-hidden={tab !== index}><span>{entry.description}</span></small></div>
        </button>)}</div>
        <small className="raanaa-nav-hint"><kbd>↑</kbd><kbd>↓</kbd> to switch</small>
      </div>
      <div className={`raanaa-demo-preview${tab === 2 ? " raanaa-demo-preview--upload" : ""}`} data-demo-theme={mode.toLowerCase()} role="tabpanel" tabIndex={0} id={`${id}-panel`} aria-labelledby={`${id}-tab-${tab}`}>
        <div className="raanaa-demo-canvas">
          {[<div className="raanaa-accordion-preview" key="accordion">
            <div className="raanaa-accordion-group">{questions.map((question, index) => <div className="raanaa-accordion-item" data-icons={showIcons} data-open={openItem === index} key={question}>
              <span className="raanaa-accordion-icon" aria-hidden="true"><Image src={playgroundAsset(["sidebar-imgPencilRuler2Line.svg", "sidebar-imgSlideshowLine.svg", "sidebar-imgTeamLine.svg"][index])} width={24} height={24} alt="" /></span>
              <div><button type="button" aria-expanded={openItem === index} aria-controls={`${id}-answer-${index}`} onClick={() => setOpenItem(openItem === index ? -1 : index)}>{question}<Image className="raanaa-accordion-chevron" src={playgroundAsset(mode === "Light" ? "light-imgIcon1.svg" : "sidebar-imgIcon1.svg")} width={16} height={16} alt="" /></button><div className="raanaa-accordion-answer" id={`${id}-answer-${index}`} aria-hidden={openItem !== index} inert={openItem !== index}><div><p>{answers[index]}</p></div></div></div>
            </div>)}</div>
            <label className="raanaa-icon-toggle"><button type="button" role="switch" aria-label="Show accordion icons" aria-checked={showIcons} onClick={() => setShowIcons(!showIcons)}><span /></button>Switch icon</label>
          </div>, <RaanaaCombobox key="combobox" mode={mode} />, <RaanaaFileUpload key="upload" mode={mode} />, <RaanaaOTP key="otp" />, <RaanaaTabs key="tabs" />, <RaanaaStepper key="stepper" mode={mode} />].map((content, index) => <div className="raanaa-demo-panel" data-active={tab === index} key={index} aria-hidden={tab !== index} inert={tab !== index}>{content}</div>)}
        </div>
        <div className="raanaa-demo-hints"><div>{tab === 0 && <><kbd>Single open</kbd><kbd>Chevron</kbd></>}{tab === 1 && <><kbd>Search to filter</kbd><kbd>Selected state</kbd><kbd>No results</kbd></>}{tab === 2 && <><kbd>Drag and drop</kbd><kbd>Uploading</kbd><kbd>Completed</kbd><kbd>Remove</kbd></>}{tab === 3 && <><kbd>6 slots</kbd><kbd>Auto-advance</kbd><kbd>Paste support</kbd><kbd>Error + success</kbd></>}{tab === 4 && <><kbd>Segmented</kbd><kbd>Line</kbd><kbd>Pills</kbd><kbd>Selected</kbd></>}{tab === 5 && <><kbd>Upcoming</kbd><kbd>Current</kbd><kbd>Completed</kbd><kbd>Error</kbd></>}</div><small>{item.name}</small></div>
      </div>
    </div>
  </div>;
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
