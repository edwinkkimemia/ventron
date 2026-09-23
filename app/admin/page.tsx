import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnPrimary } from "@/components/admin/ui";
import { seedStarterContent } from "./actions";
import { FolderKanban, Mail, FileText, Briefcase, Newspaper, Inbox } from "lucide-react";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  let counts = { projects: 0, inquiries: 0, quotes: 0, jobs: 0, articles: 0, newInq: 0 };
  let recent: any[] = [];
  let dbOk = true;
  try {
    await prisma.$queryRaw`SELECT 1`;
    const [projects, inquiries, quotes, jobs, articles, newInq] = await Promise.all([
      prisma.project.count(), prisma.inquiry.count(), prisma.quoteRequest.count(),
      prisma.job.count(), prisma.article.count(), prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);
    counts = { projects, inquiries, quotes, jobs, articles, newInq };
    recent = await prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } });
  } catch { dbOk = false; }
  const empty = counts.projects === 0 && counts.articles === 0;
  const cards = [
    ["Projects", counts.projects, "/admin/projects", FolderKanban],
    ["Enquiries", counts.inquiries, "/admin/inquiries", Mail],
    ["Quotes", counts.quotes, "/admin/quotes", FileText],
    ["Jobs", counts.jobs, "/admin/jobs", Briefcase],
    ["Articles", counts.articles, "/admin/articles", Newspaper],
    ["New enquiries", counts.newInq, "/admin/inquiries", Inbox],
  ] as const;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        sub={`Welcome back, ${(session.user as any)?.name ?? "Engineer"} — ${new Date().toLocaleDateString("en-KE", { weekday: "long", day: "numeric", month: "long" })}`}
        action={<BtnPrimary href="/admin/projects/new">+ New project</BtnPrimary>}
      />
      {!dbOk && (
        <div className="bg-red-50 border border-red-300 rounded-lg p-5">
          <h2 className="font-condensed font-semibold uppercase tracking-wide text-red-800">Database unreachable</h2>
          <p className="text-sm text-red-700 mt-1">Cannot reach the Postgres server. Check that <code>DATABASE_URL</code> is correct and the database is running (Prisma Postgres instances pause when idle — resume it in the Prisma dashboard). Public pages keep working from built-in content; admin data, forms and login need the database.</p>
        </div>
      )}
      {empty && (
        <form action={async () => { "use server"; await seedStarterContent(); }} className="bg-gradient-to-r from-navy-950 to-navy-800 rounded-lg p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between shadow">
          <div>
            <h2 className="font-condensed font-semibold uppercase tracking-wide text-white">Database is empty — start in one click</h2>
            <p className="text-sm text-steel-200 mt-1">Loads services, industries, 7 projects, 6 articles, equipment, stats and site settings. Upsert-safe, never duplicates.</p>
          </div>
          <button className="bg-accent hover:bg-accent-dark text-white text-sm font-bold uppercase tracking-widest px-6 py-3 rounded-md shrink-0">Load starter content</button>
        </form>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(([l, v, h, Icon]) => (
          <Link key={l} href={h} className="bg-white border border-steel-200 rounded-lg p-5 hover:shadow-md hover:border-navy-800 transition group">
            <div className="flex items-center justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-navy-950/5 text-navy-900 group-hover:bg-navy-950 group-hover:text-white transition"><Icon size={18} /></span>
              <span className="font-condensed text-4xl font-semibold text-navy-950">{v}</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-steel-500 mt-3">{l}</div>
          </Link>
        ))}
      </div>
      <Card>
        <div className="px-5 py-3 border-b border-steel-100 font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Latest enquiries</div>
        <div className="divide-y divide-steel-100">
          {recent.length ? recent.map((r) => (
            <div key={r.id} className="px-5 py-3.5 text-sm flex flex-wrap justify-between gap-2">
              <span><strong className="text-navy-950">{r.name}</strong> <span className="text-steel-500">— {r.service || "General"} ({r.email})</span></span>
              <Pill value={r.status} />
            </div>
          )) : <p className="px-5 py-6 text-sm text-steel-500">No enquiries yet — contact form submissions land here.</p>}
        </div>
      </Card>
    </div>
  );
}
