import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-steel-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="inline-block bg-white px-3 py-2">
            <Image src="/ventron-logo.png" alt="Ventron Mechanical Systems Ltd" width={276} height={115} className="h-14 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed">Engineering, procurement and project solutions for industrial, oil &amp; gas, LPG, fire protection and infrastructure projects across Kenya and East Africa.</p>
          <p className="mt-3 text-xs uppercase tracking-widest text-steel-400">{siteConfig.tagline}</p>
        </div>
        <div>
          <h4 className="font-condensed text-sm font-semibold uppercase tracking-widest text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {[["About", "/about"], ["Industries", "/industries"], ["Projects", "/projects"], ["Insights", "/insights"], ["Careers", "/careers"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-condensed text-sm font-semibold uppercase tracking-widest text-white">Services</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {siteConfig.servicesMenu.slice(0, 5).map((s) => (
              <li key={s.href}><Link href={s.href} className="hover:text-white">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-condensed text-sm font-semibold uppercase tracking-widest text-white">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" /> {siteConfig.address}</li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" /> <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a></li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" /> <a href={siteConfig.phoneHref} className="hover:text-white">{siteConfig.phone}</a></li>
            <li><a href="#" className="inline-flex items-center gap-2 hover:text-white"><Linkedin size={16} /> LinkedIn</a></li>
          </ul>
          <Link href="/quote" className="mt-5 inline-block bg-accent hover:bg-accent-dark text-white text-xs font-bold uppercase tracking-widest px-5 py-3">Discuss Your Project</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-5 flex flex-col md:flex-row justify-between gap-3 text-xs text-steel-400">
          <span>© {new Date().getFullYear()} Ventron Mechanical Systems Ltd. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
