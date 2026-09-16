import { publicConfig } from "./config";

export const SITE_NAME = "Little Norway Boats";

export const SITE_TITLE =
  "Little Norway Boats | Viking Electric Duffy Rentals";

export const SITE_DESCRIPTION =
  "Rent a Viking-themed electric Duffy boat on Liberty Bay. Quiet harbor cruises, sunset sails, and dog-friendly voyages with Little Norway Boats.";

export const SITE_AREA = "Liberty Bay, Washington";

export const INSTAGRAM_URL = "https://www.instagram.com/littlenorwayboats";

export const OG_IMAGE = {
  url: "/images/hero.jpg",
  width: 1024,
  height: 434,
  alt: "A quiet harbor at sunset with boats at rest on still water",
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
