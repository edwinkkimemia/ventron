import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { whatsappDefault } from "@/lib/whatsapp";

export default function CTASection({ title, text }: { title?: string; text?: string }) {
  return (
    <section className="bg-accent relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-dark/60 via-transparent to-accent-dark/60" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-condensed text-3xl md:text-4xl font-semibold uppercase text-white tracking-wide">{title ?? "Stop Guessing. Get It Engineered."}</h2>
          <p className="mt-2 text-white/90 max-w-2xl">{text ?? "Send drawings, BOQs or site photos — get a scoped proposal with deliverables, timeline and fee within 2 business days."}</p>
        </div>
        <div className="flex flex-wrap gap-3 shrink-0">
          <Link href="/quote" className="bg-navy-950 text-white font-bold px-7 py-3.5 flex items-center gap-2 hover:bg-charcoal-900">Discuss Your Project <ArrowRight size={17} /></Link>
          <a href={whatsappDefault} target="_blank" className="border-2 border-white text-white font-bold px-7 py-3 hover:bg-white hover:text-accent">WhatsApp Us</a>
        </div>
      </div>
    </section>
  );
}
