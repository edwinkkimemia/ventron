import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnLink, DeleteButton, BtnPrimary, EmptyState } from "@/components/admin/ui";
import { deleteProject, toggleProject } from "../actions";

export default async function AdminProjects() {
  let projects: any[] = [];
  try { projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, include: { industry: true } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Projects" sub={`${projects.length} case studies — featured items appear on the homepage`} action={<BtnPrimary href="/admin/projects/new">+ New project</BtnPrimary>} />
      {projects.length ? (
        <Card>
          <div className="divide-y divide-steel-100">
            {projects.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.featuredImage ? <img src={p.featuredImage} alt="" className="h-12 w-20 rounded object-cover border border-steel-200" /> : <div className="h-12 w-20 rounded bg-steel-100 grid place-items-center text-[10px] font-bold text-steel-400">NO IMG</div>}
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-navy-950">{p.title}</p>
                  <p className="text-xs text-steel-500 mt-0.5">/{p.slug} • {p.location} • {p.year} • {p.industry?.name ?? "No industry"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Pill value={p.published} live="Live" />
                  {p.featured && <Pill value="WON" />}
                </div>
                <div className="flex items-center gap-2">
                  <BtnLink href={`/admin/projects/${p.id}/edit`}>Edit</BtnLink>
                  <form action={toggleProject.bind(null, p.id, "featured")}><button className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md border border-steel-300 hover:border-navy-900">{p.featured ? "Unfeature" : "Feature"}</button></form>
                  <DeleteButton action={deleteProject.bind(null, p.id)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : <EmptyState title="No projects yet" sub="Create your first case study" action={<BtnPrimary href="/admin/projects/new">+ New project</BtnPrimary>} />}
    </div>
  );
}
