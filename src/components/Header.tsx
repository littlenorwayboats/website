"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { Logo } from "./Logo";
import { scrollToBooking } from "./HashScroll";
import { useLivePreview } from "./PreviewProvider";
import { bookingHref, navLinks } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { INSTAGRAM_URL } from "@/lib/site";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

const BAR_PADDING = 16;
const NAV_GAP = 24;
/** Ship travel progress before the nav and Book Now shift aside. */
const SHIFT_START = 0.75;

function NavList({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  function isCurrent(href: string) {
    const target = href.replace(/\/$/, "") || "/";
    return currentPath === target;
  }

  return (
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
            onClick={onNavigate}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            className="px-1 font-display text-sm font-normal tracking-nav text-parchment uppercase transition-colors hover:text-gold-bright aria-[current=page]:text-gold-bright"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [colored, setColored] = useState(false);
  /** Desktop CTA has slid out of the bar; drop it from tab order. */
  const [ctaShiftedOut, setCtaShiftedOut] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const isLive = useLivePreview();
  const cta = isLive
    ? { href: withBasePath(bookingHref), label: "Book Now", rel: undefined }
    : { href: INSTAGRAM_URL, label: "Follow Along", rel: "noreferrer noopener" };

  const barRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const coloredRef = useRef(false);
  const ctaShiftedRef = useRef(false);

  const isHome = (pathname.replace(/\/$/, "") || "/") === "/";
  const currentPath = pathname.replace(/\/$/, "") || "/";

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

  useEffect(() => {
    const barEl = barRef.current;
    const logoEl = logoRef.current;
    const navEl = navRef.current;
    const rightEl = rightRef.current;
    if (!barEl || !logoEl || !navEl || !rightEl) return;
    // Closures lose the narrowing above, so bind the elements once.
    const bar = barEl;
    const logo = logoEl;
    const nav = navEl;
    const right = rightEl;

    let frame = 0;
    let features: HTMLElement | null = null;
    let bookingAnchor: HTMLElement | null = null;
    let navWidth = 0;
    let logoWidth = 0;
    let rightWidth = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function cacheSections() {
      features = document.getElementById("features");
      const booking = document.getElementById("booking");
      bookingAnchor =
        booking?.closest(".surface-card") ?? booking;
    }

    function cacheSizes() {
      logoWidth = logo.offsetWidth;
      navWidth = nav.offsetWidth;
      rightWidth = right.offsetWidth;
    }

    function setCtaShifted(next: boolean) {
      if (ctaShiftedRef.current === next) return;
      ctaShiftedRef.current = next;
      setCtaShiftedOut(next);
    }

    function applyProgress(progress: number) {
      logo.style.left = `calc(${BAR_PADDING * (1 - progress)}px + ${50 * progress}%)`;
      logo.style.transform = `translateX(${-50 * progress}%)`;

      // Hold the links until the ship is close to center, then slide them
      // right as Book Now leaves the bar.
      const shift = clamp((progress - SHIFT_START) / (1 - SHIFT_START), 0, 1);

      if (!desktopQuery.matches) {
        nav.style.left = "";
        nav.style.right = "";
        nav.style.transform = "";
        right.style.transform = "";
        setCtaShifted(false);
        return;
      }

      const barWidth = bar.clientWidth;
      const navStartLeft =
        barWidth - BAR_PADDING - rightWidth - NAV_GAP - navWidth;
      // Slide into the space the CTA vacates, ending flush with the right padding.
      const navTravel = rightWidth + NAV_GAP;
      // CTA's right edge sits BAR_PADDING inside the clip edge.
      const ctaExit = rightWidth + BAR_PADDING;

      nav.style.left = `${navStartLeft}px`;
      nav.style.right = "auto";
      nav.style.transform = `translateX(${navTravel * shift}px)`;
      right.style.transform = `translateX(${ctaExit * shift}px)`;

      setCtaShifted(shift >= 1);
    }

    function setColoredState(next: boolean) {
      if (coloredRef.current === next) return;
      coloredRef.current = next;
      setColored(next);
    }

    function update() {
      frame = 0;

      if (!isHome) {
        applyProgress(0);
        setColoredState(false);
        return;
      }

      if (!features || !bookingAnchor) cacheSections();
      if (!features || !bookingAnchor) {
        applyProgress(0);
        setColoredState(false);
        return;
      }

      const header = bar.closest("header");
      const headerHeight = header?.offsetHeight ?? 80;
      const start =
        window.scrollY + features.getBoundingClientRect().top - headerHeight;
      const end =
        window.scrollY +
        bookingAnchor.getBoundingClientRect().top -
        headerHeight;
      const range = Math.max(1, end - start);
      let progress = clamp((window.scrollY - start) / range, 0, 1);

      if (reduceMotion.matches) {
        progress = progress >= 0.5 ? 1 : 0;
      }

      applyProgress(progress);
      // Light up once the booking card top reaches the sticky nav (animation end).
      setColoredState(
        progress >= 1 || bookingAnchor.getBoundingClientRect().top <= headerHeight + 2,
      );
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    function onResize() {
      cacheSizes();
      onScroll();
    }

    cacheSections();
    cacheSizes();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktopQuery.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktopQuery.removeEventListener("change", onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [isHome, open, cta.label]);

  function close() {
    document.body.style.overflow = "";
    setOpen(false);
  }

  function onBookingClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isLive || !isHome) return;
    event.preventDefault();
    close();
    scrollToBooking("smooth");
    const url = new URL(window.location.href);
    url.hash = "booking";
    window.history.pushState(null, "", `${url.pathname}${url.search}#booking`);
  }

  return (
    <header className="nav-panel sticky top-0 z-50 w-full min-w-0">
      <div
        ref={barRef}
        className="relative mx-auto h-20 w-full max-w-6xl overflow-x-clip px-4"
      >
        <Link
          ref={logoRef}
          href="/"
          className="group/logo absolute inset-y-0 left-4 z-20 my-auto h-16 w-16 rounded-sm will-change-transform"
          onClick={close}
        >
          <Logo
            className="h-16 w-16"
            colorOnHover={!colored}
            colored={colored}
          />
        </Link>

        <nav
          ref={navRef}
          aria-label="Primary"
          className="absolute inset-y-0 right-[calc(1rem+8.5rem)] z-10 my-auto hidden h-fit will-change-transform lg:block"
        >
          <NavList currentPath={currentPath} />
        </nav>

        <div
          ref={rightRef}
          className="absolute inset-y-0 right-4 z-20 my-auto flex h-fit items-center gap-3 will-change-transform"
        >
          <a
            href={cta.href}
            rel={cta.rel}
            onClick={isLive ? onBookingClick : undefined}
            aria-hidden={ctaShiftedOut || undefined}
            inert={ctaShiftedOut || undefined}
            className="neon-btn hidden rounded-sm px-3.5 py-1.5 font-display text-sm font-semibold tracking-cta uppercase lg:inline-flex"
          >
            {cta.label}
          </a>

          <button
            type="button"
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border border-parchment/40 text-parchment lg:hidden"
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
                  aria-current={
                    (link.href.replace(/\/$/, "") || "/") === currentPath
                      ? "page"
                      : undefined
                  }
                  className="block rounded-sm px-2 py-3 font-display text-base tracking-nav text-parchment uppercase aria-[current=page]:text-gold-bright"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={cta.href}
                rel={cta.rel}
                onClick={isLive ? onBookingClick : close}
                className="neon-btn mt-2 inline-flex w-full justify-center rounded-sm px-4 py-3 font-display text-base font-semibold tracking-cta uppercase"
              >
                {cta.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="gradient-band w-full" aria-hidden="true" />
    </header>
  );
}
