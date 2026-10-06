"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { BOOKING_WIDGET_MIN_HEIGHT_CLASS } from "./bookingWidgetLayout";
import { BookingWidgetPlaceholder } from "./BookingWidgetPlaceholder";

type BookingWidgetProps = {
  namespace: string;
  calLink: string;
};

export { BOOKING_WIDGET_MIN_HEIGHT_CLASS } from "./bookingWidgetLayout";
export { BookingWidgetPlaceholder } from "./BookingWidgetPlaceholder";

const CalEmbed = dynamic(
  () => import("./CalEmbed").then((module) => module.CalEmbed),
  {
    ssr: false,
    loading: () => (
      <div className={`relative ${BOOKING_WIDGET_MIN_HEIGHT_CLASS}`}>
        <BookingWidgetPlaceholder />
      </div>
    ),
  },
);

export function BookingWidget({ namespace, calLink }: BookingWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "480px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {shouldLoad ? (
        <CalEmbed key={namespace} namespace={namespace} calLink={calLink} />
      ) : (
        <div className={`relative ${BOOKING_WIDGET_MIN_HEIGHT_CLASS}`}>
          <p className="sr-only" role="status">
            Booking calendar loads when you scroll to this section
          </p>
          <BookingWidgetPlaceholder />
        </div>
      )}
    </div>
  );
}
