import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import EquipmentForm from "@/components/admin/EquipmentForm";

export default async function EditEquipmentItem({ params }: { params: { id: string } }) {
  let e: any = null, categories: any[] = [];
  try {
    [e, categories] = await Promise.all([
      prisma.equipment.findUnique({ where: { id: params.id } }),
      prisma.equipmentCategory.findMany({ orderBy: { order: "asc" } }),
    ]);
  } catch {}
  if (!e) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit equipment" sub={e.name} action={<BtnLink href="/admin/equipment">← Back to list</BtnLink>} />
      <EquipmentForm initial={e} categories={categories} />
    </div>
  );
}
