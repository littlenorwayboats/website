"use client";

import { useState, type ReactNode } from "react";

export type FilterableArticle = {
  slug: string;
  tags: string[];
  teaser: ReactNode;
};

function chipClass(selected: boolean) {
  return `rounded-full border px-4 py-1.5 text-xs font-bold tracking-label uppercase transition-colors ${
    selected
      ? "border-rust bg-rust text-parchment"
      : "border-iron/40 text-norse-800 hover:border-rust hover:text-rust"
  }`;
}

export function ArticleTagFilter({
  articles,
  tags,
}: {
  articles: FilterableArticle[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const visible = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : articles;

  return (
    <div>
      {tags.length > 0 ? (
        <div
          role="group"
          aria-label="Filter articles by tag"
          className="flex flex-wrap gap-2"
        >
          <button
            type="button"
            aria-pressed={activeTag === null}
            onClick={() => setActiveTag(null)}
            className={chipClass(activeTag === null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={activeTag === tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={chipClass(activeTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {activeTag
          ? `Showing ${visible.length} ${visible.length === 1 ? "article" : "articles"} tagged ${activeTag}`
          : ""}
      </p>

      <div className="mt-6 flex flex-col gap-8">
        {visible.map((article) => (
          <div key={article.slug}>{article.teaser}</div>
        ))}
      </div>
    </div>
  );
}
