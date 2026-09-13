"use client";

import React, { useEffect, useRef } from "react";
import ThemedImage from "./ThemedImage";
import { useTheme } from "./ThemeProvider";

const LIGHT_LOGOS = [
  { name: "Pettysave", file: "pettysave", width: 126, height: 35 },
  { name: "RealVest", file: "realvest", width: 128, height: 33 },
  { name: "Glocapro", file: "glocapro", width: 159, height: 56 },
  { name: "Icheta", file: "icheta", width: 155, height: 48 },
  { name: "FourierPay", file: "fourier-pay", width: 164, height: 32 },
  { name: "Pertinence", file: "pertinence", width: 191, height: 32 },
  { name: "Lyvads", file: "lyvads", width: 166, height: 40 },
  { name: "OneApp", file: "oneapp", width: 117, height: 40 },
  { name: "Mybuildingfile", file: "mybuildingfile", width: 215, height: 40 },
];

const TrustedBrands = () => {
  const { isLight } = useTheme();
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
      track.style.setProperty("--trusted-brands-duration", `${distance / 72}s`);
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
              {isLight ? (
                LIGHT_LOGOS.map((logo) => (
                  <span
                    key={logo.file}
                    className={`trusted-brands-light-logo trusted-brands-light-logo--${logo.file}`}
                    role="img"
                    aria-label={groupIndex === 0 ? logo.name : undefined}
                    style={{ width: logo.width * 40 / 56, height: logo.height * 40 / 56 }}
                  >
                    <ThemedImage
                      src={`/assets/light mode images/figma/trusted-brands/logos/${logo.file}.svg`}
                      alt=""
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                    />
                  </span>
                ))
              ) : (
                <>
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
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustedBrands;
