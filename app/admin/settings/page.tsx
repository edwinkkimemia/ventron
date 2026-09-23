import { prisma } from "@/lib/prisma";
import { saveSetting, saveStatistic, deleteStatistic } from "../actions";

const KEYS = ["hero_title", "hero_subtitle", "contact_email", "contact_phone", "contact_address", "cta_title", "cta_text"];

async function getSettings() {
  try {
    const rows = await prisma.siteSetting.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch { return {}; }
}

export default async function AdminSettings() {
  const settings: Record<string, string> = await getSettings();
  let stats: any[] = [];
  try { stats = await prisma.statistic.findMany({ orderBy: { order: "asc" } }); } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Site content & statistics</h1>
      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="bg-white border p-5">
          <h2 className="font-bold text-sm uppercase tracking-widest">Content settings</h2>
          <div className="mt-3 space-y-3">
            {KEYS.map((k) => (
              <form key={k} action={saveSetting.bind(null, k, "")} className="hidden" />
            ))}
            {KEYS.map((k) => (
              <form key={k} action={async (fd: FormData) => { "use server"; const { saveSetting } = await import("../actions"); await saveSetting(k, String(fd.get("value"))); }} className="grid gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-steel-500">{k}</label>
                <div className="flex gap-2">
                  <input name="value" defaultValue={settings[k] ?? ""} className="flex-1 border px-3 py-2 text-sm" />
                  <button className="bg-navy-900 text-white text-xs font-bold px-4">Save</button>
                </div>
              </form>
            ))}
          </div>
        </div>
        <div className="bg-white border p-5">
          <h2 className="font-bold text-sm uppercase tracking-widest">Statistics (database-driven)</h2>
          <form action={saveStatistic} className="mt-3 flex gap-2">
            <input name="label" required placeholder="Label" className="flex-1 border px-3 py-2 text-sm" />
            <input name="value" required placeholder="Value" className="w-24 border px-3 py-2 text-sm" />
            <input name="suffix" placeholder="Suffix" className="w-20 border px-3 py-2 text-sm" />
            <button className="bg-accent text-white text-xs font-bold px-4">Add</button>
          </form>
          <div className="mt-4 divide-y">
            {stats.map((s) => (
              <div key={s.id} className="py-2.5 text-sm flex justify-between"><span><strong>{s.value}{s.suffix}</strong> — {s.label}</span>
                <form action={deleteStatistic.bind(null, s.id)}><button className="text-accent text-xs font-bold">Delete</button></form></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
