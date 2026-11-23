import Link from "next/link";
import { ArticleTagFilter } from "@/components/ArticleTagFilter";
import { OptimizedImage } from "@/components/OptimizedImage";
import {
  formatLogbookDate,
  getLogbookEntries,
  isLogbookArticle,
  type LogbookEntry,
} from "@/lib/logbook";
import { filterableTags, visibleTags } from "@/lib/logbook-tags";
import { logbookArticlePath } from "@/lib/paths";

function TagList({ tags }: { tags: string[] }) {
  const shown = visibleTags(tags);
  if (shown.length === 0) return null;

  return (
    <ul aria-label="Tags" className="mt-2 flex flex-wrap gap-1.5">
      {shown.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-iron/10 px-2 py-0.5 text-[10px] leading-tight font-bold tracking-label text-rust uppercase"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

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
        <TagList tags={entry.tags} />
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
      <TagList tags={entry.tags} />
      <div
        className="logbook-prose mt-4"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}

export async function Blog() {
  const entries = await getLogbookEntries();
  const tags = [
    ...new Set(entries.flatMap((entry) => filterableTags(entry.tags))),
  ].sort((a, b) => a.localeCompare(b));
  const posts = entries.map((entry) => ({
    slug: entry.slug,
    tags: entry.tags,
    teaser: isLogbookArticle(entry) ? (
      <ArticleTeaser entry={entry} />
    ) : (
      <Note entry={entry} />
    ),
  }));

  return (
    <section aria-label="Logbook posts" className="mx-auto max-w-3xl px-4">
      <ArticleTagFilter tags={tags} posts={posts} />
    </section>
  );
}
