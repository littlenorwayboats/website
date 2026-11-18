import { OptimizedImage } from "./OptimizedImage";

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
    <section aria-labelledby="gallery-heading" className="px-4">
      <div className="mx-auto max-w-6xl">
        <h2
          id="gallery-heading"
          className="font-display text-xl font-semibold tracking-section text-gold uppercase"
        >
          Gallery
        </h2>
        <ul
          tabIndex={0}
          aria-label="Photo gallery, scroll horizontally"
          className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {photos.map((photo) => (
            <li
              key={photo.src}
              className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[32%]"
            >
              <figure className="overflow-hidden stone-frame">
                <OptimizedImage
                  src={photo.src}
                  alt={photo.alt}
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 45vw, 80vw"
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
