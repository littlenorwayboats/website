import { OptimizedImage } from "./OptimizedImage";

const photos = [
  {
    src: "/images/gallery/mount-rainier-from-liberty-bay.jpg",
    alt: "Mount Rainier from Liberty Bay",
  },
  {
    src: "/images/gallery/group-cruise-with-toddlers.jpg",
    alt: "Group cruise with toddlers",
  },
  {
    src: "/images/gallery/seal-in-liberty-bay.jpg",
    alt: "Seal in Liberty Bay",
  },
];

export function Gallery() {
  return (
    <section aria-label="Gallery" className="px-4">
      <div className="mx-auto max-w-6xl">
        <ul
          tabIndex={0}
          aria-label="Photo gallery, scroll horizontally"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
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
