"use client";

import { useEffect, useState } from "react";
import { decodeContactEmail } from "@/lib/contact-email";

export function ContactEmailLink({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(decodeContactEmail());
  }, []);

  if (!email) {
    return (
      <span className={className} aria-hidden="true">
        email the crew
      </span>
    );
  }

  return (
    <a className={className} href={`mailto:${email}`}>
      {email}
    </a>
  );
}
