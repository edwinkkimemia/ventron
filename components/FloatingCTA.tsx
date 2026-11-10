"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappFor } from "@/lib/whatsapp";

export default function FloatingCTA() {
  const pathname = usePathname() ?? "/";
  const wa = whatsappFor(pathname);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2.5 items-end">
      <Link href="/quote" className="hidden sm:flex items-center gap-2 bg-navy-950 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 shadow-xl hover:bg-navy-800 border border-white/10">
        Discuss Your Project <ArrowRight size={14} />
      </Link>
      {/* Mobile: icon only */}
      <a href={wa} target="_blank" rel="noopener" aria-label="Chat to Ventron on WhatsApp" className="sm:hidden grid place-items-center p-3.5 rounded-full bg-[#25D366] text-white shadow-xl hover:brightness-95">
        <WhatsAppIcon size={24} />
      </a>
      {/* Desktop: labelled pill */}
      <a href={wa} target="_blank" rel="noopener" aria-label="Chat to Ventron on WhatsApp" className="hidden sm:flex items-center gap-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-widest px-5 py-3 shadow-xl hover:brightness-95">
        <WhatsAppIcon size={15} /> WhatsApp
      </a>
    </div>
  );
}
