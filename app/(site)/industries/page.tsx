import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { getIndustries } from "@/lib/data";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Industries", description: "Oil & gas, LPG, energy, manufacturing, petroleum storage, commercial infrastructure and utilities — industry-specific engineering.", path: "/industries" });

const IMAGES: Record<string, string> = {
  "oil-gas": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  lpg: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
  energy: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  manufacturing: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
  "petroleum-storage": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80",
  "commercial-infrastructure": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  utilities: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
  "industrial-processing": "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
};

const DEFAULT_IMG = "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80";

export default async function IndustriesPage() {
  const industries = await getIndustries();
  const list = industries.length ? industries : [
    { name: "Oil & Gas", slug: "oil-gas", description: "Terminals, piping, utilities.", challenges: "Safe containment, reliable transfer, fire protection.", systems: "Tank farms, loading racks, process piping, pumps." },
    { name: "LPG", slug: "lpg", description: "Storage, filling, piping and safety systems.", challenges: "Leak prevention, pressure control, emergency response.", systems: "Vessel layout, filling manifolds, piping, fire interface." },
    { name: "Energy", slug: "energy", description: "Generation support, renewables integration, utility networks.", challenges: "Plant availability, utility reliability.", systems: "Cooling, fuel handling, fire protection, pumping." },
    { name: "Manufacturing", slug: "manufacturing", description: "Steam, compressed air, process water, equipment integration.", challenges: "Uptime, utility cost, expansion tie-ins.", systems: "Boiler/steam, air, water, process piping." },
    { name: "Petroleum Storage", slug: "petroleum-storage", description: "Depots and terminals: transfer piping, loading racks, firewater.", challenges: "Throughput, loss control, audit compliance.", systems: "Transfer piping, loading, tank gauging interfaces, firewater." },
    { name: "Commercial Infrastructure", slug: "commercial-infrastructure", description: "Fire protection, booster and transfer pumping for developments.", challenges: "Code compliance, commissioning evidence.", systems: "Hydrants, hose reels, booster sets, detection interfaces." },
    { name: "Utilities", slug: "utilities", description: "Water, booster, firewater networks for campuses and utilities.", challenges: "Pressure management, continuity of supply.", systems: "Booster stations, storage, distribution, firewater." },
    { name: "Industrial Processing", slug: "industrial-processing", description: "Process piping, equipment integration, plant utilities.", challenges: "Process stability, hygiene/safety zoning.", systems: "Process piping, skids, utilities, drains and vents." },
  ];
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Industries We Serve</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Each industry: challenges, relevant services, typical systems and Ventron capabilities.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid md:grid-cols-2 gap-5">
          {list.map((ind: any) => (
            <article key={ind.slug} className="border border-steel-200 border-t-4 border-t-accent bg-white hover:shadow-lg transition overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ind.image ?? IMAGES[ind.slug] ?? DEFAULT_IMG} alt={`${ind.name} industrial plant`} className="h-48 w-full object-cover" loading="lazy" />
              <div className="p-6">
                <h2 className="font-condensed text-xl font-semibold uppercase text-navy-900">{ind.name}</h2>
                <p className="mt-2 text-sm text-charcoal-700 leading-relaxed">{ind.description}</p>
                {ind.challenges && <p className="mt-2 text-sm text-charcoal-700"><strong className="text-navy-900">Challenges:</strong> {ind.challenges}</p>}
                {ind.systems && <p className="mt-1 text-sm text-charcoal-700"><strong className="text-navy-900">Typical systems:</strong> {ind.systems}</p>}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
