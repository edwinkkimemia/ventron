"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar — collapses smoothly on scroll */}
      <div className={`bg-navy-950 text-steel-200 text-xs hidden md:block overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${scrolled ? "max-h-0 opacity-0" : "max-h-8 opacity-100"}`}>
        <div className="mx-auto max-w-7xl px-6 h-8 flex items-center justify-between">
          <span className="tracking-widest uppercase">Mechanical • Oil & Gas • LPG • Fire Protection — Kenya & East Africa</span>
          <span className="flex gap-4">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
            <span className="text-steel-500">|</span>
            <a href={siteConfig.phoneHref} className="hover:text-white font-semibold">{siteConfig.phone}</a>
          </span>
        </div>
      </div>
      {/* Main bar */}
      <div className="bg-white/95 backdrop-blur border-b border-steel-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between h-20">
          <Link href="/" className="flex items-center shrink-0" aria-label="Ventron Mechanical Systems Ltd — home">
            <Image src="/ventron-logo.png" alt="Ventron Mechanical Systems Ltd" width={320} height={133} className="h-14 md:h-16 w-auto" priority />
          </Link>
          <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-navy-900">
            <div className="relative group">
              <Link href="/services" className="flex items-center gap-1 hover:text-accent">Services <ChevronDown size={14} /></Link>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition absolute left-0 top-full pt-2">
                <div className="w-72 bg-white shadow-xl border border-steel-200 py-2">
                  {siteConfig.servicesMenu.map((s) => (
                    <Link key={s.href} href={s.href} className="block px-4 py-2.5 text-charcoal-800 hover:bg-steel-100 hover:text-navy-900 text-[13px]">{s.label}</Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/industries" className="hover:text-accent">Industries</Link>
            <Link href="/projects" className="hover:text-accent">Projects</Link>
            <Link href="/capabilities" className="hover:text-accent">Capabilities</Link>
            <Link href="/equipment" className="hover:text-accent">Equipment</Link>
            <Link href="/insights" className="hover:text-accent">Insights</Link>
            <Link href="/contact" className="hover:text-accent">Contact</Link>
          </nav>
          <div className="hidden lg:block">
            <Link href="/quote" className="bg-accent hover:bg-accent-dark text-white text-sm font-bold px-5 py-2.5 flex items-center gap-2">Discuss Your Project <ArrowRight size={15} /></Link>
          </div>
          <button className="lg:hidden text-navy-900 p-2" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white text-navy-900 max-h-[80vh] overflow-y-auto border-b border-steel-200 shadow-lg">
          <div className="px-5 py-4 flex flex-col gap-1 text-[15px] font-semibold">
            {siteConfig.nav.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2.5 border-b border-steel-200">{n.label}</Link>
            ))}
            <button onClick={() => setSvcOpen(!svcOpen)} className="flex justify-between items-center py-2.5 border-b border-steel-200">Services <ChevronDown size={16} /></button>
            {svcOpen && siteConfig.servicesMenu.map((s) => (
              <Link key={s.href} href={s.href} onClick={() => setOpen(false)} className="pl-4 py-2 text-sm text-charcoal-700">{s.label}</Link>
            ))}
            <Link href="/quote" onClick={() => setOpen(false)} className="mt-4 bg-accent text-white text-center font-bold px-5 py-3">Discuss Your Project</Link>
            <a href={siteConfig.phoneHref} className="mt-2 text-center text-sm font-bold text-navy-900 border border-steel-300 px-5 py-3">{siteConfig.phone}</a>
          </div>
        </div>
      )}
    </header>
  );
}
