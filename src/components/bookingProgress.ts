function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Scroll progress from the features section to the booking card, under the sticky header. */
export function scrollProgressToBooking(
  features: HTMLElement,
  bookingAnchor: HTMLElement,
  headerHeight: number,
  reduceMotion: boolean,
) {
  const start =
    window.scrollY + features.getBoundingClientRect().top - headerHeight;
  const end =
    window.scrollY + bookingAnchor.getBoundingClientRect().top - headerHeight;
  const range = Math.max(1, end - start);
  const progress = clamp((window.scrollY - start) / range, 0, 1);

  if (reduceMotion) return progress >= 0.5 ? 1 : 0;
  return progress;
}

export function resolveBookingAnchor() {
  const booking = document.getElementById("booking");
  return booking?.closest<HTMLElement>(".surface-card") ?? booking;
}

/** True once the booking card meets the sticky nav — the same moment the ship logo fills in. */
export function isBookingReached(
  features: HTMLElement,
  bookingAnchor: HTMLElement,
  headerHeight: number,
  reduceMotion: boolean,
) {
  const progress = scrollProgressToBooking(
    features,
    bookingAnchor,
    headerHeight,
    reduceMotion,
  );

  return (
    progress >= 1 ||
    bookingAnchor.getBoundingClientRect().top <= headerHeight + 2
  );
}
