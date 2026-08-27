"use client";

import React, { useEffect, useRef } from "react";
import ThemedImage from "./ThemedImage";

const FIGMA_ASSET_DIR = "/assets/dark mode images/herocarouselimgs/figma";

const WORK_SCROLL_ITEMS = [
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/pertinence-realtor-club.png`,
    alt: "Pertinence Properties realtor club website",
    caption: "PPL",
    width: 752,
    height: 543,
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/ppl-landing.png`,
    alt: "Pertinence Properties landing page",
    caption: "PPL",
    width: 752,
    height: 567,
  },
  {
    type: "stack",
    items: [
      {
        src: `${FIGMA_ASSET_DIR}/oneapp-book-inspection.png`,
        alt: "OneApp inspection booking mobile screen",
        caption: "PPL",
      },
      {
        src: `${FIGMA_ASSET_DIR}/oneapp-sign-in.png`,
        alt: "OneApp sign in mobile screen",
        caption: "OneApp",
      },
      {
        src: `${FIGMA_ASSET_DIR}/oneapp-marketplace.png`,
        alt: "OneApp marketplace mobile screen",
        caption: "OneApp",
      },
    ],
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/pertinence-properties.png`,
    alt: "Pertinence Properties listing website",
    caption: "PPL",
    width: 752,
    height: 543,
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/oneapp-landing.png`,
    alt: "OneApp landing page",
    caption: "OneApp",
    width: 752,
    height: 543,
  },
  {
    type: "stack",
    items: [
      {
        src: `${FIGMA_ASSET_DIR}/fitfam-water.png`,
        alt: "Fitfam water tracking mobile screen",
        caption: "Fitfam",
      },
      {
        src: `${FIGMA_ASSET_DIR}/fitfam-routine.png`,
        alt: "Fitfam routine mobile screen",
        caption: "Fitfam",
      },
      {
        src: `${FIGMA_ASSET_DIR}/fitfam-meals-history.png`,
        alt: "Fitfam meals history mobile screen",
        caption: "Fitfam",
      },
    ],
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/oneapp-product.png`,
    alt: "OneApp product website",
    caption: "OneApp",
    width: 752,
    height: 543,
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/eventlify-dashboard.png`,
    alt: "Eventlify dashboard",
    caption: "Eventlify",
    width: 752,
    height: 543,
  },
  {
    type: "stack",
    items: [
      {
        src: `${FIGMA_ASSET_DIR}/gendoc-home.png`,
        alt: "GenDoc home mobile screen",
        caption: "GenDoc",
      },
      {
        src: `${FIGMA_ASSET_DIR}/gendoc-details.png`,
        alt: "GenDoc details mobile screen",
        caption: "GenDoc",
      },
      {
        src: `${FIGMA_ASSET_DIR}/gendoc-call.png`,
        alt: "GenDoc call mobile screen",
        caption: "GenDoc",
      },
    ],
  },
  {
    type: "stack",
    items: [
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-onboarding.png`,
        alt: "Lyvads onboarding mobile screen",
        caption: "Lyvads",
      },
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-home.png`,
        alt: "Lyvads home mobile screen",
        caption: "Lyvads",
      },
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-creator-profile.png`,
        alt: "Lyvads creator profile mobile screen",
        caption: "Lyvads",
      },
    ],
  },
  {
    type: "single",
    src: `${FIGMA_ASSET_DIR}/lyvads-landing.png`,
    alt: "Lyvads landing page",
    caption: "Lyvads",
    width: 752,
    height: 543,
  },
  {
    type: "stack",
    items: [
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-dialogue.png`,
        alt: "Lyvads dialogue mobile screen",
        caption: "Lyvads",
      },
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-search.png`,
        alt: "Lyvads search mobile screen",
        caption: "Lyvads",
      },
      {
        src: `${FIGMA_ASSET_DIR}/lyvads-notifications.png`,
        alt: "Lyvads notifications mobile screen",
        caption: "Lyvads",
      },
    ],
  },
];

const WorkScrollItem = ({ item, priority = false }) => {
  if (item.type === "stack") {
    return (
      <div className="work-scroll-phone-row">
        {item.items.map((phone) => (
          <figure className="work-scroll-phone-item" key={phone.src}>
            <ThemedImage
              src={phone.src}
              alt={phone.alt}
              width={235}
              height={509}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              className="work-scroll-phone-image"
              sizes="(max-width: 767px) 29vw, 235px"
            />
            <figcaption>{phone.caption}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  return (
    <figure className="work-scroll-single-item">
      <ThemedImage
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        className="work-scroll-image"
        sizes="(max-width: 767px) 92vw, (max-width: 1279px) 70vw, 752px"
      />
      <figcaption>{item.caption}</figcaption>
    </figure>
  );
};

const WorkScrollMask = () => {
  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const firstGroup = firstGroupRef.current;

    if (!track || !firstGroup) {
      return undefined;
    }

    const measureLoop = () => {
      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.rowGap || styles.gap) || 0;
      const distance = firstGroup.getBoundingClientRect().height + gap;

      track.style.setProperty("--work-scroll-distance", `${distance}px`);
      track.style.setProperty("--work-scroll-duration", "60s");
    };

    measureLoop();

    const resizeObserver = new ResizeObserver(measureLoop);
    resizeObserver.observe(firstGroup);
    resizeObserver.observe(track);
    window.addEventListener("resize", measureLoop);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureLoop);
    };
  }, []);

  return (
    <div className="work-scroll-mask" aria-label="Portfolio work preview">
      <div className="work-scroll-track" ref={trackRef}>
        {[0, 1].map((groupIndex) => (
          <div
            className="work-scroll-group"
            aria-hidden={groupIndex > 0}
            key={groupIndex}
            ref={groupIndex === 0 ? firstGroupRef : null}
          >
            {WORK_SCROLL_ITEMS.map((item, index) => (
              <WorkScrollItem
                item={item}
                priority={groupIndex === 0 && index < 3}
                key={`${groupIndex}-${item.type}-${item.src || item.items[0].src}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="work-scroll-fade" aria-hidden="true" />
    </div>
  );
};

export default WorkScrollMask;
