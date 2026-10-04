import { IndicadoresFundamentalistas, PerfilInvestidor } from "@/lib/types";

/**
 * Gera a explicação em linguagem simples para o usuário final.
 *
 * Implementação atual: baseada em regras (determinística, sem custo, sem
 * latência de rede) — suficiente para o MVP.
 *
 * Integração futura com IA: substitua o corpo desta função por uma chamada
 * a `services/aiProvider.ts` (OpenAI/Claude), enviando os mesmos indicadores
 * e perfil, mantendo a assinatura `(ind, perfil, ticker) => Promise<string>`
 * ou `=> string` conforme a rota que a consumir.
 */
export function gerarExplicacao(
  ticker: string,
  ind: IndicadoresFundamentalistas,
  perfil: PerfilInvestidor,
  score: number
): string {
  const frases: string[] = [];

  if (perfil === "longo_prazo") {
    frases.push(
      ind.pl < 10
        ? `${ticker} está sendo negociada a um preço baixo em relação ao lucro (P/L de ${ind.pl.toFixed(1)}).`
        : `${ticker} está com um P/L de ${ind.pl.toFixed(1)}, um pouco mais caro em relação ao lucro atual.`
    );
    frases.push(
      ind.roe > 15
        ? `A empresa tem um retorno sobre patrimônio forte (ROE de ${ind.roe.toFixed(1)}%), sinal de boa geração de lucro.`
        : `O retorno sobre patrimônio é moderado (ROE de ${ind.roe.toFixed(1)}%).`
    );
    frases.push(
      ind.dividaLiquidaEbitda < 1.5
        ? `A dívida está em nível controlado.`
        : `A dívida está mais elevada, o que merece atenção.`
    );
  }

  if (perfil === "compra_na_queda") {
    frases.push(
      `${ticker} caiu ${Math.abs(ind.quedaDesde52Semanas).toFixed(1)}% em relação à máxima dos últimos 12 meses.`
    );
    frases.push(
      ind.roe > 15
        ? `Apesar da queda, os fundamentos seguem saudáveis (ROE de ${ind.roe.toFixed(1)}%), o que reforça o cenário de possível oportunidade.`
        : `A queda veio acompanhada de fundamentos mais fracos (ROE de ${ind.roe.toFixed(1)}%), então vale mais cautela.`
    );
  }

  if (perfil === "volatilidade") {
    frases.push(
      `${ticker} tem volatilidade recente de ${ind.volatilidade30d.toFixed(1)}% ao ano, ${
        ind.volatilidade30d > 25 ? "acima da média" : "dentro da média"
      } do mercado.`
    );
    frases.push(
      `Hoje a ação variou ${ind.variacaoDia > 0 ? "+" : ""}${ind.variacaoDia.toFixed(1)}%.`
    );
  }

  frases.push(`Score final para este perfil: ${score.toFixed(1)} de 10.`);

  return frases.join(" ");
}
