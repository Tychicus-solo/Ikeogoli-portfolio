"use client";

import React, { useEffect, useRef } from "react";
import ThemedImage from "./ThemedImage";

const TrustedBrands = () => {
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
      const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
      const distance = firstGroup.getBoundingClientRect().width + gap;

      track.style.setProperty("--trusted-brands-distance", `${distance}px`);
      track.style.setProperty("--trusted-brands-duration", "10s");
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
    <div className="trusted-brands">
      <h3>Trusted by top brands &amp; businesses</h3>
      <div className="trusted-brands-mask">
        <div className="trusted-brands-track" ref={trackRef}>
          {[0, 1, 2].map((groupIndex) => (
            <div
              className="trusted-brands-logo-group"
              aria-hidden={groupIndex > 0}
              key={groupIndex}
              ref={groupIndex === 0 ? firstGroupRef : null}
            >
              <ThemedImage
                src="/assets/dark mode images/figma/trusted-brands/trusted-brands.svg"
                alt={groupIndex === 0 ? "Trusted brand logos" : ""}
                width={796}
                height={56}
                className="trusted-brands-img"
                sizes="568px"
              />
              <ThemedImage
                src="/assets/dark mode images/figma/trusted-brands/fourier-pay.svg"
                alt=""
                width={164}
                height={32}
                className="trusted-brands-fourier-img"
                sizes="116px"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
