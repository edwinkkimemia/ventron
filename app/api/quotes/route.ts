import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { quoteSchema } from "@/lib/validations";
import { sendNotification } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/ratelimit";

export async function POST(req: Request) {
  if (!rateLimit(`quote:${clientKey(req)}`, 5)) return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message ?? "Invalid input" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const { website: _h, ...data } = parsed.data;
  const row = await prisma.quoteRequest.create({ data: { ...data, company: data.company ?? "", location: data.location ?? "", industry: data.industry ?? "", timeline: data.timeline ?? "", budget: data.budget ?? "", notes: data.notes ?? "" } });
  await sendNotification(process.env.EMAIL_FROM ?? "", `New quote request — ${data.name} / ${data.service}`, `${data.name} (${data.email}, ${data.phone})\nService: ${data.service}\nLocation: ${data.location}\n${data.description}`);
  return NextResponse.json({ ok: true, id: row.id });
}
