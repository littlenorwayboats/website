"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  PREVIEW_PARAM,
  PREVIEW_STORAGE_KEY,
  PREVIEW_VALUE,
  isLivePreviewParam,
} from "@/lib/preview";

const PreviewContext = createContext(false);

export function useLivePreview() {
  return useContext(PreviewContext);
}

export function PreviewProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromQuery = isLivePreviewParam(searchParams.get(PREVIEW_PARAM));
  const [isLive, setIsLive] = useState(fromQuery);

  useEffect(() => {
    if (fromQuery) {
      sessionStorage.setItem(PREVIEW_STORAGE_KEY, PREVIEW_VALUE);
      setIsLive(true);
      return;
    }

    const stored = sessionStorage.getItem(PREVIEW_STORAGE_KEY) === PREVIEW_VALUE;
    setIsLive(stored);

    if (!stored) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set(PREVIEW_PARAM, PREVIEW_VALUE);
    router.replace(`${pathname}?${params.toString()}${window.location.hash}`, {
      scroll: false,
    });
  }, [fromQuery, pathname, router, searchParams]);

  return (
    <PreviewContext.Provider value={isLive}>{children}</PreviewContext.Provider>
  );
}
