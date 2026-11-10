import { Card, Field, TextInput, TextArea, Select, Check, SubmitButton } from "./ui";
import RichText from "./RichText";
import ImageUpload from "./ImageUpload";
import { upsertService } from "@/app/admin/actions";

const ICONS = ["Cog", "Flame", "Droplets", "GitBranch", "ClipboardCheck", "Package", "HardHat", "ShieldCheck"];

export default function ServiceForm({ initial }: { initial?: any }) {
  const s = initial ?? {};
  return (
    <form action={upsertService.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name *"><TextInput name="name" required defaultValue={s.name ?? ""} /></Field>
            <Field label="Slug" hint="Auto-generated if blank"><TextInput name="slug" defaultValue={s.slug ?? ""} /></Field>
          </div>
          <Field label="Tagline"><TextInput name="tagline" defaultValue={s.tagline ?? ""} /></Field>
          <Field label="Short description *"><TextArea name="description" required defaultValue={s.description ?? ""} className="min-h-[80px]" /></Field>
          <Field label="Full content" hint="Shown on the service detail page"><RichText name="content" defaultValue={s.content ?? ""} /></Field>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Publish</h3>
            <div className="flex gap-6"><Check name="published" defaultChecked={s.published ?? true} label="Published" /><Check name="featured" defaultChecked={s.featured ?? false} label="Featured" /></div>
            <SubmitButton>{initial ? "Save changes" : "Create service"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Image"><ImageUpload name="image" defaultValue={s.image ?? ""} folder="services" /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Icon">
                <Select name="icon" defaultValue={s.icon ?? "Cog"}>{ICONS.map((i) => <option key={i}>{i}</option>)}</Select>
              </Field>
              <Field label="Order"><TextInput name="order" type="number" defaultValue={s.order ?? 0} /></Field>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
