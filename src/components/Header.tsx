"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";
import { bookingHref, navLinks } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";

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

  const currentPath = pathname.replace(/\/$/, "") || "/";
  const isHome = currentPath === "/";

  function isCurrent(href: string) {
    const target = href.replace(/\/$/, "") || "/";
    return currentPath === target;
  }

  return (
    <header className="nav-panel sticky top-0 z-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-4 overflow-hidden px-4">
        <Link
          href="/"
          className="flex h-full shrink-0 items-center rounded-sm py-2"
          onClick={close}
        >
          <Logo priority={!isHome} className="h-full w-auto" />
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden items-center lg:flex">
          <ul className="flex items-center">
            {navLinks.map((link, index) => (
              <li key={link.href} className="flex items-center">
                {index > 0 ? (
                  <span className="px-2.5 text-parchment/30" aria-hidden="true">
                    |
                  </span>
                ) : null}
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="px-1 font-display text-sm font-normal tracking-nav text-parchment uppercase transition-colors hover:text-gold-bright aria-[current=page]:text-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={withBasePath(bookingHref)}
          className="neon-btn ml-3 hidden rounded-sm px-3.5 py-1.5 font-display text-sm font-semibold tracking-cta uppercase lg:inline-flex"
        >
          Book Now
        </a>

        <button
          type="button"
          className="ml-auto inline-flex size-11 items-center justify-center rounded-sm border border-parchment/40 text-parchment lg:hidden"
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
        className="border-t border-black/40 bg-black/25 px-4 py-4 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className="block rounded-sm px-2 py-3 font-display text-base tracking-nav text-parchment uppercase aria-[current=page]:text-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={withBasePath(bookingHref)}
                onClick={close}
                className="neon-btn mt-2 inline-flex w-full justify-center rounded-sm px-4 py-3 font-display text-base font-semibold tracking-cta uppercase"
              >
                Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="gradient-band w-full" aria-hidden="true" />
    </header>
  );
}
