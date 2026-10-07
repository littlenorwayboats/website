"use client";

import { useLayoutEffect } from "react";

/** Tall enough to cover the iPhone Pro Max status bar and Dynamic Island. */
const NOTCH_BLEED = "72px";

function notchOffset() {
  const value = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--notch-bleed"),
  );
  return Number.isFinite(value) ? value : 0;
}

function pinNotchScroll() {
  const offset = notchOffset();
  if (!offset || window.location.hash) return;
  if (window.scrollY >= offset) return;

  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  window.scrollTo(0, offset);
  root.style.scrollBehavior = previous;
}

/** Lets iOS Safari composite the hero photo behind the notch. No effect elsewhere. */
export function applyNotchBleed() {
  if (!/iPhone/.test(navigator.userAgent)) return;
  const root = document.documentElement;
  root.style.setProperty("--notch-bleed", NOTCH_BLEED);
  root.style.overscrollBehaviorY = "none";
  pinNotchScroll();
}

export function NotchBleed() {
  useLayoutEffect(() => {
    applyNotchBleed();
    window.addEventListener("scroll", pinNotchScroll, { passive: true });
    return () => window.removeEventListener("scroll", pinNotchScroll);
  }, []);

  return null;
}
