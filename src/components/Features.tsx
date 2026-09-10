import Image from "next/image";

const features = [
  {
    title: "Easy to Pilot",
    image: "/images/feature-pilot.jpg",
    alt: "A small motorboat gliding across calm water",
    body: "No boating license required. A short dockside briefing and you are underway at a gentle harbor speed.",
  },
  {
    title: "Eco-Friendly",
    image: null,
    alt: "",
    body: "Fully electric Duffy boats. Silent running, zero onboard fuel, and a lighter wake for the harbor we share.",
  },
  {
    title: "Dog Friendly",
    image: "/images/feature-dog.jpg",
    alt: "A golden retriever looking toward the camera",
    body: "Leashed pups are welcome aboard. Bring water, a towel, and a life vest sized for your shipmate.",
  },
  {
    title: "Full Cover",
    image: "/images/feature-cover.jpg",
    alt: "Open water under a wide sky, suggesting shade and shelter on deck",
    body: "A canopy keeps the crew comfortable in sun or light weather so the voyage stays easy from dock to dock.",
  },
];

function LeafMark() {
  return (
    <div className="flex aspect-16/10 items-center justify-center stone-frame bg-norse-800">
      <svg
        viewBox="0 0 64 64"
        className="h-20 w-20 text-emerald-400"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M32 6c14 8 22 22 22 36-12 2-22-4-28-14 8 2 14 0 18-4-10 0-18 4-22 12-2-10 0-22 10-30Z"
        />
        <path
          fill="none"
          stroke="#0c0b0a"
          strokeWidth="2"
          d="M30 16c-2 10-2 20 4 30"
        />
      </svg>
    </div>
  );
}

export function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="content-auto bg-norse-900 px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="features-heading"
          className="text-center font-display text-3xl text-gold uppercase md:text-4xl"
        >
          Sail the Harbor in Style
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <li key={feature.title}>
              <article>
                {feature.image ? (
                  <figure className="relative aspect-16/10 w-full stone-frame">
                    <div className="absolute inset-0 overflow-hidden">
                      <Image
                        src={feature.image}
                        alt={feature.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </figure>
                ) : (
                  <LeafMark />
                )}
                <h3 className="mt-4 text-lg font-bold text-gold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-mist">{feature.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
