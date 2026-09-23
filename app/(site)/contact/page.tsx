import Breadcrumb from "@/components/Breadcrumb";
import SectionHeading from "@/components/SectionHeading";
import CTASection from "@/components/CTASection";
import { ContactForm } from "@/components/Forms";
import { siteConfig } from "@/config/site";
import { baseMetadata } from "@/lib/seo";
import { Mail, Phone, MapPin, Clock, FileCheck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappDefault } from "@/lib/whatsapp";

export const metadata = baseMetadata({ title: "Contact", description: "Contact Ventron Mechanical Systems Ltd in Nairobi, Kenya — engineering enquiries, procurement and project support.", path: "/contact" });

const CHANNELS = [
  { icon: MapPin, title: "Visit / Site", lines: ["Nairobi, Kenya", "Project sites across East Africa"] },
  { icon: Mail, title: "Email", lines: [siteConfig.email, "Enquiries & proposals"] },
  { icon: Phone, title: "Phone", lines: [siteConfig.phone, "Mon–Fri, 8:00–17:00 EAT"] },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Contact Engineering</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Tell us about your plant, system or project — we respond with scoped next steps within 2 business days.</p>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="bg-white border-b border-steel-200">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHANNELS.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-3 border border-steel-200 p-5">
              <Icon size={20} className="text-accent shrink-0 mt-0.5" />
              <div>
                <h2 className="font-condensed font-semibold uppercase text-navy-900 text-sm tracking-wide">{title}</h2>
                {lines.map((l) => <p key={l} className="text-sm text-charcoal-700 mt-0.5">{l}</p>)}
              </div>
            </div>
          ))}
          <a href={whatsappDefault} target="_blank" className="flex gap-3 bg-[#25D366] p-5 hover:brightness-95 transition">
            <WhatsAppIcon size={20} className="text-white shrink-0 mt-0.5" />
            <div>
              <h2 className="font-condensed font-semibold uppercase text-white text-sm tracking-wide">WhatsApp</h2>
              <p className="text-sm text-white/90 mt-0.5">Fastest for site photos & drawings</p>
            </div>
          </a>
        </div>
      </section>

      {/* FORM + RAIL */}
      <section className="bg-steel-100/60">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <SectionHeading kicker="Send an enquiry" title="Tell us about your project" text="The more scope detail you share — drawings, BOQs, photos — the faster and more accurately we respond." />
            <div className="mt-6"><ContactForm /></div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80" alt="Industrial facility served by Ventron" className="h-44 w-full object-cover" loading="lazy" />
            <div className="bg-navy-950 p-6">
              <h3 className="font-condensed uppercase text-white font-semibold tracking-wide flex items-center gap-2"><Clock size={16} /> Response promise</h3>
              <p className="mt-2 text-sm text-steel-200 leading-relaxed">Scoped enquiries with drawings or BOQs get a proposal with deliverables, timeline and fee <strong className="text-white">within 2 business days</strong>.</p>
            </div>
            <div className="bg-white border border-steel-200 p-6">
              <h3 className="font-condensed uppercase text-navy-900 font-semibold tracking-wide flex items-center gap-2"><FileCheck size={16} className="text-accent" /> Include for fastest reply</h3>
              <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
                {["Site location and facility type", "Drawings, BOQ or equipment list", "Photos of existing plant", "Target timeline and budget range"].map((x) => (
                  <li key={x} className="flex gap-2"><span className="text-accent font-bold">▸</span> {x}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-steel-200 p-6 text-sm text-charcoal-700 leading-relaxed">
              <strong className="text-navy-900 font-condensed uppercase tracking-wide">Service region</strong>
              <p className="mt-1">Nairobi HQ with delivery across Kenya and East Africa — Mombasa, Nakuru, Eldoret, Thika and regional industrial sites.</p>
            </div>
          </aside>
        </div>
      </section>

      <CTASection title="Prefer to talk it through?" text="Call us directly or start a WhatsApp chat — an engineer will pick it up." />
    </>
  );
}
