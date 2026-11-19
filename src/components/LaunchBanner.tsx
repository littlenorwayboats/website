import { SITE_LAUNCHED } from "@/lib/preview";

export function LaunchBanner() {
  if (SITE_LAUNCHED) return null;

  return (
    <div
      className="pointer-events-none absolute top-[calc(5rem+var(--safe-top))] left-1/2 z-40 w-[115vw] -translate-x-1/2 -rotate-1"
      role="status"
      aria-live="polite"
    >
      <div className="launch-banner border-y border-gold/35 px-4 py-2 text-center sm:py-2.5">
        <p className="font-hero text-[clamp(1.15rem,3.4vw,2.1rem)] leading-none font-bold tracking-[0.14em] uppercase sm:tracking-[0.18em]">
          Launching in 2027
        </p>
      </div>
    </div>
  );
}