"use client";

import { preload } from "react-dom";
import { usePathname } from "next/navigation";
import { withBasePath } from "@/lib/paths";

export function PreloadAssets() {
  const pathname = usePathname();
  const isHome = (pathname.replace(/\/$/, "") || "/") === "/";

  if (!isHome) {
    preload(withBasePath("/images/logo.webp"), { as: "image" });
  }

  return null;
}
