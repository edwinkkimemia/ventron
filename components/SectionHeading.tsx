export default function SectionHeading({ kicker, title, text, dark = false }: { kicker: string; title: string; text?: string; dark?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="h-[3px] w-10 bg-accent" aria-hidden />
        <span className={`text-xs font-bold uppercase tracking-[0.22em] ${dark ? "text-steel-200" : "text-accent"}`}>{kicker}</span>
      </div>
      <h2 className={`font-condensed mt-3 text-3xl md:text-4xl font-semibold uppercase tracking-wide ${dark ? "text-white" : "text-navy-900"}`}>{title}</h2>
      {text && <p className={`mt-3 leading-relaxed ${dark ? "text-steel-200" : "text-charcoal-700"}`}>{text}</p>}
    </div>
  );
}
