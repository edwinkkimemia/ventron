import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { organizationSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700", "800"], display: "swap" });

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
    <html lang="en" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
