import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import JobForm from "@/components/admin/JobForm";

export default async function EditJob({ params }: { params: { id: string } }) {
  let j: any = null;
  try { j = await prisma.job.findUnique({ where: { id: params.id } }); } catch {}
  if (!j) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit role" sub={j.title} action={<BtnLink href="/admin/jobs">← Back to list</BtnLink>} />
      <JobForm initial={j} />
    </div>
  );
}
