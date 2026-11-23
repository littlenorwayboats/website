import { withBasePath } from "@/lib/paths";

const layer = "absolute inset-0 size-full";

export function Logo({
  className = "h-12 w-12 sm:h-20 sm:w-20",
  colorOnHover = false,
  colored = false,
  priority = false,
}: {
  className?: string;
  /** Reveal the full-colour artwork while the mark is hovered or focused. */
  colorOnHover?: boolean;
  /** Always show the full-colour artwork (e.g. after scroll landmark). */
  colored?: boolean;
  /** Above the fold: load eagerly instead of lazily. */
  priority?: boolean;
}) {
  const showColorLayer = colored || colorOnHover;
  const loading = priority ? "eager" : "lazy";

  return (
    <span
      className={`group/logo relative block shrink-0 overflow-hidden ${className}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* eslint-disable @next/next/no-img-element -- static export serves SVGs as-is */}
      {showColorLayer ? (
        <img
          src={withBasePath("/images/logo-color.svg")}
          alt=""
          aria-hidden="true"
          width={435}
          height={417}
          loading={loading}
          decoding="async"
          fetchPriority="low"
          className={`${layer} ${
            colored
              ? "opacity-100 transition-opacity duration-300 ease-out"
              : "opacity-0 transition-opacity duration-200 ease-out group-hover/logo:opacity-100 group-focus-visible/logo:opacity-100"
          }`}
        />
      ) : null}
      {/* Outlines match the coloured artwork, so the hover crossfade does not shift the lines. */}
      <img
        src={withBasePath(
          showColorLayer ? "/images/logo-lines.svg" : "/images/logo-mark.svg",
        )}
        alt="Little Norway Boats logo"
        width={435}
        height={417}
        loading={loading}
        decoding="async"
        className={`${layer} ${
          showColorLayer
            ? colored
              ? "opacity-0 transition-opacity duration-300 ease-out"
              : "transition-opacity duration-200 ease-out group-hover/logo:opacity-0 group-focus-visible/logo:opacity-0"
            : ""
        }`}
      />
      {/* eslint-enable @next/next/no-img-element */}
    </span>
  );
}
