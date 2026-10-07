import { IndicadoresFundamentalistas } from "./types";

// Dados mock realistas o suficiente para validar o produto.
// Quando a integração com dados reais (ex: Brapi, Status Invest, B3) estiver
// pronta, basta substituir a implementação de `services/marketData.ts`
// mantendo a mesma interface — nada mais no projeto precisa mudar.
export interface AcaoMock {
  ticker: string;
  nomeEmpresa: string;
  setor: string;
  indicadores: IndicadoresFundamentalistas;
  origem?: "mock" | "dados_reais";
}

// A brapi.dev não retorna o setor da empresa nos módulos que usamos, então
// mantemos esse mapa local como complemento, mesmo quando os outros dados
// vêm reais. Ticker novo sem entrada aqui cai em "Não classificado".
export const SETORES_CONHECIDOS: Record<string, string> = {
  PETR4: "Petróleo e Gás",
  VALE3: "Mineração",
  ITUB4: "Bancos",
  WEGE3: "Bens Industriais",
  BBAS3: "Bancos",
};

export const ACOES_MOCK: Record<string, AcaoMock> = {
  PETR4: {
    ticker: "PETR4",
    nomeEmpresa: "Petrobras",
    setor: "Petróleo e Gás",
    indicadores: {
      precoAtual: 38.42,
      variacaoDia: 1.2,
      pl: 4.8,
      roe: 28.5,
      dy: 14.2,
      dividaLiquidaEbitda: 1.1,
      crescimentoReceita5a: 6.3,
      quedaDesde52Semanas: -18.4,
      volatilidade30d: 32.1,
    },
  },
  VALE3: {
    ticker: "VALE3",
    nomeEmpresa: "Vale",
    setor: "Mineração",
    indicadores: {
      precoAtual: 61.15,
      variacaoDia: -0.8,
      pl: 6.2,
      roe: 21.3,
      dy: 9.8,
      dividaLiquidaEbitda: 1.4,
      crescimentoReceita5a: 2.1,
      quedaDesde52Semanas: -24.7,
      volatilidade30d: 29.4,
    },
  },
  ITUB4: {
    ticker: "ITUB4",
    nomeEmpresa: "Itaú Unibanco",
    setor: "Bancos",
    indicadores: {
      precoAtual: 34.90,
      variacaoDia: 0.4,
      pl: 9.1,
      roe: 21.8,
      dy: 6.5,
      dividaLiquidaEbitda: 0.0, // não aplicável a bancos da mesma forma
      crescimentoReceita5a: 8.7,
      quedaDesde52Semanas: -5.2,
      volatilidade30d: 18.6,
    },
  },
  WEGE3: {
    ticker: "WEGE3",
    nomeEmpresa: "WEG",
    setor: "Bens Industriais",
    indicadores: {
      precoAtual: 39.80,
      variacaoDia: 2.1,
      pl: 28.4,
      roe: 24.6,
      dy: 1.8,
      dividaLiquidaEbitda: 0.3,
      crescimentoReceita5a: 18.9,
      quedaDesde52Semanas: -9.1,
      volatilidade30d: 26.8,
    },
  },
  BBAS3: {
    ticker: "BBAS3",
    nomeEmpresa: "Banco do Brasil",
    setor: "Bancos",
    indicadores: {
      precoAtual: 26.35,
      variacaoDia: -1.5,
      pl: 4.9,
      roe: 20.1,
      dy: 10.7,
      dividaLiquidaEbitda: 0.0,
      crescimentoReceita5a: 7.4,
      quedaDesde52Semanas: -14.8,
      volatilidade30d: 22.3,
    },
  },
};

export const TICKERS_DISPONIVEIS = Object.keys(ACOES_MOCK);
