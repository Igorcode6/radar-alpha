import { AnaliseAcao, PerfilInvestidor } from "@/lib/types";
import { buscarDadosVariasAcoes } from "./marketData";
import { calcularScore, definirRecomendacao } from "./scoring";
import { gerarExplicacao } from "./explicacao";

/**
 * Ponto único de entrada para "analisar ações". Reúne os serviços menores
 * (dados de mercado, scoring, explicação) e devolve o formato final que a
 * API e o frontend consomem.
 *
 * Ponto de extensão para IA: quando quiser que a OpenAI/Claude gere a
 * explicação (ou até recalibre o score), troque apenas a chamada a
 * `gerarExplicacao` por `gerarExplicacaoComIA` em `services/aiProvider.ts`.
 */
export async function analisarAcoes(
  tickers: string[],
  perfil: PerfilInvestidor
): Promise<AnaliseAcao[]> {
  const dados = await buscarDadosVariasAcoes(tickers);

  return dados.map((acao) => {
    const score = calcularScore(acao.indicadores, perfil);
    const recomendacao = definirRecomendacao(score);
    const explicacao = gerarExplicacao(acao.ticker, acao.indicadores, perfil, score);

    const analise: AnaliseAcao = {
      ticker: acao.ticker,
      nomeEmpresa: acao.nomeEmpresa,
      setor: acao.setor,
      indicadores: acao.indicadores,
      score,
      explicacao,
      recomendacao,
      perfilAnalisado: perfil,
      geradoEm: new Date().toISOString(),
      origemAnalise: acao.origem ?? "mock",
    };

    return analise;
  }).sort((a, b) => b.score - a.score);
}
