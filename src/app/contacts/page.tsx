import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Little Norway Boats for reservations, private charters, and harbor questions on Liberty Bay.",
  alternates: {
    canonical: "/contacts/",
  },
};

export default function ContactsPage() {
  return (
    <main id="main-content" className="flex-1">
      <Contact />
    </main>
  );
}
