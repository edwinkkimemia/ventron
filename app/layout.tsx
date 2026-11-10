import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/archivo/800.css";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

const rawSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
const siteUrl = rawSiteUrl.startsWith("http") ? rawSiteUrl : "https://ventronltd.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ventron Mechanical Systems Ltd | Your Vision, Our Engineering", template: "%s | Ventron Mechanical Systems Ltd" },
  description: "Engineering, procurement, fire protection, oil & gas, LPG and industrial solutions across Kenya and East Africa.",
  icons: { icon: "/fav.jpg", apple: "/fav.jpg" },
  openGraph: { siteName: "Ventron Mechanical Systems Ltd", type: "website", images: [{ url: "/og-image.jpg", width: 1200, height: 630 }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
