import React from "react";
import { FlipLabel } from "./ButtonEffects";

const Tags = ({ label = "Available for work", color = "#34D399" }) => {
  const isAvailable = label === "Available for work";

  return (
    <div
      className={`flex items-center gap-[10px] rounded-[16px] bg-transparent${isAvailable ? " tag--available" : ""}`}
    >
      <span
        className="w-[12px] h-[12px] rounded-full"
        style={{ backgroundColor: color }}
      ></span>

      {isAvailable ? (
        <span className="available-label-window">
          <FlipLabel>{label}</FlipLabel>
        </span>
      ) : (
        <p className="tag-label text-[16px] leading-[24px] font-medium text-neutral-300 font-suisse">
          {label}
        </p>
      )}
    </div>
  );
};

export default Tags;
