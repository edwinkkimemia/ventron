import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as icons from "lucide-react";

const FALLBACK_IMG: Record<string, string> = {
  "mechanical-engineering": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
  "oil-gas-engineering": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
  "fire-protection-engineering": "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
  "process-piping-engineering": "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80",
};

export function imgFor(slug?: string | null, custom?: string | null) {
  if (custom) return custom;
  if (slug && FALLBACK_IMG[slug]) return FALLBACK_IMG[slug];
  return "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80";
}

export function ServiceCard({ service }: { service: any }) {
  const Icon = (icons as any)[service.icon] ?? (icons as any).Cog;
  return (
    <Link href={`/services/${service.slug}`} className="group bg-white border border-steel-200 hover:border-navy-900 hover:shadow-xl transition flex flex-col">
      <div className="relative h-44 overflow-hidden bg-navy-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgFor(service.slug, service.image)} alt={service.name} loading="lazy" className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
        <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white"><Icon size={18} /><span className="text-[11px] font-bold uppercase tracking-widest">Ventron / {String(service.order).padStart(2, "0")}</span></div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-condensed text-lg font-semibold uppercase tracking-wide text-navy-900">{service.name}</h3>
        <p className="mt-2 text-sm text-charcoal-700 leading-relaxed flex-1">{service.tagline ?? service.description?.slice(0, 120)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">View capability <ArrowUpRight size={16} /></span>
      </div>
    </Link>
  );
}

export function ProjectCard({ project }: { project: any }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group bg-navy-900 border border-white/10 hover:border-accent transition flex flex-col">
      <div className="relative h-52 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.featuredImage ?? "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80"} alt={project.title} loading="lazy" className="h-full w-full object-cover opacity-90 group-hover:scale-105 transition duration-500" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">{project.industry?.name ?? "Industrial"}</span>
          <span className="bg-navy-950/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">{project.year}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-condensed text-lg font-semibold uppercase text-white leading-snug">{project.title}</h3>
        <p className="mt-1 text-xs uppercase tracking-widest text-steel-300">{project.location} • {project.client}</p>
        <p className="mt-2 text-sm text-steel-200 line-clamp-2">{project.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white group-hover:text-accent-light">View project <ArrowRight size={15} /></span>
      </div>
    </Link>
  );
}

export function IndustryCard({ industry }: { industry: any }) {
  const imgs: Record<string, string> = {
    "oil-gas": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    lpg: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
    energy: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80",
  };
  return (
    <Link href="/industries" className="group relative h-64 overflow-hidden bg-navy-900 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={industry.image ?? imgs[industry.slug] ?? "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"} alt={industry.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-50 transition duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
      <div className="absolute bottom-0 p-5">
        <div className="h-[3px] w-8 bg-accent mb-2" />
        <h3 className="font-condensed text-xl font-semibold uppercase text-white">{industry.name}</h3>
        <p className="mt-1 text-sm text-steel-200 line-clamp-2">{industry.description}</p>
      </div>
    </Link>
  );
}
