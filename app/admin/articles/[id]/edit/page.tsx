import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PageHeader, BtnLink } from "@/components/admin/ui";
import ArticleForm from "@/components/admin/ArticleForm";

export default async function EditArticle({ params }: { params: { id: string } }) {
  let a: any = null, categories: any[] = [];
  try {
    [a, categories] = await Promise.all([
      prisma.article.findUnique({ where: { id: params.id } }),
      prisma.articleCategory.findMany({ orderBy: { name: "asc" } }),
    ]);
  } catch {}
  if (!a) notFound();
  return (
    <div className="space-y-6">
      <PageHeader title="Edit article" sub={a.title} action={<BtnLink href="/admin/articles">← Back to list</BtnLink>} />
      <ArticleForm initial={a} categories={categories} />
    </div>
  );
}
