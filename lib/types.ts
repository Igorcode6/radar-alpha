// Tipos centrais do domínio "radar de oportunidades"

export type PerfilInvestidor = "longo_prazo" | "compra_na_queda" | "volatilidade";

export interface PerfilInfo {
  id: PerfilInvestidor;
  nome: string;
  descricao: string;
  foco: string;
}

export interface IndicadoresFundamentalistas {
  precoAtual: number;
  variacaoDia: number; // percentual
  pl: number; // Preço/Lucro
  roe: number; // Retorno sobre Patrimônio (%)
  dy: number; // Dividend Yield (%)
  dividaLiquidaEbitda: number; // dívida líquida / EBITDA
  crescimentoReceita5a: number; // % médio ao ano
  quedaDesde52Semanas: number; // % de queda em relação à máxima de 52 semanas
  volatilidade30d: number; // desvio padrão anualizado, %
}

export interface AnaliseAcao {
  ticker: string;
  nomeEmpresa: string;
  setor: string;
  indicadores: IndicadoresFundamentalistas;
  score: number; // 0 a 10
  explicacao: string;
  recomendacao: "comprar" | "observar" | "evitar";
  perfilAnalisado: PerfilInvestidor;
  geradoEm: string; // ISO timestamp
  origemAnalise: "mock" | "ia" | "dados_reais";
}

export interface AnalyzeStockRequest {
  tickers: string[];
  perfil: PerfilInvestidor;
}

export interface AnalyzeStockResponse {
  resultados: AnaliseAcao[];
  perfil: PerfilInvestidor;
  geradoEm: string;
}
