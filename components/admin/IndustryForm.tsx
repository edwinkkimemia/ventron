import { Card, Field, TextInput, TextArea, SubmitButton } from "./ui";
import ImageUpload from "./ImageUpload";
import { upsertIndustry } from "@/app/admin/actions";

export default function IndustryForm({ initial }: { initial?: any }) {
  const v = initial ?? {};
  return (
    <form action={upsertIndustry.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Name *"><TextInput name="name" required defaultValue={v.name ?? ""} /></Field>
            <Field label="Slug" hint="Auto-generated if blank"><TextInput name="slug" defaultValue={v.slug ?? ""} /></Field>
          </div>
          <Field label="Description *"><TextArea name="description" required defaultValue={v.description ?? ""} /></Field>
          <Field label="Challenges"><TextArea name="challenges" defaultValue={v.challenges ?? ""} className="min-h-[80px]" /></Field>
          <Field label="Typical systems"><TextArea name="systems" defaultValue={v.systems ?? ""} className="min-h-[80px]" /></Field>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <SubmitButton>{initial ? "Save changes" : "Create industry"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Image"><ImageUpload name="image" defaultValue={v.image ?? ""} folder="industries" /></Field>
            <Field label="Order"><TextInput name="order" type="number" defaultValue={v.order ?? 0} /></Field>
          </Card>
        </div>
      </div>
    </form>
  );
}
