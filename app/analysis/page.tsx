"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import ProfileSelector from "@/components/ProfileSelector";
import ResultadosTabela from "@/components/ResultadosTabela";
import { TICKERS_DISPONIVEIS } from "@/lib/mockData";
import { formatarNumero } from "@/lib/formatar";
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
      ? formatarNumero(
          resultados.reduce((soma, r) => soma + r.score, 0) / resultados.length,
          1
        )
      : null;
  const favoraveis = resultados.filter((r) => r.recomendacao === "comprar").length;

  return (
    <main id="conteudo" className="flex-1">
      <Container className="pb-24 pt-14 sm:pt-16">
        <Eyebrow>Análise</Eyebrow>
        <h1 className="mt-5 font-display text-[46px] font-normal leading-[1.15]">
          Analisar ações
        </h1>
        <p className="mt-3 text-base leading-relaxed text-suave">
          Escolha seu perfil e as ações que quer analisar.
        </p>

        <p className="rotulo mt-12 tracking-[0.22em]">Perfil</p>
        <div className="mt-3.5">
          <ProfileSelector perfilSelecionado={perfil} aoSelecionar={setPerfil} />
        </div>

        <p className="rotulo mt-10 tracking-[0.22em]">Ações</p>
        <div className="mt-3.5 flex flex-wrap gap-3">
          {TICKERS_DISPONIVEIS.map((ticker) => {
            const ativo = tickersSelecionados.includes(ticker);
            return (
              <button
                key={ticker}
                type="button"
                aria-pressed={ativo}
                onClick={() => alternarTicker(ticker)}
                className={`min-h-[44px] rounded border px-5 text-sm font-semibold tabular-nums transition ${
                  ativo
                    ? "border-ouro bg-superficie text-ouro-claro"
                    : "border-ouro-apagado text-suave hover:border-ouro"
                }`}
              >
                {ticker}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={analisar}
          disabled={!perfil || tickersSelecionados.length === 0 || carregando}
          className="mt-9 min-h-[48px] rounded bg-gradient-to-br from-ouro to-ouro-claro px-8 text-sm font-semibold tracking-[0.06em] text-fundo transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {carregando ? "Analisando..." : "Analisar"}
        </button>
        {!perfil && (
          <p className="mt-3 text-sm text-suave">Escolha um perfil para continuar.</p>
        )}

        {erro && (
          <p
            role="alert"
            className="mt-5 rounded border border-baixa/50 bg-baixa/10 px-4 py-3 text-sm text-baixa"
          >
            {erro}
          </p>
        )}

        <p className="sr-only" role="status" aria-live="polite">
          {carregando
            ? "Analisando as ações."
            : resultados.length > 0
              ? `${resultados.length} ações analisadas.`
              : ""}
        </p>

        {resultados.length > 0 && (
          <>
            <div className="mt-[72px] flex flex-wrap border-y border-ouro-linha">
              <Resumo rotulo="Ações analisadas" valor={String(resultados.length)} />
              <Resumo
                rotulo="Score médio"
                valor={scoreMedio ?? "-"}
                legenda="de 0 a 10"
                separado
              />
              <Resumo
                rotulo="Tendência favorável"
                valor={String(favoraveis)}
                legenda="pela fórmula do projeto"
                separado
              />
            </div>

            <div className="mt-10">
              <ResultadosTabela resultados={resultados} />
            </div>

            <p className="mt-7 max-w-[760px] text-[13px] leading-[1.7] text-suave">
              Conteúdo informativo e educacional, não é recomendação de investimento.
              Os dados podem ter atraso ou erros, e a explicação pode ser gerada por
              inteligência artificial. Veja os{" "}
              <Link
                href="/termos"
                className="text-ouro-claro underline underline-offset-2 hover:text-creme"
              >
                Termos de Uso
              </Link>
              .
            </p>
          </>
        )}
      </Container>
    </main>
  );
}

function Resumo({
  rotulo,
  valor,
  legenda,
  separado = false,
}: {
  rotulo: string;
  valor: string;
  legenda?: string;
  separado?: boolean;
}) {
  return (
    <div
      className={`min-w-0 flex-[1_1_220px] py-7 ${
        separado ? "border-ouro-linha sm:border-l sm:pl-8" : ""
      }`}
    >
      <p className="rotulo tracking-[0.22em]">{rotulo}</p>
      <p className="mt-2.5 font-display text-[44px] leading-none tabular-nums text-ouro-claro">
        {valor}
      </p>
      {legenda && <p className="mt-2 text-[13px] text-suave">{legenda}</p>}
    </div>
  );
}
