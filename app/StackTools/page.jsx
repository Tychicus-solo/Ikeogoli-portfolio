import { Tags, ThemedImage } from "../../components";
import React from "react";

const SERVICES = [
  "Product (UI/UX) design",
  "Interaction design",
  "Research",
  "UX Strategy",
  "Usability testing",
  "Prototyping",
  "Information Architecture",
  "Wireframing",
  "Visual Design",
  "Design Systems",
  "No-code development",
];

// Preserve the four service rows in the desktop Figma composition.
const SERVICE_ROWS = [
  SERVICES.slice(0, 3),
  SERVICES.slice(3, 6),
  SERVICES.slice(6, 9),
  SERVICES.slice(9),
];

const TOOLS = [
  {
    name: "Figma",
    description: "Design tool",
    icon: "/assets/dark mode images/figma.svg",
  },
  {
    name: "Adobe Illustrator",
    description: "Design tool",
    icon: "/assets/dark mode images/illustrator.svg",
  },
  {
    name: "Webflow",
    description: "Website builder",
    icon: "/assets/dark mode images/webflow.svg",
  },
  {
    name: "Notion",
    description: "Documentation",
    icon: "/assets/dark mode images/notion.svg",
  },
  {
    name: "Slack",
    description: "Messaging",
    icon: "/assets/dark mode images/slack.svg",
  },
  {
    name: "LottiesFiles",
    description: "Animations",
    icon: "/assets/dark mode images/lottiefiles.svg",
  },
  {
    name: "Asana",
    description: "Projects",
    icon: "/assets/dark mode images/asana.svg",
  },
  {
    name: "Google meet",
    description: "Video conferencing",
    icon: "/assets/dark mode images/googlemeet.svg",
  },
];

const StackTools = () => {
  return (
    <section className="stack-tools-section" aria-labelledby="stack-tools-heading">
      <div className="stack-tools-header">
        <Tags label="Stack" color="#FF3489" />
        <h2 id="stack-tools-heading" className="stack-tools-title">Stack &amp; Tools</h2>
      </div>

      <div className="stack-tools-grid">
        <article className="stack-tools-panel">
          <h3 className="stack-tools-panel-title">
            Some of the core services I offer
          </h3>

          <div className="stack-tools-services">
            {SERVICE_ROWS.map((row) => (
              <div className="stack-tools-service-row" key={row[0]}>
                {row.map((service) => (
                  <span className="stack-tools-pill" key={service}>
                    {service}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </article>

        <article className="stack-tools-panel">
          <h3 className="stack-tools-panel-title">
            Tools I utilize in my work
          </h3>

          <div className="stack-tools-list">
            {TOOLS.map((tool) => (
              <div className="stack-tools-item" key={tool.name}>
                <ThemedImage src={tool.icon} width={56} height={56} alt="" />
                <div>
                  <h4 className="stack-tools-name">{tool.name}</h4>
                  <p className="stack-tools-description">{tool.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default StackTools;
