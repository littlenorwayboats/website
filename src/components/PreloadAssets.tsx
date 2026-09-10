"use client";

import { preload } from "react-dom";

export function PreloadAssets() {
  preload("/images/logo.webp", { as: "image" });
  return null;
}
