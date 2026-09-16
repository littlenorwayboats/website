import { bookingHref } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { HeroParallax } from "./HeroParallax";
import { OptimizedImage } from "./OptimizedImage";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[30rem] overflow-hidden md:min-h-[36rem]"
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
          className="max-w-full font-display text-[clamp(1.35rem,6.4vw,3.15rem)] leading-[1.12] font-bold tracking-[0.02em] break-words text-gold-bright uppercase sm:tracking-[0.04em]"
        >
          Experience the harbor aboard
          our themed Duffy boats.
        </h1>
        <p className="mx-auto mt-5 max-w-[24rem] text-lg leading-7 text-balance text-parchment">
          Explore the harbor with your clan in a unique Viking-themed
          electric cruiser.
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
