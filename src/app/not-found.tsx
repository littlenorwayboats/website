import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-w-0 flex-1 flex-col items-center justify-center px-6 py-24 text-center"
    >
      <p className="text-sm font-bold tracking-section text-iron uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-[0.06em] text-gold-bright uppercase sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-lg text-mist">
        That link may be outdated or mistyped. Head back to the home page to
        explore boat rentals on Liberty Bay.
      </p>
      <Link
        href="/"
        className="neon-btn mt-10 inline-flex rounded-sm px-7 py-2.5 text-sm"
      >
        Back to home
      </Link>
    </main>
  );
}