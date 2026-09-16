import Link from "next/link";
import { Logo } from "./Logo";
import { bookingHref, navLinks, packagesHref } from "@/lib/nav";
import { INSTAGRAM_URL, SITE_AREA } from "@/lib/site";
import { withBasePath } from "@/lib/paths";

const footerLinks = [
  ...navLinks,
  { href: bookingHref, label: "Book Now" },
  { href: packagesHref, label: "Packages" },
];

export function Footer() {
  return (
    <footer className="bg-norse-950 texture-noise">
      <div className="gradient-band w-full" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-block rounded-sm">
            <Logo className="h-28 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm text-mist">
            Quiet longships for harbor cruises, sunsets, and small crews.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-section text-gold uppercase">
            Address
          </h2>
          <address className="mt-3 not-italic text-sm text-parchment">
            {SITE_AREA}
            <br />
            Exact dock directions arrive with your booking confirmation.
            <br />
            <a
              className="mt-2 inline-block hover:text-rust"
              href={INSTAGRAM_URL}
              rel="noreferrer noopener"
            >
              Instagram @littlenorwayboats
            </a>
          </address>
        </div>
        <nav aria-label="Footer">
          <h2 className="font-display text-sm font-semibold tracking-section text-gold uppercase">
            Links
          </h2>
          <ul className="mt-3 columns-2 gap-6 text-sm">
            {footerLinks.map((link) => (
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
        </nav>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-section text-gold uppercase">
            Social
          </h2>
          <ul className="mt-3 flex gap-3">
            <li>
              <a
                className="inline-flex size-10 items-center justify-center rounded-full border border-parchment/70 text-parchment hover:border-rust hover:text-rust"
                href={INSTAGRAM_URL}
                rel="noreferrer noopener"
              >
                <span className="sr-only">Instagram</span>
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 4.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 9.5 12 2.5 2.5 0 0 1 12 9.5zM17.2 6.8a1 1 0 1 0 1 1 1 1 0 0 0-1-1z"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="border-t border-black bg-black py-3 text-center text-xs text-mist">
        © {new Date().getFullYear()} Little Norway Boats. All rights reserved.
      </p>
    </footer>
  );
}
