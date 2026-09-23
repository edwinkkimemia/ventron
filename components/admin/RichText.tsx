"use client";
import { useRef, useState } from "react";
import { Bold, Italic, Heading2, List, ListOrdered, Link2, Quote, Eye, PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

// Markdown-lite editor matching the site's renderers:
// "## " headings, "- " bullets, "1. " steps, [label](url) links, "> " quotes.
export default function RichText({ name, defaultValue = "", hint }: { name: string; defaultValue?: string; hint?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [preview, setPreview] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  function wrap(before: string, after = "", placeholder = "text") {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s, selectionEnd: e } = el;
    const sel = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + sel + after + value.slice(e);
    setValue(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(s + before.length, s + before.length + sel.length);
    });
  }

  function linePrefix(prefix: string) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: s } = el;
    const lineStart = value.lastIndexOf("\n", s - 1) + 1;
    const next = value.slice(0, lineStart) + prefix + value.slice(lineStart);
    setValue(next);
    requestAnimationFrame(() => el.focus());
  }

  const tools = [
    { Icon: Bold, label: "Bold", fn: () => wrap("**", "**") },
    { Icon: Italic, label: "Italic", fn: () => wrap("*", "*") },
    { Icon: Heading2, label: "Heading", fn: () => linePrefix("## ") },
    { Icon: List, label: "Bullets", fn: () => linePrefix("- ") },
    { Icon: ListOrdered, label: "Numbered", fn: () => linePrefix("1. ") },
    { Icon: Quote, label: "Quote", fn: () => linePrefix("> ") },
    { Icon: Link2, label: "Link", fn: () => wrap("[", "](/url)") },
  ];

  return (
    <div className="border border-steel-300 rounded-md overflow-hidden bg-white">
      <div className="flex items-center gap-1 border-b border-steel-200 bg-steel-100/60 px-2 py-1.5">
        {tools.map(({ Icon, label, fn }) => (
          <button key={label} type="button" title={label} onClick={fn} className="p-2 rounded text-charcoal-700 hover:bg-white hover:text-navy-900 border border-transparent hover:border-steel-200">
            <Icon size={15} />
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          <button type="button" onClick={() => setPreview(false)} className={cn("flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded", !preview ? "bg-navy-900 text-white" : "text-steel-500")}><PenLine size={13} /> Write</button>
          <button type="button" onClick={() => setPreview(true)} className={cn("flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded", preview ? "bg-navy-900 text-white" : "text-steel-500")}><Eye size={13} /> Preview</button>
        </div>
      </div>
      {preview ? (
        <div className="prose-eng min-h-[160px] p-4 max-w-none"><PreviewBody text={value} /></div>
      ) : (
        <textarea ref={ref} name={name} value={value} onChange={(e) => setValue(e.target.value)} rows={12} className="w-full p-4 text-sm leading-relaxed outline-none font-mono" placeholder="Write… ## Headings, - bullets, [label](/link)" />
      )}
      {hint && <p className="px-3 py-2 text-xs text-steel-400 border-t border-steel-100 bg-steel-100/40">{hint}</p>}
    </div>
  );
}

function inline(t: string, k: string) {
  const parts = t.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (m) return <a key={i} className="text-accent font-semibold underline">{m[1]}</a>;
    if (/^\*\*.+\*\*$/.test(p)) return <strong key={i}>{p.slice(2, -2)}</strong>;
    if (/^\*.+\*$/.test(p)) return <em key={i}>{p.slice(1, -1)}</em>;
    return <span key={i}>{p}</span>;
  });
}

export function PreviewBody({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  if (!blocks.length) return <p className="text-steel-400 text-sm">Nothing to preview yet.</p>;
  return (
    <>
      {blocks.map((b, i) => {
        if (b.startsWith("## ")) return <h2 key={i}>{b.replace(/^##\s*/, "")}</h2>;
        const lines = b.split("\n").map((l) => l.trim()).filter(Boolean);
        if (lines.length && lines.every((l) => l.startsWith("- "))) {
          return <ul key={i}>{lines.map((l, j) => <li key={j}>{inline(l.replace(/^-+\s*/, ""), `${i}-${j}`)}</li>)}</ul>;
        }
        if (b.startsWith("> ")) return <blockquote key={i} className="border-l-4 border-accent pl-4 italic">{inline(b.replace(/^>+\s*/, ""), `${i}`)}</blockquote>;
        return <p key={i}>{inline(b, `${i}`)}</p>;
      })}
    </>
  );
}
