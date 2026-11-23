export type NavLink = {
  href: string;
  label: string;
  /** Only shown once the site is launched or in live preview. */
  previewOnly?: boolean;
};

export const navLinks: readonly NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/logbook", label: "Logbook" },
  { href: "/contacts", label: "Contact" },
];

export function visibleNavLinks(isLive: boolean): NavLink[] {
  return navLinks.filter((link) => isLive || !link.previewOnly);
}

export const bookingHref = "/#booking";
/** Pre-launch CTA: mailing list on the homepage (Coming Soon hero). */
export const signupHref = "/#signup";
export const packagesHref = "/#packages";
