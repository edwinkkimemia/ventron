import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { rateLimit, clientKey } from "@/lib/ratelimit";

const MAX = 5 * 1024 * 1024;
const ALLOWED = ["png", "jpg", "jpeg", "webp"];

export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions);
  if (!session || (session.user?.role !== "SUPER_ADMIN" && session.user?.role !== "ADMIN" && session.user?.role !== "EDITOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!rateLimit(`admupl:${clientKey(req)}`, 30)) {
    return NextResponse.json({ error: "Too many uploads." }, { status: 429 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  const folder = String(form?.get("folder") ?? "general").replace(/[^a-z0-9-]/gi, "").slice(0, 30) || "general";
  if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "No file received." }, { status: 400 });
  const ext = (file.name.split(".").pop() ?? "").toLowerCase();
  if (!ALLOWED.includes(ext)) return NextResponse.json({ error: "Only PNG, JPG or WebP images." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image exceeds the 5MB limit." }, { status: 400 });

  const dir = path.join(process.cwd(), process.env.UPLOAD_DIR ?? path.join("public", "uploads"), folder);
  await mkdir(dir, { recursive: true });
  const stored = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  await writeFile(path.join(dir, stored), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ ok: true, url: `/uploads/${folder}/${stored}` });
}
