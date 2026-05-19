const clients = [
  'elumalab',
  'Lacar Associate',
  'RSG Recruiting Solutions',
  'Technologieunternehmen',
  'Innovationsunternehmen',
  'Datenanalyse-Startup'
];

export function TrustMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-[hsl(var(--border))] bg-[hsl(var(--bg))]">
      <div className="mx-auto flex max-w-[1280px] items-center px-6 lg:px-10">
        <span className="hidden shrink-0 pr-10 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-[hsl(var(--subtle))] md:inline">
          Vertraut von
        </span>
        <div
          className="flex gap-16 whitespace-nowrap py-6"
          style={{ animation: 'marquee 38s linear infinite' }}
        >
          {[...clients, ...clients, ...clients].map((name, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-3 font-display text-[1.05rem] tracking-tight text-[hsl(var(--ink))]/75"
            >
              <span
                aria-hidden
                className="h-1 w-1 rounded-full bg-[hsl(var(--accent))] opacity-70"
              />
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
