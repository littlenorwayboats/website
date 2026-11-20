"use client";

import { FAQ } from "./FAQ";
import { JsonLd } from "./JsonLd";
import { useLivePreview } from "./PreviewProvider";
import { SITE_LAUNCHED } from "@/lib/preview";
import { faqJsonLd } from "@/lib/structured-data";

function FaqComingSoon() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h1
          id="faq-heading"
          className="text-3xl font-bold tracking-[0.08em] text-gold-bright uppercase md:text-4xl"
        >
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-xl text-mist">Coming Soon...</p>
      </div>
    </section>
  );
}

export function FaqPageView() {
  const isLive = useLivePreview();
  const showFull = SITE_LAUNCHED || isLive;

  if (!showFull) {
    return <FaqComingSoon />;
  }

  return (
    <>
      <JsonLd data={faqJsonLd()} />
      <FAQ />
    </>
  );
}