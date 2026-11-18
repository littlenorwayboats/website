import "server-only";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";

/** Articles are `content/logbook/YYYY-MM-DD-slug.md`; the first `# Heading` is the title. */
const LOGBOOK_DIR = path.join(process.cwd(), "content", "logbook");
const FILENAME_PATTERN = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/;

export type LogbookEntry = {
  slug: string;
  date: string;
  title: string;
  html: string;
};

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
        const html = await marked.parse(body.trim());
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
