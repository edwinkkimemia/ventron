import { prisma } from "@/lib/prisma";
import { updateInquiryStatus } from "../actions";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST", "ARCHIVED"];

export default async function AdminInquiries() {
  let rows: any[] = [];
  try { rows = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 100 }); } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Enquiries</h1>
      <div className="mt-6 bg-white border border-steel-200 divide-y divide-steel-100">
        {rows.length ? rows.map((r) => (
          <div key={r.id} className="p-4 text-sm">
            <div className="flex flex-wrap justify-between gap-2"><strong>{r.name} — {r.company}</strong><span className="text-xs text-steel-500">{new Date(r.createdAt).toLocaleString()}</span></div>
            <div className="text-xs text-steel-500">{r.email} • {r.phone} • {r.service} • {r.industry} • {r.projectLocation}</div>
            <p className="mt-1.5 text-charcoal-700">{r.message}</p>
            <form action={updateInquiryStatus.bind(null, r.id)} className="mt-2 flex gap-2 items-center">
              <select name="status" defaultValue={r.status} className="border text-xs px-2 py-1.5" onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}>
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
              <button className="hidden">save</button>
              <span className="text-[11px] font-bold uppercase text-steel-500">Status: {r.status}</span>
            </form>
          </div>
        )) : <div className="p-6 text-sm">No enquiries yet.</div>}
      </div>
    </div>
  );
}
