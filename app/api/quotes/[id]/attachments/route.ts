import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit, clientKey } from "@/lib/ratelimit";
import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const MAX_FILE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 8;
const ALLOWED_EXT = ["pdf", "docx", "xlsx", "xls", "dwg", "dxf", "png", "jpg", "jpeg", "webp"];

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!rateLimit(`upl:${clientKey(req)}`, 10)) {
    return NextResponse.json({ error: "Too many uploads. Try again later." }, { status: 429 });
  }
  const quote = await prisma.quoteRequest.findUnique({ where: { id: params.id } });
  if (!quote) return NextResponse.json({ error: "Quote request not found." }, { status: 404 });

  const form = await req.formData().catch(() => null);
  if (!form) return NextResponse.json({ error: "No files received." }, { status: 400 });
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);
  if (!files.length) return NextResponse.json({ error: "No files received." }, { status: 400 });
  if (files.length > MAX_FILES) return NextResponse.json({ error: `Maximum ${MAX_FILES} files per request.` }, { status: 400 });

  const baseDir = path.join(process.cwd(), process.env.UPLOAD_DIR ?? path.join("public", "uploads"), "quotes", params.id);
  await mkdir(baseDir, { recursive: true });

  const saved = [];
  for (const file of files) {
    const ext = extOf(file.name);
    if (!ALLOWED_EXT.includes(ext)) {
      return NextResponse.json({ error: `"${file.name}": allowed types are PDF, DOCX, XLSX, DWG, DXF and images.` }, { status: 400 });
    }
    if (file.size > MAX_FILE) {
      return NextResponse.json({ error: `"${file.name}" exceeds the 10MB limit.` }, { status: 400 });
    }
    const stored = `${randomUUID()}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(baseDir, stored), buf);
    const row = await prisma.quoteAttachment.create({
      data: {
        quoteRequestId: params.id,
        fileName: file.name.slice(0, 150),
        fileUrl: `/uploads/quotes/${params.id}/${stored}`,
        mimeType: file.type || "application/octet-stream",
        size: file.size,
      },
    });
    saved.push({ id: row.id, fileName: row.fileName, size: row.size });
  }
  return NextResponse.json({ ok: true, files: saved });
}
