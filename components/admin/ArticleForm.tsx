import { Card, Field, TextInput, TextArea, Select, Check, SubmitButton } from "./ui";
import RichText from "./RichText";
import ImageUpload from "./ImageUpload";
import { upsertArticle } from "@/app/admin/actions";

export default function ArticleForm({ initial, categories }: { initial?: any; categories: any[] }) {
  const a = initial ?? {};
  return (
    <form action={upsertArticle.bind(null, initial?.id ?? null)}>
      <div className="grid lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-2 p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Title *"><TextInput name="title" required defaultValue={a.title ?? ""} placeholder="Article headline" /></Field>
            <Field label="Slug" hint="Auto-generated if blank"><TextInput name="slug" defaultValue={a.slug ?? ""} /></Field>
          </div>
          <Field label="Excerpt *" hint="Shown on cards + meta description fallback"><TextArea name="excerpt" required defaultValue={a.excerpt ?? ""} className="min-h-[80px]" /></Field>
          <Field label="Body content *" hint="## Headings, - bullets, **bold**, [links](/url)"><RichText name="content" defaultValue={a.content ?? ""} /></Field>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Meta title" hint="~60 chars, keyword-first"><TextInput name="metaTitle" defaultValue={a.metaTitle ?? ""} /></Field>
            <Field label="Tags" hint="Comma separated"><TextInput name="tags" defaultValue={a.tags ?? ""} placeholder="firewater pumps Kenya, NPSH" /></Field>
          </div>
          <Field label="Meta description" hint="~155 chars"><TextArea name="metaDescription" defaultValue={a.metaDescription ?? ""} className="min-h-[70px]" /></Field>
        </Card>
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Publish</h3>
            <Check name="published" defaultChecked={a.published ?? false} label="Published" />
            <SubmitButton>{initial ? "Save changes" : "Create article"}</SubmitButton>
          </Card>
          <Card className="p-6 space-y-5">
            <h3 className="font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Details</h3>
            <Field label="Featured image"><ImageUpload name="featuredImage" defaultValue={a.featuredImage ?? ""} folder="articles" /></Field>
            <Field label="Category">
              <Select name="categoryId" defaultValue={a.categoryId ?? ""}>
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
