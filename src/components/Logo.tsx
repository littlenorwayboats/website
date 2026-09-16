import { OptimizedImage } from "./OptimizedImage";

export function Logo({
  className = "h-[4.25rem] w-auto sm:h-20",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`inline-flex ${className}`}>
      <OptimizedImage
        src="/images/logo.png"
        alt="Little Norway Boats"
        width={471}
        height={472}
        className="h-full w-auto max-w-none object-contain"
        priority={priority}
      />
    </span>
  );
}
