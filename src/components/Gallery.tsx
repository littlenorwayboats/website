import Image from "next/image";

const photos = [
  {
    src: "/images/gallery-1.jpg",
    alt: "People on a small boat moving across bright blue water",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Ocean waves rolling toward shore at dusk",
  },
  {
    src: "/images/gallery-3.jpg",
    alt: "Boats moored along a harbor with hills in the distance",
  },
  {
    src: "/images/gallery-4.jpg",
    alt: "A sandy beach meeting turquoise water under a clear sky",
  },
  {
    src: "/images/package-sunset.jpg",
    alt: "Warm light over open water at sunset",
  },
  {
    src: "/images/hero.jpg",
    alt: "Harbor boats resting on still water in evening light",
  },
];

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-norse-950 px-4 py-16 texture-noise"
    >
      <div className="mx-auto max-w-6xl">
        <h1
          id="gallery-heading"
          className="text-center font-display text-3xl text-gold uppercase md:text-4xl"
        >
          Gallery
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-mist">
          Electric longships on the water: dragon prow, round shields, and a
          quiet glide through the harbor.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((photo) => (
            <li key={photo.src}>
              <figure className="overflow-hidden stone-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  className="aspect-4/3 w-full object-cover"
                />
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
