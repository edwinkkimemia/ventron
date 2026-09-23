"use client";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cn("bg-white border border-steel-200 rounded-lg shadow-sm", className)}>{children}</div>;
}

export function PageHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-condensed text-3xl font-semibold uppercase tracking-wide text-navy-950">{title}</h1>
        {sub && <p className="text-sm text-steel-500 mt-1">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

const PILL: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-800",
  CONTACTED: "bg-amber-100 text-amber-800",
  QUOTED: "bg-violet-100 text-violet-800",
  WON: "bg-green-100 text-green-800",
  LOST: "bg-steel-200 text-charcoal-700",
  ARCHIVED: "bg-steel-100 text-steel-500",
  COMPLETED: "bg-green-100 text-green-800",
  ONGOING: "bg-blue-100 text-blue-800",
  DESIGN: "bg-amber-100 text-amber-800",
  CONCEPT: "bg-steel-200 text-charcoal-700",
};

export function Pill({ value, live }: { value?: string | boolean | null; live?: string }) {
  if (typeof value === "boolean") {
    return <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", value ? "bg-green-100 text-green-800" : "bg-steel-200 text-charcoal-700")}><span className={cn("h-1.5 w-1.5 rounded-full", value ? "bg-green-600" : "bg-steel-400")} />{value ? live ?? "Live" : "Draft"}</span>;
  }
  const v = String(value ?? "—");
  return <span className={cn("inline-flex px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider", PILL[v] ?? "bg-steel-100 text-charcoal-700")}>{v}</span>;
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-widest text-steel-500 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-steel-400 mt-1">{hint}</span>}
    </label>
  );
}

const inputCls = "w-full border border-steel-300 rounded-md px-3.5 py-2.5 text-sm outline-none focus:border-navy-800 focus:ring-2 focus:ring-navy-800/10 bg-white";

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, props.className)} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(inputCls, "min-h-[120px]", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={cn(inputCls, props.className)} />;
}

export function Check({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2.5 text-sm font-semibold text-charcoal-800 cursor-pointer">
      <input type="checkbox" {...props} className="h-4 w-4 accent-[#0C2B60]" /> {label}
    </label>
  );
}

export function SubmitButton({ children, danger }: { children: ReactNode; danger?: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className={cn("px-6 py-2.5 text-sm font-bold uppercase tracking-widest rounded-md text-white disabled:opacity-60", danger ? "bg-red-700 hover:bg-red-800" : "bg-navy-900 hover:bg-navy-800")}>
      {pending ? "Saving…" : children}
    </button>
  );
}

export function EmptyState({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="border border-dashed border-steel-300 rounded-lg p-10 text-center">
      <p className="font-condensed font-semibold uppercase text-navy-900">{title}</p>
      {sub && <p className="text-sm text-steel-500 mt-1">{sub}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function BtnLink({ href, children, danger }: { href: string; children: ReactNode; danger?: boolean }) {
  return <a href={href} className={cn("inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md border", danger ? "border-red-300 text-red-700 hover:bg-red-50" : "border-steel-300 text-navy-900 hover:border-navy-900")}>{children}</a>;
}

export function DeleteButton({ action, label = "Delete" }: { action: () => Promise<void>; label?: string }) {
  return (
    <form action={action} onSubmit={(e) => { if (!confirm(`Delete this item? This cannot be undone.`)) e.preventDefault(); }}>
      <button className="inline-flex items-center px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md border border-red-300 text-red-700 hover:bg-red-50">{label}</button>
    </form>
  );
}

export function BtnPrimary({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="inline-flex items-center px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-md bg-accent text-white hover:bg-accent-dark shadow-sm">{children}</a>;
}

export function AutoSubmitSelect({ name, defaultValue, options }: { name: string; defaultValue: string; options: string[] }) {
  return (
    <select name={name} defaultValue={defaultValue} onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()} className="border border-steel-300 rounded-md text-xs font-semibold px-2 py-1.5 bg-white cursor-pointer">
      {options.map((s) => <option key={s}>{s}</option>)}
    </select>
  );
}
