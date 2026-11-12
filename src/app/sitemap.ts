import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getPosts, getSettings } from "@/lib/data";
import { isSectionVisible } from "@/lib/sections";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, settings] = await Promise.all([getPosts(), getSettings()]);
  const on = (k: Parameters<typeof isSectionVisible>[1]) => isSectionVisible(settings.sections, k);
  const base = siteConfig.url;
  const now = new Date();
  const page = (path: string, priority = 0.8) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: "monthly" as const, priority });
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...(on("about") ? [page("/about")] : []),
    ...(on("publications") ? [page("/publications/papers", 0.9), page("/publications/books", 0.8), page("/publications/other", 0.7)] : []),
    ...(on("teaching") ? [page("/teaching")] : []),
    ...(on("blog") ? [page("/news", 0.7)] : []),
    ...(on("cv") ? [page("/cv", 0.8)] : []),
    ...(on("contact") ? [page("/contact", 0.7)] : []),
    ...(on("blog") ? posts.map((p) => ({ url: `${base}/news/${p.slug}`, lastModified: new Date(p.updated_at ?? p.published_at), changeFrequency: "monthly" as const, priority: 0.6 })) : []),
  ];
}
