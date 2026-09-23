import { prisma } from "@/lib/prisma";
import { createProject, toggleProject, deleteProject } from "../actions";

export default async function AdminProjects() {
  let projects: any[] = [];
  try { projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" }, take: 50 }); } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Projects</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <form action={createProject} className="bg-white border border-steel-200 p-5 grid gap-3 h-fit">
          <h2 className="font-bold text-sm uppercase tracking-widest text-navy-900">New project</h2>
          <input name="title" required placeholder="Title" className="border border-steel-300 px-3 py-2 text-sm" />
          <input name="excerpt" required placeholder="Excerpt" className="border border-steel-300 px-3 py-2 text-sm" />
          <textarea name="description" required placeholder="Description" rows={3} className="border border-steel-300 px-3 py-2 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input name="location" placeholder="Location" className="border border-steel-300 px-3 py-2 text-sm" />
            <input name="year" type="number" defaultValue={new Date().getFullYear()} className="border border-steel-300 px-3 py-2 text-sm" />
          </div>
          <input name="client" placeholder="Client (or Confidential Client)" className="border border-steel-300 px-3 py-2 text-sm" />
          <input name="featuredImage" placeholder="Featured image URL (optional)" className="border border-steel-300 px-3 py-2 text-sm" />
          <label className="text-sm flex gap-2 items-center"><input type="checkbox" name="featured" /> Featured</label>
          <label className="text-sm flex gap-2 items-center"><input type="checkbox" name="published" defaultChecked /> Published</label>
          <button className="bg-navy-900 text-white text-sm font-bold uppercase tracking-widest py-2.5">Create</button>
        </form>
        <div className="lg:col-span-2 bg-white border border-steel-200 divide-y divide-steel-100">
          {projects.length ? projects.map((p) => (
            <div key={p.id} className="p-4 flex flex-wrap justify-between gap-3 text-sm">
              <div><strong>{p.title}</strong><div className="text-xs text-steel-500">/{p.slug} • {p.year} • {p.featured ? "★ Featured" : ""} {p.published ? "• Live" : "• Draft"}</div></div>
              <div className="flex gap-2">
                <form action={toggleProject.bind(null, p.id, "featured")}><button className="border px-2.5 py-1.5 text-xs font-bold">Feature</button></form>
                <form action={toggleProject.bind(null, p.id, "published")}><button className="border px-2.5 py-1.5 text-xs font-bold">Publish</button></form>
                <form action={deleteProject.bind(null, p.id)}><button className="border border-accent text-accent px-2.5 py-1.5 text-xs font-bold">Delete</button></form>
              </div>
            </div>
          )) : <div className="p-6 text-sm">No projects — connect DB to manage.</div>}
        </div>
      </div>
    </div>
  );
}
