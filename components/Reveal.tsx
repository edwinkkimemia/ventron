"use client";
import { useEffect } from "react";

export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return <div className={`reveal ${className}`}>{children}</div>;
}
