import { Tags, ThemedImage } from "../../components";
import React from "react";

const EXPERIENCES = [
  {
    company: "MTN",
    role: "Product Designer",
    period: "2024 - Present",
    logo: "/assets/dark mode images/mtn.svg",
    logoWidth: 48,
    logoHeight: 24,
  },
  {
    company: "Pettysave Microfinance bank",
    role: "Product Designer",
    period: "2024 - 2025",
    logo: "/assets/dark mode images/pettysave.svg",
    logoWidth: 32,
    logoHeight: 32,
  },
  {
    company: "Lyvads",
    role: "Product Designer",
    period: "2024 - 2024",
    logo: "/assets/dark mode images/lyvads.svg",
    logoWidth: 24,
    logoHeight: 24,
  },
  {
    company: "Icheta",
    role: "Product Designer",
    period: "2023 - 2025",
    logo: "/assets/dark mode images/icheta.svg",
    logoWidth: 24,
    logoHeight: 24,
  },
  {
    company: "OneApp",
    role: "Product Designer",
    period: "2023 - 2024",
    logo: "/assets/dark mode images/oneapp.svg",
    logoWidth: 27,
    logoHeight: 32,
  },
  {
    company: "Pertinence Group",
    role: "Product Designer",
    period: "2022 - 2023",
    logo: "/assets/dark mode images/pertinence.svg",
    logoWidth: 32,
    logoHeight: 32,
  },
];

const Experience = () => {
  return (
    <section className="experience-section">
      <div className="experience-copy">
        <Tags label="Experience" color="#375EFB" />
        <h2 className="experience-title">
          Companies I&apos;ve worked with over the years
        </h2>
        <p className="experience-description">
          Over the past 5+ years as a designer, I&apos;ve had the incredible
          opportunity to work with organizations that are shaping different
          aspects of our daily lives. Each project has been a unique adventure,
          teaching me new perspectives and pushing my creative boundaries.
        </p>
      </div>

      <div className="experience-timeline" aria-label="Work experience">
        <div className="experience-line" aria-hidden="true" />
        {EXPERIENCES.map((experience) => (
          <article className="experience-item" key={experience.company}>
            <div className="experience-marker" aria-hidden="true">
              <span />
            </div>

            <div className="experience-content">
              <div className="experience-company-row">
                <h3 className="experience-company">{experience.company}</h3>
                <span
                  className="experience-logo"
                  style={{
                    "--experience-logo-width": `${experience.logoWidth}px`,
                    "--experience-logo-height": `${experience.logoHeight}px`,
                  }}
                >
                  <ThemedImage
                    src={experience.logo}
                    alt=""
                    width={experience.logoWidth}
                    height={experience.logoHeight}
                    className="experience-logo-img"
                  />
                </span>
              </div>
              <p className="experience-meta">
                <span>{experience.role}</span>
                <span className="experience-meta-dot" aria-hidden="true" />
                <span>{experience.period}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;
