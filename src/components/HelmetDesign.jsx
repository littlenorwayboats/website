"use client";

import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/paths";

export const HelmetDesign = () => {
  const ref = useRef(null);
  const [colored, setColored] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      setColored(center <= window.innerHeight / 2);
    };
    const onScroll = () => {
      update();
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", update);
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", update);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const layer =
    "absolute inset-0 size-full transition-opacity duration-300 ease-out";

  return (
    <div ref={ref} className="relative block h-24 w-24" aria-hidden="true">
      {/* eslint-disable @next/next/no-img-element -- static export serves SVGs as-is */}
      <img
        src={withBasePath("/images/helmet.svg")}
        alt=""
        width={483}
        height={474}
        loading="lazy"
        decoding="async"
        className={`${layer} ${colored ? "opacity-0" : "opacity-100"}`}
      />
      <img
        src={withBasePath("/images/helmet-color.svg")}
        alt=""
        width={483}
        height={474}
        loading="lazy"
        decoding="async"
        className={`${layer} ${colored ? "opacity-100" : "opacity-0"}`}
      />
      {/* eslint-enable @next/next/no-img-element */}
    </div>
  );
};
