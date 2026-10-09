"use client";

import { useEffect, useRef, type ReactNode, type RefObject } from "react";

const IMAGE_SHIFT = 0.14;
const TEXT_SHIFT = 0.42;
const FADE_DISTANCE = 420;

export function HeroParallax({
  image,
  children,
  className,
  underlayRef,
}: {
  image: ReactNode;
  children: ReactNode;
  className?: string;
  /** Photo in the dips below the hero, kept in step with the hero image. */
  underlayRef?: RefObject<HTMLDivElement | null>;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 767px)");
    if (motion.matches || mobile.matches) return;

    let frame = 0;

    function update() {
      frame = 0;
      const imageNode = imageRef.current;
      const textNode = textRef.current;
      if (!imageNode || !textNode) return;

      const scrolled = window.scrollY;
      const shift = `translate3d(0, ${scrolled * IMAGE_SHIFT}px, 0)`;
      imageNode.style.transform = shift;
      if (underlayRef?.current) underlayRef.current.style.transform = shift;
      textNode.style.transform = `translate3d(0, ${scrolled * TEXT_SHIFT}px, 0)`;
      textNode.style.opacity = String(Math.max(0, 1 - scrolled / FADE_DISTANCE));
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [underlayRef]);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden [transform:translateZ(0)]">
        <div ref={imageRef} className="hero-image-layer will-change-transform">
          {image}
        </div>
      </div>
      <div className="hero-veil absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[calc(100svh-1px)] w-full max-w-6xl min-w-0 items-center overflow-hidden px-4 py-20">
        <div ref={textRef} className={`min-w-0 ${className}`}>
          {children}
        </div>
      </div>
    </>
  );
}
