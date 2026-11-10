import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Field, TextInput, SubmitButton, DeleteButton } from "@/components/admin/ui";
import { saveSetting, saveStatistic, deleteStatistic } from "../actions";

const FIELDS: [string, string, string][] = [
  ["hero_title", "Hero title", "Homepage headline"],
  ["hero_subtitle", "Hero subtitle", "Supporting line under the headline"],
  ["contact_email", "Contact email", "Shown site-wide"],
  ["contact_phone", "Contact phone", "Shown site-wide"],
  ["contact_address", "Address", "Short location line"],
  ["cta_title", "CTA title", "Default call-to-action band"],
  ["cta_text", "CTA text", "Default call-to-action copy"],
];

async function getSettings() {
  try {
    const rows = await prisma.siteSetting.findMany();
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  } catch { return {} as Record<string, string>; }
}

export default async function AdminSettings() {
  const settings = await getSettings();
  let stats: any[] = [];
  try { stats = await prisma.statistic.findMany({ orderBy: { order: "asc" } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Site content & statistics" sub="Hero copy, contact details, CTA bands and homepage numbers — edits go live immediately" />
      <div className="grid lg:grid-cols-2 gap-6 items-start">
        <Card className="p-6">
          <h2 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Content settings</h2>
          <div className="mt-4 space-y-4">
            {FIELDS.map(([key, label, hint]) => (
              <form key={key} action={async (fd: FormData) => { "use server"; const { saveSetting } = await import("../actions"); await saveSetting(key, String(fd.get("value") ?? "")); }}>
                <Field label={label} hint={hint}>
                  <div className="flex gap-2">
                    <TextInput name="value" defaultValue={settings[key] ?? ""} />
                    <button className="shrink-0 bg-navy-900 text-white text-xs font-bold uppercase tracking-widest px-4 rounded-md hover:bg-navy-800">Save</button>
                  </div>
                </Field>
              </form>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Statistics <span className="text-steel-400 font-sans normal-case tracking-normal font-normal">(database-driven homepage numbers)</span></h2>
          <form action={saveStatistic} className="mt-4 grid grid-cols-[1fr_90px_70px_auto] gap-2">
            <TextInput name="label" required placeholder="Label" />
            <TextInput name="value" required placeholder="Value" />
            <TextInput name="suffix" placeholder="+" />
            <button className="bg-accent text-white text-xs font-bold uppercase tracking-widest px-4 rounded-md hover:bg-accent-dark">Add</button>
          </form>
          <div className="mt-4 divide-y divide-steel-100">
            {stats.map((s) => (
              <div key={s.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                <span><strong className="font-condensed text-lg text-navy-950">{s.value}{s.suffix}</strong> <span className="text-steel-500">— {s.label}</span></span>
                <DeleteButton action={deleteStatistic.bind(null, s.id)} label="×" />
              </div>
            ))}
            {!stats.length && <p className="py-4 text-sm text-steel-500">No statistics yet — add the first above.</p>}
          </div>
        </Card>
      </div>
    </div>
  );
}
