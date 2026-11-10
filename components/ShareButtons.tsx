"use client";
import { useState } from "react";
import { Link2, Check } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { XIcon, FacebookIcon, LinkedinIcon } from "./BrandIcons";

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const text = `${title} — Ventron Mechanical Systems Ltd`;
  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, Icon: XIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, Icon: FacebookIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, Icon: LinkedinIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, Icon: WhatsAppIcon },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="flex items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener" aria-label={label} title={label} className="grid place-items-center h-10 w-10 border border-steel-300 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition">
          <Icon size={16} />
        </a>
      ))}
      <button onClick={copy} aria-label="Copy article link" title="Copy link" className="grid place-items-center h-10 w-10 border border-steel-300 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900 transition">
        {copied ? <Check size={16} className="text-green-600" /> : <Link2 size={16} />}
      </button>
      {copied && <span className="text-xs font-bold text-green-700">Copied</span>}
    </div>
  );
}
