import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from Little Norway Boats: electric longships, harbor cruises, and Viking-themed Duffy rentals.",
};

export default function GalleryPage() {
  return (
    <main id="main-content" className="flex-1">
      <Gallery />
    </main>
  );
}
