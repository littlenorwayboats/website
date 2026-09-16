export const TARGET_WIDTHS = [640, 828, 1080, 1920] as const;
export const OPTIMIZED_PREFIX = "/optimized";

export type ImageManifestEntry = {
  width: number;
  height: number;
  widths: number[];
};

export type ImageManifest = Record<string, ImageManifestEntry>;

export function optimizedVariantPath(
  src: string,
  width: number,
  format: "avif" | "webp",
): string {
  if (!src.startsWith("/") || src.startsWith("//")) {
    throw new Error(`Image src must be a root-relative path: ${src}`);
  }

  const lastSlash = src.lastIndexOf("/");
  const dir = src.slice(0, lastSlash);
  const filename = src.slice(lastSlash + 1);
  return `${OPTIMIZED_PREFIX}${dir}/${filename}-${width}.${format}`;
}

export function widthsForSource(sourceWidth: number): number[] {
  const maxWidth = TARGET_WIDTHS[TARGET_WIDTHS.length - 1];
  const widths: number[] = TARGET_WIDTHS.filter((width) => width < sourceWidth);
  const native = Math.min(sourceWidth, maxWidth);
  if (!widths.includes(native)) {
    widths.push(native);
  }
  return [...new Set(widths)].sort((a, b) => a - b);
}
