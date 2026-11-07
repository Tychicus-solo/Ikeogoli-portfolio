"use client";

import Image from "next/image";
import { useId } from "react";
import { useTheme } from "./ThemeProvider";

export default function CaseImagePanels({ panels, darkPanels, alt, children }) {
  const { isLight } = useTheme();
  const clipId = useId();
  const activePanels = isLight ? panels : darkPanels;

  if (!activePanels) return children;

  const hasColumns = activePanels.some((panel) => panel.columnSpan === 1);

  return (
    <div className="case-image-panels" style={{ display: "grid", rowGap: 40, ...(hasColumns ? { gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "3.125%" } : {}) }}>
      {activePanels.map((panel, index) => {
        const { src, width = 1280, height = 800, quality = 85, clips, canvas } =
          typeof panel === "string" ? { src: panel } : panel;

        return (
          <div
            className={`case-image-panel${clips ? " case-image-panel--artwork" : ""}`}
            key={`${src}-${index}`}
            style={{
              ...(hasColumns ? { gridColumn: `span ${panel.columnSpan || 2}` } : {}),
              ...(panel.background ? { backgroundColor: panel.background } : {}),
              ...(panel.borderRadius !== undefined ? { borderRadius: panel.borderRadius } : {}),
            }}
          >
            {clips && (
              <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
                <defs>
                  <clipPath id={`${clipId}-${index}`} clipPathUnits="objectBoundingBox">
                    {clips.map((clip, part) => (
                      <rect key={part}
                        x={clip.x / canvas.width} y={clip.y / canvas.height}
                        width={clip.width / canvas.width} height={clip.height / canvas.height}
                        rx={clip.radius / canvas.width} ry={clip.radius / canvas.height}
                      />
                    ))}
                  </clipPath>
                </defs>
              </svg>
            )}
            <Image
              src={src}
              alt={`${alt} — panel ${index + 1}`}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              quality={quality}
              style={clips ? { clipPath: `url(#${clipId}-${index})` } : undefined}
              sizes={panel.sizes || "(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 128px), (max-width: 1360px) calc(100vw - 80px), 1280px"}
            />
          </div>
        );
      })}
    </div>
  );
}
