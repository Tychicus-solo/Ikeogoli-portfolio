import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ikeogoli Ishie — Product Designer Shaping Experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const thumbnail = await readFile(join(process.cwd(), "public/assets/social/portfolio-thumbnail.png"));
  // Fit the complete 402:320 Figma lockup into the card with a 24px safe margin.
  // The 3x PNG remains larger than its rendered dimensions; nothing is upscaled.
  const height = size.height - 48;
  const width = height * 402 / 320;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1e1e1e" }}>
      <img
        src={`data:image/png;base64,${thumbnail.toString("base64")}`}
        alt={alt}
        width={width}
        height={height}
      />
    </div>, size,
  );
}
