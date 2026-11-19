import type { Metadata } from "next";
import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Gallery } from "@/components/Gallery";
import { LogbookTabs } from "@/components/LogbookTabs";
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
      className="min-w-0 flex-1 space-y-10 bg-norse-950 py-16 texture-noise"
    >
      <header className="px-4 text-center">
        <h1 className="text-3xl font-bold tracking-[0.08em] text-gold-bright uppercase md:text-4xl">
          Logbook
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-mist">
          News and updates from Little Norway Boats.
        </p>
      </header>
      <LogbookTabs blog={<Blog />} gallery={<Gallery />} about={<About />} />
    </main>
  );
}
