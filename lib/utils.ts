import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function excerpt(text: string, len = 160) {
  const t = text.replace(/<[^>]*>/g, "").trim();
  return t.length > len ? t.slice(0, len).trimEnd() + "…" : t;
}
