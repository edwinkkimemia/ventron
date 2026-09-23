import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnLink, DeleteButton, BtnPrimary, EmptyState } from "@/components/admin/ui";
import { deleteArticle, toggleArticle } from "../actions";

export default async function AdminArticles() {
  let rows: any[] = [];
  try { rows = await prisma.article.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Insights" sub={`${rows.length} articles — published posts appear on the site with SEO metadata`} action={<BtnPrimary href="/admin/articles/new">+ New article</BtnPrimary>} />
      {rows.length ? (
        <Card>
          <div className="divide-y divide-steel-100">
            {rows.map((a) => (
              <div key={a.id} className="flex flex-wrap items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {a.featuredImage ? <img src={a.featuredImage} alt="" className="h-12 w-20 rounded object-cover border border-steel-200" /> : <div className="h-12 w-20 rounded bg-steel-100 grid place-items-center text-[10px] font-bold text-steel-400">NO IMG</div>}
                <div className="flex-1 min-w-[200px]">
                  <p className="font-semibold text-navy-950">{a.title}</p>
                  <p className="text-xs text-steel-500 mt-0.5">/{a.slug} • {a.category?.name ?? "Uncategorised"} • {a.authorName}</p>
                </div>
                <Pill value={a.published} live="Live" />
                <div className="flex items-center gap-2">
                  <BtnLink href={`/admin/articles/${a.id}/edit`}>Edit</BtnLink>
                  <form action={toggleArticle.bind(null, a.id)}><button className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md border border-steel-300 hover:border-navy-900">{a.published ? "Unpublish" : "Publish"}</button></form>
                  <DeleteButton action={deleteArticle.bind(null, a.id)} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      ) : <EmptyState title="No articles yet" sub="Write your first technical insight" action={<BtnPrimary href="/admin/articles/new">+ New article</BtnPrimary>} />}
    </div>
  );
}
