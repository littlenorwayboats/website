import { formatLogbookDate, getLogbookEntries } from "@/lib/logbook";

export async function Blog() {
  const entries = await getLogbookEntries();

  return (
    <section aria-label="Blog" className="px-4">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-10">
          {entries.map((entry) => (
            <article
              key={entry.slug}
              id={entry.slug}
              aria-labelledby={`${entry.slug}-title`}
              className="border-t border-iron/40 pt-8 first:border-t-0 first:pt-0"
            >
              <time
                dateTime={entry.date}
                className="text-sm font-bold tracking-label text-mist uppercase"
              >
                {formatLogbookDate(entry.date)}
              </time>
              <h2
                id={`${entry.slug}-title`}
                className="mt-2 text-2xl font-bold text-gold-bright"
              >
                {entry.title}
              </h2>
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
