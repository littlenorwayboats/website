import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HashScroll } from "@/components/HashScroll";
import { SimpleBooking } from "@/components/SimpleBooking";
import MailingList from "@/components/MailingList";
import { SITE_LAUNCHED } from "@/lib/preview";
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
    <main id="main-content" className="min-w-0 flex-1">
      <HashScroll />
      <Hero />
      <Features />
      <SimpleBooking />
      {SITE_LAUNCHED ? null : (
        <section
          aria-labelledby="mailing-list-heading"
          className="bg-norse-900 px-4 py-16 texture-noise"
        >
          <MailingList />
        </section>
      )}
    </main>
  );
}
