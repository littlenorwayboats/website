import Image from "next/image";

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[34rem] overflow-hidden md:min-h-[40rem]"
    >
      <Image
        src="/images/hero.jpg"
        alt="A quiet harbor at sunset with boats at rest on still water"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0 bg-linear-to-r from-norse-950 via-norse-950/80 to-norse-950/25"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex min-h-[34rem] max-w-6xl flex-col justify-center px-4 py-20 md:min-h-[40rem]">
        <h1
          id="hero-heading"
          className="max-w-3xl font-display text-4xl leading-tight text-gold uppercase sm:text-5xl md:text-6xl"
        >
          Embark on a Viking voyage
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-parchment">
          Quiet electric Duffy boats, dressed as longships, ready for a harbor
          cruise. No engine roar. Just water, sky, and a dragon prow leading
          the way.
        </p>
        <div className="mt-10">
          <a
            href="/#booking"
            className="neon-btn inline-flex rounded-sm px-8 py-3 text-sm font-semibold tracking-[0.22em] uppercase"
          >
            Book Your Odyssey
          </a>
        </div>
      </div>
    </section>
  );
}
