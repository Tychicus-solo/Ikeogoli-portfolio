import { Tags, ThemedImage } from "../../components";
import { SELECTED_WORKS } from "../../constants/selectworksconstants";
import ArrowLight from "../../public/assets/dark mode images/arrow-light.svg";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const getImageClassName = (title) =>
  title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const SelectedWorks = () => {
  return (
    <section className="selected-works-section" id="works">
      <div className="selected-works-content mt-[8px]">
        <div className="section-header px-[160px]">
          <Tags label="Projects" color="#8C62FF" />
          <h1 className="header-text">Selected Works</h1>
        </div>
        <div className="selected-works-grid">
          {SELECTED_WORKS.map((work, index) => {
            const imageClassName = getImageClassName(work.title);

            return (
              <article className="selected-work-card" key={work.title}>
                <Link
                  className="selected-work-link"
                  href={work.href || "#works"}
                  aria-label={`Open ${work.title} project`}
                />
                <Link
                  className="selected-work-arrow"
                  href={work.href || "#works"}
                  aria-label={`Open ${work.title} project`}
                >
                  <span className="selected-work-arrow-window" aria-hidden="true">
                    <span className="selected-work-arrow-stack">
                      <Image src={ArrowLight} width={15} height={15} alt="" />
                      <Image src={ArrowLight} width={15} height={15} alt="" />
                    </span>
                  </span>
                </Link>

                <div className="">
                  <div className="flex items-center gap-[16px]">
                    <h2 className="selected-work-title">{work.title}</h2>
                    {work.title === "Eventlify" && (
                      <span className="rounded-[8px] bg-[#FFB31F1F] px-[12px] py-[8px] font-suisse text-[14px] font-medium leading-[20px] tracking-normal text-warning">
                        Coming soon
                      </span>
                    )}
                  </div>
                  <p className="selected-work-description">
                    {work.description}
                  </p>
                  <div className="selected-work-tags">
                    {work.tags.map((tag) => (
                      <span className="selected-work-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="selected-work-media">
                  <div
                    className={`selected-work-image-wrap selected-work-image-wrap--${imageClassName}`}
                  >
                    <ThemedImage
                      src={work.img}
                      alt={`${work.title} project mockup`}
                      fill
                      priority={index < 2}
                      loading={index >= 2 && index < 4 ? "eager" : undefined}
                      fetchPriority={index >= 2 && index < 4 ? "high" : undefined}
                      sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) calc(100vw - 208px), 604px"
                      className="selected-work-img"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
