import { prisma } from "@/lib/prisma";
import { Card, PageHeader, BtnLink, DeleteButton, BtnPrimary, EmptyState } from "@/components/admin/ui";
import { deleteIndustry } from "../actions";

export default async function AdminIndustries() {
  let rows: any[] = [];
  try { rows = await prisma.industry.findMany({ orderBy: { order: "asc" } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Industries" sub={`${rows.length} industry entries`} action={<BtnPrimary href="/admin/industries/new">+ New industry</BtnPrimary>} />
      {rows.length ? (
        <Card>
          <div className="divide-y divide-steel-100">
            {rows.map((v) => (
              <div key={v.id} className="flex flex-wrap items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {v.image ? <img src={v.image} alt="" className="h-12 w-20 rounded object-cover border border-steel-200" /> : <div className="h-12 w-20 rounded bg-steel-100 grid place-items-center text-[10px] font-bold text-steel-400">NO IMG</div>}
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-navy-950">{v.name}</p>
                  <p className="text-xs text-steel-500 mt-0.5 line-clamp-1">/{v.slug} • {v.description?.slice(0, 100)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <BtnLink href={`/admin/industries/${v.id}/edit`}>Edit</BtnLink>
                  <DeleteButton action={deleteIndustry.bind(null, v.id)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : <EmptyState title="No industries yet" action={<BtnPrimary href="/admin/industries/new">+ New industry</BtnPrimary>} />}
    </div>
  );
}
