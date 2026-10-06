"use client";

import { useEffect } from "react";

const BOOKING_HASH = "booking";

/** Scroll so #booking (Book Now title) sits under the sticky header — logo animation end. */
export function scrollToBooking(behavior: ScrollBehavior = "smooth") {
  const booking = document.getElementById(BOOKING_HASH);
  if (!booking) return false;
  booking.scrollIntoView({ behavior, block: "start" });
  return true;
}

export function HashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      const run = () => {
        if (id === BOOKING_HASH) {
          scrollToBooking("auto");
          return;
        }
        document.getElementById(id)?.scrollIntoView();
      };

      requestAnimationFrame(run);
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
