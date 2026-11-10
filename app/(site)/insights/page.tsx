import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { FALLBACK_ARTICLES, readMinutes } from "@/lib/insights-fallback";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = baseMetadata({ title: "Insights", description: "Technical guides on firewater pump sizing, LPG facility design, tank farm piping, fire pumps and engineering documentation for Kenya and East Africa.", path: "/insights" });

function toCard(a: any) {
  return {
    slug: a.slug,
    title: a.title,
    excerpt: a.excerpt,
    categoryName: a.category?.name ?? a.category ?? "Engineering",
    image: a.featuredImage ?? a.image,
    date: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString("en-KE", { year: "numeric", month: "short", day: "numeric" }) : "",
    read: readMinutes(a.content ?? ""),
  };
}

export default async function InsightsPage() {
  let posts: any[] = [];
  try { posts = await prisma.article.findMany({ where: { published: true }, include: { category: true }, orderBy: { publishedAt: "desc" } }); } catch {}
  const cards = (posts.length ? posts : FALLBACK_ARTICLES).map(toCard);
  const cats = ["All", ...Array.from(new Set(cards.map((c) => c.categoryName)))];
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Technical Insights</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Practical engineering guides for plant owners, facility managers and contractors — fire protection, LPG, oil & gas and documentation.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {cats.map((c) => (
              <span key={c} className="border border-white/25 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-steel-100">{c}</span>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Knowledge" title="Latest articles" text="In-depth, SEO-indexed guides — each with calculation workflow, checklists and related service links." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="border border-steel-200 hover:border-navy-900 hover:shadow-lg group flex flex-col bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} className="h-44 w-full object-cover" loading="lazy" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{a.categoryName}</span>
                    <span className="text-[11px] text-steel-500">{a.read} min read</span>
                  </div>
                  <h2 className="font-condensed mt-1.5 font-semibold uppercase leading-snug text-navy-900 group-hover:text-accent">{a.title}</h2>
                  <p className="text-sm text-charcoal-700 mt-1.5 line-clamp-3 flex-1">{a.excerpt}</p>
                  <span className="mt-3 text-xs font-bold uppercase tracking-widest text-steel-500">{a.date} • Read article →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
