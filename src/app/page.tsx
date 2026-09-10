import { Hero } from "@/components/Hero";
import { Packages } from "@/components/Packages";
import { IronDivider } from "@/components/IronDivider";
import { Features } from "@/components/Features";
import { Booking } from "@/components/Booking";
import { HashScroll } from "@/components/HashScroll";

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
