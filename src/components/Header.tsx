"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type Dispatch,
  type MouseEvent,
  type RefObject,
  type SetStateAction,
} from "react";
import { Logo } from "./Logo";
import {
  isBookingReached,
  resolveBookingAnchor,
  scrollProgressToBooking,
} from "./bookingProgress";
import { scrollToBooking } from "./HashScroll";
import { useLivePreview } from "./PreviewProvider";
import { bookingHref, navLinks } from "@/lib/nav";
import { withBasePath } from "@/lib/paths";
import { INSTAGRAM_URL } from "@/lib/site";

const BAR_PADDING = 16;
const NAV_GAP = 24;
/** Ship travel progress before the nav and Book Now shift aside. */
const SHIFT_START = 0.75;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

/** Avoid re-renders when a scroll-driven boolean has not changed. */
function useLatchedBoolean(initial: boolean) {
  const [value, setValue] = useState(initial);
  const latched = useRef(initial);

  const setLatched = useCallback((next: boolean) => {
    if (latched.current === next) return;
    latched.current = next;
    setValue(next);
  }, []);

  return [value, setLatched] as const;
}

type BarNodes = {
  bar: HTMLElement;
  logo: HTMLElement;
  nav: HTMLElement;
  right: HTMLElement;
};

function applyBarProgress(
  { bar, logo, nav, right }: BarNodes,
  progress: number,
  sizes: { navWidth: number; rightWidth: number },
  isDesktop: boolean,
  setCtaShifted: (shifted: boolean) => void,
) {
  logo.style.left = `calc(${BAR_PADDING * (1 - progress)}px + ${50 * progress}%)`;
  logo.style.transform = `translateX(${-50 * progress}%)`;

  // Hold links until the ship is near center, then slide them into the CTA gap.
  const shift = clamp((progress - SHIFT_START) / (1 - SHIFT_START), 0, 1);

  if (!isDesktop) {
    nav.style.left = "";
    nav.style.right = "";
    nav.style.transform = "";
    right.style.transform = "";
    setCtaShifted(false);
    return;
  }

  const { navWidth, rightWidth } = sizes;
  const navStartLeft =
    bar.clientWidth - BAR_PADDING - rightWidth - NAV_GAP - navWidth;
  const navTravel = rightWidth + NAV_GAP;
  // CTA's right edge sits BAR_PADDING inside the clip edge.
  const ctaExit = rightWidth + BAR_PADDING;

  nav.style.left = `${navStartLeft}px`;
  nav.style.right = "auto";
  nav.style.transform = `translateX(${navTravel * shift}px)`;
  right.style.transform = `translateX(${ctaExit * shift}px)`;
  setCtaShifted(shift >= 1);
}

function useHomeBarAnimation({
  isHome,
  barRef,
  logoRef,
  navRef,
  rightRef,
  setColored,
  setCtaShifted,
  /** Recache layout when the CTA label or mobile menu changes width. */
  layoutKey,
}: {
  isHome: boolean;
  barRef: RefObject<HTMLDivElement | null>;
  logoRef: RefObject<HTMLAnchorElement | null>;
  navRef: RefObject<HTMLElement | null>;
  rightRef: RefObject<HTMLDivElement | null>;
  setColored: (colored: boolean) => void;
  setCtaShifted: (shifted: boolean) => void;
  layoutKey: string;
}) {
  useEffect(() => {
    const bar = barRef.current;
    const logo = logoRef.current;
    const nav = navRef.current;
    const right = rightRef.current;
    if (!bar || !logo || !nav || !right) return;

    // Capture into a typed object so nested listeners keep non-null types.
    const nodes: BarNodes = { bar, logo, nav, right };
    let frame = 0;
    let features: HTMLElement | null = null;
    let bookingAnchor: HTMLElement | null = null;
    let navWidth = 0;
    let rightWidth = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    function cacheSections() {
      features = document.getElementById("features");
      bookingAnchor = resolveBookingAnchor();
    }

    function cacheSizes() {
      navWidth = nodes.nav.offsetWidth;
      rightWidth = nodes.right.offsetWidth;
    }

    function update() {
      frame = 0;

      if (!isHome) {
        applyBarProgress(nodes, 0, { navWidth, rightWidth }, desktopQuery.matches, setCtaShifted);
        setColored(false);
        return;
      }

      if (!features || !bookingAnchor) cacheSections();
      if (!features || !bookingAnchor) {
        applyBarProgress(nodes, 0, { navWidth, rightWidth }, desktopQuery.matches, setCtaShifted);
        setColored(false);
        return;
      }

      const headerHeight = nodes.bar.closest("header")?.offsetHeight ?? 80;
      const progress = scrollProgressToBooking(
        features,
        bookingAnchor,
        headerHeight,
        reduceMotion.matches,
      );

      applyBarProgress(
        nodes,
        progress,
        { navWidth, rightWidth },
        desktopQuery.matches,
        setCtaShifted,
      );
      // Light up once the booking card top reaches the sticky nav (animation end).
      setColored(
        isBookingReached(
          features,
          bookingAnchor,
          headerHeight,
          reduceMotion.matches,
        ),
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
  }, [
    isHome,
    layoutKey,
    barRef,
    logoRef,
    navRef,
    rightRef,
    setColored,
    setCtaShifted,
  ]);
}

function useMobileMenu(
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  pathname: string,
) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    // Lock the document scroller. Overflow on body creates a containing
    // block that unsticks the header and hides this menu offscreen.
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);
}

function NavList({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
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
            aria-current={
              normalizePath(link.href) === currentPath ? "page" : undefined
            }
            className="px-1 font-display text-sm font-normal tracking-nav text-parchment uppercase transition-colors hover:text-gold-bright aria-[current=page]:text-gold-bright"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"
      />
    </svg>
  );
}

/** True while the open mobile menu still sits on the hero photo. */
function useMenuOverHero(isHome: boolean, open: boolean, menuId: string) {
  const [overHero, setOverHero] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setOverHero(false);
      return;
    }

    function update() {
      const hero = document.getElementById("home");
      const menu = document.getElementById(menuId);
      if (!hero) {
        setOverHero(false);
        return;
      }
      const limit = menu ? menu.getBoundingClientRect().bottom : 0;
      setOverHero(hero.getBoundingClientRect().bottom >= limit - 1);
    }

    update();
    const menu = document.getElementById(menuId);
    const observer = new ResizeObserver(update);
    if (menu) observer.observe(menu);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isHome, open, menuId]);

  return overHero;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [colored, setColored] = useLatchedBoolean(false);
  /** Desktop CTA has slid out of the bar; drop it from tab order. */
  const [ctaShiftedOut, setCtaShiftedOut] = useLatchedBoolean(false);
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

  const currentPath = normalizePath(pathname);
  const isHome = currentPath === "/";
  const overHero = useMenuOverHero(isHome, open, menuId);

  useMobileMenu(open, setOpen, pathname);
  useHomeBarAnimation({
    isHome,
    barRef,
    logoRef,
    navRef,
    rightRef,
    setColored,
    setCtaShifted: setCtaShiftedOut,
    layoutKey: `${open}:${cta.label}`,
  });

  function close() {
    setOpen(false);
  }

  function onBookingClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isLive || !isHome) return;
    event.preventDefault();
    close();
    scrollToBooking("smooth");
    const url = new URL(window.location.href);
    window.history.pushState(null, "", `${url.pathname}${url.search}#booking`);
  }

  return (
    <>
    <div
      aria-hidden="true"
      className="header-scrim pointer-events-none fixed inset-x-0 top-0 z-10 overflow-hidden shadow-[0_8px_24px_rgba(14,21,28,0.32)]"
    >
      <div className="header-scallop bg-steel" />
    </div>
    <header
      className={`header-safe fixed inset-x-0 top-0 z-30 w-full min-w-0 ${open && !overHero ? "bg-steel" : ""}`}
    >
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
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-sm border-[1.5px] border-gold text-parchment lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div
        id={menuId}
        inert={!open || undefined}
        aria-hidden={!open}
        className={`absolute inset-x-0 top-full z-30 grid overflow-hidden transition-[grid-template-rows] ease-menu lg:hidden ${
          open
            ? "grid-rows-[1fr] duration-[225ms]"
            : "pointer-events-none grid-rows-[0fr] duration-[195ms]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className={`mobile-menu-panel overflow-y-auto px-4 py-4 ${
              overHero
                ? "bg-transparent"
                : "border-t border-black/40 bg-steel shadow-nav"
            }`}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      aria-current={
                        normalizePath(link.href) === currentPath
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
        </div>
      </div>
    </header>
    </>
  );
}
