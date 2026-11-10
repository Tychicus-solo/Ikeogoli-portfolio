import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Ikeogoli Ishie — Product Designer Shaping Experiences";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const thumbnail = await readFile(join(process.cwd(), "public/assets/social/portfolio-thumbnail.png"));
  // Preserve the complete 1728:907 Figma thumbnail without cropping or stretching.
  const width = size.width;
  const height = width * 907 / 1728;

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
