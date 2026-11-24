import { publicConfig } from "./config";

export const SITE_NAME = "Little Norway Boats";

export const SITE_TITLE =
  "Electric Boat Rentals in Poulsbo, WA | Little Norway Boats";

export const SITE_DESCRIPTION =
  "Rent a Viking-themed electric Duffy boat in Poulsbo, WA. Quiet Liberty Bay harbor cruises, sunset sails, and dog-friendly voyages with Little Norway Boats.";

export const SITE_AREA = "D Dock, 18809 Front St NE, Poulsbo, WA 98370";

/** Port of Poulsbo / D Dock — used in LocalBusiness JSON-LD. */
export const SITE_ADDRESS = {
  streetAddress: "D Dock, 18809 Front St NE",
  addressLocality: "Poulsbo",
  addressRegion: "WA",
  postalCode: "98370",
  addressCountry: "US",
} as const;

export const SITE_GEO = {
  latitude: 47.73358,
  longitude: -122.64699,
} as const;

export const INSTAGRAM_URL = "https://www.instagram.com/littlenorwayboats";

export const YOUTUBE_URL = "https://www.youtube.com/@LittleNorwayBoats";

export const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Poulsbo's waterfront on Liberty Bay reflected in calm water",
} as const;

function originFromEnv(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return publicConfig.siteUrl;
}

function basePathFromEnv(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_PATH ||
    process.env.PAGES_BASE_PATH ||
    ""
  ).replace(/\/$/, "");
}

export function getSiteUrl(): string {
  const origin = originFromEnv();
  const basePath = basePathFromEnv();
  if (!basePath || origin.endsWith(basePath)) return origin;
  return `${origin}${basePath}`;
}

export const siteUrl = new URL(`${getSiteUrl()}/`);

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return `${base}/`;
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  const pathname = withSlash.split("#")[0].split("?")[0];
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  if (isFile || withSlash.includes("#") || withSlash.includes("?")) {
    return `${base}${withSlash}`;
  }
  return withSlash.endsWith("/")
    ? `${base}${withSlash}`
    : `${base}${withSlash}/`;
}
