"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function CaseImagePanels({ panels, darkPanels, alt, children }) {
  const { isLight } = useTheme();
  const activePanels = isLight ? panels : darkPanels;

  if (!activePanels) return children;

  const hasColumns = activePanels.some((panel) => panel.columnSpan === 1);

  return (
    <div className="case-image-panels" style={{ display: "grid", rowGap: 40, ...(hasColumns ? { gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: "3.125%" } : {}) }}>
      {activePanels.map((panel, index) => {
        const { src, width = 1280, height = 800 } =
          typeof panel === "string" ? { src: panel } : panel;

        return (
          <div
            className="case-image-panel"
            key={`${src}-${index}`}
            style={hasColumns ? { gridColumn: `span ${panel.columnSpan || 2}` } : undefined}
          >
            <Image
              src={src}
              alt={`${alt} — panel ${index + 1}`}
              width={width}
              height={height}
              loading="lazy"
              decoding="async"
              quality={85}
              sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 128px), (max-width: 1360px) calc(100vw - 80px), 1280px"
            />
          </div>
        );
      })}
    </div>
  );
}
