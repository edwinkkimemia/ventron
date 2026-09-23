import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { FALLBACK_ARTICLES, readMinutes } from "@/lib/insights-fallback";
import { SERVICES_RICH } from "@/lib/services-content";
import ShareButtons from "@/components/ShareButtons";
import { baseMetadata } from "@/lib/seo";

function fallbackBySlug(slug: string) {
  const f = FALLBACK_ARTICLES.find((a) => a.slug === slug);
  if (!f) return null;
  return {
    title: f.title, slug: f.slug, excerpt: f.excerpt, content: f.content,
    category: { name: f.category }, authorName: "Ventron Engineering",
    featuredImage: f.image, metaTitle: f.metaTitle, metaDescription: f.metaDescription,
    tags: f.tags, publishedAt: f.publishedAt,
  };
}

function inlineLinks(text: string, keyPrefix: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) return <Link key={`${keyPrefix}-${i}`} href={m[2]} className="font-semibold text-accent hover:underline">{m[1]}</Link>;
    return <span key={`${keyPrefix}-${i}`}>{p}</span>;
  });
}

function ArticleBody({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.startsWith("## ")) return <h2 key={i}>{b.replace(/^##\s*/, "")}</h2>;
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length && lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i}>
              {lines.map((l, j) => <li key={j}>{inlineLinks(l.replace(/^-+\s*/, ""), `${i}-${j}`)}</li>)}
            </ul>
          );
        }
        return <p key={i}>{inlineLinks(b, `${i}`)}</p>;
      })}
    </>
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const a = await prisma.article.findUnique({ where: { slug: params.slug } });
    if (a) return baseMetadata({ title: a.metaTitle || a.title, description: a.metaDescription || a.excerpt, path: `/insights/${a.slug}`, image: a.featuredImage ?? undefined });
  } catch {}
  const f = fallbackBySlug(params.slug);
  if (f) return baseMetadata({ title: f.metaTitle, description: f.metaDescription, path: `/insights/${f.slug}`, image: f.featuredImage });
  return baseMetadata({ title: "Insight", description: "Ventron technical insight.", path: `/insights/${params.slug}` });
}

export default async function InsightDetail({ params }: { params: { slug: string } }) {
  let a: any = null;
  try { a = await prisma.article.findUnique({ where: { slug: params.slug }, include: { category: true } }); } catch {}
  if (!a || !a.published) a = fallbackBySlug(params.slug);
  if (!a) notFound();

  const related = FALLBACK_ARTICLES.filter((r) => r.slug !== a.slug && (r.category === a.category?.name || r.categorySlug === a.category?.slug)).slice(0, 3);
  const relatedList = related.length ? related : FALLBACK_ARTICLES.filter((r) => r.slug !== a.slug).slice(0, 3);
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, image: a.featuredImage, author: { "@type": "Organization", name: "Ventron Mechanical Systems Ltd" }, datePublished: a.publishedAt };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <section className="relative bg-navy-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {a.featuredImage && <img src={a.featuredImage} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent" />
        <div className="relative mx-auto max-w-3xl px-4 md:px-6 py-12">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights", href: "/insights" }, { label: a.category?.name ?? "Article" }]} />
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent-light">{a.category?.name}</span>
          <h1 className="font-condensed mt-2 text-3xl md:text-4xl font-semibold uppercase text-white leading-tight">{a.title}</h1>
          <p className="text-steel-300 text-sm mt-3">By {a.authorName} {a.publishedAt ? `• ${new Date(a.publishedAt).toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" })}` : ""} • {readMinutes(a.content)} min read</p>
        </div>
      </section>
      <article className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {a.featuredImage && <img src={a.featuredImage} alt={a.title} className="w-full h-72 object-cover mb-8 border border-steel-200" />}
          <div className="prose-eng"><ArticleBody content={a.content} /></div>
          {a.tags && <p className="mt-8 text-xs uppercase tracking-widest text-steel-500">Tagged: {a.tags}</p>}
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="border border-steel-200 p-5">
              <h2 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-900">Share this article</h2>
              <div className="mt-3"><ShareButtons url={`${(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ventronltd.com").replace(/\/$/, "")}/insights/${a.slug}`} title={a.title} /></div>
            </div>
            <div className="bg-navy-950 p-6">
              <h2 className="font-condensed text-sm font-semibold uppercase tracking-widest text-white">Our engineering services</h2>
              <ul className="mt-3 space-y-1">
                {Object.entries(SERVICES_RICH).map(([slug, s]) => (
                  <li key={slug}><Link href={`/services/${slug}`} className="block py-1.5 text-sm font-semibold text-steel-200 hover:text-white border-b border-white/10">→ {s.name}</Link></li>
                ))}
              </ul>
              <Link href="/quote" className="mt-4 inline-block bg-accent hover:bg-accent-dark text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5">Discuss Your Project</Link>
            </div>
          </aside>
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-6 pb-12">
          <div className="border border-steel-200 bg-steel-100/60 p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h2 className="font-condensed font-semibold uppercase text-navy-900">Need this engineered for your site?</h2>
              <p className="text-sm text-charcoal-700 mt-1">Send drawings, layouts or a scope note — we respond with a scoped proposal.</p>
            </div>
            <Link href="/quote" className="bg-accent hover:bg-accent-dark text-white text-sm font-bold uppercase tracking-widest px-6 py-3 shrink-0">Request a Quote</Link>
          </div>
        </div>
      </article>
      <section className="bg-steel-100/60 border-t border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <h2 className="font-condensed text-2xl font-semibold uppercase text-navy-900">Related insights</h2>
          <div className="mt-6 grid sm:grid-cols-3 gap-5">
            {relatedList.map((r) => (
              <Link key={r.slug} href={`/insights/${r.slug}`} className="border border-steel-200 bg-white hover:border-navy-900 hover:shadow-md group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.image} alt={r.title} className="h-36 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{r.category}</span>
                  <h3 className="font-condensed mt-1 font-semibold uppercase text-sm text-navy-900 group-hover:text-accent leading-snug">{r.title}</h3>
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
