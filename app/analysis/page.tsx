"use client";

import { useState } from "react";
import Header from "@/components/Header";
import ProfileSelector from "@/components/ProfileSelector";
import StockCard from "@/components/StockCard";
import StatCard from "@/components/StatCard";
import { TICKERS_DISPONIVEIS } from "@/lib/mockData";
import { AnaliseAcao, PerfilInvestidor } from "@/lib/types";

export default function AnalysisPage() {
  const [perfil, setPerfil] = useState<PerfilInvestidor | null>(null);
  const [tickersSelecionados, setTickersSelecionados] = useState<string[]>(
    TICKERS_DISPONIVEIS
  );
  const [resultados, setResultados] = useState<AnaliseAcao[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function alternarTicker(ticker: string) {
    setTickersSelecionados((atual) =>
      atual.includes(ticker)
        ? atual.filter((t) => t !== ticker)
        : [...atual, ticker]
    );
  }

  async function analisar() {
    if (!perfil || tickersSelecionados.length === 0) return;

    setCarregando(true);
    setErro(null);

    try {
      const resposta = await fetch("/api/analyze-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickers: tickersSelecionados, perfil }),
      });

      if (!resposta.ok) {
        const dadosErro = await resposta.json();
        throw new Error(dadosErro.erro ?? "Erro ao analisar ações.");
      }

      const dados = await resposta.json();
      setResultados(dados.resultados);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro inesperado.");
    } finally {
      setCarregando(false);
    }
  }

  const scoreMedio =
    resultados.length > 0
      ? (resultados.reduce((soma, r) => soma + r.score, 0) / resultados.length).toFixed(1)
      : null;
  const recomendadas = resultados.filter((r) => r.recomendacao === "comprar").length;

  return (
    <main className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h1 className="font-display text-3xl font-semibold">Analisar ações</h1>
        <p className="mt-2 text-mist">Escolha seu perfil e as ações que quer analisar.</p>

        <div className="mt-8">
          <ProfileSelector perfilSelecionado={perfil} aoSelecionar={setPerfil} />
        </div>

        <div className="mt-8">
          <p className="label-eyebrow">Ações</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TICKERS_DISPONIVEIS.map((ticker) => {
              const ativo = tickersSelecionados.includes(ticker);
              return (
                <button
                  key={ticker}
                  onClick={() => alternarTicker(ticker)}
                  className={`rounded-full border px-4 py-1.5 font-mono text-sm transition ${
                    ativo
                      ? "border-sage-500 bg-sage-500/10 text-sage-600"
                      : "border-cream-border text-mist hover:border-sage-500/40 dark:border-graphite-700"
                  }`}
                >
                  {ticker}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={analisar}
          disabled={!perfil || tickersSelecionados.length === 0 || carregando}
          className="mt-8 rounded-full bg-sage-500 px-6 py-3 font-mono text-sm uppercase tracking-wide text-cream transition hover:bg-sage-600 disabled:cursor-not-allowed disabled:bg-cream-border disabled:text-mist"
        >
          {carregando ? "Analisando..." : "Analisar"}
        </button>

        {erro && (
          <p className="mt-4 rounded-xl border border-terracotta-500/40 bg-terracotta-500/10 px-4 py-3 text-sm text-terracotta-500">
            {erro}
          </p>
        )}

        {resultados.length > 0 && (
          <>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <StatCard
                icone="pulso"
                label="Ações analisadas"
                valor={String(resultados.length)}
              />
              <StatCard
                icone="grafico"
                label="Score médio"
                valor={scoreMedio ?? "—"}
                legenda="de 0 a 10"
              />
              <StatCard
                icone="alvo"
                label="Recomendadas"
                valor={String(recomendadas)}
                legenda="sinal de compra"
              />
            </div>

            <div className="mt-6 grid gap-5">
              {resultados.map((analise) => (
                <StockCard key={analise.ticker} analise={analise} />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
