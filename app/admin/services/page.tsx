import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnLink, DeleteButton, BtnPrimary, EmptyState } from "@/components/admin/ui";
import { deleteService } from "../actions";

export default async function AdminServices() {
  let rows: any[] = [];
  try { rows = await prisma.service.findMany({ orderBy: { order: "asc" } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Services" sub={`${rows.length} service lines — order controls homepage display`} action={<BtnPrimary href="/admin/services/new">+ New service</BtnPrimary>} />
      {rows.length ? (
        <Card>
          <div className="divide-y divide-steel-100">
            {rows.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center gap-4 p-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy-950 font-condensed font-bold text-white">{String(s.order).padStart(2, "0")}</div>
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-navy-950">{s.name}</p>
                  <p className="text-xs text-steel-500 mt-0.5">/{s.slug} • {s.tagline ?? s.description?.slice(0, 80)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Pill value={s.published} live="Live" />
                  {s.featured && <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-accent/10 text-accent">★ Featured</span>}
                </div>
                <div className="flex items-center gap-2">
                  <BtnLink href={`/admin/services/${s.id}/edit`}>Edit</BtnLink>
                  <DeleteButton action={deleteService.bind(null, s.id)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : <EmptyState title="No services yet" action={<BtnPrimary href="/admin/services/new">+ New service</BtnPrimary>} />}
    </div>
  );
}
