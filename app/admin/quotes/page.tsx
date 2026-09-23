import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, AutoSubmitSelect } from "@/components/admin/ui";
import { updateQuoteStatus } from "../actions";

export default async function AdminQuotes() {
  let rows: any[] = [];
  try { rows = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { attachments: true } }); } catch {}
  const fresh = rows.filter((r) => r.status === "NEW").length;
  return (
    <div className="space-y-6">
      <PageHeader title="Quote requests" sub={`${rows.length} total • ${fresh} new — drawings and BOQs attached below each request`} />
      <div className="space-y-3">
        {rows.length ? rows.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-navy-950">{r.name} {r.company && <span className="font-normal text-steel-500">— {r.company}</span>}</p>
                <p className="text-xs text-steel-500 mt-0.5">{r.email} • {r.phone} • {new Date(r.createdAt).toLocaleString()}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] font-bold uppercase tracking-wider text-steel-500">
                  {[r.service, r.industry, r.location, r.timeline && `Timeline: ${r.timeline}`, r.budget && `Budget: ${r.budget}`].filter(Boolean).map((t) => <span key={t as string} className="bg-steel-100 rounded px-2 py-0.5">{t}</span>)}
                </div>
              </div>
              <form action={updateQuoteStatus.bind(null, r.id)} className="flex items-center gap-2">
                <Pill value={r.status} />
                <AutoSubmitSelect name="status" defaultValue={r.status} options={["NEW", "CONTACTED", "QUOTED", "WON", "LOST", "ARCHIVED"]} />
              </form>
            </div>
            <p className="mt-3 text-sm text-charcoal-700 leading-relaxed border-t border-steel-100 pt-3">{r.description}</p>
            {r.attachments?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {r.attachments.map((a: any) => (
                  <a key={a.id} href={a.fileUrl} target="_blank" className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-900 bg-steel-100 hover:bg-steel-200 rounded px-2.5 py-1.5">📎 {a.fileName} ({(a.size / 1024).toFixed(0)} KB)</a>
                ))}
              </div>
            )}
          </Card>
        )) : <Card className="p-10 text-center text-sm text-steel-500">No quote requests yet.</Card>}
      </div>
    </div>
  );
}
