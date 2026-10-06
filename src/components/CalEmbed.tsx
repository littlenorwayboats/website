"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { colors } from "../../tailwind.config";
import { BOOKING_WIDGET_MIN_HEIGHT_CLASS } from "./bookingWidgetLayout";
import { BookingWidgetPlaceholder } from "./BookingWidgetPlaceholder";

type CalEmbedProps = {
  namespace: string;
  calLink: string;
};

export function CalEmbed({ namespace, calLink }: CalEmbedProps) {
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
          dark: { "cal-brand": colors.rust.DEFAULT },
          light: { "cal-brand": colors.rust.DEFAULT },
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
      className={`relative w-full ${BOOKING_WIDGET_MIN_HEIGHT_CLASS}`}
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
        style={{ width: "100%", overflow: "visible" }}
        config={{
          layout: "month_view",
          theme: "light",
          useSlotsViewOnSmallScreen: "true",
        }}
      />
    </div>
  );
}
