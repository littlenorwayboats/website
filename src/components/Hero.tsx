import Image from "next/image";
import { HeroParallax } from "./HeroParallax";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[30rem] overflow-hidden md:min-h-[36rem]"
    >
      <HeroParallax
        className="w-full text-center will-change-transform md:w-[54%] md:pr-6 lg:w-[48%]"
        image={
          <Image
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
          className="text-carved font-display text-3xl leading-[1.06] text-parchment uppercase sm:text-4xl lg:text-[3.05rem]"
        >
          Embark on a Viking voyage!
          <br />
          Experience the harbor aboard
          <br />
          our themed Duffy boats.
        </h1>
        <p className="text-etched mx-auto mt-5 max-w-[24rem] text-base leading-6 text-balance text-parchment">
          Explore the harbor with your clan in a unique Viking-themed
          electric cruiser.
        </p>
        <div className="mt-7">
          <a
            href="/#booking"
            className="neon-btn inline-flex rounded-sm px-7 py-2.5 font-display text-xl tracking-[0.06em] uppercase"
          >
            Book Your Odyssey
          </a>
        </div>
      </HeroParallax>
    </section>
  );
}
