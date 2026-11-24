import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { OptimizedImage } from "@/components/OptimizedImage";
import { socialImage } from "@/lib/images";
import {
  formatLogbookDate,
  getLogbookArticle,
  getLogbookArticles,
} from "@/lib/logbook";
import { bookingHref } from "@/lib/nav";
import { logbookArticlePath } from "@/lib/paths";
import { SITE_LAUNCHED, robotsFor } from "@/lib/preview";
import { articleJsonLd } from "@/lib/structured-data";

const RELATED_LIMIT = 2;

export const dynamicParams = false;

export async function generateStaticParams() {
  const articles = await getLogbookArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/logbook/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getLogbookArticle(slug);
  if (!article) return {};

  const path = logbookArticlePath(article.slug);
  const social = article.image ? socialImage(article.image) : undefined;
  const images = article.image
    ? [
        {
          ...(social ?? { url: article.image }),
          alt: article.imageAlt ?? article.title,
        },
      ]
    : undefined;

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: path },
    robots: robotsFor(path),
    openGraph: {
      type: "article",
      url: path,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      ...(images ? { images } : {}),
    },
    twitter: {
      title: article.title,
      description: article.description,
      ...(images ? { images: images.map((image) => image.url) } : {}),
    },
  };
}

export default async function LogbookArticlePage({
  params,
}: PageProps<"/logbook/[slug]">) {
  const { slug } = await params;
  const article = await getLogbookArticle(slug);
  if (!article) notFound();

  const related = (await getLogbookArticles())
    .filter((other) => other.slug !== article.slug)
    .slice(0, RELATED_LIMIT);
  const cta = SITE_LAUNCHED
    ? { href: bookingHref, label: "Book a voyage" }
    : { href: "/#signup", label: "Get launch updates" };

  return (
    <main
      id="main-content"
      className="min-w-0 flex-1 bg-parchment px-4 py-16 texture-noise"
    >
      <JsonLd data={articleJsonLd(article)} />
      <article className="surface-card mx-auto max-w-3xl px-6 py-10 md:px-10 md:py-14">
        <nav aria-label="Breadcrumb" className="text-sm text-iron">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/logbook" className="hover:text-rust">
                Logbook
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-norse-950">
              {article.title}
            </li>
          </ol>
        </nav>

        <header className="mt-6">
          <p className="text-sm font-bold tracking-label text-iron uppercase">
            <time dateTime={article.date}>
              {formatLogbookDate(article.date)}
            </time>
            {article.updated && article.updated !== article.date ? (
              <>
                <span aria-hidden="true"> · </span>
                Updated{" "}
                <time dateTime={article.updated}>
                  {formatLogbookDate(article.updated)}
                </time>
              </>
            ) : null}
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-[0.04em] text-norse-950 md:text-4xl">
            {article.title}
          </h1>
        </header>

        {article.image ? (
          <OptimizedImage
            src={article.image}
            alt={article.imageAlt ?? ""}
            sizes="(min-width: 48rem) 48rem, 100vw"
            priority
            className="mt-8 w-full rounded-sm"
          />
        ) : null}

        <div
          className="logbook-prose mt-8"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />

        <aside className="mt-12 rounded-sm border border-iron/25 bg-parchment p-6 text-center">
          <p className="text-xl font-bold text-norse-950">
            See Liberty Bay from the water
          </p>
          <p className="mt-2 text-iron">
            Quiet electric Viking longships, right on the Poulsbo waterfront.
          </p>
          <Link
            href={cta.href}
            className="neon-btn mt-6 inline-flex rounded-sm px-7 py-2.5 text-sm"
          >
            {cta.label}
          </Link>
        </aside>
      </article>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-articles"
          className="mx-auto mt-16 max-w-3xl border-t border-iron/25 px-6 pt-10 md:px-10"
        >
          <h2
            id="related-articles"
            className="text-sm font-bold tracking-label text-iron uppercase"
          >
            More from the logbook
          </h2>
          <ul className="mt-6 space-y-6">
            {related.map((other) => (
              <li key={other.slug}>
                <Link
                  href={logbookArticlePath(other.slug)}
                  className="text-xl font-bold text-norse-950 hover:text-rust"
                >
                  {other.title}
                </Link>
                {other.description ? (
                  <p className="mt-1 font-alegreya-sans text-iron">
                    {other.description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mx-auto mt-12 max-w-3xl px-6 md:px-10">
        <Link
          href="/logbook"
          className="text-sm font-bold tracking-label text-rust uppercase underline underline-offset-4 hover:text-rust-dim"
        >
          Back to the logbook
        </Link>
      </p>
    </main>
  );
}
