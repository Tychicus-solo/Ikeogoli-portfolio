import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import Contact from "../../Contact/page";
import { Footer, Tags, ThemedImage, ThemeToggle } from "../../../components";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../../constants/caseStudies";
import { SELECTED_WORKS } from "../../../constants/selectworksconstants";
import ArrowLight from "../../../public/assets/dark mode images/arrow-light.svg";
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
    lyvads: "Lyvads",
    oneapp: "Oneapp",
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

const getImageClassName = (title) =>
  title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getVisualKey = (visual) => {
  if (typeof visual === "string") {
    return visual;
  }

  return visual.src || visual.images.map((image) => image.src).join("-");
};

const Paragraphs = ({ text }) =>
  text.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>);

const CaseVisual = ({ visual, title }) => {
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
      <div className="case-progress" aria-hidden="true" />

      <nav className="case-nav" aria-label="Case study navigation">
        <Link href="/#works" className="case-back-link">
          <span className="case-back-icon" aria-hidden="true">
            <Image src={BackArrow} width={20} height={14} alt="" aria-hidden="true" />
          </span>
          <span>Back</span>
        </Link>
        <a className="case-nav-contact" href={`mailto:${EMAIL}`}>
          <Image src={MessageIcon} width={24} height={24} alt="" aria-hidden="true" />
          <span>Contact me</span>
        </a>
      </nav>

      <section className="case-hero">
        <div className="case-hero-copy">
          <h1>{study.title}</h1>
          <Paragraphs text={study.intro} />
          <a className="case-hero-button" href="#case-content">
            View work
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

      <section className="case-hero-visual" aria-label={`${study.title} preview`}>
        <ThemedImage
          src={study.heroImage}
          alt={`${study.title} project hero visual`}
          width={study.heroWidth || 1648}
          height={study.heroHeight || 1024}
          priority
          quality={100}
          className="case-hero-img"
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) calc(100vw - 128px), 1648px"
        />
      </section>
      <ThemeToggle className="theme-toggle-case" />

      <div id="case-content">
        <section className="case-text-section">
          <Tags label="THE CHALLENGE(S)" color={study.challengeColor || "#8C62FF"} />
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
          <section className="case-visual-grid" aria-label={`${study.title} screens`}>
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

        <section className="case-text-section case-conclusion">
          <Tags
            label="CONCLUSION & KEY TAKEAWAY"
            color={study.conclusionColor || "#FFB31F"}
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
        </section>
      </div>

      <section className="case-related" aria-labelledby="case-related-title">
        <Tags label="Other Projects" color="#2CBDF2" />
        <h2 className="sr-only" id="case-related-title">
          Other Projects
        </h2>
        <div className="case-related-grid">
          {relatedWorks.map((work) => {
            const href = CASE_STUDIES[work.slug]
              ? `/projects/${work.slug}`
              : "/#works";
            const imageClassName = getImageClassName(work.title);

            return (
              <article className="case-related-card" key={work.title}>
                <Link
                  className="selected-work-link"
                  href={href}
                  aria-label={`Open ${work.title} project`}
                />
                <Link
                  className="selected-work-arrow"
                  href={href}
                  aria-label={`Open ${work.title} project`}
                >
                  <span className="selected-work-arrow-window" aria-hidden="true">
                    <span className="selected-work-arrow-stack">
                      <Image src={ArrowLight} width={15} height={15} alt="" />
                      <Image src={ArrowLight} width={15} height={15} alt="" />
                    </span>
                  </span>
                </Link>

                <div className="case-related-copy">
                  <h3>{work.title}</h3>
                  <p>{work.description}</p>
                </div>
                <div className="case-related-media">
                  <div
                    className={`case-related-image-wrap selected-work-image-wrap--${imageClassName}`}
                  >
                    <ThemedImage
                      src={work.img}
                      alt={`${work.title} project mockup`}
                      fill
                      sizes="(max-width: 767px) 100vw, 604px"
                      className="case-related-img"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
};

export default CaseStudyPage;
