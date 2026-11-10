import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validations";
import { sendNotification } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/ratelimit";

export async function POST(req: Request) {
  if (!rateLimit(`inq:${clientKey(req)}`, 10)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const { website: _h, ...data } = parsed.data;
  const row = await prisma.inquiry.create({ data: { ...data, company: data.company ?? "", phone: data.phone ?? "", service: data.service ?? "", industry: data.industry ?? "", projectLocation: data.projectLocation ?? "" } });
  await sendNotification(process.env.EMAIL_FROM ?? process.env.ADMIN_EMAIL ?? "", `New enquiry — ${data.name}`, `${data.name} (${data.email}, ${data.phone}) — ${data.service} / ${data.industry}\n${data.message}`);
  return NextResponse.json({ ok: true, id: row.id });
}
