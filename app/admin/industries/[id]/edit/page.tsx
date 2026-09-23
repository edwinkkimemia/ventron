import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import IndustryForm from "@/components/admin/IndustryForm";

export default async function EditIndustry({ params }: { params: { id: string } }) {
  let v: any = null;
  try { v = await prisma.industry.findUnique({ where: { id: params.id } }); } catch {}
  if (!v) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit industry" sub={v.name} action={<BtnLink href="/admin/industries">← Back to list</BtnLink>} />
      <IndustryForm initial={v} />
    </div>
  );
}
