import type { MetadataRoute } from "next";
import { isIndexablePath } from "@/lib/preview";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const pages = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contacts", changeFrequency: "monthly", priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return pages
    .filter((page) => isIndexablePath(page.path))
    .map(({ path, ...rest }) => ({ url: absoluteUrl(path), ...rest }));
}
