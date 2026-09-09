"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";
import { bookingHref, navLinks } from "@/lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  function close() {
    document.body.style.overflow = "";
    setOpen(false);
  }

  function isCurrent(href: string) {
    return href === "/" ? pathname === "/" : pathname === href;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-iron/40 bg-norse-900/95 texture-noise shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="rounded-sm" onClick={close}>
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center lg:flex">
          <ul className="flex items-center">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 ? (
                  <span className="px-3 text-iron" aria-hidden="true">
                    |
                  </span>
                ) : null}
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="px-1 font-semibold tracking-[0.22em] text-gold uppercase transition-colors hover:text-gold-bright aria-[current=page]:text-gold-bright aria-[current=page]:underline aria-[current=page]:underline-offset-8"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={bookingHref}
          className="neon-btn hidden rounded-sm px-4 py-2 text-sm font-semibold tracking-[0.18em] uppercase lg:inline-flex"
        >
          Book Now
        </a>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-sm border border-gold/40 text-gold lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
              <path
                fill="currentColor"
                d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="border-t border-iron/40 bg-norse-900 px-4 py-4 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="block rounded-sm px-2 py-3 font-semibold tracking-[0.2em] text-gold uppercase aria-[current=page]:text-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={bookingHref}
                onClick={close}
                className="neon-btn mt-2 inline-flex w-full justify-center rounded-sm px-4 py-3 text-sm font-semibold tracking-[0.18em] uppercase"
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
