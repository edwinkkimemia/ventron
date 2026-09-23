import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { seedStarterContent } from "./actions";

export default async function AdminHome() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");
  let counts = { projects: 0, inquiries: 0, quotes: 0, jobs: 0, articles: 0, newInq: 0 };
  let recent: any[] = [];
  try {
    const [projects, inquiries, quotes, jobs, articles, newInq] = await Promise.all([
      prisma.project.count(), prisma.inquiry.count(), prisma.quoteRequest.count(),
      prisma.job.count(), prisma.article.count(), prisma.inquiry.count({ where: { status: "NEW" } }),
    ]);
    counts = { projects, inquiries, quotes, jobs, articles, newInq };
    recent = await prisma.inquiry.findMany({ take: 5, orderBy: { createdAt: "desc" } });
  } catch {}
  const cards: [string, number, string][] = [["Projects", counts.projects, "/admin/projects"], ["Enquiries", counts.inquiries, "/admin/inquiries"], ["Quote requests", counts.quotes, "/admin/quotes"], ["Jobs", counts.jobs, "/admin/jobs"], ["Articles", counts.articles, "/admin/articles"], ["New enquiries", counts.newInq, "/admin/inquiries"]];
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Dashboard overview</h1>
      <p className="text-sm text-steel-500 mt-1">Welcome, {(session.user as any)?.name ?? "Engineer"} — {new Date().toLocaleDateString()}</p>
      {(counts.projects === 0 && counts.articles === 0) && (
        <form action={async () => { "use server"; await seedStarterContent(); }} className="mt-6 bg-accent/10 border border-accent/40 p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <h2 className="font-condensed font-semibold uppercase text-navy-900">Database is empty</h2>
            <p className="text-sm text-charcoal-700 mt-1">Load starter content — services, industries, 7 projects, 6 articles, equipment, stats and site settings. Safe to run any time; never duplicates.</p>
          </div>
          <button className="bg-accent hover:bg-accent-dark text-white text-sm font-bold uppercase tracking-widest px-6 py-3 shrink-0">Load starter content</button>
        </form>
      )}
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(([l, v, h]) => (
          <a key={l} href={h} className="bg-white border border-steel-200 border-t-4 border-t-navy-900 p-5 hover:shadow-md">
            <div className="font-condensed text-4xl font-semibold text-navy-900">{v}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-steel-500 mt-1">{l}</div>
          </a>
        ))}
      </div>
      <div className="mt-8 bg-white border border-steel-200">
        <div className="bg-navy-900 px-5 py-3 text-sm font-condensed uppercase tracking-widest text-white">Recent enquiries</div>
        <div className="divide-y divide-steel-100">
          {recent.length ? recent.map((r) => (
            <div key={r.id} className="px-5 py-3 text-sm flex justify-between gap-4"><span><strong>{r.name}</strong> — {r.service || "General"} <span className="text-steel-500">({r.email})</span></span><span className="text-xs font-bold uppercase text-steel-500">{r.status}</span></div>
          )) : <div className="px-5 py-6 text-sm text-charcoal-700">No data yet — connect DATABASE_URL and run seed.</div>}
        </div>
      </div>
    </div>
  );
}
