import Link from "next/link";
import { ArticleTagFilter } from "@/components/ArticleTagFilter";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  formatLogbookDate,
  getLogbookEntries,
  isLogbookArticle,
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
          <time dateTime={entry.date}>{formatLogbookDate(entry.date)}</time>
        </p>
        <h3
          id={`${entry.slug}-title`}
          className="mt-2 text-2xl font-bold text-norse-950"
        >
          <Link href={href} className="hover:text-rust">
            {entry.title}
          </Link>
        </h3>
        {entry.tags.length > 0 ? (
          <ul aria-label="Tags" className="mt-3 flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-iron/10 px-3 py-1 text-xs font-bold tracking-label text-rust uppercase"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
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
      <h3
        id={`${entry.slug}-title`}
        className="mt-2 text-2xl font-bold text-norse-950"
      >
        {entry.title}
      </h3>
      <div
        className="logbook-prose mt-4"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className="pb-3 text-xl font-bold tracking-[0.08em] text-norse-950 uppercase"
    >
      {children}
    </h2>
  );
}

export async function Blog() {
  const entries = await getLogbookEntries();
  const news = entries.filter((entry) => !isLogbookArticle(entry));
  const articles = entries.filter(isLogbookArticle);
  const tags = [...new Set(articles.flatMap((article) => article.tags))].sort(
    (a, b) => a.localeCompare(b),
  );

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-16 px-4">
      {news.length > 0 ? (
        <section aria-labelledby="logbook-news">
          <SectionHeading id="logbook-news">News</SectionHeading>
          <div className="mt-6 flex flex-col gap-8">
            {news.map((entry) => (
              <Note key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      ) : null}

      {articles.length > 0 ? (
        <section aria-labelledby="logbook-articles">
          <SectionHeading id="logbook-articles">Articles</SectionHeading>
          <div className="mt-6">
            <ArticleTagFilter
              tags={tags}
              articles={articles.map((article) => ({
                slug: article.slug,
                tags: article.tags,
                teaser: <ArticleTeaser entry={article} />,
              }))}
            />
          </div>
        </section>
      ) : null}
    </div>
  );
}
