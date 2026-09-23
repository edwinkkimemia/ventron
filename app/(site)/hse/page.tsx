import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { baseMetadata } from "@/lib/seo";
import { ShieldCheck } from "lucide-react";

export const metadata = baseMetadata({ title: "HSE — Health, Safety & Environment", description: "Safety-first engineering: safe design, risk reduction, site safety, environmental care and regulatory compliance.", path: "/hse" });

const PRINCIPLES = [
  ["Design out risk early", "Hazard identification during concept and FEED — when changes cost lines on paper, not shutdowns. Separation distances, relief philosophy, drainage and access are fixed before steel is ordered."],
  ["Safe construction", "Method statements, lifting plans, hot-work control and contractor coordination for brownfield tie-ins in live depots and plants."],
  ["Safe operation & maintenance", "Valve reachability, isolation philosophy, vents and drains, access platforms and maintainable layouts — because the plant must be operable by your team for decades."],
  ["Environmental care", "Oily-water segregation, spill containment, bund drainage discipline and waste management planned into the design, not bolted on."],
];

export default function HSEPage() {
  const topics = ["Safety-first engineering", "Risk reduction by design", "Site safety practices", "Environmental considerations", "Safe design reviews", "Regulatory compliance support", "Contractor safety coordination", "Engineering risk assessments"];
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "HSE" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Health, Safety & Environment</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Safety is engineered in — not inspected in. We design for safe construction, operation and maintenance.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <SectionHeading kicker="Approach" title="Safe design, safe delivery" text="Four principles govern every Ventron engagement, from a pump replacement to a full terminal development." />
            <div className="mt-6 space-y-4">
              {PRINCIPLES.map(([t, d], i) => (
                <div key={t} className="flex gap-4 border border-steel-200 p-5">
                  <span className="font-condensed text-2xl font-bold text-accent shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <div><h2 className="font-condensed font-semibold uppercase text-navy-900">{t}</h2><p className="mt-1 text-sm text-charcoal-700 leading-relaxed">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1000&q=80" alt="Engineers conducting a safety review on site" className="h-80 w-full object-cover" />
            <div className="bg-navy-900 p-6">
              <h3 className="font-condensed uppercase text-white font-semibold tracking-wide">Site safety coordination</h3>
              <p className="mt-2 text-sm text-steel-200 leading-relaxed">Permit-to-work interfaces, toolbox-talk inputs, shutdown sequencing and supervision support for works inside operating petroleum, LPG and manufacturing facilities.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-steel-100/60 border-y border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <SectionHeading kicker="Coverage" title="HSE topics we address" />
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {topics.map((t) => <div key={t} className="bg-white border border-steel-200 p-5 flex gap-2.5 text-sm font-semibold text-navy-900"><ShieldCheck size={18} className="text-accent shrink-0" />{t}</div>)}
          </div>
          <p className="mt-6 text-sm text-charcoal-700 max-w-3xl leading-relaxed">Note: Ventron does not claim third-party HSE certifications on this site. Project-specific safety plans, method statements and compliance documentation are provided per engagement.</p>
        </div>
      </section>
      <CTASection />
    </>
  );
}
