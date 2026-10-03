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
              <article className="surface-card flex h-full flex-col p-4">
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
      </div>
    </section>
  );
}
