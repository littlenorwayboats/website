import type { MetadataRoute } from "next";
import { getLogbookArticles } from "@/lib/logbook";
import { logbookArticlePath } from "@/lib/paths";
import { isIndexablePath } from "@/lib/preview";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const pages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/logbook", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.6 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = (await getLogbookArticles()).map((article) => ({
    path: logbookArticlePath(article.slug),
    lastModified: article.updated ?? article.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...pages, ...articles]
    .filter((page) => isIndexablePath(page.path))
    .map(({ path, ...rest }) => ({ url: absoluteUrl(path), ...rest }));
}
