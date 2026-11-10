import { Card, Field, TextInput, TextArea, Select, Check, SubmitButton } from "./ui";
import ImageUpload from "./ImageUpload";
import { upsertEquipment } from "@/app/admin/actions";

export default function EquipmentForm({ initial, categories }: { initial?: any; categories: any[] }) {
  const v = initial ?? {};
  return (
    <form action={upsertEquipment.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name *"><TextInput name="name" required defaultValue={v.name ?? ""} /></Field>
            <Field label="Slug" hint="Auto-generated if blank"><TextInput name="slug" defaultValue={v.slug ?? ""} /></Field>
          </div>
          <Field label="Description *"><TextArea name="description" required defaultValue={v.description ?? ""} /></Field>
          <Field label="Image"><ImageUpload name="image" defaultValue={v.image ?? ""} folder="equipment" /></Field>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Publish</h3>
            <Check name="published" defaultChecked={v.published ?? true} label="Published" />
            <SubmitButton>{initial ? "Save changes" : "Create item"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Category">
              <Select name="categoryId" defaultValue={v.categoryId ?? ""}>
                <option value="">— None —</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </Field>
          </Card>
        </div>
      </div>
    </form>
  );
}
