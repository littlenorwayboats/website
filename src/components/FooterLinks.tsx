"use client";

import Link from "next/link";
import { useLivePreview } from "./PreviewProvider";
import { bookingHref, visibleNavLinks } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";

export function FooterLinks() {
  const isLive = useLivePreview();
  const links = [
    ...visibleNavLinks(isLive),
    { href: bookingHref, label: "Book Now" },
  ];

  return (
    <ul className="mt-3 columns-2 gap-6 text-sm">
      {links.map((link) => (
        <li key={link.href} className="mb-2">
          {link.href.startsWith("/#") ? (
            <a
              className="font-bold tracking-nav text-parchment uppercase transition-colors hover:text-gold-bright"
              href={withBasePath(link.href)}
            >
              {link.label}
            </a>
          ) : (
            <Link
              className="font-bold tracking-nav text-parchment uppercase transition-colors hover:text-gold-bright"
              href={link.href}
            >
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
