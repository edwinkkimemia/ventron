import { prisma } from "@/lib/prisma";
import { Card, PageHeader, Pill, BtnLink, DeleteButton, BtnPrimary, EmptyState } from "@/components/admin/ui";
import { deleteJob, toggleJob } from "../actions";

export default async function AdminJobs() {
  let jobs: any[] = [];
  let apps: any[] = [];
  try {
    jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
    apps = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { job: true } });
  } catch {}
  return (
    <div className="space-y-6">
      <PageHeader title="Careers" sub={`${jobs.length} roles • ${apps.length} applications`} action={<BtnPrimary href="/admin/jobs/new">+ New role</BtnPrimary>} />
      <Card>
        <div className="px-5 py-3 border-b border-steel-100 font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Open roles</div>
        <div className="divide-y divide-steel-100">
          {jobs.length ? jobs.map((j) => (
            <div key={j.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="flex-1 min-w-[200px]">
                <p className="font-semibold text-navy-950">{j.title}</p>
                <p className="text-xs text-steel-500 mt-0.5">{j.location} • {j.department} • {j.employmentType}</p>
              </div>
              <Pill value={j.published} live="Open" />
              <div className="flex items-center gap-2">
                <BtnLink href={`/admin/jobs/${j.id}/edit`}>Edit</BtnLink>
                <form action={toggleJob.bind(null, j.id)}><button className="px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md border border-steel-300 hover:border-navy-900">{j.published ? "Close" : "Open"}</button></form>
                <DeleteButton action={deleteJob.bind(null, j.id)} />
              </div>
            </div>
          )) : <div className="p-5"><EmptyState title="No roles yet" sub="Create the first opening" /></div>}
        </div>
      </Card>
      <Card>
        <div className="px-5 py-3 border-b border-steel-100 font-condensed text-sm font-semibold uppercase tracking-widest text-navy-950">Recent applications ({apps.length})</div>
        <div className="divide-y divide-steel-100">
          {apps.length ? apps.map((a) => (
            <div key={a.id} className="px-5 py-3.5 text-sm">
              <strong className="text-navy-950">{a.name}</strong> → {a.job?.title ?? "Deleted role"}
              <span className="text-steel-500"> • {a.email}{a.phone ? ` • ${a.phone}` : ""}</span>
              {a.cvUrl && <a href={a.cvUrl} target="_blank" className="ml-2 text-xs font-bold uppercase tracking-wider text-accent">CV ↗</a>}
              {a.coverLetter && <p className="mt-1 text-charcoal-700 line-clamp-2">{a.coverLetter}</p>}
            </div>
          )) : <p className="px-5 py-6 text-sm text-steel-500">No applications yet.</p>}
        </div>
      </Card>
    </div>
  );
}
