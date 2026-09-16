import { getImageEntry, optimizedVariantPath } from "@/lib/images";
import { withBasePath } from "@/lib/paths";

type OptimizedImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
};

function srcSetFor(
  src: string,
  widths: number[],
  format: "avif" | "webp",
): string {
  return widths
    .map(
      (width) =>
        `${withBasePath(optimizedVariantPath(src, width, format))} ${width}w`,
    )
    .join(", ");
}

export function OptimizedImage({
  src,
  alt,
  sizes,
  fill = false,
  width,
  height,
  priority = false,
  className,
}: OptimizedImageProps) {
  const entry = getImageEntry(src);
  const imgClassName = fill
    ? ["h-full w-full", className].filter(Boolean).join(" ")
    : className;

  const img = (
    // Static export cannot use next/image optimization; srcset is built at compile time.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={withBasePath(src)}
      alt={alt}
      width={fill ? undefined : (width ?? entry?.width)}
      height={fill ? undefined : (height ?? entry?.height)}
      sizes={sizes}
      className={imgClassName}
      decoding="async"
      fetchPriority={priority ? "high" : "low"}
      loading={priority ? "eager" : "lazy"}
    />
  );

  if (!entry?.widths.length) {
    if (!fill) {
      return img;
    }
    return (
      <span className="absolute inset-0 block h-full w-full">{img}</span>
    );
  }

  return (
    <picture className={fill ? "absolute inset-0 block h-full w-full" : undefined}>
      <source
        type="image/avif"
        srcSet={srcSetFor(src, entry.widths, "avif")}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={srcSetFor(src, entry.widths, "webp")}
        sizes={sizes}
      />
      {img}
    </picture>
  );
}
