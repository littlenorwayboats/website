import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contacts",
  description:
    "Reach Little Norway Boats by phone, email, or message for reservations and harbor questions.",
};

export default function ContactsPage() {
  return (
    <main id="main-content" className="flex-1">
      <Contact />
    </main>
  );
}
