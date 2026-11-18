import type { Metadata } from "next";
import { Blog } from "@/components/Blog";
import { Gallery } from "@/components/Gallery";
import { robotsFor } from "@/lib/preview";

export const metadata: Metadata = {
  title: "Logbook",
  description:
    "Photos and news from Little Norway Boats: electric longships, harbor cruises, and Viking-themed Duffy rentals on Liberty Bay.",
  alternates: {
    canonical: "/logbook/",
  },
  robots: robotsFor("/logbook"),
};

export default function LogbookPage() {
  return (
    <main
      id="main-content"
      className="min-w-0 flex-1 space-y-16 bg-norse-950 py-16 texture-noise"
    >
      <header className="px-4 text-center">
        <h1 className="font-display text-3xl font-semibold tracking-[0.08em] text-gold-bright uppercase md:text-4xl">
          Logbook
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          Electric longships on the water: dragon prow, round shields, and a
          quiet glide through the harbor.
        </p>
      </header>
      <Gallery />
      <Blog />
    </main>
  );
}
