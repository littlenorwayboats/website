import imageManifestJson from "./image-manifest.json";
import {
  optimizedVariantPath,
  type ImageManifest,
  type ImageManifestEntry,
} from "./image-paths";
import { withBasePath } from "./paths";

export type { ImageManifest, ImageManifestEntry };
export { optimizedVariantPath };

export const imageManifest = imageManifestJson as ImageManifest;

export function getImageEntry(src: string): ImageManifestEntry | undefined {
  return imageManifest[src];
}

export function cssImageSet(src: string): string {
  const fallback = withBasePath(src);
  const fallbackType = mimeFromSrc(src);
  const entry = getImageEntry(src);

  if (!entry?.widths.length) {
    return `image-set(url("${fallback}") type("${fallbackType}"))`;
  }

  const width = entry.widths[entry.widths.length - 1];
  const avif = withBasePath(optimizedVariantPath(src, width, "avif"));
  const webp = withBasePath(optimizedVariantPath(src, width, "webp"));
  return `image-set(url("${avif}") type("image/avif"), url("${webp}") type("image/webp"), url("${fallback}") type("${fallbackType}"))`;
}

function mimeFromSrc(src: string): string {
  const ext = src.slice(src.lastIndexOf(".") + 1).toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "webp") return "image/webp";
  if (ext === "avif") return "image/avif";
  if (ext === "gif") return "image/gif";
  return "image/jpeg";
}
