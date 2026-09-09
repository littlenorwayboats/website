const packages = [
  {
    name: "Sunset Sail",
    length: "2 hours",
    detail: "Golden hour on the harbor with room for up to 10 guests.",
  },
  {
    name: "Harbor Raid",
    length: "90 minutes",
    detail: "A shorter loop past the docks, coves, and waterfront lights.",
  },
  {
    name: "Feast Afloat",
    length: "3 hours",
    detail: "Extra time for picnics, playlists, and a slower Norse pace.",
  },
];

export function Packages() {
  return (
    <section
      id="packages"
      aria-labelledby="packages-heading"
      className="bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="stone-frame wood-panel mx-auto max-w-6xl px-6 py-12 md:px-12">
        <h2
          id="packages-heading"
          className="text-center font-display text-3xl text-gold uppercase md:text-4xl"
        >
          Popular Voyages &amp; Packages
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {packages.map((item) => (
            <li key={item.name}>
              <article className="h-full rounded-sm border border-gold/25 bg-norse-950/50 p-6">
                <h3 className="font-display text-xl tracking-wide text-gold uppercase">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm font-semibold tracking-widest text-neon uppercase">
                  {item.length}
                </p>
                <p className="mt-3 text-mist">{item.detail}</p>
                <a
                  href="/#booking"
                  className="mt-6 inline-flex text-sm font-semibold tracking-[0.16em] text-gold uppercase underline-offset-4 hover:underline"
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
