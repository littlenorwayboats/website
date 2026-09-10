"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";

type BookingWidgetProps = {
  namespace: string;
  calLink: string;
};

export const BOOKING_WIDGET_MIN_HEIGHT_CLASS = "min-h-[350px] md:min-h-[570px]";

export function BookingWidgetPlaceholder() {
  return (
    <div
      className="absolute inset-0 z-10 animate-pulse rounded-lg bg-[#1a1a1a]"
      aria-hidden="true"
    />
  );
}

export function BookingWidget({ namespace, calLink }: BookingWidgetProps) {
  const [readyNamespace, setReadyNamespace] = useState<string | null>(null);
  const isReady = readyNamespace === namespace;

  useEffect(() => {
    let cancelled = false;
    let calApi: Awaited<ReturnType<typeof getCalApi>> | undefined;

    const onSettled = () => {
      if (!cancelled) {
        setReadyNamespace(namespace);
      }
    };

    (async function () {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;

      calApi = cal;
      cal("ui", {
        cssVarsPerTheme: {
          dark: { "cal-brand": "#00eaff" },
          light: { "cal-brand": "#00eaff" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", { action: "linkReady", callback: onSettled });
      cal("on", { action: "linkFailed", callback: onSettled });
    })();

    return () => {
      cancelled = true;
      calApi?.("off", { action: "linkReady", callback: onSettled });
      calApi?.("off", { action: "linkFailed", callback: onSettled });
    };
  }, [namespace]);

  return (
    <div
      className={`relative ${BOOKING_WIDGET_MIN_HEIGHT_CLASS}`}
      aria-busy={!isReady}
    >
      {!isReady && (
        <>
          <p className="sr-only" role="status">
            Loading booking calendar
          </p>
          <BookingWidgetPlaceholder />
        </>
      )}
      <Cal
        key={namespace}
        namespace={namespace}
        calLink={calLink}
        className={isReady ? undefined : "invisible"}
        style={{ width: "100%", height: "100%", overflow: "scroll" }}
        config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
      />
    </div>
  );
}
