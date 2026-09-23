import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, AutoSubmitSelect } from "@/components/admin/ui";
import { updateInquiryStatus } from "../actions";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST", "ARCHIVED"];

export default async function AdminInquiries() {
  let rows: any[] = [];
  try { rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 }); } catch {}
  const fresh = rows.filter((r) => r.status === "NEW").length;
  return (
    <div className="space-y-6">
      <PageHeader title="Enquiries" sub={`${rows.length} total • ${fresh} new — pipeline: New → Contacted → Quoted → Won/Lost`} />
      <div className="space-y-3">
        {rows.length ? rows.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy-950">{r.name} {r.company && <span className="font-normal text-steel-500">— {r.company}</span>}</p>
                <p className="text-xs text-steel-500 mt-0.5">{r.email}{r.phone ? ` • ${r.phone}` : ""} • {new Date(r.createdAt).toLocaleString()}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] font-bold uppercase tracking-wider text-steel-500">
                  {[r.service, r.industry, r.projectLocation].filter(Boolean).map((t) => <span key={t} className="bg-steel-100 rounded px-2 py-0.5">{t}</span>)}
                </div>
              </div>
              <form action={updateInquiryStatus.bind(null, r.id)} className="flex items-center gap-2">
                <Pill value={r.status} />
                <AutoSubmitSelect name="status" defaultValue={r.status} options={STATUSES} />
              </form>
            </div>
            <p className="mt-3 text-sm text-charcoal-700 leading-relaxed border-t border-steel-100 pt-3">{r.message}</p>
          </Card>
        )) : <Card className="p-10 text-center text-sm text-steel-500">No enquiries yet — contact form submissions land here.</Card>}
      </div>
    </div>
  );
}
