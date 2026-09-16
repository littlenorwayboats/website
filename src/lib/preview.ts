export const PREVIEW_PARAM = "__preview";
export const PREVIEW_VALUE = "live";
export const PREVIEW_STORAGE_KEY = "little-norway:preview";

export function isLivePreviewParam(value: string | null): boolean {
  return value === PREVIEW_VALUE;
}

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/$/, "") || "/";
}

export function isUngatedPath(pathname: string): boolean {
  return normalizePath(pathname) === "/contacts";
}

