import Image from "next/image";

const SPARKLES = [
  [1, 14, 1, 2],
  [2, 12.5, 14.75, 1.5],
  [2, 16.5, -5.25, 1.5],
  [3, 14.5, -14.25, 1.5],
  [4, 5.5, -6.25, 1.5],
  [4, 25.5, 12.75, 1.5],
  [6, 23.73, -7.77, 1.5],
  [6, 17.5, 7.75, 1.5],
  [4, 7.5, 6.92, 1.5],
];

export function ButtonSparkles() {
  return (
    <span className="contact-email-sparkles" aria-hidden="true">
      {SPARKLES.map(([asset, right, offset, size], index) => (
        <span
          key={index}
          style={{ right: `${right}px`, top: `calc(50% + ${offset - size / 2}px)` }}
        >
          <Image
            src={`/assets/figma/button-sparkles/${asset}.svg`}
            width={size}
            height={size}
            alt=""
          />
        </span>
      ))}
    </span>
  );
}

export function FlipIcon({ children, size = 24 }) {
  return (
    <span className="button-icon-window" style={{ "--button-icon-size": `${size}px` }} aria-hidden="true">
      <span className="button-icon-stack">
        <span>{children}</span>
        <span>{children}</span>
      </span>
    </span>
  );
}

export function FlipLabel({ children }) {
  return (
    <span className="button-flip-window">
      <span className="button-flip-stack" aria-hidden="true">
        <span>{children}</span>
        <span>{children}</span>
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}
