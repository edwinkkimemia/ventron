import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import EquipmentForm from "@/components/admin/EquipmentForm";

export default async function NewEquipmentItem() {
  let categories: any[] = [];
  try { categories = await prisma.equipmentCategory.findMany({ orderBy: { order: "asc" } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="New equipment item" sub="Describe the item buyers can request" action={<BtnLink href="/admin/equipment">← Back to list</BtnLink>} />
      <EquipmentForm categories={categories} />
    </div>
  );
}
