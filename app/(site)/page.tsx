import Link from "next/link";
import { ArrowRight, ShieldCheck, Factory, Compass, Building2, MapPin, Briefcase, Globe, Package } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { ServiceCard, ProjectCard, IndustryCard } from "@/components/Cards";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/Reveal";
import { getPublishedServices, getIndustries, getFeaturedProjects, getStatistics, getSetting, getEquipmentCategories } from "@/lib/data";
import { whatsappDefault } from "@/lib/whatsapp";
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
  const [services, industries, projects, stats, heroTitle, heroSub, equipCats] = await Promise.all([
    getPublishedServices(), getIndustries(), getFeaturedProjects(), getStatistics(),
    getSetting("hero_title", "Oil & Gas, LPG and Industrial Engineering Across East Africa"),
    getSetting("hero_subtitle", "Ventron Mechanical Systems Ltd delivers engineering and procurement for oil & gas terminals, LPG facilities, pipelines, firewater systems and industrial plants across Kenya and East Africa."),
    getEquipmentCategories(),
  ]);
  const svcList = services.length ? services.slice(0, 6) : STATIC_SERVICES;
  const statItems = stats.length ? stats : [
    { label: "Engineering Disciplines", value: "8" },
    { label: "Industries Served", value: "8" },
    { label: "Core Services", value: "8" },
    { label: "Regional Coverage", value: "EA" },
  ];
  const equipList = equipCats.length ? equipCats : [
    { name: "Pumps", slug: "pumps", description: "Firewater, process, transfer and booster pumps with sizing support." },
    { name: "Fire Protection Equipment", slug: "fire-protection-equipment", description: "Hydrants, monitors, foam equipment, valves, hose systems." },
    { name: "Mechanical Equipment", slug: "mechanical-equipment", description: "Valves, piping components, tanks, accessories." },
    { name: "LPG Equipment", slug: "lpg-equipment", description: "Vessels, vaporisers, piping, safety devices." },
  ];
  const eqImgs: Record<string, string> = { pumps: "/industrial.jpg", "fire-protection-equipment": "/fire.jpg", "mechanical-equipment": "/petrol-storage.jpg", "lpg-equipment": "/lpg.jpg" };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/heroimage.jpg" alt="Oil and gas storage terminal with tank farm and process piping" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-navy-950/0" />
        </div>
        <div className="relative flex items-center min-h-[calc(100svh-12rem)]">
          <div className="w-full mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-12">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="h-[3px] w-12 bg-accent" />
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-steel-200">Ventron Mechanical Systems Ltd — Kenya • East Africa</span>
              </div>
              <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase leading-[1.05] text-white tracking-wide">{heroTitle}</h1>
              <p className="mt-4 text-base md:text-lg text-steel-200 leading-relaxed max-w-2xl">{heroSub}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/quote" className="bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3.5 flex items-center gap-2 text-sm uppercase tracking-widest">Discuss Your Project <ArrowRight size={17} /></Link>
                <Link href="/projects" className="border border-white/40 text-white font-bold px-7 py-3.5 hover:bg-white hover:text-navy-900 text-sm uppercase tracking-widest">View Projects</Link>
              </div>
              <p className="mt-3 text-xs uppercase tracking-widest text-steel-300">✓ Scoped proposal in 2 business days &nbsp; ✓ Confidentiality on request &nbsp; ✓ Nairobi HQ, regional delivery</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Mechanical Engineering", "Oil & Gas", "Fire Protection", "LPG Systems", "Industrial Projects"].map((c) => (
                  <span key={c} className="border border-white/25 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-steel-100">{c}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-t border-white/10 bg-navy-950/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 flex gap-6 text-[11px] font-bold uppercase tracking-widest text-steel-300 overflow-x-auto whitespace-nowrap">
            <span>★ Safety-first engineering</span><span>★ Multidisciplinary delivery</span><span>★ QA/QC & commissioning</span><span>★ Regional experience</span>
          </div>
        </div>
      </section>

      {/* COMPANY STATISTICS STRIP */}
      <section className="bg-white border-b border-steel-200" aria-label="Company statistics">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:divide-x divide-steel-200">
          {statItems.map((s: any, i: number) => {
            const StatIcon = [Compass, Factory, Briefcase, Globe][i % 4];
            return (
              <div key={s.label} className="flex items-center justify-center gap-3.5 md:px-6">
                <span className="text-accent shrink-0"><StatIcon size={36} /></span>
                <div>
                  <div className="font-condensed text-2xl md:text-3xl font-bold text-navy-900 leading-none">{s.value}<span className="text-accent">{s.suffix ?? ""}</span></div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-steel-500 mt-1.5">{s.label}</div>
                </div>
              </div>
            );
          })}
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

      {/* CORE SERVICES (pillars) */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <Reveal><SectionHeading kicker="What we do" title="Core Services" text="Three integrated practices — engineering, procurement and project delivery — delivered by one multidisciplinary team." /></Reveal>
          <div className="mt-8 grid md:grid-cols-3 gap-5">
            {[
              { title: "Engineering & Design", href: "/services/mechanical-engineering", img: "/mechanical.jpg", Icon: Compass, text: "Mechanical, process & piping, oil & gas and fire protection engineering — layouts, calculations, P&IDs and specifications." },
              { title: "Procurement & Equipment", href: "/services/procurement", img: "/procurement.jpg", Icon: Package, text: "Firewater and process pumps, valves, piping materials and fire equipment — sourced, verified and documented." },
              { title: "Project Delivery", href: "/services/project-management", img: "/commercial.jpg", Icon: MapPin, text: "Planning, site supervision, installation oversight, testing and commissioning support." },
            ].map((p) => (
              <Reveal key={p.title}>
                <Link href={p.href} className="group bg-white border border-steel-200 hover:border-navy-900 hover:shadow-xl transition flex flex-col h-full">
                  <div className="relative h-52 overflow-hidden bg-navy-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="relative p-6 pt-9 flex flex-col flex-1">
                    <div className="absolute -top-6 left-6 h-12 w-12 rounded-full bg-accent text-white grid place-items-center shadow-lg"><p.Icon size={24} /></div>
                    <h3 className="font-condensed text-xl font-semibold uppercase text-navy-900 flex items-center justify-between gap-3">{p.title} <span className="text-accent transition-transform group-hover:translate-x-1" aria-hidden>→</span></h3>
                    <p className="mt-2 text-sm text-charcoal-700 flex-1">{p.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CORE ENGINEERING SERVICES */}
      <section className="bg-white border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Full service range" title="Core Engineering Services" text="Design-led, compliance-aware engineering across mechanical, oil & gas, fire protection and industrial systems." />
            <Link href="/services" className="text-sm font-bold text-accent inline-flex items-center gap-1">All services <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {svcList.map((s: any) => <Reveal key={s.slug}><ServiceCard service={s} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Selected work" title="Featured Projects" text="Representative engineering scopes across fire protection, LPG, storage terminals and industrial plants." />
            <Link href="/projects" className="text-sm font-bold text-accent inline-flex items-center gap-1">All projects <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(projects.length ? projects : FALLBACK_PROJECTS.filter((p) => p.featured).map(toCardProject)).map((p: any) => <ProjectCard key={p.slug} project={p} />)}
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
            <img src="/fire.jpg" alt="Firewater pumps and fire protection pipework" className="h-64 w-full object-cover border border-white/10" />
            <div className="grid grid-cols-3 gap-4">
              {[["Flow", "Demand & hydraulics"], ["Pressure", "System curves"], ["Reliability", "Duty / standby"]].map(([a, b]) => (
                <div key={a} className="bg-navy-950 border border-white/10 p-4 text-center"><div className="font-condensed font-semibold text-white uppercase">{a}</div><div className="text-xs text-steel-300 mt-1">{b}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EQUIPMENT & AUTOMATION */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading kicker="Supply & sourcing" title="Equipment & Automation" text="Specified to duty, verified on delivery — pumps, fire protection equipment, mechanical components and LPG equipment." />
            <Link href="/equipment" className="text-sm font-bold text-accent inline-flex items-center gap-1">All equipment <ArrowRight size={15} /></Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {equipList.map((c: any) => (
              <Link key={c.slug} href="/equipment" className="group bg-white border border-steel-200 hover:border-navy-900 hover:shadow-xl transition flex flex-col">
                <div className="relative h-44 overflow-hidden bg-navy-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={eqImgs[c.slug] ?? "/industrial.jpg"} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
                </div>
                <div className="px-5 py-4 flex items-center justify-between gap-3 bg-white">
                  <h3 className="font-condensed text-[15px] font-semibold uppercase text-navy-900">{c.name}</h3>
                  <span className="text-accent font-bold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY VENTRON */}
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <SectionHeading kicker="Why Ventron" title="Engineering judgements you can build on" text="Design decisions grounded in calculations, site reality and regional delivery experience." />
            <ul className="mt-6 space-y-4">
              {[
                [Compass, "Calculation-led design", "Sizing, hydraulics and system curves verified before anything is specified."],
                [Building2, "Brownfield experience", "Upgrades, retrofits and repairs around live terminals and operating plants."],
                [ShieldCheck, "Strong QA/QC", "Material verification, inspection and documentation control through delivery."],
                [MapPin, "Regional delivery", "Nairobi-based, delivering across Kenya and East Africa."],
              ].map(([Icon, t, d]: any) => (
                <li key={t} className="flex gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-full bg-accent text-white grid place-items-center"><Icon size={20} /></span>
                  <div><div className="font-condensed font-semibold uppercase text-navy-900">{t}</div><p className="text-sm text-charcoal-700 mt-0.5">{d}</p></div>
                </li>
              ))}
            </ul>
            <Link href="/capabilities" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-accent">Explore our capabilities <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/whyus.png" alt="Piping and process engineering drawings — calculation-led design and documentation" loading="lazy" className="w-full h-72 lg:h-[430px] object-cover border border-steel-200 shadow-sm" />
          </Reveal>
        </div>
      </section>

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
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-accent">Read article <ArrowRight size={15} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT ENQUIRY CTA */}
      <section className="relative bg-navy-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-16 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <h2 className="font-condensed text-3xl md:text-4xl font-semibold uppercase text-white tracking-wide leading-tight">Turn Your Project Requirements Into a Deliverable Engineering Solution</h2>
            <p className="mt-3 text-steel-200">Discuss your engineering, procurement and project delivery requirements with our team.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/quote" className="bg-accent hover:bg-accent-dark text-white font-bold px-7 py-3.5 text-sm uppercase tracking-widest">Request a Proposal →</Link>
            <a href={whatsappDefault} target="_blank" rel="noopener" className="bg-[#25D366] hover:brightness-95 text-white font-bold px-7 py-3.5 text-sm uppercase tracking-widest">Chat on WhatsApp →</a>
          </div>
        </div>
      </section>
    </>
  );
}
