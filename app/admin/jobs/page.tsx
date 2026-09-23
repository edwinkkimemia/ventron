import { prisma } from "@/lib/prisma";
import { createJob, toggleJob } from "../actions";

export default async function AdminJobs() {
  let jobs: any[] = [];
  let apps: any[] = [];
  try {
    jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
    apps = await prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" }, take: 50, include: { job: true } });
  } catch {}
  return (
    <div>
      <h1 className="font-condensed text-3xl font-semibold uppercase text-navy-900">Careers</h1>
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <form action={createJob} className="bg-white border border-steel-200 p-5 grid gap-3 h-fit">
          <h2 className="font-bold text-sm uppercase tracking-widest">New role</h2>
          <input name="title" required placeholder="Job title" className="border px-3 py-2 text-sm" />
          <input name="location" placeholder="Location" className="border px-3 py-2 text-sm" />
          <div className="grid grid-cols-2 gap-2">
            <input name="department" placeholder="Department" className="border px-3 py-2 text-sm" />
            <input name="employmentType" placeholder="Type" className="border px-3 py-2 text-sm" />
          </div>
          <textarea name="description" required placeholder="Description" rows={3} className="border px-3 py-2 text-sm" />
          <textarea name="requirements" required placeholder="Requirements" rows={3} className="border px-3 py-2 text-sm" />
          <button className="bg-navy-900 text-white text-sm font-bold uppercase tracking-widest py-2.5">Create</button>
        </form>
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border divide-y">
            {jobs.length ? jobs.map((j) => (
              <div key={j.id} className="p-4 text-sm flex justify-between gap-3"><span><strong>{j.title}</strong><span className="text-steel-500"> — {j.published ? "Open" : "Closed"}</span></span>
                <form action={toggleJob.bind(null, j.id)}><button className="border px-2.5 py-1.5 text-xs font-bold">Toggle</button></form></div>
            )) : <div className="p-5 text-sm">No jobs.</div>}
          </div>
          <div className="bg-white border">
            <div className="bg-navy-900 px-4 py-2.5 text-white text-sm font-condensed uppercase tracking-widest">Applications ({apps.length})</div>
            {apps.map((a) => <div key={a.id} className="p-3.5 text-sm border-b border-steel-100"><strong>{a.name}</strong> → {a.job?.title} <span className="text-steel-500">({a.email}{a.cvUrl ? ` • CV: ${a.cvUrl}` : ""})</span></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
