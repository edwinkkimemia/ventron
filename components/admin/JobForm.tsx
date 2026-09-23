import { Card, Field, TextInput, Select, Check, SubmitButton } from "./ui";
import RichText from "./RichText";
import { upsertJob } from "@/app/admin/actions";

function dateVal(d: any) {
  if (!d) return "";
  try { return new Date(d).toISOString().slice(0, 10); } catch { return ""; }
}

export default function JobForm({ initial }: { initial?: any }) {
  const j = initial ?? {};
  return (
    <form action={upsertJob.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Job title *"><TextInput name="title" required defaultValue={j.title ?? ""} /></Field>
            <Field label="Slug" hint="Auto-generated if blank"><TextInput name="slug" defaultValue={j.slug ?? ""} /></Field>
          </div>
          <Field label="Role description *"><RichText name="description" defaultValue={j.description ?? ""} /></Field>
          <Field label="Requirements *"><RichText name="requirements" defaultValue={j.requirements ?? ""} /></Field>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Publish</h3>
            <Check name="published" defaultChecked={j.published ?? true} label="Open for applications" />
            <SubmitButton>{initial ? "Save changes" : "Create role"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Location"><TextInput name="location" defaultValue={j.location ?? "Nairobi, Kenya"} /></Field>
            <Field label="Department"><TextInput name="department" defaultValue={j.department ?? "Engineering"} /></Field>
            <Field label="Employment type">
              <Select name="employmentType" defaultValue={j.employmentType ?? "Full-time"}>
                {["Full-time", "Part-time", "Contract", "Internship"].map((t) => <option key={t}>{t}</option>)}
              </Select>
            </Field>
            <Field label="Closing date"><TextInput name="closingDate" type="date" defaultValue={dateVal(j.closingDate)} /></Field>
          </Card>
        </div>
      </div>
    </form>
  );
}
