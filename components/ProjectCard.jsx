import Image from "next/image";
import Link from "next/link";
import ThemedImage from "./ThemedImage";
import ArrowLight from "../public/assets/dark mode images/arrow-light.svg";

const getImageClassName = (title) =>
  title
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ProjectCard({
  work,
  showDescription = true,
  headingAs: Heading = "h2",
  priority = false,
  loading,
  fetchPriority,
}) {
  const imageClassName = getImageClassName(work.title);
  return (
    <article className="selected-work-card">
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

      <div>
        <div className="flex items-center gap-[16px]">
          <Heading className="selected-work-title">{work.title}</Heading>
          {work.title === "Eventlify" && (
            <span className="rounded-[8px] bg-[#FFB31F1F] px-[10px] py-[8px] font-suisse text-[14px] font-medium leading-[20px] tracking-normal text-warning">
              Coming soon
            </span>
          )}
        </div>
        {showDescription && (
          <p className="selected-work-description">{work.description}</p>
        )}
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
            priority={priority}
            loading={loading}
            fetchPriority={fetchPriority}
            sizes="(max-width: 767px) calc(100vw - 80px), (max-width: 1279px) calc(100vw - 208px), 604px"
            className="selected-work-img"
          />
        </div>
      </div>
    </article>
  );
}
