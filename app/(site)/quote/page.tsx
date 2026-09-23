import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import { QuoteForm } from "@/components/Forms";
import { baseMetadata } from "@/lib/seo";

export const metadata = baseMetadata({ title: "Request a Quote", description: "Request engineering, procurement or project services — scope, drawings, BOQ and timeline.", path: "/quote" });

const STEPS = [
  ["1. Send scope", "Drawings, BOQs, photos or a plain description — whatever you have."],
  ["2. Scoped response", "Our engineers reply with scope, deliverables, timeline and fee."],
  ["3. Kick-off", "Site survey or data review, then design and delivery begin."],
];

export default function QuotePage() {
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Request a Quote" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Request a Quote</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Professional engineering enquiry — the more scope detail you share, the faster we respond accurately.</p>
        </div>
      </section>
      <section className="bg-steel-100/60">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SectionHeading kicker="Enquiry" title="Project enquiry form" text="Fields: name, company, contacts, location, industry, service, description, timeline, budget (optional), attachments & notes." />
            <div className="mt-6"><QuoteForm /></div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80" alt="Oil and gas terminal at night" className="h-52 w-full object-cover" loading="lazy" />
            <div className="bg-white border border-steel-200 p-6">
              <h2 className="font-condensed font-semibold uppercase text-navy-900 tracking-wide">What happens next</h2>
              <div className="mt-4 space-y-4">
                {STEPS.map(([t, d]) => (
                  <div key={t} className="border-l-[3px] border-l-accent pl-4"><div className="text-sm font-bold text-navy-900">{t}</div><p className="text-sm text-charcoal-700 mt-0.5">{d}</p></div>
                ))}
              </div>
              <p className="mt-4 text-xs text-steel-500">Typical first response: 1–2 business days for scoped enquiries with drawings or BOQs.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
