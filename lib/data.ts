import { prisma } from "./prisma";

export async function getPublishedServices() {
  try {
    return await prisma.service.findMany({ where: { published: true }, orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getIndustries() {
  try {
    return await prisma.industry.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getFeaturedProjects() {
  try {
    return await prisma.project.findMany({ where: { published: true, featured: true }, take: 6, orderBy: { year: "desc" }, include: { industry: true, service: true } });
  } catch {
    return [];
  }
}

export async function getStatistics() {
  try {
    return await prisma.statistic.findMany({ orderBy: { order: "asc" } });
  } catch {
    return [];
  }
}

export async function getSetting(key: string, fallback = "") {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { key } });
    return s?.value ?? fallback;
  } catch {
    return fallback;
  }
}
