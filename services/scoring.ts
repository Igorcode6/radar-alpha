import { IndicadoresFundamentalistas, PerfilInvestidor } from "@/lib/types";

// Utilitário: mapeia um valor para uma escala 0-10, com clamp nos extremos.
// quantoMaiorMelhor=true: valores mais altos aumentam a nota.
function pontuar(
  valor: number,
  min: number,
  max: number,
  quantoMaiorMelhor = true
): number {
  const clamped = Math.min(Math.max(valor, min), max);
  const proporcao = (clamped - min) / (max - min);
  const nota = quantoMaiorMelhor ? proporcao * 10 : (1 - proporcao) * 10;
  return Number(nota.toFixed(1));
}

function media(pontos: number[]): number {
  return Number((pontos.reduce((a, b) => a + b, 0) / pontos.length).toFixed(1));
}

/**
 * Calcula o score (0-10) de uma ação para um perfil específico.
 * Cada perfil pondera indicadores diferentes — é aqui que a "personalidade"
 * do produto vive. Fácil de ajustar os pesos conforme validarmos com usuários.
 */
export function calcularScore(
  ind: IndicadoresFundamentalistas,
  perfil: PerfilInvestidor
): number {
  switch (perfil) {
    case "longo_prazo": {
      const notaPL = pontuar(ind.pl, 3, 20, false); // P/L baixo é melhor
      const notaROE = pontuar(ind.roe, 5, 30, true);
      const notaDY = pontuar(ind.dy, 0, 12, true);
      const notaDivida = pontuar(ind.dividaLiquidaEbitda, 0, 3, false);
      const notaCrescimento = pontuar(ind.crescimentoReceita5a, 0, 20, true);
      return media([notaPL, notaROE, notaDY, notaDivida, notaCrescimento]);
    }
    case "compra_na_queda": {
      // Quanto maior a queda (em módulo), melhor a oportunidade —
      // mas só pontua bem se os fundamentos ainda forem saudáveis.
      const notaQueda = pontuar(Math.abs(ind.quedaDesde52Semanas), 5, 40, true);
      const notaFundamentos = media([
        pontuar(ind.roe, 5, 30, true),
        pontuar(ind.dividaLiquidaEbitda, 0, 3, false),
      ]);
      const notaPL = pontuar(ind.pl, 3, 20, false);
      return media([notaQueda, notaQueda, notaFundamentos, notaPL]); // queda tem peso dobrado
    }
    case "volatilidade": {
      const notaVolatilidade = pontuar(ind.volatilidade30d, 10, 45, true);
      const notaVariacaoDia = pontuar(Math.abs(ind.variacaoDia), 0, 5, true);
      return media([notaVolatilidade, notaVolatilidade, notaVariacaoDia]); // volatilidade tem peso dobrado
    }
    default:
      return 0;
  }
}

export function definirRecomendacao(
  score: number
): "comprar" | "observar" | "evitar" {
  if (score >= 7) return "comprar";
  if (score >= 4.5) return "observar";
  return "evitar";
}
