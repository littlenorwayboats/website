"use client";

import { useRef, type ReactNode } from "react";
import { bookingHref } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { HeroParallax } from "./HeroParallax";
import { OptimizedImage } from "./OptimizedImage";

function HeroPhoto({ decorative = false }: { decorative?: boolean }) {
  return (
    <OptimizedImage
      src="/images/poulsbo.jpg"
      alt={
        decorative
          ? ""
          : "Poulsbo waterfront reflected in the calm water of Liberty Bay"
      }
      fill
      priority
      className="object-cover object-[center_42%]"
      sizes="100vw"
    />
  );
}

export function Hero({ action }: { action?: ReactNode }) {
  const underlayRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hero-screen relative">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden [transform:translateZ(0)]">
          <div ref={underlayRef} className="hero-image-layer will-change-transform">
            <HeroPhoto decorative />
          </div>
        </div>
        <div className="hero-veil absolute inset-0" />
      </div>
      <section
        id="home"
        aria-labelledby="hero-heading"
        className="hero-wave relative z-20 min-h-[inherit] overflow-hidden"
      >
        <HeroParallax
          underlayRef={underlayRef}
          className="w-full min-w-0 max-w-full overflow-hidden text-center md:w-[54%] md:pr-6 lg:w-[48%]"
          image={<HeroPhoto />}
        >
          <h1
            id="hero-heading"
            className="w-full max-w-full font-display text-[clamp(1.85rem,5.6vw,3.65rem)] leading-[1.18] font-semibold tracking-[0.06em] text-balance text-gold-bright sm:tracking-[0.08em]"
          >
            <span className="block sm:inline">Electric Boat Rentals</span>{" "}
            <span className="block sm:inline">in Poulsbo, WA</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[24rem] text-lg leading-7 text-balance text-parchment">
          Captain your own Viking-themed electric cruiser from the Port of Poulsbo. Hourly self-captained rentals for up to 10 guests. <a href="/faq" className="text-gold-bright">No experience required.</a>
          </p>
          <div className="mt-7">
            {action ?? (
              <a
                href={withBasePath(bookingHref)}
                className="neon-btn inline-flex rounded-sm px-7 py-2.5 font-display text-sm font-semibold tracking-cta uppercase"
              >
                Book Your Odyssey
              </a>
            )}
          </div>
        </HeroParallax>
      </section>
    </div>
  );
}
