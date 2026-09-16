"use client";

import { Suspense, useId } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  BOOKING_WIDGET_MIN_HEIGHT_CLASS,
  BookingWidget,
  BookingWidgetPlaceholder,
} from "./BookingWidget";
import {
  PACKAGE_PARAM,
  getVoyagePackage,
  voyagePackages,
} from "@/lib/packages";

function BookingContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectId = useId();
  const selected = getVoyagePackage(searchParams.get(PACKAGE_PARAM));

  function onPackageChange(slug: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set(PACKAGE_PARAM, slug);
    router.replace(`${pathname}?${params.toString()}#booking`, {
      scroll: false,
    });
  }

  return (
    <>
      <div className="mx-auto mt-8 max-w-md">
        <label
          htmlFor={selectId}
          className="block text-center font-display text-xs font-semibold tracking-section text-iron uppercase"
        >
          Voyage package
        </label>
        <select
          id={selectId}
          value={selected.slug}
          onChange={(event) => onPackageChange(event.target.value)}
          className="mt-3 w-full appearance-none rounded-lg border border-iron/25 bg-parchment px-4 py-3 text-center font-sans text-norse-950 outline-none [background-image:linear-gradient(45deg,transparent_50%,var(--color-rust)_50%),linear-gradient(135deg,var(--color-rust)_50%,transparent_50%)] [background-position:calc(100%-1.4rem)_calc(1.1rem+2px),calc(100%-1rem)_calc(1.1rem+2px)] [background-repeat:no-repeat] [background-size:6px_6px,6px_6px] focus-visible:border-rust"
        >
          {voyagePackages.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name} — {item.length}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-8">
        <BookingWidget
          key={selected.namespace}
          namespace={selected.namespace}
          calLink={selected.calLink}
        />
      </div>
    </>
  );
}

function BookingFallback() {
  return (
    <>
      <div className="mx-auto mt-8 max-w-md">
        <div className="mx-auto h-4 w-40 rounded bg-iron/20" />
        <div className="mt-3 h-[3.25rem] rounded-lg border border-iron/25 bg-parchment" />
      </div>
      <div className={`relative mt-8 ${BOOKING_WIDGET_MIN_HEIGHT_CLASS}`}>
        <BookingWidgetPlaceholder />
      </div>
    </>
  );
}

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-mt-24 bg-parchment px-4 py-16 texture-noise"
    >
      <div className="surface-card mx-auto max-w-4xl px-6 py-14 md:px-10">
        <h2
          id="booking-heading"
          className="text-center font-sans text-4xl font-bold tracking-tight text-norse-950 md:text-5xl"
        >
          Book Now
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-iron">
          Choose a date, a boat, and a voyage length. The widget below will
          hold your reservation.
        </p>
        <Suspense fallback={<BookingFallback />}>
          <BookingContent />
        </Suspense>
      </div>
    </section>
  );
}
