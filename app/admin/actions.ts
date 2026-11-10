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

import { redirect } from "next/navigation";

export async function deleteStatistic(id: string) {
  await guard();
  await prisma.statistic.delete({ where: { id } });
  revalidatePath("/admin/settings");
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const check = (fd: FormData, k: string) => fd.get(k) === "on";
const opt = (v: string) => (v ? v : null);

async function uniqueSlug(model: "project" | "article" | "job" | "service" | "industry" | "equipment", base: string, ignoreId?: string | null) {
  let slug = slugify(base) || "item";
  const where: any = { slug };
  if (ignoreId) where.NOT = { id: ignoreId };
  // @ts-expect-error dynamic model access
  const exists = await prisma[model].findFirst({ where });
  if (exists) slug = `${slug}-${Date.now().toString(36)}`;
  return slug;
}

/* ---------------- Projects ---------------- */
export async function upsertProject(id: string | null, fd: FormData) {
  await guard();
  const title = str(fd, "title");
  if (!title) throw new Error("Title is required");
  const slug = await uniqueSlug("project", str(fd, "slug") || title, id);
  const data: any = {
    title, slug,
    excerpt: str(fd, "excerpt"),
    description: str(fd, "description"),
    challenge: opt(str(fd, "challenge")),
    solution: opt(str(fd, "solution")),
    scope: opt(str(fd, "scope")),
    deliverables: opt(str(fd, "deliverables")),
    location: str(fd, "location") || "Kenya",
    client: str(fd, "client") || "Confidential Client",
    year: Number(str(fd, "year")) || new Date().getFullYear(),
    status: str(fd, "status") || "COMPLETED",
    featured: check(fd, "featured"),
    published: check(fd, "published"),
    featuredImage: opt(str(fd, "featuredImage")),
    industryId: opt(str(fd, "industryId")),
    serviceId: opt(str(fd, "serviceId")),
  };
  if (id) await prisma.project.update({ where: { id }, data });
  else await prisma.project.create({ data });
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

/* ---------------- Articles ---------------- */
export async function upsertArticle(id: string | null, fd: FormData) {
  await guard();
  const title = str(fd, "title");
  if (!title) throw new Error("Title is required");
  const slug = await uniqueSlug("article", str(fd, "slug") || title, id);
  const published = check(fd, "published");
  const session: any = await getServerSession(authOptions);
  const data: any = {
    title, slug,
    excerpt: str(fd, "excerpt"),
    content: str(fd, "content"),
    categoryId: opt(str(fd, "categoryId")),
    featuredImage: opt(str(fd, "featuredImage")),
    tags: str(fd, "tags"),
    metaTitle: opt(str(fd, "metaTitle")),
    metaDescription: opt(str(fd, "metaDescription")),
    authorName: session?.user?.name ?? "Ventron Engineering",
    published,
    publishedAt: published ? new Date() : null,
  };
  if (id) {
    const cur = await prisma.article.findUnique({ where: { id } });
    await prisma.article.update({ where: { id }, data: { ...data, publishedAt: published ? (cur?.publishedAt ?? new Date()) : null } });
  } else {
    await prisma.article.create({ data });
  }
  revalidatePath("/admin/articles");
  revalidatePath("/insights");
  revalidatePath("/");
  redirect("/admin/articles");
}

/* ---------------- Jobs ---------------- */
export async function upsertJob(id: string | null, fd: FormData) {
  await guard();
  const title = str(fd, "title");
  if (!title) throw new Error("Title is required");
  const slug = await uniqueSlug("job", str(fd, "slug") || title, id);
  const closing = str(fd, "closingDate");
  const data: any = {
    title, slug,
    location: str(fd, "location") || "Nairobi, Kenya",
    department: str(fd, "department") || "Engineering",
    employmentType: str(fd, "employmentType") || "Full-time",
    description: str(fd, "description"),
    requirements: str(fd, "requirements"),
    closingDate: closing ? new Date(closing) : null,
    published: check(fd, "published"),
  };
  if (id) await prisma.job.update({ where: { id }, data });
  else await prisma.job.create({ data });
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

export async function deleteJob(id: string) {
  await guard();
  await prisma.job.delete({ where: { id } });
  revalidatePath("/admin/jobs");
  redirect("/admin/jobs");
}

/* ---------------- Services ---------------- */
export async function upsertService(id: string | null, fd: FormData) {
  await guard();
  const name = str(fd, "name");
  if (!name) throw new Error("Name is required");
  const slug = await uniqueSlug("service", str(fd, "slug") || name, id);
  const data: any = {
    name, slug,
    tagline: opt(str(fd, "tagline")),
    description: str(fd, "description"),
    content: str(fd, "content"),
    icon: str(fd, "icon") || "Cog",
    image: opt(str(fd, "image")),
    featured: check(fd, "featured"),
    order: Number(str(fd, "order")) || 0,
    published: check(fd, "published"),
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidatePath("/admin/services");
  revalidatePath("/services");
  revalidatePath("/");
  redirect("/admin/services");
}

export async function deleteService(id: string) {
  await guard();
  await prisma.service.delete({ where: { id } });
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

/* ---------------- Industries ---------------- */
export async function upsertIndustry(id: string | null, fd: FormData) {
  await guard();
  const name = str(fd, "name");
  if (!name) throw new Error("Name is required");
  const slug = await uniqueSlug("industry", str(fd, "slug") || name, id);
  const data: any = {
    name, slug,
    description: str(fd, "description"),
    challenges: opt(str(fd, "challenges")),
    systems: opt(str(fd, "systems")),
    image: opt(str(fd, "image")),
    order: Number(str(fd, "order")) || 0,
  };
  if (id) await prisma.industry.update({ where: { id }, data });
  else await prisma.industry.create({ data });
  revalidatePath("/admin/industries");
  revalidatePath("/industries");
  revalidatePath("/");
  redirect("/admin/industries");
}

export async function deleteIndustry(id: string) {
  await guard();
  await prisma.industry.delete({ where: { id } });
  revalidatePath("/admin/industries");
  redirect("/admin/industries");
}

/* ---------------- Equipment ---------------- */
export async function upsertEquipmentCategory(id: string | null, fd: FormData) {
  await guard();
  const name = str(fd, "name");
  if (!name) throw new Error("Name is required");
  const data: any = { name, description: opt(str(fd, "description")), order: Number(str(fd, "order")) || 0 };
  if (!id) {
    const slug = slugify(name) + "-" + Date.now().toString(36);
    await prisma.equipmentCategory.create({ data: { ...data, slug } });
  } else {
    await prisma.equipmentCategory.update({ where: { id }, data });
  }
  revalidatePath("/admin/equipment");
  revalidatePath("/equipment");
  redirect("/admin/equipment");
}

export async function deleteEquipmentCategory(id: string) {
  await guard();
  await prisma.equipmentCategory.delete({ where: { id } });
  revalidatePath("/admin/equipment");
  redirect("/admin/equipment");
}

export async function upsertEquipment(id: string | null, fd: FormData) {
  await guard();
  const name = str(fd, "name");
  if (!name) throw new Error("Name is required");
  const slug = await uniqueSlug("equipment", str(fd, "slug") || name, id);
  const data: any = {
    name, slug,
    description: str(fd, "description"),
    categoryId: opt(str(fd, "categoryId")),
    image: opt(str(fd, "image")),
    published: check(fd, "published"),
  };
  if (id) await prisma.equipment.update({ where: { id }, data });
  else await prisma.equipment.create({ data });
  revalidatePath("/admin/equipment");
  revalidatePath("/equipment");
  redirect("/admin/equipment");
}

export async function deleteEquipment(id: string) {
  await guard();
  await prisma.equipment.delete({ where: { id } });
  revalidatePath("/admin/equipment");
  redirect("/admin/equipment");
}
