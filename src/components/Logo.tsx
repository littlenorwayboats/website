import { OptimizedImage } from "./OptimizedImage";

export function Logo({
  className = "h-16 w-16 sm:h-20 sm:w-20",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`inline-block shrink-0 overflow-hidden ${className}`}>
      <OptimizedImage
        src="/images/logo.png"
        alt="Little Norway Boats"
        width={471}
        height={472}
        sizes="80px"
        className="h-full w-full object-contain"
        priority={priority}
      />
    </span>
  );
}
