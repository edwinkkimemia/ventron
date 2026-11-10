import SectionHeading from "./SectionHeading";

export default function StatsSection({ stats }: { stats: { label: string; value: string; suffix?: string }[] }) {
  const items = stats.length ? stats : [
    { label: "Engineering Disciplines", value: "8" },
    { label: "Industries Served", value: "8" },
    { label: "Core Services", value: "8" },
    { label: "Regional Coverage", value: "EA" },
  ];
  return (
    <section className="bg-navy-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-transparent to-navy-950" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-14">
        <SectionHeading dark kicker="Ventron in numbers" title="Capacity you can verify" text="Key figures are managed in the admin dashboard — no hard-coded marketing numbers." />
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {items.map((s) => (
            <div key={s.label} className="bg-navy-950 p-6 md:p-8">
              <div className="font-condensed text-4xl md:text-5xl font-semibold text-white">{s.value}<span className="text-accent">{s.suffix ?? ""}</span></div>
              <div className="mt-2 text-xs font-bold uppercase tracking-widest text-steel-300">{s.label}</div>
              <div className="mt-3 h-[3px] w-10 bg-accent" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
