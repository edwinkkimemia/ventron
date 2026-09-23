import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import ServiceForm from "@/components/admin/ServiceForm";

export default async function EditService({ params }: { params: { id: string } }) {
  let s: any = null;
  try { s = await prisma.service.findUnique({ where: { id: params.id } }); } catch {}
  if (!s) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit service" sub={s.name} action={<BtnLink href="/admin/services">← Back to list</BtnLink>} />
      <ServiceForm initial={s} />
    </div>
  );
}
