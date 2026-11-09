import { ImageResponse } from "next/og";

export const alt = "Ikeogoli Ishie — Product designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 88, background: "#0b0f1a", color: "#ffffff" }}>
      <div style={{ fontSize: 32, color: "#b3a4ff", marginBottom: 32 }}>Ikeogoli Ishie</div>
      <div style={{ fontSize: 84, fontWeight: 700 }}>Product designer</div>
      <div style={{ fontSize: 30, color: "#dadbdc", marginTop: 28 }}>Thoughtful web and mobile experiences.</div>
    </div>, size,
  );
}
