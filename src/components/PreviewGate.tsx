"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ComingSoon } from "./ComingSoon";
import { Contact } from "./Contact";
import { Header } from "./Header";
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

export function PreviewFallback() {
  const pathname = usePathname();

  return (
    <>
      <Header />
      {isUngatedPath(pathname) ? (
        <main id="main-content" className="flex min-w-0 flex-1 flex-col">
          <Contact />
        </main>
      ) : (
        <ComingSoon />
      )}
    </>
  );
}
