import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { prisma } from "@/lib/prisma";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";
import { MapPin, Briefcase } from "lucide-react";

export const metadata = baseMetadata({ title: "Careers", description: "Engineering roles, internships and graduate opportunities at Ventron Mechanical Systems Ltd.", path: "/careers" });

export default async function CareersPage() {
  let jobs: any[] = [];
  try { jobs = await prisma.job.findMany({ where: { published: true }, orderBy: { createdAt: "desc" } }); } catch {}
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Careers" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Careers</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Build industrial plants that matter. We hire engineers, technicians, interns and project support.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
          <SectionHeading kicker="Open roles" title="Available positions" text="Applications: full name, email, phone, CV, cover letter, optional LinkedIn. Files are stored securely and reviewed by our team." />
          <div className="mt-8 grid gap-4">
            {jobs.length ? jobs.map((j) => (
              <Link key={j.slug} href={`/careers/${j.slug}`} className="border border-steel-200 p-5 hover:border-navy-900 hover:shadow-md flex flex-wrap justify-between gap-3">
                <div><h2 className="font-condensed font-semibold uppercase text-navy-900">{j.title}</h2><p className="text-xs text-steel-500 mt-1 flex gap-3"><span className="flex gap-1 items-center"><MapPin size={13} />{j.location}</span><span className="flex gap-1 items-center"><Briefcase size={13} />{j.department} • {j.employmentType}</span></p></div>
                <span className="text-sm font-bold text-accent">View & apply →</span>
              </Link>
            )) : (
              <div className="border border-dashed border-steel-300 p-8 text-sm text-charcoal-700">
                No open roles published right now. We still welcome graduate engineer and internship expressions of interest via the <Link href="/contact" className="font-bold text-accent">contact form</Link>.
                <div className="mt-4 grid sm:grid-cols-3 gap-3">
                  {["Graduate Mechanical Engineer", "Site / Installation Technician", "Engineering Intern"].map((t) => <div key={t} className="border border-steel-200 p-4 font-semibold text-navy-900 text-sm">{t}<div className="text-xs font-normal text-steel-500">Expressions of interest welcome</div></div>)}
                </div>
              </div>
            )}
          </div>
          </div>
          <aside className="space-y-4 lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80" alt="Ventron engineers at work" className="h-64 w-full object-cover" loading="lazy" />
            <div className="bg-navy-900 p-6">
              <h3 className="font-condensed uppercase text-white font-semibold tracking-wide">Why engineers join Ventron</h3>
              <ul className="mt-3 space-y-2 text-sm text-steel-200">
                <li>▸ Real plant responsibility, early</li>
                <li>▸ Mentorship from senior engineers</li>
                <li>▸ Site exposure across Kenya & the region</li>
                <li>▸ Calculation-led, documented practice</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section className="bg-navy-950">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
          <SectionHeading dark kicker="Process" title="How hiring works" text="No black holes — every application is reviewed by an engineer, and every applicant hears back." />
          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {[["1. Apply", "CV plus a short note on the systems you work with best."], ["2. Technical review", "Your application is assessed by practising engineers, not software."], ["3. Interview & offer", "Technical discussion, site-day for site roles, then a clear offer."]].map(([t, d]) => (
              <div key={t} className="bg-white/5 border border-white/10 p-5"><h3 className="font-condensed font-semibold uppercase text-white">{t}</h3><p className="mt-1 text-sm text-steel-200">{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <CTASection title="Speculative applications welcome" text="Send your CV and a short note on the systems you work with best." />
    </>
  );
}
