import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function NewArticle() {
  let categories: any[] = [];
  try { categories = await prisma.articleCategory.findMany({ orderBy: { name: "asc" } }); } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="New article" sub="Write with the toolbar, preview, then publish" action={<BtnLink href="/admin/articles">← Back to list</BtnLink>} />
      <ArticleForm categories={categories} />
    </div>
  );
}
