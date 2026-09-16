import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about boating licenses, capacity, pets, weather, and what to expect on a Little Norway Boats rental on Liberty Bay.",
  alternates: {
    canonical: "/faq/",
  },
};

export default function FAQPage() {
  return (
    <main id="main-content" className="flex-1">
      <JsonLd data={faqJsonLd()} />
      <FAQ />
    </main>
  );
}
