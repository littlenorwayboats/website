"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ComingSoon } from "./ComingSoon";
import { useLivePreview } from "./PreviewProvider";
import { isUngatedPath } from "@/lib/preview";

export function PreviewGate({ children }: { children: ReactNode }) {
  const isLive = useLivePreview();
  const pathname = usePathname();

  if (!isLive && !isUngatedPath(pathname)) {
    return <ComingSoon />;
  }

  return children;
}
