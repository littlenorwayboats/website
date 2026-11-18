"use client";

import Link from "next/link";
import { useLivePreview } from "./PreviewProvider";
import { bookingHref, packagesHref, visibleNavLinks } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";

export function FooterLinks() {
  const isLive = useLivePreview();
  const links = [
    ...visibleNavLinks(isLive),
    { href: bookingHref, label: "Book Now" },
    { href: packagesHref, label: "Packages" },
  ];

  return (
    <ul className="mt-3 columns-2 gap-6 text-sm">
      {links.map((link) => (
        <li key={link.href} className="mb-2">
          {link.href.startsWith("/#") ? (
            <a className="text-parchment hover:text-rust" href={withBasePath(link.href)}>
              {link.label}
            </a>
          ) : (
            <Link className="text-parchment hover:text-rust" href={link.href}>
              {link.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
