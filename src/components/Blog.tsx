import { formatLogbookDate, getLogbookEntries } from "@/lib/logbook";

export async function Blog() {
  const entries = await getLogbookEntries();

  return (
    <section aria-labelledby="blog-heading" className="px-4">
      <div className="mx-auto max-w-3xl">
        <h2
          id="blog-heading"
          className="font-display text-xl font-semibold tracking-section text-gold uppercase"
        >
          From the Log
        </h2>
        <div className="mt-6 space-y-10">
          {entries.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              aria-labelledby={`${entry.slug}-title`}
              className="border-t border-iron/40 pt-8"
            >
              <time
                dateTime={entry.date}
                className="font-display text-sm tracking-label text-mist uppercase"
              >
                {formatLogbookDate(entry.date)}
              </time>
              <h3
                id={`${entry.slug}-title`}
                className="mt-2 font-display text-2xl font-semibold text-gold-bright"
              >
                {entry.title}
              </h3>
              <div
                className="logbook-prose mt-4"
                dangerouslySetInnerHTML={{ __html: entry.html }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
