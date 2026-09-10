import { withBasePath } from "@/lib/paths";

export function Logo({
  className = "h-[4.25rem] w-auto sm:h-20",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className="inline-flex">
      <picture>
        <source srcSet={withBasePath("/images/logo.webp")} type="image/webp" />
        <img
          src={withBasePath("/images/logo.png")}
          alt="Little Norway Boats"
          width={256}
          height={256}
          className={`${className} max-w-none`}
          decoding="async"
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
    </span>
  );
}
