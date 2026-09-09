"use client";

import { useEffect } from "react";

export function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView();
      });
    }

    const timeouts = [0, 100, 400].map((ms) =>
      window.setTimeout(scrollToHash, ms),
    );
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return null;
}
