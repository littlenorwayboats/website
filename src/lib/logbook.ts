import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { Marked, type RendererThis, type Tokens } from "marked";
import { getImageEntry, optimizedVariantPath } from "@/lib/images";
import { withBasePath } from "@/lib/paths";

/** Articles are `content/logbook/YYYY-MM-DD-slug.md`; the first `# Heading` is the title. */
const LOGBOOK_DIR = path.join(process.cwd(), "content", "logbook");
const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

export type LogbookEntry = {
  slug: string;
  date: string;
  title: string;
  html: string;
};

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

export async function getLogbookEntries(): Promise<LogbookEntry[]> {
  const files = await readdir(LOGBOOK_DIR);

  const entries = await Promise.all(
    files.flatMap((file) => {
      const match = file.match(FILENAME_PATTERN);
      if (!match) return [];
      const [, date, slug] = match;

      return (async () => {
        const markdown = await readFile(path.join(LOGBOOK_DIR, file), "utf8");
        const { title, body } = splitTitle(markdown, slug);
        const html = await logbookMarked.parse(body.trim());
        return { slug, date, title, html };
      })();
    }),
  );

  return entries.sort((a, b) => b.date.localeCompare(a.date));
}

export function formatLogbookDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
