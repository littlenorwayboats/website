import {
  bookingHrefForPackage,
  voyagePackages,
} from "@/lib/packages";
import { OptimizedImage } from "./OptimizedImage";

export function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="content-auto bg-parchment px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-display text-xs font-semibold tracking-section text-iron uppercase">
          Featured Journeys
        </p>
        <h2
          id="packages-heading"
          className="mt-3 text-center font-sans text-4xl font-bold tracking-tight text-norse-950 md:text-5xl"
        >
          Popular Voyages &amp; Packages
        </h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {voyagePackages.map((item) => (
            <li key={item.slug}>
              <article className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-[0_12px_32px_rgba(28,40,50,0.1)]">
                <div className="overflow-hidden rounded-xl">
                  <OptimizedImage
                    src={item.image}
                    alt={item.imageAlt}
                    width={800}
                    height={600}
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className={`aspect-4/3 w-full ${item.imageClassName}`}
                  />
                </div>
                <div className="flex flex-1 flex-col items-center px-3 pt-5 pb-3 text-center">
                  <h3 className="font-sans text-2xl font-bold text-norse-950">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-base font-semibold text-rust">
                    {item.length}
                  </p>
                  <p className="mt-3 mb-6 max-w-[16rem] flex-1 text-base leading-6 text-iron">
                    {item.detail}
                  </p>
                  <a
                    href={bookingHrefForPackage(item.slug)}
                    className="neon-btn inline-flex rounded-md px-5 py-2.5 font-sans text-sm font-semibold"
                  >
                    Reserve {item.name}
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center text-norse-950" aria-hidden="true">
          <svg
            viewBox="0 0 48 48"
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="24" cy="24" r="9" />
            <circle cx="24" cy="24" r="3.4" />
            <path d="M24 8v32M8 24h32M12.7 12.7l22.6 22.6M35.3 12.7 12.7 35.3" />
          </svg>
        </div>
      </div>
    </section>
  );
}
