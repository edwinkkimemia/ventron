import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Engineering Capabilities", description: "2D/3D CAD, P&IDs, hydraulic modelling, pump sizing, NPSH, system curves, equipment specification and technical documentation.", path: "/capabilities" });

const GROUPS = [
  { title: "Design", items: ["Mechanical design", "Piping design", "Equipment layout", "General arrangement drawings", "Plant layout"] },
  { title: "CAD", items: ["2D CAD drafting", "3D modelling", "Equipment modelling", "Isometric support", "As-built updates"] },
  { title: "Documentation", items: ["P&IDs", "Datasheets", "Specifications", "Technical reports", "O&M input documentation"] },
  { title: "Analysis", items: ["Hydraulic calculations", "Pump sizing & selection", "Pressure loss & velocity", "Flow analysis", "NPSH analysis", "System curve analysis", "Maximum water demand"] },
];

export default function CapabilitiesPage() {
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Capabilities" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Engineering Capabilities</h1>
          <p className="mt-3 max-w-2xl text-steel-200">The calculations, models and documents behind safe, operable plants.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Evidence" title="Calculation-led delivery" text="Every system we design is backed by models, checks and documents your team can operate from." />
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              ["https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80", "Design review", "Engineers verifying layouts and calculations"],
              ["https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80", "Piping analysis", "Routing, sizing and support verification"],
              ["https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80", "Fire systems", "Hydraulics, demand and pump verification"],
            ].map(([src, t, d]) => (
              <figure key={t} className="relative h-56 overflow-hidden bg-navy-900 group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={d} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 p-4"><div className="font-condensed uppercase font-semibold text-white">{t}</div><div className="text-xs text-steel-200">{d}</div></figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-2 gap-5">
          {GROUPS.map((g) => (
            <div key={g.title} className="border border-steel-200 bg-white">
              <div className="bg-navy-900 px-5 py-3 font-condensed uppercase tracking-widest text-white text-sm">{g.title}</div>
              <ul className="p-5 space-y-2 text-sm text-charcoal-700">{g.items.map((i) => <li key={i} className="flex gap-2 border-b border-steel-100 pb-2"><span className="text-accent font-bold">▸</span> {i}</li>)}</ul>
            </div>
          ))}
          </div>
        </div>
      </section>
      <section className="bg-navy-900">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <SectionHeading dark kicker="Calculation sample" title="Pump duty verification workflow" text="Demand → network model → system curve → pump selection → NPSH check → velocity & pressure verification → datasheet." />
          <div className="mt-6 overflow-x-auto"><table className="w-full text-sm text-left spec-table bg-white"><thead><tr className="bg-navy-950 text-white"><th>Step</th><th>Input</th><th>Output</th></tr></thead><tbody>{[["1. Demand", "Hazard / process flow cases", "Design flow (m³/h)"], ["2. Network model", "Pipe routing, lengths, fittings", "System curve"], ["3. Pump match", "Candidate curves", "Duty point & efficiency"], ["4. NPSH", "Suction layout, vapour pressure", "NPSHa > NPSHr margin"], ["5. Verification", "Velocities, pressures", "Sized pipes, datasheet"]].map((r) => <tr key={r[0]}>{r.map((c) => <td key={c}>{c}</td>)}</tr>)}</tbody></table></div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
