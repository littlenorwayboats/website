export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-mt-24 bg-norse-900 px-4 py-16 texture-noise"
    >
      <div className="stone-frame wood-panel mx-auto max-w-4xl px-6 py-12 md:px-10">
        <h2
          id="booking-heading"
          className="text-center font-display text-3xl text-gold uppercase md:text-4xl"
        >
          Book Now
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-mist">
          Choose a date, a boat, and a voyage length. The widget below will
          hold your reservation.
        </p>
        <div className="mt-8 min-h-72 rounded-sm border border-dashed border-neon/50 bg-norse-950/70 p-6 text-center text-mist">
          <div>{/* IFRAME GOES HERE */}</div>
          <p className="text-sm tracking-wide text-gold uppercase">
            Booking widget placeholder
          </p>
          <p className="mt-2 text-sm">
            Replace this box with your scheduling iframe when it is ready.
          </p>
        </div>
      </div>
    </section>
  );
}
