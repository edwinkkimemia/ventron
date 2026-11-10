import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnLink, DeleteButton, BtnPrimary, Field, TextInput, SubmitButton } from "@/components/admin/ui";
import { deleteEquipment, deleteEquipmentCategory, upsertEquipmentCategory } from "../actions";

export default async function AdminEquipment() {
  let cats: any[] = [];
  let items: any[] = [];
  try {
    cats = await prisma.equipmentCategory.findMany({ orderBy: { order: "asc" }, include: { _count: { select: { equipment: true } } } });
    items = await prisma.equipment.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } });
  } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Equipment" sub={`${cats.length} categories • ${items.length} items`} action={<BtnPrimary href="/admin/equipment/items/new">+ New item</BtnPrimary>} />
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="p-5">
          <h2 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Categories</h2>
          <div className="mt-3 space-y-2">
            {cats.map((c) => (
              <div key={c.id} className="flex items-center justify-between gap-2 border border-steel-200 rounded-md px-3 py-2.5 text-sm">
                <span className="font-semibold text-navy-950">{c.name} <span className="font-normal text-steel-500">({c._count.equipment})</span></span>
                <DeleteButton action={deleteEquipmentCategory.bind(null, c.id)} label="×" />
              </div>
            ))}
          </div>
          <form action={upsertEquipmentCategory.bind(null, null)} className="mt-4 space-y-3 border-t border-steel-100 pt-4">
            <Field label="New category"><TextInput name="name" required placeholder="e.g. Valves" /></Field>
            <Field label="Description"><TextInput name="description" placeholder="Short description" /></Field>
            <SubmitButton>Add category</SubmitButton>
          </form>
        </Card>
        <Card className="lg:col-span-2">
          <div className="px-5 py-3 border-b border-steel-100 font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Items</div>
          <div className="divide-y divide-steel-100">
            {items.map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-navy-950">{e.name}</p>
                  <p className="text-xs text-steel-500 mt-0.5">{e.category?.name ?? "Uncategorised"}</p>
                </div>
                <Pill value={e.published} live="Live" />
                <div className="flex items-center gap-2">
                  <BtnLink href={`/admin/equipment/items/${e.id}/edit`}>Edit</BtnLink>
                  <DeleteButton action={deleteEquipment.bind(null, e.id)} />
                </div>
              </div>
            ))}
            {!items.length && <p className="px-5 py-6 text-sm text-steel-500">No equipment items yet.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
