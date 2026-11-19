import type { Metadata } from "next";
import { publicConfig } from "./config";

export const SITE_LAUNCHED =
  process.env.NEXT_PUBLIC_SITE_LAUNCHED === "true" || publicConfig.launched;

export const PREVIEW_PARAM = "__preview";
export const PREVIEW_VALUE = "live";
export const PREVIEW_STORAGE_KEY = "little-norway:preview";

const UNGATED_PATHS = ["/contacts", "/logbook"];
const PRELAUNCH_INDEXABLE_PATHS = ["/", ...UNGATED_PATHS];

export function isLivePreviewParam(value: string | null): boolean {
  return value === PREVIEW_VALUE;
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/";
}

export function isUngatedPath(pathname: string): boolean {
  return UNGATED_PATHS.includes(normalizePath(pathname));
}

/** Pages hidden behind Coming Soon must not be indexed. */
export function isIndexablePath(pathname: string): boolean {
  return (
    SITE_LAUNCHED ||
    PRELAUNCH_INDEXABLE_PATHS.includes(normalizePath(pathname))
  );
}

export function robotsFor(pathname: string): Metadata["robots"] | undefined {
  return isIndexablePath(pathname) ? undefined : { index: false, follow: true };
}
