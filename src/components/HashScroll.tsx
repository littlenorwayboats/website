"use client";

import { useEffect } from "react";

const BOOKING_HASH = "booking";

/** Same element the header uses as the end of the boat animation. */
export function bookingAnimationTarget(): HTMLElement | null {
  const booking = document.getElementById(BOOKING_HASH);
  const card = booking?.closest(".surface-card");
  if (card instanceof HTMLElement) return card;
  return booking;
}

/**
 * Scroll so the booking card top sits under the sticky header.
 * Matches the header boat animation end (card top === header bottom),
 * not the document scroll-padding.
 */
export function scrollToBooking(behavior: ScrollBehavior = "smooth") {
  const target = bookingAnimationTarget();
  if (!target) return false;

  const header = document.querySelector("header");
  const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0;
  const top = window.scrollY + target.getBoundingClientRect().top - headerHeight;
  window.scrollTo({ top, behavior });
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
