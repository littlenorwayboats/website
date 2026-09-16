import {
  bookingHrefForPackage,
  voyagePackages,
} from "@/lib/packages";

export function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="content-auto bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="stone-frame wood-panel mx-auto max-w-6xl px-6 py-14 md:px-12">
        <h2
          id="packages-heading"
          className="text-center font-display text-3xl font-semibold tracking-[0.08em] text-gold-bright uppercase text-shadow-heading md:text-4xl"
        >
          Popular Voyages &amp; Packages
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {voyagePackages.map((item) => (
            <li key={item.slug}>
              <article className="h-full rounded-xl border border-white/10 bg-charcoal/90 p-6 shadow-card">
                <h3 className="font-display text-xl tracking-wide text-parchment uppercase">
                  {item.name}
                </h3>
                <p className="mt-2 font-display text-sm font-semibold tracking-widest text-rust uppercase">
                  {item.length}
                </p>
                <p className="mt-3 text-mist/90">{item.detail}</p>
                <a
                  href={bookingHrefForPackage(item.slug)}
                  className="mt-6 inline-flex font-display text-sm font-semibold tracking-label text-rust uppercase underline-offset-4 hover:underline"
                >
                  Reserve {item.name}
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
