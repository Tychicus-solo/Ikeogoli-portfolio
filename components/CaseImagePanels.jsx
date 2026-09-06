"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function CaseImagePanels({ panels, alt, children }) {
  const { isLight } = useTheme();

  if (!isLight) return children;

  return (
    <div className="case-light-panels">
      {panels.map((src, index) => (
        <div className="case-light-panel" key={src}>
          <Image
            src={src}
            alt={`${alt} — panel ${index + 1}`}
            width={1280}
            height={800}
            quality={85}
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) calc(100vw - 128px), (max-width: 1360px) calc(100vw - 80px), 1280px"
          />
        </div>
      ))}
    </div>
  );
}
