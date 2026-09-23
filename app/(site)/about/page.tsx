import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import { ShieldCheck, Eye, HeartHandshake } from "lucide-react";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "About Us", description: "Ventron Mechanical Systems Ltd — engineering, procurement and project-delivery partner for industrial, oil & gas, LPG and fire protection projects in Kenya and East Africa.", path: "/about" });

const VALUES = ["Safety", "Integrity", "Technical Excellence", "Quality", "Reliability", "Innovation", "Client Partnership"];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white tracking-wide">About Ventron</h1>
          <p className="mt-3 max-w-2xl text-steel-200">An engineering, procurement, consultancy and project-delivery partner for industrial clients across Kenya and East Africa.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-2 gap-10">
          <Reveal>
            <SectionHeading kicker="Company overview" title="Who we are" text="Ventron Mechanical Systems Ltd is a Kenya-based engineering company serving oil & gas, LPG, energy, industrial, fire protection, mechanical systems and infrastructure projects. We combine design engineering, equipment sourcing, site supervision and QA/QC so clients get safe, maintainable, cost-effective plants — not just drawings." />
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="border border-steel-200 p-5"><ShieldCheck className="text-accent" /><h3 className="font-condensed mt-2 font-semibold uppercase text-navy-900">Mission</h3><p className="text-sm text-charcoal-700 mt-1">To deliver safe, reliable, technically sound, and cost-effective engineering solutions.</p></div>
              <div className="border border-steel-200 p-5"><Eye className="text-accent" /><h3 className="font-condensed mt-2 font-semibold uppercase text-navy-900">Vision</h3><p className="text-sm text-charcoal-700 mt-1">To become a trusted engineering and project-delivery partner across East Africa.</p></div>
            </div>
          </Reveal>
          <Reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&q=80" alt="Engineers reviewing mechanical installation" className="h-72 w-full object-cover" />
            <div className="mt-4 bg-navy-900 text-steel-200 p-5 text-sm leading-relaxed"><HeartHandshake className="text-accent-light mb-2" size={20} /> <strong className="text-white">Engineering philosophy:</strong> safety, compliance, lifecycle performance, maintainability, reliability and cost-effectiveness — engineered in from concept, verified through commissioning.</div>
          </Reveal>
        </div>
      </section>
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Core values" title="What guides our engineering" />
          <div className="mt-6 flex flex-wrap gap-2">{VALUES.map((v) => <span key={v} className="bg-navy-900 text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5">{v}</span>)}</div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading kicker="Geographic coverage" title="Kenya & East Africa" text="Headquartered in Nairobi, Kenya, delivering regional industrial projects — depots, terminals, manufacturing plants, commercial infrastructure and utility systems." />
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm font-semibold text-navy-900">{["Kenya — HQ Nairobi", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Regional industrial sites"].map((x) => <li key={x} className="border border-steel-200 px-3 py-2.5 bg-steel-100/50">{x}</li>)}</ul>
          </div>
          <div className="bg-navy-950 p-6 text-sm text-steel-200 leading-relaxed">
            <h3 className="font-condensed uppercase text-white font-semibold tracking-wide">Multidisciplinary scope</h3>
            <p className="mt-2">Mechanical engineering • Oil & gas • LPG systems • Fire protection & firewater • Process piping • Industrial equipment • Consultancy • Procurement • Construction management • QA/QC • Commissioning.</p>
            <p className="mt-3">We work with oil & gas companies, LPG operators, manufacturers, energy developers, contractors, consultants and facility managers.</p>
          </div>
        </div>
      </section>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading dark kicker="Why clients choose us" title="The Ventron difference" text="What changes when your engineering partner owns the outcome — not just the drawings." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Calculation-first", "Every recommendation backed by numbers you can audit — never rules of thumb."],
              ["Single accountability", "Design, procurement, supervision and QA/QC from one team. One throat to choke."],
              ["Brownfield specialists", "Live depots, operating plants, occupied buildings — we engineer around production."],
              ["Documentation obsession", "P&IDs, datasheets, test records and as-builts your team inherits and auditors love."],
            ].map(([t, d]) => (
              <div key={t} className="bg-white/5 border border-white/10 p-5 hover:border-accent transition">
                <h3 className="font-condensed font-semibold uppercase text-white">{t}</h3>
                <p className="mt-1.5 text-sm text-steel-200">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Work with engineers who own the outcome" text="Tell us about your plant or project — get a scoped proposal with deliverables, timeline and fee within 2 business days." />
    </>
  );
}
