import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-widest" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-steel-400" />}
          {it.href ? (
            <Link href={it.href} className="text-steel-300 hover:text-white transition">{it.label}</Link>
          ) : (
            <span className="text-white" aria-current="page">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
