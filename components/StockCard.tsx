import { AnaliseAcao } from "@/lib/types";

interface StockCardProps {
  analise: AnaliseAcao;
}

const CORES_RECOMENDACAO: Record<AnaliseAcao["recomendacao"], string> = {
  comprar: "text-brand border-sage-500/40 bg-sage-500/10",
  observar: "text-caution border-amber-500/40 bg-amber-100 dark:bg-amber-500/10",
  evitar: "text-negative border-terracotta-500/40 bg-terracotta-500/10",
};

const LABEL_RECOMENDACAO: Record<AnaliseAcao["recomendacao"], string> = {
  comprar: "Favorável",
  observar: "Neutra",
  evitar: "Desfavorável",
};

function inicialBadge(ticker: string) {
  return ticker.slice(0, 2);
}

export default function StockCard({ analise }: StockCardProps) {
  const { indicadores } = analise;
  const positivo = indicadores.variacaoDia >= 0;

  return (
    <div className="rounded-md border border-cream-border bg-cream-card p-6 dark:border-graphite-700 dark:bg-graphite-900">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sage-500/10 font-mono text-xs font-semibold text-brand">
            {inicialBadge(analise.ticker)}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-mono text-lg font-semibold">{analise.ticker}</p>
              <span
                className={`rounded-md px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide ${
                  analise.origemAnalise === "dados_reais"
                    ? "bg-sage-500/10 text-brand"
                    : "bg-mist/10 text-mist"
                }`}
                title={
                  analise.origemAnalise === "dados_reais"
                    ? "Preço e indicadores vindos da brapi.dev. Podem ter atraso ou erros."
                    : "Dado de demonstração, não é cotação real"
                }
              >
                {analise.origemAnalise === "dados_reais" ? "dados reais" : "demo"}
              </span>
            </div>
            <p className="text-sm text-mist">
              {analise.nomeEmpresa} · {analise.setor}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-display text-2xl font-semibold">
            R$ {indicadores.precoAtual.toFixed(2)}
          </p>
          <p className={`font-mono text-xs ${positivo ? "text-brand" : "text-negative"}`}>
            {positivo ? "+" : ""}
            {indicadores.variacaoDia.toFixed(1)}% hoje
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-cream-border pt-5 font-mono text-xs text-mist dark:border-graphite-700 sm:grid-cols-5">
        <Indicador label="P/L" valor={indicadores.pl.toFixed(1)} />
        <Indicador label="ROE" valor={`${indicadores.roe.toFixed(1)}%`} />
        <Indicador label="DY" valor={`${indicadores.dy.toFixed(1)}%`} />
        <Indicador label="Dív/EBITDA" valor={indicadores.dividaLiquidaEbitda.toFixed(1)} />
        <Indicador label="Cresc. receita" valor={`${indicadores.crescimentoReceita5a.toFixed(1)}%`} />
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div
          role="img"
          aria-label={`Score ${analise.score.toFixed(1)} de 10`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border-2 border-sage-500/50 font-display text-lg font-semibold"
        >
          {analise.score.toFixed(1)}
        </div>
        <p className="text-sm leading-relaxed text-ink-soft dark:text-cream/80">
          {analise.explicacao}
        </p>
      </div>

      <div
        className={`mt-4 inline-block rounded-md border px-3 py-1 label-eyebrow ${CORES_RECOMENDACAO[analise.recomendacao]}`}
      >
        {LABEL_RECOMENDACAO[analise.recomendacao]}
      </div>
    </div>
  );
}

function Indicador({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-mist">{label}</p>
      <p className="mt-0.5 font-medium text-ink dark:text-cream">{valor}</p>
    </div>
  );
}
