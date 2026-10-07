import { bookingHref } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { HeroParallax } from "./HeroParallax";
import { OptimizedImage } from "./OptimizedImage";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate z-20 -mt-20 min-h-[calc(100svh-1px)] overflow-hidden"
    >
      <HeroParallax
        className="w-full min-w-0 max-w-full overflow-hidden text-center md:w-[54%] md:pr-6 lg:w-[48%]"
        image={
          <OptimizedImage
            src="/images/hero.jpg"
            alt="A quiet harbor at sunset with boats at rest on still water"
            fill
            priority
            className="object-cover object-[70%_center]"
            sizes="100vw"
          />
        }
      >
        <h1
          id="hero-heading"
          className="w-full max-w-full font-display text-[clamp(1.35rem,6vw,3.15rem)] leading-[1.12] font-bold tracking-[0.02em] text-gold-bright uppercase sm:tracking-[0.04em]"
        >
          <span className="block sm:inline">Explore liberty bay</span>{" "}
          <span className="block sm:inline">with our Viking-themed</span>{" "}
          <span className="block sm:inline">electric cruiser.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[24rem] text-lg leading-7 text-balance text-parchment">
          Hourly self-captained rentals at Poulsbo Marina.
        </p>
        <div className="mt-7">
          <a
            href={withBasePath(bookingHref)}
            className="neon-btn inline-flex rounded-sm px-7 py-2.5 font-display text-sm font-semibold tracking-cta uppercase"
          >
            Book Your Odyssey
          </a>
        </div>
      </HeroParallax>
    </section>
  );
}
