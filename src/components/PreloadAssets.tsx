"use client";

import { preload } from "react-dom";
import { withBasePath } from "@/lib/paths";

export function PreloadAssets() {
  preload(withBasePath("/images/logo.webp"), { as: "image" });
  return null;
}
