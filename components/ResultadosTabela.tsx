"use client";

import { Fragment, useState } from "react";
import { AnaliseAcao } from "@/lib/types";
import {
  formatarMoeda,
  formatarNumero,
  formatarPercentual,
  formatarVariacao,
} from "@/lib/formatar";

type Tendencia = AnaliseAcao["recomendacao"];
type Filtro = "todas" | Tendencia;

const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: "todas", rotulo: "Todas" },
  { id: "comprar", rotulo: "Favorável" },
  { id: "observar", rotulo: "Neutra" },
  { id: "evitar", rotulo: "Desfavorável" },
];

const ROTULO_TENDENCIA: Record<Tendencia, string> = {
  comprar: "Favorável",
  observar: "Neutra",
  evitar: "Desfavorável",
};

// O texto da etiqueta sempre diz a tendência: a cor nunca é o único sinal.
const COR_TENDENCIA: Record<Tendencia, string> = {
  comprar: "border-alta/60 bg-alta/10 text-alta",
  observar: "border-ouro-claro/60 bg-ouro-claro/10 text-ouro-claro",
  evitar: "border-baixa/60 bg-baixa/10 text-baixa",
};

function corVariacao(valor: number): string {
  if (Number(Math.abs(valor).toFixed(2)) === 0) return "text-suave";
  return valor > 0 ? "text-alta" : "text-baixa";
}

export default function ResultadosTabela({ resultados }: { resultados: AnaliseAcao[] }) {
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [aberta, setAberta] = useState<string | null>(null);

  const visiveis =
    filtro === "todas" ? resultados : resultados.filter((r) => r.recomendacao === filtro);
  const contar = (f: Filtro) =>
    f === "todas" ? resultados.length : resultados.filter((r) => r.recomendacao === f).length;

  return (
    <div>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filtrar por tendência">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filtro === f.id}
            onClick={() => setFiltro(f.id)}
            className={`min-h-[44px] rounded border px-5 text-sm transition ${
              filtro === f.id
                ? "border-ouro bg-superficie text-ouro-claro"
                : "border-ouro-apagado text-creme hover:border-ouro"
            }`}
          >
            {f.rotulo} <span className="tabular-nums text-suave">{contar(f.id)}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 overflow-x-auto rounded-md border border-ouro-linha bg-superficie">
        <table className="w-full min-w-[680px] border-collapse text-left text-sm tabular-nums">
          <caption className="sr-only">
            Ações analisadas, com preço, variação, score e tendência
          </caption>
          <thead>
            <tr className="border-b border-ouro-linha">
              <th scope="col" className="rotulo px-5 py-4 font-normal">Ação</th>
              <th scope="col" className="rotulo px-5 py-4 text-right font-normal">Preço</th>
              <th scope="col" className="rotulo px-5 py-4 text-right font-normal">Dia</th>
              <th scope="col" className="rotulo px-5 py-4 text-right font-normal">Score</th>
              <th scope="col" className="rotulo px-5 py-4 text-right font-normal">Tendência</th>
            </tr>
          </thead>
          <tbody>
            {visiveis.map((a) => {
              const ind = a.indicadores;
              const expandida = aberta === a.ticker;
              return (
                <Fragment key={a.ticker}>
                  <tr className="border-b border-ouro-linha/30 last:border-0">
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        aria-expanded={expandida}
                        aria-controls={`detalhe-${a.ticker}`}
                        onClick={() => setAberta(expandida ? null : a.ticker)}
                        className="flex flex-col gap-0.5 text-left"
                      >
                        <span
                          className={`text-[15px] font-semibold ${
                            expandida ? "text-ouro-claro" : "text-creme"
                          }`}
                        >
                          {a.ticker}
                          <span
                            className="ml-2 rounded-[3px] border border-ouro-apagado px-1.5 py-px text-[11px] font-normal uppercase tracking-[0.08em] text-suave"
                            title={
                              a.origemAnalise === "dados_reais"
                                ? "Dados da brapi.dev. Podem ter atraso ou erros."
                                : "Dado de demonstração, não é cotação real"
                            }
                          >
                            {a.origemAnalise === "dados_reais" ? "dados reais" : "demo"}
                          </span>
                        </span>
                        <span className="text-[13px] text-suave">{a.nomeEmpresa}</span>
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">{formatarMoeda(ind.precoAtual)}</td>
                    <td className={`px-5 py-4 text-right ${corVariacao(ind.variacaoDia)}`}>
                      {formatarVariacao(ind.variacaoDia)}
                    </td>
                    <td className="px-5 py-4 text-right text-base font-semibold">
                      {formatarNumero(a.score, 1)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className={`inline-block rounded border px-3 py-1.5 text-xs uppercase tracking-[0.08em] ${COR_TENDENCIA[a.recomendacao]}`}
                      >
                        {ROTULO_TENDENCIA[a.recomendacao]}
                      </span>
                    </td>
                  </tr>
                  {expandida && (
                    <tr
                      id={`detalhe-${a.ticker}`}
                      className="border-b border-ouro-linha bg-ouro/[0.07] last:border-0"
                    >
                      <td colSpan={5} className="px-5 pb-6 pt-5">
                        <div className="flex flex-wrap gap-x-12 gap-y-5">
                          <Dado rotulo="P/L" valor={formatarNumero(ind.pl, 1)} />
                          <Dado rotulo="ROE" valor={formatarPercentual(ind.roe)} />
                          <Dado rotulo="DY" valor={formatarPercentual(ind.dy)} />
                          <Dado rotulo="Dív/EBITDA" valor={formatarNumero(ind.dividaLiquidaEbitda, 1)} />
                          <Dado rotulo="Cresc. receita" valor={formatarPercentual(ind.crescimentoReceita5a)} />
                        </div>
                        <p className="mt-4 max-w-[720px] text-[15px] leading-[1.7]">
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
                <td colSpan={5} className="px-5 py-8 text-center text-suave">
                  Nenhuma ação nessa tendência.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[13px] text-suave">
        Clique em uma ação para ver os indicadores e a explicação. Valores marcados como
        “demo” são de demonstração, não são cotações reais.
      </p>
    </div>
  );
}

function Dado({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div>
      <p className="rotulo tracking-[0.14em]">{rotulo}</p>
      <p className="mt-1.5 text-base font-medium">{valor}</p>
    </div>
  );
}
