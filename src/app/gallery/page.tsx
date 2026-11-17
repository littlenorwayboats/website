import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";
import { robotsFor } from "@/lib/preview";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Little Norway Boats: electric longships, harbor cruises, and Viking-themed Duffy rentals on Liberty Bay.",
  alternates: {
    canonical: "/gallery/",
  },
  robots: robotsFor("/gallery"),
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="min-w-0 flex-1">
      <Gallery />
    </main>
  );
}
