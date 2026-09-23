import { prisma } from "@/lib/prisma";
import { updateQuoteStatus } from "../actions";

export default async function AdminQuotes() {
  let rows: any[] = [];
  try { rows = await prisma.quoteRequest.findMany({ orderBy: { createdAt: "desc" }, take: 100, include: { attachments: true } }); } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Quote requests</h1>
      <div className="mt-6 bg-white border border-steel-200 divide-y divide-steel-100">
        {rows.length ? rows.map((r) => (
          <div key={r.id} className="p-4 text-sm">
            <div className="flex flex-wrap justify-between gap-2"><strong>{r.name} — {r.service}</strong><span className="text-xs text-steel-500">{new Date(r.createdAt).toLocaleString()}</span></div>
            <div className="text-xs text-steel-500">{r.email} • {r.phone} • {r.location} • {r.industry} • Timeline: {r.timeline} • Budget: {r.budget}</div>
            <p className="mt-1.5 text-charcoal-700">{r.description}</p>
            {r.attachments?.length > 0 && <div className="text-xs mt-1">Attachments: {r.attachments.map((a: any) => a.fileName).join(", ")}</div>}
            <form action={updateQuoteStatus.bind(null, r.id)} className="mt-2 flex gap-2 items-center">
              <select name="status" defaultValue={r.status} className="border text-xs px-2 py-1.5" onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}>
                {["NEW", "CONTACTED", "QUOTED", "WON", "LOST", "ARCHIVED"].map((s) => <option key={s}>{s}</option>)}
              </select>
              <span className="text-[11px] font-bold uppercase text-steel-500">Status: {r.status}</span>
            </form>
          </div>
        )) : <div className="p-6 text-sm">No quote requests yet.</div>}
      </div>
    </div>
  );
}
