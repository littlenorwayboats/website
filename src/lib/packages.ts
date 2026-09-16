import { withBasePath } from "./paths";

export const PACKAGE_PARAM = "package";

export const voyagePackages = [
  {
    slug: "sunset-sail",
    name: "Sunset Sail",
    length: "2 hours",
    detail: "Golden hour on the harbor with room for up to 10 guests.",
    namespace: "2-hour-boat-ride",
    calLink: "morgan-p-p0e1g0/2-hour-boat-ride",
    image: "/images/gallery-4.jpg",
    imageAlt: "Sunset light spreading across open water",
    imageClassName: "object-cover object-center",
  },
  {
    slug: "harbor-raid",
    name: "Harbor Raid",
    length: "90 minutes",
    detail: "A shorter loop past the docks, coves, and waterfront lights.",
    namespace: "90-minute",
    calLink: "morgan-p-p0e1g0/90-minute",
    image: "/images/hero.jpg",
    imageAlt:
      "A Viking-themed electric cruiser passing the harbor with guests aboard",
    imageClassName: "object-cover object-[80%_center]",
  },
  {
    slug: "private-charter",
    name: "Private Charter",
    length: "Day Trip (Full battery charge)",
    detail: "A full day of sailing Liberty Bay with up to 10 guests.",
    namespace: "full-day-charter",
    calLink: "morgan-p-p0e1g0/full-day-charter",
    image: "/images/feature-cover.jpg",
    imageAlt: "Looking forward from a wooden boat across a mountain lake",
    imageClassName: "object-cover object-center",
  },
] as const;

export type VoyagePackage = (typeof voyagePackages)[number];
export type VoyagePackageSlug = VoyagePackage["slug"];

export const defaultVoyagePackage = voyagePackages[0];

export function getVoyagePackage(
  slug: string | null | undefined,
): VoyagePackage {
  return (
    voyagePackages.find((item) => item.slug === slug) ?? defaultVoyagePackage
  );
}

export function bookingHrefForPackage(slug: VoyagePackageSlug): string {
  return withBasePath(`/?${PACKAGE_PARAM}=${slug}#booking`);
}
