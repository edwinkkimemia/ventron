import { Card, Field, TextInput, TextArea, Select, Check, SubmitButton } from "./ui";
import RichText from "./RichText";
import ImageUpload from "./ImageUpload";
import { upsertProject } from "@/app/admin/actions";

export default function ProjectForm({ initial, industries, services }: { initial?: any; industries: any[]; services: any[] }) {
  const p = initial ?? {};
  return (
    <form action={upsertProject.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Title *"><TextInput name="title" required defaultValue={p.title ?? ""} placeholder="e.g. Firewater Hydraulic Study — Petroleum Terminal" /></Field>
            <Field label="Slug" hint="Auto-generated from title if left blank"><TextInput name="slug" defaultValue={p.slug ?? ""} placeholder="auto-from-title" /></Field>
          </div>
          <Field label="Excerpt *" hint="1–2 lines shown on cards and search results"><TextArea name="excerpt" required defaultValue={p.excerpt ?? ""} className="min-h-[80px]" /></Field>
          <Field label="Project overview *" hint="## Headings, - bullets and [links](/url) supported"><RichText name="description" defaultValue={p.description ?? ""} /></Field>
          <Field label="Client challenge"><RichText name="challenge" defaultValue={p.challenge ?? ""} /></Field>
          <Field label="Ventron solution"><RichText name="solution" defaultValue={p.solution ?? ""} /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Scope of work" hint="Use - bullets, one per line"><RichText name="scope" defaultValue={p.scope ?? ""} /></Field>
            <Field label="Engineering deliverables" hint="Use - bullets, one per line"><RichText name="deliverables" defaultValue={p.deliverables ?? ""} /></Field>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Publish</h3>
            <div className="flex gap-6"><Check name="published" defaultChecked={p.published ?? true} label="Published" /><Check name="featured" defaultChecked={p.featured ?? false} label="Featured" /></div>
            <SubmitButton>{initial ? "Save changes" : "Create project"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Featured image"><ImageUpload name="featuredImage" defaultValue={p.featuredImage ?? ""} folder="projects" /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Location"><TextInput name="location" defaultValue={p.location ?? "Kenya"} /></Field>
              <Field label="Year"><TextInput name="year" type="number" defaultValue={p.year ?? new Date().getFullYear()} /></Field>
            </div>
            <Field label="Client"><TextInput name="client" defaultValue={p.client ?? "Confidential Client"} /></Field>
            <Field label="Status">
              <Select name="status" defaultValue={p.status ?? "COMPLETED"}>
                {["COMPLETED", "ONGOING", "DESIGN", "CONCEPT"].map((s) => <option key={s}>{s}</option>)}
              </Select>
            </Field>
            <Field label="Industry">
              <Select name="industryId" defaultValue={p.industryId ?? ""}>
                <option value="">— None —</option>
                {industries.map((i: any) => <option key={i.id} value={i.id}>{i.name}</option>)}
              </Select>
            </Field>
            <Field label="Service">
              <Select name="serviceId" defaultValue={p.serviceId ?? ""}>
                <option value="">— None —</option>
                {services.map((s: any) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Select>
            </Field>
          </Card>
        </div>
      </div>
    </form>
  );
}
