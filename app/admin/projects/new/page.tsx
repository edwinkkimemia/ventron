import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function NewProject() {
  let industries: any[] = [], services: any[] = [];
  try { [industries, services] = await Promise.all([prisma.industry.findMany({ orderBy: { order: "asc" } }), prisma.service.findMany({ orderBy: { order: "asc" } })]); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="New project" sub="Full case study with challenge, solution, scope and deliverables" action={<BtnLink href="/admin/projects">← Back to list</BtnLink>} />
      <ProjectForm industries={industries} services={services} />
    </div>
  );
}
