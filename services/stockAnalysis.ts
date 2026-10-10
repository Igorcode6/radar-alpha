import { AnaliseAcao, PerfilInvestidor } from "@/lib/types";
import { buscarDadosVariasAcoes } from "./marketData";
import { calcularScore, definirRecomendacao } from "./scoring";
import { gerarExplicacao } from "./explicacao";
import { gerarExplicacaoComIA } from "./aiProvider";

/**
 * Ponto único de entrada para "analisar ações". Reúne os serviços menores
 * (dados de mercado, scoring, explicação) e devolve o formato final que a
 * API e o frontend consomem.
 *
 * Explicação: tenta gerar com IA (`gerarExplicacaoComIA`, via Anthropic).
 * Se `ANTHROPIC_API_KEY` não estiver configurada, ou a chamada falhar por
 * qualquer motivo, cai automaticamente para o texto por regras
 * (`gerarExplicacao`) — mesmo padrão de fallback usado pros dados de
 * mercado em `services/marketData.ts`. O site nunca quebra por causa
 * disso, só deixa de usar IA naquela análise.
 */
async function obterExplicacao(
  ticker: string,
  indicadores: AnaliseAcao["indicadores"],
  perfil: PerfilInvestidor,
  score: number
): Promise<string> {
  try {
    return await gerarExplicacaoComIA(ticker, indicadores, perfil, score);
  } catch (erro) {
    console.warn(`Explicação por IA falhou para ${ticker}, caindo para texto por regras:`, erro);
    return gerarExplicacao(ticker, indicadores, perfil, score);
  }
}

export async function analisarAcoes(
  tickers: string[],
  perfil: PerfilInvestidor
): Promise<AnaliseAcao[]> {
  const dados = await buscarDadosVariasAcoes(tickers);

  const analises = await Promise.all(
    dados.map(async (acao) => {
      const score = calcularScore(acao.indicadores, perfil);
      const recomendacao = definirRecomendacao(score);
      const explicacao = await obterExplicacao(acao.ticker, acao.indicadores, perfil, score);

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
    })
  );

  return analises.sort((a, b) => b.score - a.score);
}
