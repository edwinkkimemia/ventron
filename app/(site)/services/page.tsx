import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { ServiceCard } from "@/components/Cards";
import { getPublishedServices } from "@/lib/data";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Services", description: "Mechanical, oil & gas, LPG, fire protection, process & piping, consultancy, procurement, project management and QA/QC services.", path: "/services" });

export default async function ServicesPage() {
  const services = await getPublishedServices();
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white tracking-wide">Engineering Services</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Design, analysis, procurement and delivery — scoped clearly, documented thoroughly, built for operation.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Capabilities" title="Eight service lines, one accountable partner" />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.length ? services.map((s: any) => <ServiceCard key={s.slug} service={s} />) : <p className="text-charcoal-700">Services are being updated. Contact us for scope details.</p>}
          </div>
        </div>
      </section>
      <section className="bg-navy-900 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-white font-semibold max-w-2xl">One accountable partner from concept to commissioning — design, procurement, supervision and QA/QC under one roof. No finger-pointing between designer, supplier and installer.</p>
          <a href="/quote" className="bg-accent hover:bg-accent-dark text-white text-sm font-bold uppercase tracking-widest px-6 py-3 shrink-0 text-center">Discuss Your Project</a>
        </div>
      </section>
      <CTASection />
    </>
  );
}
