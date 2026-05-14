const clients = [
  'elumalab', 'Lacar Associate', 'RSG Recruiting Solutions',
  'Technologieunternehmen', 'Innovationsunternehmen', 'Datenanalyse-Startup',
  'elumalab', 'Lacar Associate', 'RSG Recruiting Solutions',
  'Technologieunternehmen', 'Innovationsunternehmen', 'Datenanalyse-Startup',
];

export function TrustMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-white/[0.012] py-4">
      <div
        className="flex gap-14 whitespace-nowrap"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {[...clients, ...clients].map((name, i) => (
          <span
            key={i}
            className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[hsl(var(--muted))]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--neon))] opacity-70" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
