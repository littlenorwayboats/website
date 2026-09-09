import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers about licensing, capacity, pets, weather, and what to expect on a Little Norway Boats rental.",
};

export default function FAQPage() {
  return (
    <main id="main-content" className="flex-1">
      <FAQ />
    </main>
  );
}
