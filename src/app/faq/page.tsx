import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { robotsFor } from "@/lib/preview";
import { faqJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Basics, voyage day details, safety rules, and booking policies for Little Norway Boats rentals on Liberty Bay in Poulsbo.",
  alternates: {
    canonical: "/faq/",
  },
  robots: robotsFor("/faq"),
};

export default function FAQPage() {
  return (
    <main id="main-content" className="min-w-0 flex-1">
      <JsonLd data={faqJsonLd()} />
      <FAQ />
    </main>
  );
}
