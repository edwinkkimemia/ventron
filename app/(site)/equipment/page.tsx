import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = baseMetadata({ title: "Equipment & Procurement", description: "Firewater pumps, process pumps, fire protection equipment, valves, piping components and LPG equipment — sourced and verified.", path: "/equipment" });

const CAT_IMAGES: Record<string, string> = {
  pumps: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
  "fire-protection-equipment": "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
  "mechanical-equipment": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80",
  "lpg-equipment": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
};

export default async function EquipmentPage() {
  let cats: any[] = [];
  try { cats = await prisma.equipmentCategory.findMany({ include: { equipment: { where: { published: true } } }, orderBy: { order: "asc" } }); } catch {}
  const fallback = [
    { name: "Pumps", slug: "pumps", description: "Firewater, process, transfer and booster pumps with sizing support.", equipment: [{ name: "Diesel Fire Pump Set", slug: "diesel", description: "Diesel-driven packages sized to hydraulic demand." }, { name: "Electric Fire Pump Set", slug: "electric", description: "Duty/standby electric packages." }, { name: "Jockey Pump Package", slug: "jockey", description: "Pressure maintenance packages." }] },
    { name: "Fire Protection Equipment", slug: "fire", description: "Hydrants, monitors, foam equipment, valves, hose systems.", equipment: [] },
    { name: "Mechanical Equipment", slug: "mech", description: "Valves, piping components, tanks, accessories.", equipment: [] },
    { name: "LPG Equipment", slug: "lpg-eq", description: "Vessels, vaporisers, piping, safety devices.", equipment: [] },
  ];
  const list = cats.length ? cats : fallback;
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Equipment" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Equipment & Procurement</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Specified to duty, verified on delivery. No prices listed — request a quote for project pricing.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 space-y-8">
          {list.map((c: any) => (
            <div key={c.slug} className="border border-steel-200 overflow-hidden">
              <div className="flex flex-wrap justify-between items-center gap-3 bg-navy-900 pl-0 pr-5 py-0">
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.image ?? CAT_IMAGES[c.slug] ?? CAT_IMAGES.pumps} alt={c.name} loading="lazy" className="h-[76px] w-32 object-cover hidden sm:block" />
                  <div className="py-4 pl-4 sm:pl-0"><h2 className="font-condensed uppercase text-white font-semibold">{c.name}</h2><p className="text-xs text-steel-300">{c.description}</p></div>
                </div>
                <Link href="/quote" className="bg-accent text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 hover:bg-accent-dark my-3">Request a Quote</Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-200">
                {c.equipment?.length ? c.equipment.map((e: any) => (
                  <div key={e.slug} className="bg-white p-5"><h3 className="font-semibold text-navy-900">{e.name}</h3><p className="text-sm text-charcoal-700 mt-1">{e.description}</p></div>
                )) : <div className="bg-white p-5 text-sm text-charcoal-700 col-span-full">Full range available on enquiry — send your BOQ or datasheet for sourcing and verification.</div>}
              </div>
            </div>
          ))}
          <SectionHeading kicker="Process" title="How procurement works" text="Enquiry → datasheet & duty confirmation → sourcing & technical comparison → client approval → supply, inspection and documentation." />
        </div>
      </section>
      <CTASection />
    </>
  );
}
