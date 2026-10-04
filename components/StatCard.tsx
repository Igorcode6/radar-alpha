interface StatCardProps {
  label: string;
  valor: string;
  delta?: string;
  deltaPositivo?: boolean;
  legenda?: string;
  icone: "pulso" | "alvo" | "raio" | "grafico";
}

const ICONES: Record<StatCardProps["icone"], JSX.Element> = {
  pulso: (
    <path d="M2 12h4l2 7 4-14 3 10 2-3h5" />
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  raio: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  grafico: <path d="M3 17l5-5 4 4 8-9" />,
};

export default function StatCard({
  label,
  valor,
  delta,
  deltaPositivo = true,
  legenda,
  icone,
}: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-cream-border bg-cream-card p-5 dark:border-graphite-700 dark:bg-graphite-900">
      <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-full border border-cream-border text-sage-500/70 dark:border-graphite-700">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {ICONES[icone]}
        </svg>
      </div>
      <p className="label-eyebrow">{label}</p>
      <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{valor}</p>
      {delta && (
        <p className={`mt-1 font-mono text-sm ${deltaPositivo ? "text-sage-500" : "text-terracotta-500"}`}>
          {deltaPositivo ? "↗ " : "↘ "}
          {delta}
        </p>
      )}
      {legenda && <p className="mt-0.5 text-sm text-mist">{legenda}</p>}
    </div>
  );
}
