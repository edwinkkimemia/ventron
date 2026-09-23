"use client";
import { useState } from "react";

const inputCls = "w-full border border-steel-300 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900";

export function ContactForm() {
  const [state, setState] = useState<{ loading: boolean; ok?: boolean; err?: string }>({ loading: false });
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return;
    setState({ loading: true });
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(fd)) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Submission failed");
      setState({ loading: false, ok: true });
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setState({ loading: false, err: err.message });
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 bg-white border border-steel-200 p-6">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Full name *" className={inputCls} />
        <input name="company" placeholder="Company" className={inputCls} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="email" type="email" required placeholder="Email *" className={inputCls} />
        <input name="phone" placeholder="Phone" className={inputCls} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <select name="service" className={inputCls} defaultValue=""><option value="" disabled>Service</option><option>Mechanical Engineering</option><option>Oil &amp; Gas Engineering</option><option>Fire Protection Engineering</option><option>Procurement</option><option>Project Management</option></select>
        <select name="industry" className={inputCls} defaultValue=""><option value="" disabled>Industry</option><option>Oil &amp; Gas</option><option>LPG</option><option>Energy</option><option>Manufacturing</option><option>Petroleum Storage</option></select>
        <input name="projectLocation" placeholder="Project location" className={inputCls} />
      </div>
      <textarea name="message" required rows={5} placeholder="Project details *" className={inputCls} />
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      {state.err && <p className="text-sm text-accent font-semibold">{state.err}</p>}
      {state.ok && <p className="text-sm font-semibold text-green-700">Received. Our engineering team will respond shortly.</p>}
      <button disabled={state.loading} className="bg-navy-900 text-white font-bold px-7 py-3 hover:bg-navy-800 disabled:opacity-60 text-sm uppercase tracking-widest">{state.loading ? "Sending…" : "Send Enquiry"}</button>
    </form>
  );
}

const ACCEPT = ".pdf,.docx,.xlsx,.xls,.dwg,.dxf,.png,.jpg,.jpeg,.webp";
const ALLOWED = ["pdf", "docx", "xlsx", "xls", "dwg", "dxf", "png", "jpg", "jpeg", "webp"];
const MAXF = 10 * 1024 * 1024;

export function QuoteForm() {
  const [state, setState] = useState<{ loading: boolean; ok?: boolean; err?: string; stage?: string }>({ loading: false });
  const [files, setFiles] = useState<File[]>([]);

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const list = Array.from(e.target.files ?? []);
    const bad = list.find((f) => !ALLOWED.includes((f.name.split(".").pop() ?? "").toLowerCase()) || f.size > MAXF);
    if (bad) {
      setState({ loading: false, err: `"${bad.name}": only PDF, DOCX, XLSX, DWG, DXF or images up to 10MB each.` });
      return;
    }
    if (files.length + list.length > 8) {
      setState({ loading: false, err: "Maximum 8 files per request." });
      return;
    }
    setState({ loading: false });
    setFiles((prev) => [...prev, ...list]);
    e.target.value = "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return;
    setState({ loading: true, stage: "Submitting enquiry…" });
    try {
      const data: Record<string, string> = {};
      (["name", "company", "email", "phone", "location", "industry", "service", "description", "timeline", "budget", "notes"] as const).forEach((k) => { data[k] = String(fd.get(k) ?? ""); });
      const res = await fetch("/api/quotes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Submission failed");
      if (files.length) {
        setState({ loading: true, stage: `Uploading ${files.length} file${files.length > 1 ? "s" : ""}…` });
        const up = new FormData();
        files.forEach((f) => up.append("files", f));
        const ures = await fetch(`/api/quotes/${j.id}/attachments`, { method: "POST", body: up });
        const uj = await ures.json().catch(() => ({}));
        if (!ures.ok) throw new Error(`Enquiry saved, but upload failed: ${uj.error ?? "try email instead"}`);
      }
      setState({ loading: false, ok: true });
      setFiles([]);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setState({ loading: false, err: err.message });
    }
  }
  return (
    <form onSubmit={onSubmit} className="grid gap-4 bg-white border border-steel-200 p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" required placeholder="Full name *" className={inputCls} />
        <input name="company" placeholder="Company" className={inputCls} />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input name="email" type="email" required placeholder="Email *" className={inputCls} />
        <input name="phone" required placeholder="Phone *" className={inputCls} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <input name="location" placeholder="Project location" className={inputCls} />
        <input name="industry" placeholder="Industry" className={inputCls} />
        <input name="service" required placeholder="Required service *" className={inputCls} />
      </div>
      <textarea name="description" required rows={5} placeholder="Project description — scope, systems, sizes * (min 20 chars)" className={inputCls} />
      <div className="grid md:grid-cols-2 gap-4">
        <input name="timeline" placeholder="Expected timeline" className={inputCls} />
        <input name="budget" placeholder="Estimated budget (optional)" className={inputCls} />
      </div>
      <textarea name="notes" rows={3} placeholder="Additional notes" className={inputCls} />
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-steel-500 mb-1.5">Attach drawings / BOQ / photos (optional)</label>
        <input type="file" multiple accept={ACCEPT} onChange={pick} className="w-full border border-dashed border-steel-300 bg-steel-100/50 px-3.5 py-3 text-sm file:mr-3 file:border-0 file:bg-navy-900 file:px-4 file:py-2 file:text-xs file:font-bold file:uppercase file:tracking-widest file:text-white" />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1.5">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 bg-steel-100/70 px-3 py-2 text-xs">
                <span className="truncate font-semibold text-navy-900">{f.name} <span className="font-normal text-steel-500">({(f.size / 1024).toFixed(0)} KB)</span></span>
                <button type="button" onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="font-bold text-accent uppercase tracking-widest">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
      <p className="text-xs text-steel-500">Attach files directly: PDF, DOCX, XLSX, DWG/DXF references, images — max 10MB each, up to 8 files.</p>
      {state.err && <p className="text-sm text-accent font-semibold">{state.err}</p>}
      {state.ok && <p className="text-sm font-semibold text-green-700">Quote request received with attachments. Reference will be emailed to you.</p>}
      <button disabled={state.loading} className="bg-accent text-white font-bold px-7 py-3.5 hover:bg-accent-dark disabled:opacity-60 text-sm uppercase tracking-widest">{state.loading ? (state.stage ?? "Submitting…") : "Submit Quote Request"}</button>
    </form>
  );
}

export function NewsletterForm() {
  const [msg, setMsg] = useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: fd.get("email") }) });
    setMsg(res.ok ? "Subscribed." : "Subscription failed.");
    if (res.ok) (e.target as HTMLFormElement).reset();
  }
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input name="email" type="email" required placeholder="Work email" className="flex-1 bg-white/10 border border-white/20 px-3 py-2.5 text-sm text-white placeholder:text-steel-400 outline-none focus:border-accent" />
      <button className="bg-accent px-4 py-2.5 text-sm font-bold text-white hover:bg-accent-dark">Join</button>
      {msg && <span className="text-xs self-center text-steel-300">{msg}</span>}
    </form>
  );
}
