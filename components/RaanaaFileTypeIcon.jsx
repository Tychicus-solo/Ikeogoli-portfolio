import Image from "next/image";

// The page artwork and badge colors come from the supplied Figma file-type icons.
const FORMAT_COLORS = {
  pdf: "pdf",
  jpg: "image", jpeg: "image", png: "image",
  mp4: "video", mpeg: "video", avi: "video",
  mp3: "audio",
  xlsx: "spreadsheet", xls: "spreadsheet", csv: "spreadsheet",
  ppt: "presentation", pptx: "presentation",
  gif: "graphic", svg: "graphic",
  docx: "document", doc: "document",
  html: "code", css: "code", sql: "code",
};

export default function RaanaaFileTypeIcon({ name, mode }) {
  const extension = name.includes(".") ? name.split(".").pop().toLowerCase() : "";
  const label = extension === "jpeg" ? "JPG" : extension.toUpperCase().slice(0, 4) || "FILE";
  return <span className="raanaa-file-type-icon" aria-hidden="true" data-file-category={FORMAT_COLORS[extension] || "generic"}>
    <Image
      className="raanaa-file-type-page"
      src={`/assets/case-studies/raanaa/playground/upload-file-page-${mode === "Light" ? "light" : "dark"}.svg`}
      width={32}
      height={40}
      alt=""
    />
    <span className="raanaa-file-type-badge">{label}</span>
  </span>;
}
