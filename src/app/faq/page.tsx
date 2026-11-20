import type { Metadata } from "next";
import { FaqPageView } from "@/components/FaqPageView";
import { robotsFor } from "@/lib/preview";

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
      <FaqPageView />
    </main>
  );
}
