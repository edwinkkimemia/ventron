"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Mail, FileText, Briefcase, Newspaper, Layers, Wrench, Settings, LogOut, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const GROUPS: { label: string; links: { href: string; label: string; Icon: any }[] }[] = [
  { label: "Overview", links: [{ href: "/admin", label: "Dashboard", Icon: LayoutDashboard }] },
  {
    label: "Content", links: [
      { href: "/admin/projects", label: "Projects", Icon: FolderKanban },
      { href: "/admin/articles", label: "Insights", Icon: Newspaper },
      { href: "/admin/services", label: "Services", Icon: Layers },
      { href: "/admin/industries", label: "Industries", Icon: Globe },
      { href: "/admin/equipment", label: "Equipment", Icon: Wrench },
      { href: "/admin/jobs", label: "Jobs", Icon: Briefcase },
    ]
  },
  {
    label: "Inbox", links: [
      { href: "/admin/inquiries", label: "Enquiries", Icon: Mail },
      { href: "/admin/quotes", label: "Quotes", Icon: FileText },
    ]
  },
  { label: "System", links: [{ href: "/admin/settings", label: "Site & Stats", Icon: Settings }] },
];

function active(path: string, href: string) {
  return href === "/admin" ? path === "/admin" : path === href || path.startsWith(href + "/");
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;

  const nav = (mobile = false) => (
    <>
      {GROUPS.map((g) => (
        <div key={g.label} className={mobile ? "min-w-max" : ""}>
          {!mobile && <div className="px-3 pt-4 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-steel-500">{g.label}</div>}
          <div className={mobile ? "flex gap-1" : "space-y-0.5 px-2"}>
            {g.links.map(({ href, label, Icon }) => (
              <Link key={href} href={href} className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-semibold transition",
                active(pathname, href) ? "bg-accent text-white shadow" : "text-steel-200 hover:bg-white/10 hover:text-white"
              )}>
                <Icon size={16} /> {!mobile && label}
                {mobile && <span className="sr-only">{label}</span>}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-steel-100/70 flex">
      <aside className="w-64 shrink-0 bg-navy-950 text-steel-200 hidden md:flex flex-col sticky top-0 h-screen">
        <Link href="/admin" className="block px-4 pt-5 pb-4 border-b border-white/10">
          <div className="inline-block bg-white rounded px-2 py-1">
            <Image src="/ventron-logo.png" alt="Ventron" width={200} height={83} className="h-9 w-auto" />
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-steel-400">Admin Console</div>
        </Link>
        <nav className="flex-1 overflow-y-auto pb-4">{nav()}</nav>
        <div className="p-3 border-t border-white/10 text-sm space-y-1">
          <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 hover:text-white"><Globe size={15} /> View site</Link>
          <a href="/api/auth/signout" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 hover:text-white"><LogOut size={15} /> Sign out</a>
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <div className="md:hidden bg-navy-950 text-white px-3 py-2.5 flex gap-4 overflow-x-auto items-center sticky top-0 z-30">
          <span className="text-[10px] font-bold uppercase tracking-widest text-steel-400 shrink-0">Ventron<br />Admin</span>
          {nav(true)}
        </div>
        <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
