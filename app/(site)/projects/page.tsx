import SectionHeading from "@/components/SectionHeading";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { ProjectCard } from "@/components/Cards";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PROJECTS, toCardProject } from "@/lib/projects-fallback";
import { baseMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = baseMetadata({ title: "Projects", description: "Firewater studies, LPG design, tank farm piping, process installations — searchable project portfolio.", path: "/projects" });

const FILTERS = ["All", "Oil & Gas", "Fire Protection", "LPG", "Mechanical", "Industrial", "Consultancy", "Procurement"];

export default async function ProjectsPage({ searchParams }: { searchParams: { f?: string } }) {
  const f = searchParams?.f ?? "All";
  let projects: any[] = [];
  try {
    projects = await prisma.project.findMany({ where: { published: true, ...(f !== "All" ? { industry: { name: { contains: f, mode: "insensitive" } } } : {}) }, include: { industry: true }, orderBy: { year: "desc" } });
  } catch {}
  if (!projects.length) {
    const all = FALLBACK_PROJECTS.map(toCardProject);
    projects = f === "All" ? all : all.filter((p) => [p.industryName, p.serviceName, p.title, p.excerpt].join(" ").toLowerCase().includes(f.toLowerCase()));
  }
  return (
    <>
      <section className="bg-navy-950 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/hero.png" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects" }]} />
          <h1 className="font-condensed mt-4 text-4xl md:text-5xl font-semibold uppercase text-white">Project Portfolio</h1>
          <p className="mt-3 max-w-2xl text-steel-200">Filter by discipline. Detailed case studies include challenge, solution, scope and deliverables.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {FILTERS.map((x) => (
              <Link key={x} href={x === "All" ? "/projects" : `/projects?f=${encodeURIComponent(x)}`} className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border ${f === x ? "bg-accent border-accent text-white" : "border-white/25 text-steel-200 hover:border-white"}`}>{x}</Link>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
          <SectionHeading kicker="Portfolio" title={f === "All" ? "All projects" : f} />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.length ? projects.map((p) => <ProjectCard key={p.slug} project={p} />) : (
              <div className="col-span-full border border-dashed border-steel-300 p-10 text-center text-sm text-charcoal-700">
                No projects match this filter. <Link href="/projects" className="font-bold text-accent">View the full portfolio</Link> or <Link href="/quote" className="font-bold text-accent">discuss a similar scope</Link>.
              </div>
            )}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
