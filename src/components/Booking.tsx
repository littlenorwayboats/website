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
          className="block text-center font-display text-sm font-semibold tracking-label text-gold uppercase"
        >
          Voyage package
        </label>
        <select
          id={selectId}
          value={selected.slug}
          onChange={(event) => onPackageChange(event.target.value)}
          className="mt-3 w-full appearance-none rounded-lg border border-white/15 bg-charcoal px-4 py-3 text-center font-display text-parchment tracking-wide uppercase outline-none [background-image:linear-gradient(45deg,transparent_50%,var(--color-gold)_50%),linear-gradient(135deg,var(--color-gold)_50%,transparent_50%)] [background-position:calc(100%-1.4rem)_calc(1.1rem+2px),calc(100%-1rem)_calc(1.1rem+2px)] [background-repeat:no-repeat] [background-size:6px_6px,6px_6px] focus-visible:border-rust"
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
        <div className="mx-auto h-4 w-40 rounded bg-gold/20" />
        <div className="mt-3 h-[3.25rem] rounded-lg border border-white/15 bg-charcoal" />
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
      className="scroll-mt-24 bg-norse-900 px-4 py-16 texture-noise"
    >
      <div className="stone-frame wood-panel mx-auto max-w-4xl px-6 py-14 md:px-10">
        <h2
          id="booking-heading"
          className="text-center font-display text-3xl font-semibold tracking-[0.08em] text-gold-bright uppercase md:text-4xl"
        >
          Book Now
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-mist">
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
