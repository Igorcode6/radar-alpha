"use client";

import { Fragment, useState } from "react";
import { AnaliseAcao } from "@/lib/types";

type Filtro = "todas" | AnaliseAcao["recomendacao"];

const FILTROS: { id: Filtro; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "comprar", label: "Favorável" },
  { id: "observar", label: "Neutra" },
  { id: "evitar", label: "Desfavorável" },
];

const COR_SINAL: Record<AnaliseAcao["recomendacao"], string> = {
  comprar: "text-brand border-sage-500/40 bg-sage-500/10",
  observar: "text-caution border-amber-500/40 bg-amber-100 dark:bg-amber-500/10",
  evitar: "text-negative border-terracotta-500/40 bg-terracotta-500/10",
};

const LABEL_SINAL: Record<AnaliseAcao["recomendacao"], string> = {
  comprar: "Favorável",
  observar: "Neutra",
  evitar: "Desfavorável",
};

export default function ResultadosTabela({ resultados }: { resultados: AnaliseAcao[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [aberta, setAberta] = useState<string | null>(null);

  const visiveis =
    filtro === "todas" ? resultados : resultados.filter((r) => r.recomendacao === filtro);
  const contar = (f: Filtro) =>
    f === "todas" ? resultados.length : resultados.filter((r) => r.recomendacao === f).length;

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por tendência">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtro === f.id}
            onClick={() => setFiltro(f.id)}
            className={`rounded-md border px-3.5 py-1.5 font-mono text-xs transition ${
              filtro === f.id
                ? "border-sage-500 bg-sage-500/15 text-brand"
                : "border-cream-border text-mist hover:border-sage-500/40 dark:border-graphite-700"
            }`}
          >
            {f.label} <span className="opacity-70">{contar(f.id)}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border border-cream-border bg-cream-card dark:border-graphite-700 dark:bg-graphite-900">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Ações analisadas, com preço, variação, score e tendência</caption>
          <thead>
            <tr className="border-b border-cream-border font-mono text-[11px] uppercase tracking-[0.12em] text-mist dark:border-graphite-700">
              <th scope="col" className="px-4 py-3 font-normal">Ação</th>
              <th scope="col" className="px-4 py-3 text-right font-normal">Preço</th>
              <th scope="col" className="px-4 py-3 text-right font-normal">Dia</th>
              <th scope="col" className="px-4 py-3 text-right font-normal">Score</th>
              <th scope="col" className="px-4 py-3 text-right font-normal">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((a) => {
              const ind = a.indicadores;
              const positivo = ind.variacaoDia >= 0;
              const expandida = aberta === a.ticker;
              return (
                <Fragment key={a.ticker}>
                  <tr className="border-b border-cream-border last:border-0 dark:border-graphite-700">
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        aria-expanded={expandida}
                        aria-controls={`detalhe-${a.ticker}`}
                        onClick={() => setAberta(expandida ? null : a.ticker)}
                        className="flex items-center gap-3 text-left"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-sage-500/10 font-mono text-[11px] font-semibold text-brand">
                          {a.ticker.slice(0, 2)}
                        </span>
                        <span>
                          <span className="block font-mono font-semibold">
                            {a.ticker}
                            <span
                              className="ml-2 rounded-md bg-mist/10 px-1.5 py-0.5 text-[9px] uppercase text-mist"
                              title={
                                a.origemAnalise === "dados_reais"
                                  ? "Dados da brapi.dev. Podem ter atraso ou erros."
                                  : "Dado de demonstração, não é cotação real"
                              }
                            >
                              {a.origemAnalise === "dados_reais" ? "dados reais" : "demo"}
                            </span>
                          </span>
                          <span className="block text-xs text-mist">{a.nomeEmpresa}</span>
                        </span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right font-mono">R$ {ind.precoAtual.toFixed(2)}</td>
                    <td className={`px-4 py-3 text-right font-mono ${positivo ? "text-brand" : "text-negative"}`}>
                      {positivo ? "+" : ""}
                      {ind.variacaoDia.toFixed(2)}%
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold">{a.score.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right">
                      <span className={`inline-block rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase ${COR_SINAL[a.recomendacao]}`}>
                        {LABEL_SINAL[a.recomendacao]}
                      </span>
                    </td>
                  </tr>
                  {expandida && (
                    <tr id={`detalhe-${a.ticker}`} className="border-b border-cream-border bg-sage-500/5 dark:border-graphite-700">
                      <td colSpan={5} className="px-4 py-4">
                        <div className="grid grid-cols-2 gap-3 font-mono text-xs text-mist sm:grid-cols-5">
                          <Dado label="P/L" valor={ind.pl.toFixed(1)} />
                          <Dado label="ROE" valor={`${ind.roe.toFixed(1)}%`} />
                          <Dado label="DY" valor={`${ind.dy.toFixed(1)}%`} />
                          <Dado label="Dív/EBITDA" valor={ind.dividaLiquidaEbitda.toFixed(1)} />
                          <Dado label="Cresc. receita" valor={`${ind.crescimentoReceita5a.toFixed(1)}%`} />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-ink-soft dark:text-cream/80">
                          {a.explicacao}
                        </p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
            {visiveis.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-mist">
                  Nenhuma ação nessa tendência.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-mist">Clique em uma ação para ver os indicadores e a explicação.</p>
    </div>
  );
}

function Dado({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p>{label}</p>
      <p className="mt-0.5 font-medium text-ink dark:text-cream">{valor}</p>
    </div>
  );
}
