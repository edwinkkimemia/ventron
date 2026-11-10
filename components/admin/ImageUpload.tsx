"use client";
import { useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";

// Uploads an image to /api/admin/uploads and stores the URL in a hidden input.
export default function ImageUpload({ name, defaultValue = "", folder = "general" }: { name: string; defaultValue?: string; folder?: string }) {
  const [url, setUrl] = useState(defaultValue);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true); setErr("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error ?? "Upload failed");
      setUrl(j.url);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Uploaded preview" className="h-36 w-auto rounded-md border border-steel-300 object-cover" />
          <button type="button" onClick={() => setUrl("")} aria-label="Remove image" className="absolute -top-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-navy-950 text-white shadow hover:bg-red-700">
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-steel-300 bg-steel-100/50 px-4 py-5 text-sm text-charcoal-700 hover:border-navy-800">
          {busy ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} className="text-accent" />}
          {busy ? "Uploading…" : "Click to upload image (PNG/JPG/WebP, max 5MB)"}
          <input type="file" accept=".png,.jpg,.jpeg,.webp" onChange={onPick} className="hidden" />
        </label>
      )}
      {err && <p className="mt-1.5 text-xs font-semibold text-red-700">{err}</p>}
      {url && <p className="mt-1.5 text-xs text-steel-400 break-all">{url}</p>}
    </div>
  );
}
