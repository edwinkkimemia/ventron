import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import ProjectForm from "@/components/admin/ProjectForm";

export default async function EditProject({ params }: { params: { id: string } }) {
  let p: any = null, industries: any[] = [], services: any[] = [];
  try {
    [p, industries, services] = await Promise.all([
      prisma.project.findUnique({ where: { id: params.id } }),
      prisma.industry.findMany({ orderBy: { order: "asc" } }),
      prisma.service.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {}
  if (!p) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit project" sub={p.title} action={<BtnLink href="/admin/projects">← Back to list</BtnLink>} />
      <ProjectForm initial={p} industries={industries} services={services} />
    </div>
  );
}
