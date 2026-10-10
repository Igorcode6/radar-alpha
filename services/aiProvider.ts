import { IndicadoresFundamentalistas, PerfilInvestidor } from "@/lib/types";

/**
 * Gera a explicação em linguagem simples usando a API da Anthropic (Claude).
 *
 * Usa `ANTHROPIC_API_KEY` do ambiente. Se a chave não estiver configurada,
 * ou a chamada falhar por qualquer motivo (rede, limite de uso, resposta
 * inesperada), lança um erro — quem chama (`services/stockAnalysis.ts`)
 * captura isso e cai automaticamente para `gerarExplicacao` (texto por
 * regras), o mesmo padrão de fallback usado em `services/marketData.ts`
 * pros dados de mercado.
 *
 * Modelo escolhido: claude-haiku, o mais rápido e barato da linha —
 * suficiente pra um texto curto e direto, e mantém o custo mensal
 * desprezível no volume de uso esperado do projeto.
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MODELO = "claude-haiku-4-5-20251001";

function montarPrompt(
  ticker: string,
  ind: IndicadoresFundamentalistas,
  perfil: PerfilInvestidor,
  score: number
): string {
  const perfilDescricao: Record<PerfilInvestidor, string> = {
    longo_prazo: "investidor de longo prazo, que busca empresas sólidas para segurar por anos",
    compra_na_queda: "investidor que busca ações que caíram de preço mas têm fundamento",
    volatilidade: "investidor de curto prazo, que busca ações que oscilam bastante",
  };

  return `Você é um analista financeiro escrevendo para um ${perfilDescricao[perfil]}.

Ação: ${ticker}
Perfil do investidor: ${perfil}
Score calculado (0 a 10): ${score.toFixed(1)}

Indicadores:
- Preço atual: R$ ${ind.precoAtual.toFixed(2)}
- Variação do dia: ${ind.variacaoDia.toFixed(1)}%
- P/L: ${ind.pl.toFixed(1)}
- ROE: ${ind.roe.toFixed(1)}%
- Dividend Yield: ${ind.dy.toFixed(1)}%
- Dívida líquida/EBITDA: ${ind.dividaLiquidaEbitda.toFixed(1)}
- Crescimento de receita: ${ind.crescimentoReceita5a.toFixed(1)}%
- Queda desde a máxima de 52 semanas: ${ind.quedaDesde52Semanas.toFixed(1)}%
- Volatilidade (30d): ${ind.volatilidade30d.toFixed(1)}%

Escreva uma explicação curta (2 a 4 frases, português do Brasil, linguagem simples, sem jargão
desnecessário) dizendo por que essa ação recebeu esse score para esse perfil específico. Cite os
números mais relevantes para esse perfil. Não dê conselho de investimento direto ("compre",
"venda") — apenas explique o raciocínio por trás do score. Responda só com o texto da explicação,
sem título, sem markdown, sem aspas.`;
}

export async function gerarExplicacaoComIA(
  ticker: string,
  indicadores: IndicadoresFundamentalistas,
  perfil: PerfilInvestidor,
  score: number
): Promise<string> {
  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) {
    throw new Error("ANTHROPIC_API_KEY não configurada.");
  }

  const resposta = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": chave,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODELO,
      max_tokens: 300,
      messages: [
        { role: "user", content: montarPrompt(ticker, indicadores, perfil, score) },
      ],
    }),
    // Nunca serve cache de uma explicação gerada por IA — cada análise é nova.
    cache: "no-store",
  });

  if (!resposta.ok) {
    throw new Error(`Anthropic API respondeu ${resposta.status} para ${ticker}.`);
  }

  const dados = await resposta.json();
  const texto = dados?.content?.[0]?.text?.trim();

  if (!texto) {
    throw new Error(`Resposta da Anthropic API sem texto utilizável para ${ticker}.`);
  }

  return texto;
}
