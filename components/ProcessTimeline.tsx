const STEPS = ["Concept", "Feasibility", "Engineering", "Design", "Procurement", "Construction Support", "Inspection", "Testing", "Commissioning"];

export default function ProcessTimeline() {
  return (
    <div>
      {/* Desktop horizontal */}
      <div className="hidden md:flex items-stretch gap-0 overflow-x-auto">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-stretch flex-1 min-w-[110px]">
            <div className={`flex-1 border-y-2 border-l-2 last:border-r-2 px-3 py-5 text-center ${i === 0 ? "bg-navy-900 text-white border-navy-900" : i === STEPS.length - 1 ? "bg-accent text-white border-accent" : "bg-white border-steel-200"}`}>
              <div className={`font-condensed text-xs font-bold ${i === 0 || i === STEPS.length - 1 ? "text-white/70" : "text-accent"}`}>{String(i + 1).padStart(2, "0")}</div>
              <div className="font-condensed text-[13px] font-semibold uppercase tracking-wide mt-1">{s}</div>
            </div>
            {i < STEPS.length - 1 && <div className="self-center px-0.5 text-accent font-bold">→</div>}
          </div>
        ))}
      </div>
      {/* Mobile vertical */}
      <ol className="md:hidden relative border-l-2 border-navy-900 ml-2 space-y-4">
        {STEPS.map((s, i) => (
          <li key={s} className="ml-4 bg-white border border-steel-200 p-4">
            <span className="text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
            <div className="font-condensed font-semibold uppercase text-navy-900">{s}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
