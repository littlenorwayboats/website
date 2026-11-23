import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Marked, type RendererThis, type Tokens } from "marked";
import { getImageEntry, optimizedVariantPath } from "@/lib/images";
import { withBasePath } from "@/lib/paths";

/**
 * Entries are `content/logbook/YYYY-MM-DD-slug.md`; the first `# Heading` is the title.
 * Optional frontmatter (flat `key: value` lines between `---` fences):
 *   type: article | note   (default note; articles get their own page at /logbook/<slug>/)
 *   tags: Wildlife, Boating   (comma-separated; filterable on /logbook/; "Pinned" floats to the top and shows on cards only)
 *   description, image, imageAlt, updated (YYYY-MM-DD), draft (true hides it from builds)
 */
const LOGBOOK_DIR = path.join(process.cwd(), "content", "logbook");
const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const DESCRIPTION_MAX_LENGTH = 160;

export type LogbookEntryType = "article" | "note";

export type LogbookEntry = {
  slug: string;
  type: LogbookEntryType;
  date: string;
  updated?: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  html: string;
};

export type LogbookArticle = LogbookEntry & { type: "article" };

const LOGBOOK_IMAGE_SIZES = "(min-width: 48rem) 48rem, 100vw";

const logbookMarked = new Marked();
logbookMarked.use({
  renderer: {
    image({ href, title, text }) {
      return renderLogbookImage(href, text, title);
    },
    link(this: RendererThis, { href, title, tokens }: Tokens.Link) {
      const label = this.parser.parseInline(tokens);
      const url =
        href.startsWith("/") && !href.startsWith("//") ? withBasePath(href) : href;
      const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";
      return `<a href="${escapeHtml(url)}"${titleAttr}>${label}</a>`;
    },
  },
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function srcSetFor(src: string, widths: number[], format: "avif" | "webp") {
  return widths
    .map(
      (width) =>
        `${withBasePath(optimizedVariantPath(src, width, format))} ${width}w`,
    )
    .join(", ");
}

/** Same picture/srcset markup as OptimizedImage, emitted from markdown. */
function renderLogbookImage(href: string, alt: string, title: string | null) {
  const safeAlt = escapeHtml(alt);
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : "";

  if (!href.startsWith("/") || href.startsWith("//")) {
    return `<img src="${escapeHtml(href)}" alt="${safeAlt}"${titleAttr} decoding="async" loading="lazy" />`;
  }

  const entry = getImageEntry(href);
  const src = escapeHtml(withBasePath(href));
  const dimensions =
    entry && entry.width > 0 && entry.height > 0
      ? ` width="${entry.width}" height="${entry.height}"`
      : "";
  const img = `<img src="${src}" alt="${safeAlt}"${titleAttr}${dimensions} sizes="${LOGBOOK_IMAGE_SIZES}" decoding="async" loading="lazy" />`;

  if (!entry?.widths.length) return img;

  // PNG sources skip AVIF, matching OptimizedImage.
  const useAvif = !href.toLowerCase().endsWith(".png");
  const sources = [
    useAvif
      ? `<source type="image/avif" srcset="${escapeHtml(srcSetFor(href, entry.widths, "avif"))}" sizes="${LOGBOOK_IMAGE_SIZES}" />`
      : "",
    `<source type="image/webp" srcset="${escapeHtml(srcSetFor(href, entry.widths, "webp"))}" sizes="${LOGBOOK_IMAGE_SIZES}" />`,
  ].join("");

  return `<picture>${sources}${img}</picture>`;
}

function splitTitle(markdown: string, fallback: string) {
  const match = markdown.match(/^#[ \t]+(.+?)[ \t]*$/m);
  if (!match || match.index === undefined) {
    return { title: fallback, body: markdown };
  }
  const body =
    markdown.slice(0, match.index) + markdown.slice(match.index + match[0].length);
  return { title: match[1], body };
}

function splitFrontmatter(markdown: string) {
  const match = markdown.match(FRONTMATTER_PATTERN);
  if (!match) return { data: {} as Record<string, string>, content: markdown };

  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1 || line.trimStart().startsWith("#")) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^(["'])(.*)\1$/, "$2");
    if (key) data[key] = value;
  }
  return { data, content: markdown.slice(match[0].length) };
}

function decodeEntities(text: string) {
  return text
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&amp;", "&");
}

/** First paragraph with real text, trimmed to a meta-description length. */
function excerptFrom(html: string) {
  for (const [, inner] of html.matchAll(/<p>([\s\S]*?)<\/p>/g)) {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim();
    if (!text) continue;
    if (text.length <= DESCRIPTION_MAX_LENGTH) return text;
    const cut = text.slice(0, DESCRIPTION_MAX_LENGTH - 1);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  }
  return "";
}

function parseTags(value: string | undefined) {
  if (!value) return [];
  const tags = value
    .replace(/^\[(.*)\]$/, "$1")
    .split(",")
    .map((tag) => tag.trim().replace(/^(["'])(.*)\1$/, "$2"))
    .filter(Boolean);
  return [...new Set(tags)];
}

async function readEntry(file: string): Promise<LogbookEntry | null> {
  const match = file.match(FILENAME_PATTERN);
  if (!match) return null;
  const [, date, slug] = match;

  const raw = await readFile(path.join(LOGBOOK_DIR, file), "utf8");
  const { data, content } = splitFrontmatter(raw);
  if (data.draft === "true" && process.env.NODE_ENV === "production") {
    return null;
  }

  const { title, body } = splitTitle(content, slug);
  const html = await logbookMarked.parse(body.trim());

  return {
    slug,
    type: data.type === "article" ? "article" : "note",
    date,
    updated: data.updated || undefined,
    title,
    description: data.description || excerptFrom(html),
    tags: parseTags(data.tags),
    image: data.image || undefined,
    imageAlt: data.imageAlt || undefined,
    html,
  };
}

export async function getLogbookEntries(): Promise<LogbookEntry[]> {
  const files = await readdir(LOGBOOK_DIR);
  const entries = await Promise.all(files.map(readEntry));

  return entries
    .filter((entry): entry is LogbookEntry => entry !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function isLogbookArticle(entry: LogbookEntry): entry is LogbookArticle {
  return entry.type === "article";
}

export async function getLogbookArticles(): Promise<LogbookArticle[]> {
  return (await getLogbookEntries()).filter(isLogbookArticle);
}

export async function getLogbookArticle(
  slug: string,
): Promise<LogbookArticle | undefined> {
  return (await getLogbookArticles()).find((article) => article.slug === slug);
}

export function formatLogbookDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
