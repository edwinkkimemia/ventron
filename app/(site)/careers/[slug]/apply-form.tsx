"use client";
import { useState } from "react";

export default function JobApplyForm({ jobId }: { jobId: string }) {
  const [s, setS] = useState({ loading: false, ok: false, err: "" });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return;
    setS({ loading: true, ok: false, err: "" });
    const res = await fetch(`/api/jobs/${jobId}/apply`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(fd), jobId }) });
    const j = await res.json().catch(() => ({}));
    if (!res.ok) setS({ loading: false, ok: false, err: j.error ?? "Failed" });
    else { setS({ loading: false, ok: true, err: "" }); (e.target as HTMLFormElement).reset(); }
  }
  const cls = "w-full border border-steel-300 px-3.5 py-2.5 text-sm outline-none focus:border-navy-900";
  return (
    <form onSubmit={onSubmit} className="mt-4 grid gap-3">
      <div className="grid md:grid-cols-2 gap-3">
        <input name="name" required placeholder="Full name *" className={cls} />
        <input name="email" type="email" required placeholder="Email *" className={cls} />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <input name="phone" placeholder="Phone" className={cls} />
        <input name="linkedIn" placeholder="LinkedIn (optional)" className={cls} />
      </div>
      <input name="cvUrl" placeholder="CV link (URL) — or email CV after applying" className={cls} />
      <textarea name="coverLetter" rows={4} placeholder="Cover note" className={cls} />
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {s.err && <p className="text-sm text-accent font-semibold">{s.err}</p>}
      {s.ok && <p className="text-sm font-semibold text-green-700">Application received. We will contact shortlisted candidates.</p>}
      <button disabled={s.loading} className="bg-navy-900 text-white text-sm font-bold uppercase tracking-widest px-6 py-3 hover:bg-navy-800 disabled:opacity-60">{s.loading ? "Submitting…" : "Submit Application"}</button>
    </form>
  );
}
