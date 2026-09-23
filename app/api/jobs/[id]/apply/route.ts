import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobApplicationSchema } from "@/lib/validations";
import { sendNotification } from "@/lib/email";
import { rateLimit, clientKey } from "@/lib/ratelimit";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!rateLimit(`job:${clientKey(req)}`, 5)) return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  const body = await req.json().catch(() => ({}));
  const parsed = jobApplicationSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid application" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job) return NextResponse.json({ error: "Role not found" }, { status: 404 });
  const { website: _h, ...d } = parsed.data;
  await prisma.jobApplication.create({ data: { jobId: job.id, name: d.name, email: d.email, phone: d.phone ?? "", coverLetter: d.coverLetter ?? "", linkedIn: d.linkedIn ?? "", cvUrl: (body as any).cvUrl ?? "" } });
  await sendNotification(process.env.EMAIL_FROM ?? "", `Job application — ${job.title} / ${d.name}`, `${d.name} (${d.email})\n${d.coverLetter ?? ""}`);
  return NextResponse.json({ ok: true });
}
