import { IndicadoresFundamentalistas, PerfilInvestidor } from "@/lib/types";

/**
 * PLACEHOLDER para integração futura com IA (OpenAI ou Claude).
 *
 * Não é chamado no MVP — `services/explicacao.ts` usa regras determinísticas.
 * Quando for plugar IA de verdade:
 *
 * 1. Adicione a chave em .env.local (ex: ANTHROPIC_API_KEY ou OPENAI_API_KEY)
 * 2. Implemente a chamada HTTP para /v1/messages (Claude) ou /v1/chat/completions (OpenAI)
 * 3. Troque a chamada em services/stockAnalysis.ts de `gerarExplicacao`
 *    para `gerarExplicacaoComIA`
 *
 * Manter a mesma assinatura de retorno (Promise<string>) garante que nada
 * mais no projeto precise mudar.
 */
export async function gerarExplicacaoComIA(
  ticker: string,
  indicadores: IndicadoresFundamentalistas,
  perfil: PerfilInvestidor
): Promise<string> {
  throw new Error(
    "Integração com IA ainda não implementada. Use services/explicacao.ts (gerarExplicacao) por enquanto."
  );
}
