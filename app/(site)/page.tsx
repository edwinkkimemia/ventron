import Link from "next/link";
import { ArrowRight, ShieldCheck, Cog, Flame, Droplets, Factory, FileCheck, Wrench } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ServiceCard, ProjectCard, IndustryCard } from "@/components/Cards";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/Reveal";
import { getPublishedServices, getIndustries, getFeaturedProjects, getStatistics, getSetting } from "@/lib/data";
import { FALLBACK_ARTICLES, readMinutes } from "@/lib/insights-fallback";
import { FALLBACK_PROJECTS, toCardProject } from "@/lib/projects-fallback";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({
  title: "Ventron Mechanical Systems Ltd | Your Vision, Our Engineering",
  description: "Engineering, procurement, project management, fire protection, oil & gas and industrial solutions across Kenya and East Africa.",
  path: "/",
});

const STATIC_SERVICES = [
  { name: "Mechanical Engineering", slug: "mechanical-engineering", tagline: "Design, sizing & documentation for reliable mechanical systems.", description: "Mechanical design, equipment layouts, piping, sizing, CAD and calculations.", icon: "Cog", order: 1, image: null },
  { name: "Oil & Gas Engineering", slug: "oil-gas-engineering", tagline: "Petroleum, LPG & storage terminal engineering.", description: "Petroleum facilities, LPG, tank farms, loading, process piping.", icon: "Flame", order: 2, image: null },
  { name: "Fire Protection Engineering", slug: "fire-protection-engineering", tagline: "Firewater networks, pumps & hydraulic analysis.", description: "Firewater systems, pumps, hydrants, monitors, foam, deluge, hydraulics.", icon: "Droplets", order: 3, image: null },
  { name: "Process & Piping Engineering", slug: "process-piping-engineering", tagline: "P&IDs, layouts, hydraulics & pipe sizing.", description: "Layouts, P&IDs, sizing, pressure loss, pump selection.", icon: "GitBranch", order: 4, image: null },
  { name: "Engineering Consultancy", slug: "engineering-consultancy", tagline: "Feasibility, audits & technical advisory.", description: "Studies, surveys, audits, reports, optimisation.", icon: "ClipboardCheck", order: 5, image: null },
  { name: "Procurement", slug: "procurement", tagline: "Verified pumps, valves & fire equipment sourcing.", description: "Pumps, valves, fire equipment, package systems.", icon: "Package", order: 6, image: null },
];

const CAPABILITIES = [
  ["2D CAD", "General arrangements, layouts, fabrication-ready drawings."],
  ["3D CAD", "Plant and equipment modelling for coordination."],
  ["P&IDs", "Process and utility P&IDs with equipment tagging."],
  ["Hydraulic modelling", "Firewater and process network analysis."],
  ["Pump sizing", "Duty point, system curve & NPSH verification."],
  ["Firewater demand", "Maximum water demand & scenario analysis."],
  ["Pressure loss", "Pipe sizing, velocity & loss calculations."],
  ["Datasheets & specs", "Equipment datasheets, specs & technical reports."],
];

export default async function HomePage() {
  const [services, industries, projects, stats, heroTitle, heroSub] = await Promise.all([
    getPublishedServices(), getIndustries(), getFeaturedProjects(), getStatistics(),
    getSetting("hero_title", "Engineering Solutions Built for Performance, Safety & Reliability"),
    getSetting("hero_subtitle", "Ventron Mechanical Systems Ltd delivers engineering, procurement, project management, fire protection, oil & gas, and industrial solutions across Kenya and East Africa."),
  ]);
  const svcList = services.length ? services.slice(0, 6) : STATIC_SERVICES;

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.png" alt="Ventron engineers overlooking an oil and gas refinery at sunset" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" />

        </div>
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-[3px] w-12 bg-accent" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-steel-200">Ventron Mechanical Systems Ltd — Kenya • East Africa</span>
            </div>
            <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase leading-[1.05] text-white tracking-wide">{heroTitle}</h1>
            <p className="mt-4 text-base md:text-lg text-steel-200 leading-relaxed max-w-2xl">{heroSub}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/quote" className="bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3.5 flex items-center gap-2 text-sm uppercase tracking-widest">Discuss Your Project <ArrowRight size={17} /></Link>
              <Link href="/capabilities" className="border border-white/40 text-white font-bold px-7 py-3.5 hover:bg-white hover:text-navy-900 text-sm uppercase tracking-widest">Explore Our Capabilities</Link>
            </div>
            <p className="mt-3 text-xs uppercase tracking-widest text-steel-300">✓ Scoped proposal in 2 business days &nbsp; ✓ Confidentiality on request &nbsp; ✓ Nairobi HQ, regional delivery</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Mechanical Engineering", "Oil & Gas", "Fire Protection", "LPG Systems", "Industrial Projects"].map((c) => (
                <span key={c} className="border border-white/25 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-steel-100">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-navy-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex gap-6 text-[11px] font-bold uppercase tracking-widest text-steel-300 overflow-x-auto whitespace-nowrap">
            <span>★ Safety-first engineering</span><span>★ Multidisciplinary delivery</span><span>★ QA/QC & commissioning</span><span>★ Regional experience</span>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-white border-b border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row md:items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-steel-500 shrink-0">Trusted by teams at:</span>
          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm font-bold uppercase tracking-wide text-navy-900">
            <span>Petroleum terminals</span><span>LPG marketers</span><span>Manufacturers</span><span>Property developers</span><span>EPC contractors</span><span>Facility managers</span>
          </div>
        </div>
      </section>

      {/* INTRO + PROCESS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <Reveal><SectionHeading kicker="Concept to commissioning" title="Engineering Solutions From Concept to Commissioning" text="Ventron supports clients through the full project lifecycle — from feasibility and design to procurement, construction support, inspection, testing and commissioning." /></Reveal>
          <Reveal className="mt-8"><ProcessTimeline /></Reveal>
        </div>
      </section>

      {/* CORE SERVICES */}
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="What we do" title="Core Engineering Services" text="Design-led, compliance-aware engineering across mechanical, oil & gas, fire protection and industrial systems." />
            <Link href="/services" className="text-sm font-bold text-accent inline-flex items-center gap-1">All services <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svcList.map((s: any) => <Reveal key={s.slug}><ServiceCard service={s} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeading dark kicker="Where we work" title="Industries We Serve" text="Oil & gas, LPG, energy, manufacturing, storage terminals and commercial infrastructure." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(industries.length ? industries.slice(0, 8) : [
              { name: "Oil & Gas", slug: "oil-gas", description: "Terminals, piping, utilities.", image: null },
              { name: "LPG", slug: "lpg", description: "Storage, filling, piping, safety.", image: null },
              { name: "Energy", slug: "energy", description: "Generation & infrastructure support.", image: null },
              { name: "Manufacturing", slug: "manufacturing", description: "Process utilities & equipment.", image: null },
              { name: "Petroleum Storage", slug: "petroleum-storage", description: "Tank farms, loading, fire protection.", image: null },
              { name: "Commercial Infrastructure", slug: "commercial-infrastructure", description: "Fire protection & pumping systems.", image: null },
              { name: "Utilities", slug: "utilities", description: "Water, booster & transfer systems.", image: null },
              { name: "Industrial Processing", slug: "industrial-processing", description: "Process piping & plant utilities.", image: null },
            ]).map((ind: any) => <IndustryCard key={ind.slug} industry={ind} />)}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Selected work" title="Featured Projects" text="Representative engineering scopes across fire protection, LPG, storage terminals and industrial plants." />
            <Link href="/projects" className="text-sm font-bold text-accent inline-flex items-center gap-1">All projects <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {(projects.length ? projects : FALLBACK_PROJECTS.filter((p) => p.featured).map(toCardProject)).map((p: any) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeading kicker="Technical depth" title="Engineering Capabilities" text="Calculations, modelling, documentation and specifications — the engineering behind reliable plants." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITIES.map(([t, d]) => (
              <div key={t} className="bg-white border border-steel-200 border-t-4 border-t-navy-900 p-5">
                <div className="font-condensed font-semibold uppercase text-navy-900">{t}</div>
                <p className="mt-1.5 text-sm text-charcoal-700">{d}</p>
              </div>
            ))}
          </div>
          <Link href="/capabilities" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-accent">Full capabilities <ArrowRight size={15} /></Link>
        </div>
      </section>

      {/* FIRE PROTECTION EXPERTISE */}
      <section className="bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950/50" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading dark kicker="Specialist practice" title="Fire Protection Expertise" text="Firewater storage, pump skids, ring mains, hydrants, monitors, foam and deluge — engineered with hydraulic rigour." />
            <ul className="mt-6 grid sm:grid-cols-2 gap-2.5 text-sm text-steel-100">
              {["Firewater storage & tanks", "Diesel / electric / jockey pumps", "Ring mains & sectional valves", "Hydrants & monitors", "Foam & deluge systems", "Max. demand assessment", "System curve & NPSH", "Pipe sizing & velocity checks"].map((x) => (
                <li key={x} className="flex gap-2 bg-white/5 border border-white/10 px-3 py-2.5"><ShieldCheck size={16} className="text-accent-light shrink-0 mt-0.5" /> {x}</li>
              ))}
            </ul>
            <Link href="/services/fire-protection-engineering" className="mt-6 inline-flex bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-accent-dark">Fire protection capability <ArrowRight size={15} /></Link>
          </div>
          <div className="grid gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1000&q=80" alt="Firewater pumps and fire protection pipework" className="h-64 w-full object-cover border border-white/10" />
            <div className="grid grid-cols-3 gap-4">
              {[["Flow", "Demand & hydraulics"], ["Pressure", "System curves"], ["Reliability", "Duty / standby"]].map(([a, b]) => (
                <div key={a} className="bg-navy-950 border border-white/10 p-4 text-center"><div className="font-condensed font-semibold text-white uppercase">{a}</div><div className="text-xs text-steel-300 mt-1">{b}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY VENTRON */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <SectionHeading kicker="Why Ventron" title="A delivery partner, not just a contractor" text="Engineering solutions designed around safety, reliability and lifecycle performance." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              [Cog, "Engineering expertise", "Mechanical, piping, fire and process engineering under one roof."],
              [ShieldCheck, "Safety-first approach", "Safe design, risk reduction and compliance-aware engineering."],
              [Factory, "Multidisciplinary capability", "Design, procurement, site supervision and commissioning support."],
              [FileCheck, "Technical compliance", "Documentation, datasheets, QA/QC and verification."],
              [Wrench, "Local knowledge", "Kenyan codes, site realities and regional supply chains."],
              [Flame, "Reliable delivery", "Cost-conscious engineering with clear deliverables."],
            ].map(([Icon, t, d]: any) => (
              <div key={t} className="border border-steel-200 p-6 hover:border-navy-900 hover:shadow-lg transition">
                <Icon className="text-accent" size={26} />
                <h3 className="font-condensed mt-3 font-semibold uppercase text-navy-900">{t}</h3>
                <p className="mt-1.5 text-sm text-charcoal-700">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      {/* LATEST INSIGHTS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Knowledge" title="Latest Technical Insights" text="Guides on firewater sizing, LPG design, tank-farm piping and documentation — written by engineers." />
            <Link href="/insights" className="text-sm font-bold text-accent inline-flex items-center gap-1">All insights <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FALLBACK_ARTICLES.slice(0, 3).map((a) => (
              <Link key={a.slug} href={`/insights/${a.slug}`} className="group border border-steel-200 hover:border-navy-900 hover:shadow-lg flex flex-col bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} loading="lazy" className="h-44 w-full object-cover" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-accent">{a.category}</span>
                    <span className="text-[11px] text-steel-500">{readMinutes(a.content)} min read</span>
                  </div>
                  <h3 className="font-condensed mt-1.5 font-semibold uppercase leading-snug text-navy-900 group-hover:text-accent">{a.title}</h3>
                  <p className="mt-1.5 text-sm text-charcoal-700 line-clamp-2 flex-1">{a.excerpt}</p>
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
