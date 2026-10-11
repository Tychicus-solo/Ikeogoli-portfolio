import { ButtonSparkles, FlipIcon, FlipLabel } from "../../../components/ButtonEffects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import CaseImagePanels from "../../../components/CaseImagePanels";
import CaseHeroCarousel from "../../../components/CaseHeroCarousel";
import CaseScrollProgress from "../../../components/CaseScrollProgress";
import Contact from "../../Contact/page";
import { Footer, Tags, ThemedImage, ThemeToggle } from "../../../components";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../../constants/caseStudies";
import { SELECTED_WORKS } from "../../../constants/selectworksconstants";
import ProjectCard from "../../../components/ProjectCard";
import BackArrow from "../../../public/assets/dark mode images/figma/icons/back-arrow.svg";
import MessageIcon from "../../../public/assets/dark mode images/message-icon.svg";

const EMAIL = "ikeogoli.ishie@gmail.com";

export const generateStaticParams = () =>
  CASE_STUDY_SLUGS.map((slug) => ({ slug }));

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    return {};
  }

  return {
    title: `${study.title} | Ikeogoli Ishie`,
    description: study.intro,
  };
};

const getRelatedWork = (slug) => {
  const study = CASE_STUDIES[slug];
  const slugToTitle = {
    emmanuel: "Emmanuel's portfolio",
    fitfam: "Fitfam",
    icheta: "Icheta",
    lyvads: "Lyvads",
    oneapp: "Oneapp",
    pettysave: "Pettysave",
    ppl: "Pertinence Properties",
    realvest: "Realvest",
  };

  return study.otherProjects
    .map((projectSlug) => {
      const title = slugToTitle[projectSlug];
      const work = SELECTED_WORKS.find((item) => item.title === title);

      return work ? { ...work, slug: projectSlug } : null;
    })
    .filter(Boolean);
};

const getVisualKey = (visual) => {
  if (typeof visual === "string") {
    return visual;
  }

  return visual.src || visual.images.map((image) => image.src).join("-");
};

const Paragraphs = ({ text }) =>
  text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>);

const CaseVisual = ({ visual, title }) => {
  if (visual.lightPanels || visual.darkPanels) {
    return (
      <CaseImagePanels
        panels={visual.lightPanels}
        darkPanels={visual.darkPanels}
        alt={visual.alt || title}
      >
        <CaseVisual
          visual={{ ...visual, lightPanels: undefined, darkPanels: undefined }}
          title={title}
        />
      </CaseImagePanels>
    );
  }

  if (typeof visual === "string" || visual.type === "image") {
    const src = typeof visual === "string" ? visual : visual.src;
    const alt =
      typeof visual === "string"
        ? `${title} interface screen`
        : visual.alt || `${title} interface screen`;

    return (
      <div className="case-visual-card">
        <ThemedImage
          src={src}
          lightSrc={typeof visual === "string" ? undefined : visual.lightSrc}
          alt={alt}
          width={typeof visual === "string" ? 1280 : visual.width || 1280}
          height={typeof visual === "string" ? 800 : visual.height || 800}
          quality={100}
          className="case-visual-img"
          sizes="(max-width: 767px) 100vw, 1280px"
        />
      </div>
    );
  }

  if (visual.type === "phoneStack") {
    return (
      <div className="case-visual-card case-visual-card--phones">
        <div className="case-phone-stack">
          {visual.images.map((image) => (
            <div className="case-phone-frame" key={image.src}>
              <ThemedImage
                src={image.src}
                alt={image.alt}
                width={940}
                height={2036}
                quality={100}
                className="case-phone-img"
                sizes="(max-width: 767px) 72vw, (max-width: 1279px) 27vw, 300px"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

const CaseStudyPage = async ({ params }) => {
  const { slug } = await params;
  const study = CASE_STUDIES[slug];

  if (!study) {
    notFound();
  }

  const relatedWorks = getRelatedWork(slug);

  return (
    <main className={`case-study-page case-study-page--${slug}`}>
      <CaseScrollProgress />

      <nav className="case-nav" aria-label="Case study navigation">
        <Link href="/#works" className="case-back-link">
          <span className="case-back-icon" aria-hidden="true">
            <Image
              src={BackArrow}
              width={20}
              height={14}
              alt=""
              aria-hidden="true"
            />
          </span>
          <span>Back</span>
        </Link>
        <a className="case-nav-contact primary-button-effects" href={`mailto:${EMAIL}`}>
          <FlipIcon>
            <Image
              src={MessageIcon}
              width={24}
              height={24}
              alt=""
              aria-hidden="true"
            />
          </FlipIcon>
          <ButtonSparkles />
          <FlipLabel>Contact me</FlipLabel>
        </a>
      </nav>

      <section className="case-hero">
        <div className="case-hero-copy">
          <h1>{study.title}</h1>
          <Paragraphs text={study.intro} />
          <a
            className="case-hero-button primary-button-effects items-center gap-x-[8px]"
            href={study.liveSite === null ? undefined : study.liveSite || "#case-content"}
            target={slug === "lyvads" ? "_blank" : undefined}
            rel={slug === "lyvads" ? "noopener noreferrer" : undefined}
            aria-disabled={study.liveSite === null || undefined}
          >
            <ButtonSparkles />
            <FlipLabel>Live site</FlipLabel>
            <FlipIcon size={15}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 0V2H11.59L0 13.59L1.41 15L13 3.41V10H15V0H5Z"
                  fill="white"
                />
              </svg>
            </FlipIcon>
          </a>
        </div>

        <dl className="case-meta">
          {study.meta.map((item) => (
            <div className="case-meta-item" key={item.label}>
              <dt>{item.label}</dt>
              {item.values.map((value) => (
                <dd key={value}>{value}</dd>
              ))}
            </div>
          ))}
        </dl>
      </section>

      <section
        className="case-hero-visual"
        aria-label={`${study.title} preview`}
      >
        <CaseHeroCarousel
          images={study.heroImages || [study.heroImage]}
          alt={`${study.title} project hero visual`}
          width={study.heroWidth || 1648}
          height={study.heroHeight || 1024}
          priority
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) calc(100vw - 128px), 1648px"
        />
      </section>
      <ThemeToggle className="theme-toggle-case" />

      <div id="case-content">
        <section className="case-text-section">
          <Tags
            label={study.challengeTag || "THE CHALLENGE(S)"}
            color={study.challengeColor || "#FD6A6A"}
          />
          <div className="case-points">
            {study.challenge.map((point) => (
              <article className="case-point" key={point.title}>
                <h2>{point.title}</h2>
                <Paragraphs text={point.body} />
              </article>
            ))}
          </div>
        </section>

        {study.visuals && (
          <section
            className="case-visual-grid"
            aria-label={`${study.title} screens`}
          >
            {study.visuals.map((visual) => (
              <CaseVisual
                visual={visual}
                title={study.title}
                key={getVisualKey(visual)}
              />
            ))}
          </section>
        )}

        {study.sections?.map((section) => (
          <React.Fragment key={section.tag}>
            <section className="case-text-section">
              <Tags label={section.tag} color={section.color} />
              <div className="case-points">
                {section.points.map((point) => (
                  <article className="case-point" key={point.title}>
                    <h2>{point.title}</h2>
                    <Paragraphs text={point.body} />
                  </article>
                ))}
              </div>
            </section>

            {section.visuals && (
              <section
                className="case-visual-grid"
                aria-label={`${study.title} ${section.tag.toLowerCase()} screens`}
              >
                {section.visuals.map((visual) => (
                  <CaseVisual
                    visual={visual}
                    title={study.title}
                    key={getVisualKey(visual)}
                  />
                ))}
              </section>
            )}
          </React.Fragment>
        ))}

        {study.takeaways && (
          <section className="case-text-section">
            <Tags label="KEY TAKEAWAYS" color="#1DD78D" />
            <div className="case-points">
              {study.takeaways.map((point) => (
                <article className="case-point" key={point.title}>
                  <h2>{point.title}</h2>
                  <Paragraphs text={point.body} />
                </article>
              ))}
            </div>
          </section>
        )}

        {(study.conclusion || study.conclusionPoints) && <section className="case-text-section case-conclusion">
          <Tags
            label={study.conclusionTag || "CONCLUSION & KEY TAKEAWAY"}
            color={study.conclusionColor || "#1DD78D"}
          />
          {study.conclusionPoints ? (
            <div className="case-points">
              {study.conclusionPoints.map((point) => (
                <article className="case-point" key={point.title}>
                  <h2>{point.title}</h2>
                  <Paragraphs text={point.body} />
                </article>
              ))}
            </div>
          ) : (
            <article className="case-point">
              <h2>{study.conclusionTitle}</h2>
              <Paragraphs text={study.conclusion} />
            </article>
          )}
        </section>}
      </div>

      <section className="case-related" aria-labelledby="case-related-title">
        <Tags label="Other Projects" color="#2CBDF2" />
        <h2 className="sr-only" id="case-related-title">
          Other Projects
        </h2>
        <div className="case-related-grid">
          {relatedWorks.map((work) => (
            <ProjectCard
              key={work.title}
              work={work}
              showDescription={false}
              headingAs="h3"
            />
          ))}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
};

export default CaseStudyPage;
