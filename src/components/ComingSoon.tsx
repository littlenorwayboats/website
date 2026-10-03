import Link from "next/link";
import { Wordmark } from "./Wordmark";
import { INSTAGRAM_URL } from "@/lib/site";

export function ComingSoon() {
  return (
    <main
      id="main-content"
      className="flex min-w-0 flex-1 flex-col justify-center bg-norse-950 px-4 py-20 texture-noise"
    >
      <section
        aria-labelledby="coming-soon-heading"
        className="mx-auto max-w-2xl text-center"
      >
        <Wordmark className="mx-auto h-6 w-auto text-gold sm:h-9" />
        <h1
          id="coming-soon-heading"
          className="mt-4 font-display text-3xl font-semibold tracking-[0.06em] text-gold-bright uppercase sm:text-4xl sm:tracking-[0.08em] md:text-5xl"
        >
          Coming Soon
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-7 text-mist">
          Quiet longship rentals for harbor cruises, sunsets, and small crews on
          Liberty Bay. We are preparing to launch.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <a
            href={INSTAGRAM_URL}
            rel="noreferrer noopener"
            className="neon-btn inline-flex rounded-sm px-7 py-2.5 font-display text-sm font-semibold tracking-cta uppercase"
          >
            Follow Along
          </a>
          <Link
            href="/contacts"
            className="font-display text-sm font-semibold tracking-cta text-gold uppercase hover:text-gold-bright"
          >
            Contact the crew
          </Link>
        </div>
      </section>
    </main>
  );
}
