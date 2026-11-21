import Link from "next/link";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  formatLogbookDate,
  getLogbookEntries,
  type LogbookEntry,
} from "@/lib/logbook";
import { logbookArticlePath } from "@/lib/paths";

function ArticleTeaser({ entry }: { entry: LogbookEntry }) {
  const href = logbookArticlePath(entry.slug);

  return (
    <article
      aria-labelledby={`${entry.slug}-title`}
      className="surface-card overflow-hidden"
    >
      {entry.image ? (
        <Link href={href} tabIndex={-1} aria-hidden="true" className="block">
          <OptimizedImage
            src={entry.image}
            alt=""
            sizes="(min-width: 48rem) 48rem, 100vw"
            className="aspect-[16/9] w-full object-cover"
          />
        </Link>
      ) : null}
      <div className="px-6 py-8 md:px-10 md:py-10">
        <p className="text-sm font-bold tracking-label text-iron uppercase">
          <span className="text-rust">Article</span>
          <span aria-hidden="true"> · </span>
          <time dateTime={entry.date}>{formatLogbookDate(entry.date)}</time>
        </p>
        <h2
          id={`${entry.slug}-title`}
          className="mt-2 text-2xl font-bold text-norse-950"
        >
          <Link href={href} className="hover:text-rust">
            {entry.title}
          </Link>
        </h2>
        {entry.description ? (
          <p className="mt-3 font-alegreya-sans text-norse-950">
            {entry.description}
          </p>
        ) : null}
        <Link
          href={href}
          className="mt-4 inline-block text-sm font-bold tracking-label text-rust uppercase underline underline-offset-4 hover:text-rust-dim"
        >
          Read the article<span className="sr-only">: {entry.title}</span>
        </Link>
      </div>
    </article>
  );
}

function Note({ entry }: { entry: LogbookEntry }) {
  return (
    <article
      id={entry.slug}
      aria-labelledby={`${entry.slug}-title`}
      className="surface-card px-6 py-8 md:px-10 md:py-10"
    >
      <time
        dateTime={entry.date}
        className="text-sm font-bold tracking-label text-iron uppercase"
      >
        {formatLogbookDate(entry.date)}
      </time>
      <h2
        id={`${entry.slug}-title`}
        className="mt-2 text-2xl font-bold text-norse-950"
      >
        {entry.title}
      </h2>
      <div
        className="logbook-prose mt-4"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}

export async function Blog() {
  const entries = await getLogbookEntries();

  return (
    <section aria-label="Blog" className="px-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        {entries.map((entry) =>
          entry.type === "article" ? (
            <ArticleTeaser key={entry.slug} entry={entry} />
          ) : (
            <Note key={entry.slug} entry={entry} />
          ),
        )}
      </div>
    </section>
  );
}
