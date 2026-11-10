import type { MetadataRoute } from "next";
import { FALLBACK_ARTICLES } from "@/lib/insights-fallback";

const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventronltd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/industries", "/projects", "/capabilities", "/equipment", "/hse", "/quality", "/insights", "/contact", "/quote"];
  const staticUrls = routes.map((r) => ({ url: `${URL}${r || "/"}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 }));
  const articleUrls = FALLBACK_ARTICLES.map((a) => ({ url: `${URL}/insights/${a.slug}`, lastModified: new Date(a.publishedAt), changeFrequency: "monthly" as const, priority: 0.6 }));
  return [...staticUrls, ...articleUrls];
}
