"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Mail, FileText, Briefcase, Newspaper, Settings, LogOut } from "lucide-react";

const LINKS = [
  ["Overview", "/admin", LayoutDashboard],
  ["Projects", "/admin/projects", FolderKanban],
  ["Enquiries", "/admin/inquiries", Mail],
  ["Quotes", "/admin/quotes", FileText],
  ["Jobs", "/admin/jobs", Briefcase],
  ["Insights", "/admin/articles", Newspaper],
  ["Site & Stats", "/admin/settings", Settings],
] as const;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Login page: form only — no navbar (root layout), no sidebar.
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-steel-100/60 flex">
      <aside className="w-60 shrink-0 bg-navy-950 text-steel-200 hidden md:flex flex-col">
        <div className="p-5 border-b border-white/10">
          <div className="font-condensed font-semibold text-white tracking-wide">VENTRON ADMIN</div>
          <div className="text-[10px] uppercase tracking-widest text-steel-400">Mechanical Systems Ltd</div>
        </div>
        <nav className="p-3 space-y-1 text-sm font-semibold">
          {LINKS.map(([l, h, Icon]) => (
            <Link key={h} href={h} className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-white/10 hover:text-white rounded-sm"><Icon size={16} /> {l}</Link>
          ))}
        </nav>
        <div className="mt-auto p-3 border-t border-white/10 text-sm">
          <Link href="/" className="block px-3 py-2 hover:text-white">← View site</Link>
          <a href="/api/auth/signout" className="flex items-center gap-2 px-3 py-2 hover:text-white"><LogOut size={15} /> Sign out</a>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="md:hidden bg-navy-950 text-white px-4 py-3 flex gap-3 overflow-x-auto text-sm font-semibold">
          {LINKS.map(([l, h]) => <Link key={h} href={h} className="whitespace-nowrap">{l}</Link>)}
        </div>
        <div className="p-4 md:p-8 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
