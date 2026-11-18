"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  PREVIEW_PARAM,
  PREVIEW_STORAGE_KEY,
  PREVIEW_VALUE,
  SITE_LAUNCHED,
  isLivePreviewParam,
} from "@/lib/preview";

const PreviewContext = createContext(SITE_LAUNCHED);

export function useLivePreview() {
  return useContext(PreviewContext);
}

function hasPreviewParam() {
  const params = new URLSearchParams(window.location.search);
  return isLivePreviewParam(params.get(PREVIEW_PARAM));
}

function readIsLive() {
  return (
    hasPreviewParam() ||
    sessionStorage.getItem(PREVIEW_STORAGE_KEY) === PREVIEW_VALUE
  );
}

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/**
 * Reads the preview flag from `window.location` rather than `useSearchParams`,
 * which would force every prerendered page to bail out to client rendering.
 */
export function PreviewProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLive = useSyncExternalStore(subscribe, readIsLive, () => false);

  useEffect(() => {
    if (hasPreviewParam()) {
      sessionStorage.setItem(PREVIEW_STORAGE_KEY, PREVIEW_VALUE);
      return;
    }
    if (!isLive) return;

    const params = new URLSearchParams(window.location.search);
    params.set(PREVIEW_PARAM, PREVIEW_VALUE);
    router.replace(`${pathname}?${params.toString()}${window.location.hash}`, {
      scroll: false,
    });
  }, [isLive, pathname, router]);

  return (
    <PreviewContext.Provider value={isLive}>{children}</PreviewContext.Provider>
  );
}
