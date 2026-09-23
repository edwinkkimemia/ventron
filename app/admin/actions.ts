"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { slugify } from "@/lib/utils";

async function guard() {
  const s = await getServerSession(authOptions);
  if (!s) throw new Error("Unauthorized");
}

async function guardAdmin() {
  const s: any = await getServerSession(authOptions);
  if (!s || (s.user?.role !== "SUPER_ADMIN" && s.user?.role !== "ADMIN")) throw new Error("Forbidden");
}

// One-click starter content for fresh deploys (no shell on Vercel).
// Upserts only — safe to run repeatedly, never duplicates.
export async function seedStarterContent(): Promise<{ ok: boolean; error?: string }> {
  try {
    await guardAdmin();
    const { seedDatabase } = await import("@/lib/seed-content");
    await seedDatabase();
    revalidatePath("/admin");
    revalidatePath("/admin/projects");
    revalidatePath("/admin/articles");
    revalidatePath("/admin/settings");
    return { ok: true };
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Seeding failed" };
  }
}

export async function updateInquiryStatus(id: string, formData: FormData) {
  await guard();
  const status = String(formData.get("status") ?? "NEW") as any;
  await prisma.inquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/inquiries");
}

export async function updateQuoteStatus(id: string, formData: FormData) {
  await guard();
  const status = String(formData.get("status") ?? "NEW") as any;
  await prisma.quoteRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin/quotes");
}

export async function createProject(fd: FormData) {
  await guard();
  const title = String(fd.get("title"));
  await prisma.project.create({
    data: {
      title,
      slug: slugify(title) + "-" + Date.now().toString(36),
      excerpt: String(fd.get("excerpt") ?? ""),
      description: String(fd.get("description") ?? ""),
      location: String(fd.get("location") ?? "Kenya"),
      client: String(fd.get("client") ?? "Confidential Client"),
      year: Number(fd.get("year") ?? new Date().getFullYear()),
      featured: fd.get("featured") === "on",
      published: fd.get("published") === "on",
      featuredImage: String(fd.get("featuredImage") ?? "") || null,
    },
  });
  revalidatePath("/admin/projects");
}

export async function toggleProject(id: string, field: "featured" | "published") {
  await guard();
  const p = await prisma.project.findUnique({ where: { id } });
  if (!p) return;
  await prisma.project.update({ where: { id }, data: { [field]: !p[field] } });
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string) {
  await guard();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin/projects");
}

export async function createJob(fd: FormData) {
  await guard();
  const title = String(fd.get("title"));
  await prisma.job.create({
    data: {
      title,
      slug: slugify(title) + "-" + Date.now().toString(36),
      location: String(fd.get("location") ?? "Nairobi, Kenya"),
      department: String(fd.get("department") ?? "Engineering"),
      employmentType: String(fd.get("employmentType") ?? "Full-time"),
      description: String(fd.get("description") ?? ""),
      requirements: String(fd.get("requirements") ?? ""),
      published: true,
    },
  });
  revalidatePath("/admin/jobs");
}

export async function toggleJob(id: string) {
  await guard();
  const j = await prisma.job.findUnique({ where: { id } });
  if (!j) return;
  await prisma.job.update({ where: { id }, data: { published: !j.published } });
  revalidatePath("/admin/jobs");
}

export async function createArticle(fd: FormData) {
  await guard();
  const title = String(fd.get("title"));
  const session: any = await getServerSession(authOptions);
  await prisma.article.create({
    data: {
      title,
      slug: slugify(title) + "-" + Date.now().toString(36),
      excerpt: String(fd.get("excerpt") ?? ""),
      content: String(fd.get("content") ?? ""),
      authorName: session?.user?.name ?? "Ventron Engineering",
      published: fd.get("published") === "on",
      publishedAt: fd.get("published") === "on" ? new Date() : null,
    },
  });
  revalidatePath("/admin/articles");
}

export async function toggleArticle(id: string) {
  await guard();
  const a = await prisma.article.findUnique({ where: { id } });
  if (!a) return;
  await prisma.article.update({ where: { id }, data: { published: !a.published, publishedAt: !a.published ? new Date() : a.publishedAt } });
  revalidatePath("/admin/articles");
}

export async function deleteArticle(id: string) {
  await guard();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/admin/articles");
}

export async function saveSetting(key: string, value: string) {
  await guard();
  await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  revalidatePath("/admin/settings");
}

export async function saveStatistic(fd: FormData) {
  await guard();
  const label = String(fd.get("label"));
  const value = String(fd.get("value"));
  if (!label || !value) return;
  await prisma.statistic.create({ data: { label, value, suffix: String(fd.get("suffix") ?? "") } });
  revalidatePath("/admin/settings");
}

export async function deleteStatistic(id: string) {
  await guard();
  await prisma.statistic.delete({ where: { id } });
  revalidatePath("/admin/settings");
}
