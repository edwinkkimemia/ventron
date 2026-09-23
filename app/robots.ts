import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventronltd.com";
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] }], sitemap: `${URL}/sitemap.xml` };
}
