import Link from "next/link";
import { Logo } from "./Logo";
import { bookingHref, navLinks, packagesHref } from "@/lib/nav";
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
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">
            Address
          </h2>
          <address className="mt-3 not-italic text-sm text-parchment">
            Lorem ipsum dolor sit amet
            <br />
            Consectetur adipiscing elit
            <br />
            <a className="mt-2 inline-block hover:text-gold" href="tel:+15555555555">
              (555) 555-5555
            </a>
            <br />
            <a className="hover:text-gold" href="mailto:email@example.com">
              email@example.com
            </a>
          </address>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">
            Links
          </h2>
          <ul className="mt-3 columns-2 gap-6 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href} className="mb-2">
                {link.href.startsWith("/#") ? (
                  <a className="text-parchment hover:text-gold" href={withBasePath(link.href)}>
                    {link.label}
                  </a>
                ) : (
                  <Link className="text-parchment hover:text-gold" href={link.href}>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold uppercase">
            Social
          </h2>
          <ul className="mt-3 flex gap-3">
            <li>
              <a
                className="inline-flex size-10 items-center justify-center rounded-full border border-parchment/70 text-parchment hover:border-gold hover:text-gold"
                href="https://www.instagram.com/littlenorwayboats"
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
            <li>
              <a
                className="inline-flex size-10 items-center justify-center rounded-full border border-parchment/70 text-parchment hover:border-gold hover:text-gold"
                href="https://www.facebook.com"
                rel="noreferrer noopener"
              >
                <span className="sr-only">Facebook</span>
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-2c0-.6.4-1 1-1z"
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
