"use client";

import { useRef } from "react";
import { bookingHref } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { HeroParallax } from "./HeroParallax";
import { OptimizedImage } from "./OptimizedImage";

function HeroPhoto({ decorative = false }: { decorative?: boolean }) {
  return (
    <OptimizedImage
      src="/images/hero.jpg"
      alt={
        decorative
          ? ""
          : "A quiet harbor at sunset with boats at rest on still water"
      }
      fill
      priority
      className="object-cover object-[70%_center]"
      sizes="100vw"
    />
  );
}

export function Hero() {
  const underlayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hero-screen relative">
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="relative z-20 min-h-[inherit] overflow-hidden"
      >
        <HeroParallax
          underlayRef={underlayRef}
          className="w-full min-w-0 max-w-full overflow-hidden text-center md:w-[54%] md:pr-6 lg:w-[48%]"
          image={<HeroPhoto />}
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
            Hourly self-captained rentals at Poulsbo Marina for up to 10 guests.
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
      <div className="hero-dip-window" aria-hidden="true">
        <div className="hero-dips">
          <div className="hero-dips-frame">
            <div ref={underlayRef} className="hero-image-layer will-change-transform">
              <HeroPhoto decorative />
            </div>
            <div className="hero-dips-veil" />
          </div>
        </div>
      </div>
    </div>
  );
}
