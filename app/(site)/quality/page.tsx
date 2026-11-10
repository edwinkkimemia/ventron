import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Quality Assurance", description: "Design review, documentation control, inspection, testing, material verification and commissioning checks.", path: "/quality" });

const STAGES = [
  ["Design checking", "Independent review of calculations, layouts and datasheets before issue — errors are cheapest on screen."],
  ["Document control", "Revision discipline on P&IDs, isometrics and specs so construction always builds from the current issue."],
  ["Material verification", "Mill certs, ratings and specification compliance checked on delivery, before installation."],
  ["Installation inspection", "Line walks, support checks, flange and weld verification against isometrics."],
  ["Testing & witnessing", "Hydrotest, flushing, flow tests and loop checks with recorded, traceable results."],
  ["Commissioning checks", "Pre-startup punch lists, cause-and-effect verification and handover documentation."],
];

export default function QualityPage() {
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Quality" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Quality Assurance</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Checked designs, traceable documents, verified installations.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-3">
            <SectionHeading kicker="QA/QC" title="What quality means at Ventron" text="Six control stages from calculation to commissioning — each with records your auditors can follow." />
            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              {STAGES.map(([t, d], i) => (
                <div key={t} className="border border-steel-200 p-4">
                  <div className="flex gap-3 items-baseline"><span className="font-condensed font-bold text-accent">{String(i + 1).padStart(2, "0")}</span><span className="text-sm font-bold text-navy-900 uppercase font-condensed tracking-wide">{t}</span></div>
                  <p className="mt-1.5 text-sm text-charcoal-700">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80" alt="Inspection of industrial piping installation" className="h-72 w-full object-cover" />
            <div className="border border-steel-200 border-l-4 border-l-accent p-5 text-sm text-charcoal-700 leading-relaxed">
              <strong className="text-navy-900">Technical compliance, evidenced.</strong> Inspection records, test certificates and punch-list close-outs form the handover dossier — the package insurers, auditors and your operations team rely on.
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
