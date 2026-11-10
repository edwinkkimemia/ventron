import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import SectionHeading from "@/components/SectionHeading";
import { prisma } from "@/lib/prisma";
import { SERVICES_RICH } from "@/lib/services-content";
import { FALLBACK_ARTICLES } from "@/lib/insights-fallback";
import { baseMetadata } from "@/lib/seo";
import { imgFor } from "@/components/Cards";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileCheck, Clock } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const s = SERVICES_RICH[params.slug];
  return baseMetadata({ title: s ? s.name : "Service", description: s?.description ?? "Ventron engineering service.", path: `/services/${params.slug}` });
}

export default async function ServiceDetail({ params }: { params: { slug: string } }) {
  const rich = SERVICES_RICH[params.slug];
  if (!rich) notFound();
  let db: any = null;
  try { db = await prisma.service.findUnique({ where: { slug: params.slug } }); } catch {}
  const insights = rich.insights
    .map((slug) => FALLBACK_ARTICLES.find((a) => a.slug === slug))
    .filter(Boolean) as typeof FALLBACK_ARTICLES;
  const others = Object.entries(SERVICES_RICH).filter(([k]) => k !== params.slug).slice(0, 5);

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgFor(params.slug, db?.image)} alt={rich.name} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: rich.name }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">{rich.name}</h1>
          <p className="mt-3 max-w-2xl text-steel-200">{rich.tagline} {rich.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/quote" className="bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-dark">Discuss This Project <ArrowRight size={15} className="inline ml-1" /></Link>
            <Link href="/contact" className="border border-white/40 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white hover:text-navy-900">Talk to engineering</Link>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs uppercase tracking-widest text-steel-300"><Clock size={14} /> Scoped proposal within 2 business days of receiving drawings or BOQ</p>
        </div>
      </section>

      {/* OUTCOME STRIP */}
      <section className="bg-navy-900 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 flex flex-col md:flex-row md:items-center gap-3">
          <span className="bg-accent text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 shrink-0">The outcome</span>
          <p className="text-white font-semibold">{rich.outcome}</p>
        </div>
      </section>

      {/* INTRO + SUB-SERVICES */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <SectionHeading kicker="Why Ventron for this" title={`What ${rich.name.toLowerCase()} delivers`} />
            {rich.intro.map((t, i) => <p key={i} className="mt-4 text-charcoal-700 leading-relaxed">{t}</p>)}
            {db?.content && <p className="mt-4 text-charcoal-700 leading-relaxed">{db.content}</p>}
          </div>
          <aside className="bg-navy-950 p-6 lg:sticky lg:top-28">
            <h3 className="font-condensed uppercase text-white font-semibold tracking-wide">Start with a scope review — free</h3>
            <p className="mt-2 text-sm text-steel-200">Send drawings, BOQs or site photos. We respond with scope, deliverables, timeline and fee — no obligation.</p>
            <Link href="/quote" className="mt-4 inline-flex bg-accent px-5 py-2.5 font-bold text-white text-sm uppercase tracking-widest hover:bg-accent-dark">Discuss Your Project <ArrowRight size={15} className="ml-1" /></Link>
          </aside>
        </div>
      </section>

      {/* SUB-SERVICES GRID */}
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Full scope" title="Sub-services included" text="Every engagement is scoped from these building blocks — you pay for what your project needs, nothing more." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {rich.subServices.map(([t, d], i) => (
              <div key={t} className="bg-white border border-steel-200 border-t-4 border-t-navy-900 p-5 hover:border-t-accent hover:shadow-md transition">
                <span className="font-condensed text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-condensed mt-1 font-semibold uppercase text-navy-900 leading-snug">{t}</h3>
                <p className="mt-1.5 text-sm text-charcoal-700">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + ENGAGEMENTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading kicker="Delivery" title="How we deliver" />
            <ol className="mt-6 space-y-4">
              {rich.process.map(([t, d], i) => (
                <li key={t} className="flex gap-4 border border-steel-200 p-5">
                  <span className="font-condensed text-3xl font-bold text-accent shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-condensed font-semibold uppercase text-navy-900">{t}</h3><p className="mt-1 text-sm text-charcoal-700">{d}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHeading kicker="Typical work" title="Engagements we take on" />
            <ul className="mt-6 space-y-2.5">
              {rich.engagements.map((e) => (
                <li key={e} className="flex gap-2.5 bg-navy-950 text-steel-100 text-sm font-semibold px-4 py-3.5"><CheckCircle2 size={17} className="text-accent-light shrink-0 mt-0.5" /> {e}</li>
              ))}
            </ul>
            <div className="mt-6 border border-steel-200 border-l-4 border-l-accent p-5">
              <h3 className="font-condensed uppercase font-semibold text-navy-900 flex items-center gap-2"><FileCheck size={17} className="text-accent" /> Standard deliverables</h3>
              <p className="mt-2 text-sm text-charcoal-700">{rich.deliverables.join(" • ")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED INSIGHTS */}
      {insights.length > 0 && (
        <section className="bg-steel-100/60 border-t border-steel-200">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading kicker="Learn more" title="Related technical guides" />
              <Link href="/insights" className="text-sm font-bold text-accent inline-flex items-center gap-1">All insights <ArrowRight size={15} /></Link>
            </div>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {insights.map((a) => (
                <Link key={a.slug} href={`/insights/${a.slug}`} className="border border-steel-200 bg-white hover:border-navy-900 hover:shadow-md group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={a.image} alt={a.title} className="h-36 w-full object-cover" loading="lazy" />
                  <div className="p-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{a.category}</span>
                    <h3 className="font-condensed mt-1 font-semibold uppercase text-sm text-navy-900 group-hover:text-accent leading-snug">{a.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      <section className="bg-white border-t border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-bold uppercase tracking-widest text-steel-500 mr-2">Often combined with:</span>
          {others.map(([k, v]) => (
            <Link key={k} href={`/services/${k}`} className="border border-steel-300 px-4 py-2 text-sm font-semibold text-navy-900 hover:border-accent hover:text-accent">{v.name}</Link>
          ))}
        </div>
      </section>

      <CTASection title="Get this engineered right, first time" text="Send drawings, BOQs or site photos — receive a scoped proposal with deliverables, timeline and fee within 2 business days." />
    </>
  );
}
