"use client";

import { useBookingBoltFilled } from "./Booking";
import { BookingWidget } from "./BookingWidget";
import { HelmetDesign } from "./HelmetDesign";
import { LightningBolt } from "./LightningBolt";

const CAL_NAMESPACE = "simple-2-hour-boat-ride";
const CAL_LINK = "littlenorwayboats/2-hour-boat-ride";

export function SimpleBooking() {
  const boltFilled = useBookingBoltFilled();

  return (
    <section
      aria-labelledby="booking"
      className="bg-parchment px-4 py-16 texture-noise"
    >
      <div className="surface-card mx-auto max-w-4xl px-6 py-14 md:px-10">
        <h2
          id="booking"
          className="scroll-mt-20 text-center font-hero text-[clamp(2rem,5vw,3.25rem)] leading-[1.18] font-semibold tracking-[0.06em] text-norse-950 sm:tracking-[0.08em]"
        >
          Book Now
        </h2>
        <LightningBolt filled={boltFilled} className="mx-auto mt-2 h-10" />
        <p className="mx-auto mt-4 max-w-xl text-center text-iron">
          Choose a date and time for a 2-hour boat ride. The widget below will
          hold your reservation.
        </p>
        <div className="mt-8">
          <BookingWidget namespace={CAL_NAMESPACE} calLink={CAL_LINK} />
        </div>
      </div>
      <div className="mt-12 flex justify-center text-norse-950" aria-hidden="true">
        <HelmetDesign />
      </div>
    </section>
  );
}
