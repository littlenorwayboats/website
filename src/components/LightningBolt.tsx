import {
  lightningBoltFills,
  lightningBoltStroke,
  lightningBoltViewBox,
} from "./lightningBoltPaths";

const STROKE = "#131112";

export function LightningBolt({
  filled = false,
  className = "",
}: {
  /** Yellow interior, matching the bolt on the coloured ship. */
  filled?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`relative block ${className}`}
      style={{ aspectRatio: "268.75 / 119" }}
    >
      <svg
        viewBox={lightningBoltViewBox}
        className="size-full overflow-visible"
        aria-hidden="true"
      >
        <path
          d={lightningBoltStroke}
          fill={STROKE}
          fillRule="evenodd"
          className={
            filled
              ? "opacity-0 transition-opacity duration-300 ease-out"
              : "opacity-100 transition-opacity duration-300 ease-out"
          }
        />
        <g
          className={
            filled
              ? "opacity-100 transition-opacity duration-300 ease-out"
              : "opacity-0 transition-opacity duration-300 ease-out"
          }
        >
          <path d={lightningBoltStroke} fill={STROKE} fillRule="evenodd" />
          {lightningBoltFills.map((path, index) => (
            <path key={index} d={path.d} fill={path.fill} />
          ))}
        </g>
      </svg>
    </span>
  );
}
