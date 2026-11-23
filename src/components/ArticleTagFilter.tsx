"use client";

import { useState, type ReactNode } from "react";
import { isPinned } from "@/lib/logbook-tags";

export type FilterablePost = {
  slug: string;
  tags: string[];
  teaser: ReactNode;
};

function chipClass(selected: boolean) {
  return `rounded-full border px-4 py-1.5  text-[8px] leading-none font-bold tracking-label uppercase transition-colors ${
    selected
      ? "border-rust bg-rust text-parchment"
      : "border-iron/40 text-norse-800 hover:border-rust hover:text-rust"
  }`;
}

function postsFor(posts: FilterablePost[], activeTag: string | null) {
  if (activeTag) return posts.filter((post) => post.tags.includes(activeTag));
  return [
    ...posts.filter((post) => isPinned(post.tags)),
    ...posts.filter((post) => !isPinned(post.tags)),
  ];
}

export function ArticleTagFilter({
  posts,
  tags,
}: {
  posts: FilterablePost[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const visible = postsFor(posts, activeTag);

  return (
    <div>
      {tags.length > 0 ? (
        <div
          role="group"
          aria-label="Filter posts by tag"
          className="flex flex-wrap gap-1"
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
          ? `Showing ${visible.length} ${visible.length === 1 ? "post" : "posts"} tagged ${activeTag}`
          : ""}
      </p>

      <div className="mt-6 flex flex-col gap-8">
        {visible.map((post) => (
          <div key={post.slug}>{post.teaser}</div>
        ))}
      </div>
    </div>
  );
}
