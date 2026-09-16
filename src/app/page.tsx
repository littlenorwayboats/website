import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { Features } from "@/components/Features";
import { Booking } from "@/components/Booking";
import { HashScroll } from "@/components/HashScroll";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main id="main-content" className="flex-1">
      <HashScroll />
      <Hero />
      <Features />
      <Packages />
      <Booking />
    </main>
  );
}
