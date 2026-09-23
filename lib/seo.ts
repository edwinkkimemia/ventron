import type { Metadata } from "next";

const _raw = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
const SITE_URL = _raw.startsWith("http") ? _raw : "https://ventronltd.com";

export function baseMetadata(opts: { title: string; description: string; path?: string; image?: string }): Metadata {
  const url = `${SITE_URL}${opts.path ?? ""}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: "Ventron Mechanical Systems Ltd",
      type: "website",
      images: opts.image ? [{ url: opts.image }] : undefined,
    },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ventron Mechanical Systems Ltd",
    slogan: "Your Vision, Our Engineering.",
    url: SITE_URL,
    email: "info@ventronltd.com",
    telephone: "+254797467020",
    address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
    areaServed: ["Kenya", "East Africa"],
  };
}
