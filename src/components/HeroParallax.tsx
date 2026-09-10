"use client";

import { useEffect, useRef, type ReactNode } from "react";

const IMAGE_SHIFT = 0.14;
const TEXT_SHIFT = 0.42;
const FADE_DISTANCE = 420;

export function HeroParallax({
  image,
  children,
  className,
}: {
  image: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    let frame = 0;

    function update() {
      frame = 0;
      const imageNode = imageRef.current;
      const textNode = textRef.current;
      if (!imageNode || !textNode) return;

      const scrolled = window.scrollY;
      imageNode.style.transform = `translate3d(0, ${scrolled * IMAGE_SHIFT}px, 0)`;
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
  }, []);

  return (
    <>
      <div ref={imageRef} className="hero-image-layer will-change-transform">
        {image}
      </div>
      <div className="hero-veil absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex min-h-[30rem] max-w-6xl items-center px-4 py-20 md:min-h-[36rem]">
        <div ref={textRef} className={className}>
          {children}
        </div>
      </div>
    </>
  );
}
