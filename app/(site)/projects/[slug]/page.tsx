import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { ProjectCard } from "@/components/Cards";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PROJECTS, toCardProject } from "@/lib/projects-fallback";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";

function fallbackBySlug(slug: string) {
  const f = FALLBACK_PROJECTS.find((x) => x.slug === slug);
  return f ? toCardProject(f) : null;
}

function paragraphs(text: string) {
  return text.split("\n\n").map((t) => t.trim()).filter(Boolean);
}

function ListOrText({ text }: { text: string }) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  if (lines.length > 1 && lines.every((l) => l.startsWith("- "))) {
    return <ul>{lines.map((l, i) => <li key={i}>{l.replace(/^-+\s*/, "")}</li>)}</ul>;
  }
  return <>{paragraphs(text).map((t, i) => <p key={i}>{t}</p>)}</>;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const p = await prisma.project.findUnique({ where: { slug: params.slug } });
    if (p) return baseMetadata({ title: p.title, description: p.excerpt, path: `/projects/${p.slug}`, image: p.featuredImage ?? undefined });
  } catch {}
  const f = fallbackBySlug(params.slug);
  if (f) return baseMetadata({ title: f.title, description: f.excerpt, path: `/projects/${f.slug}`, image: f.featuredImage });
  return baseMetadata({ title: "Project", description: "Ventron project case study.", path: `/projects/${params.slug}` });
}

export default async function ProjectDetail({ params }: { params: { slug: string } }) {
  let p: any = null;
  try {
    p = await prisma.project.findUnique({ where: { slug: params.slug }, include: { industry: true, service: true, images: { orderBy: { order: "asc" } } } });
  } catch {}
  if (!p) p = fallbackBySlug(params.slug);
  if (!p) notFound();
  let related: any[] = [];
  try {
    related = await prisma.project.findMany({ where: { published: true, slug: { not: p.slug } }, take: 3, include: { industry: true } });
  } catch {}
  if (!related.length) {
    related = FALLBACK_PROJECTS.filter((r) => r.slug !== p.slug && (r.industrySlug === (p as any).industrySlug || r.serviceSlug === (p as any).serviceSlug)).slice(0, 3).map(toCardProject);
    if (!related.length) related = FALLBACK_PROJECTS.filter((r) => r.slug !== p.slug).slice(0, 3).map(toCardProject);
  }

  return (
    <>
      <section className="relative bg-navy-950 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.featuredImage ?? "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1600&q=80"} alt={p.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: p.title }]} />
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-widest">
            <span className="bg-accent text-white px-2.5 py-1">{p.industry?.name ?? "Industrial"}</span>
            <span className="bg-white/10 text-white px-2.5 py-1 border border-white/20">{p.location}</span>
            <span className="bg-white/10 text-white px-2.5 py-1 border border-white/20">{p.year}</span>
            <span className="bg-white/10 text-white px-2.5 py-1 border border-white/20">{p.status}</span>
          </div>
          <h1 className="font-condensed mt-4 text-3xl md:text-5xl font-semibold uppercase text-white max-w-4xl">{p.title}</h1>
          <p className="mt-3 text-steel-200 max-w-2xl">{p.excerpt}</p>
          <p className="mt-2 text-xs uppercase tracking-widest text-steel-400">Client: {p.client} {p.service ? `• Service: ${p.service.name}` : ""}</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 prose-eng">
            <h2>Project overview</h2><ListOrText text={p.description} />
            {p.challenge && (<><h2>Client challenge</h2><ListOrText text={p.challenge} /></>)}
            {p.solution && (<><h2>Ventron solution</h2><ListOrText text={p.solution} /></>)}
            {p.scope && (<><h2>Scope of work</h2><ListOrText text={p.scope} /></>)}
            {p.deliverables && (<><h2>Engineering deliverables</h2><ListOrText text={p.deliverables} /></>)}
            {p.images?.length > 0 && (
              <><h2>Gallery</h2><div className="grid sm:grid-cols-2 gap-4 not-prose">{p.images.map((im: any) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={im.id} src={im.imageUrl} alt={im.altText ?? p.title} className="h-56 w-full object-cover border border-steel-200" loading="lazy" />
              ))}</div></>
            )}
          </div>
          <aside className="space-y-4">
            <div className="border border-steel-200">
              <div className="bg-navy-900 px-5 py-3 font-condensed uppercase text-white text-sm tracking-widest">Project data</div>
              <dl className="p-5 text-sm space-y-2.5">
                {[["Location", p.location], ["Client", p.client], ["Year", String(p.year)], ["Industry", p.industry?.name ?? "—"], ["Service", p.service?.name ?? "—"], ["Status", p.status]].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-steel-100 pb-2"><dt className="text-steel-500 uppercase text-xs font-bold tracking-widest">{k}</dt><dd className="font-semibold text-navy-900 text-right">{v}</dd></div>
                ))}
              </dl>
            </div>
            <div className="bg-accent p-6 text-white">
              <h3 className="font-condensed uppercase font-semibold">Similar scope in mind?</h3>
              <p className="text-sm mt-1 text-white/90">Send drawings or a scope note for a scoped response.</p>
              <Link href="/quote" className="mt-3 inline-block bg-navy-950 px-5 py-2.5 text-sm font-bold uppercase tracking-widest">Request a quote</Link>
            </div>
          </aside>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-steel-100/60 border-t border-steel-200">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-12">
            <h2 className="font-condensed text-2xl font-semibold uppercase text-navy-900">Related projects</h2>
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{related.map((r) => <ProjectCard key={r.slug} project={r} />)}</div>
          </div>
        </section>
      )}
      <CTASection />
    </>
  );
}
