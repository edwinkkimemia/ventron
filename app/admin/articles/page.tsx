import { prisma } from "@/lib/prisma";
import { createArticle, toggleArticle, deleteArticle } from "../actions";

export default async function AdminArticles() {
  let rows: any[] = [];
  try { rows = await prisma.article.findMany({ orderBy: { createdAt: "desc" } }); } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Insights</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <form action={createArticle} className="bg-white border p-5 grid gap-3 h-fit">
          <h2 className="font-bold text-sm uppercase tracking-widest">New article</h2>
          <input name="title" required placeholder="Title" className="border px-3 py-2 text-sm" />
          <input name="excerpt" required placeholder="Excerpt / meta description" className="border px-3 py-2 text-sm" />
          <textarea name="content" required placeholder="Body content" rows={5} className="border px-3 py-2 text-sm" />
          <label className="text-sm flex gap-2 items-center"><input type="checkbox" name="published" /> Publish now</label>
          <button className="bg-navy-900 text-white text-sm font-bold uppercase tracking-widest py-2.5">Save</button>
        </form>
        <div className="lg:col-span-2 bg-white border divide-y">
          {rows.length ? rows.map((a) => (
            <div key={a.id} className="p-4 text-sm flex justify-between gap-3"><span><strong>{a.title}</strong><span className="text-steel-500"> — {a.published ? "Live" : "Draft"}</span></span>
              <span className="flex gap-2">
                <form action={toggleArticle.bind(null, a.id)}><button className="border px-2.5 py-1.5 text-xs font-bold">Toggle</button></form>
                <form action={deleteArticle.bind(null, a.id)}><button className="border border-accent text-accent px-2.5 py-1.5 text-xs font-bold">Delete</button></form>
              </span></div>
          )) : <div className="p-5 text-sm">No articles.</div>}
        </div>
      </div>
    </div>
  );
}
