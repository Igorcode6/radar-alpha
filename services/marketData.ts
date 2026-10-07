import { ACOES_MOCK, AcaoMock, SETORES_CONHECIDOS } from "@/lib/mockData";

/**
 * Camada de acesso a dados de mercado.
 *
 * Usa a API gratuita da brapi.dev (https://brapi.dev) para preço e
 * indicadores fundamentalistas reais da B3. Se a busca real falhar por
 * qualquer motivo (ticker sem suporte, chave ausente, API fora do ar),
 * cai automaticamente para os dados mock daquele ticker — o site nunca
 * quebra enquanto a integração está sendo configurada ou testada.
 *
 * Tickers como PETR4, VALE3 e ITUB4 funcionam na brapi sem chave. Outros
 * podem exigir uma chave gratuita: crie conta em brapi.dev/dashboard e
 * configure BRAPI_API_KEY em .env.local.
 */

const BRAPI_BASE_URL = "https://brapi.dev/api";

interface BrapiQuoteResult {
  symbol: string;
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
  priceEarnings?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
  defaultKeyStatistics?: {
    dividendYield?: number;
    enterpriseToEbitda?: number;
  };
  financialData?: {
    returnOnEquity?: number;
    totalDebt?: number;
    totalCash?: number;
    ebitda?: number;
    revenueGrowth?: number;
    revenueGrowthAnnual?: number;
  };
}

interface BrapiResponse {
  results?: BrapiQuoteResult[];
  error?: boolean;
  message?: string;
}

function montarUrl(tickersCsv: string): string {
  const params = new URLSearchParams({
    modules: "defaultKeyStatistics,financialData",
  });
  return `${BRAPI_BASE_URL}/quote/${tickersCsv}?${params.toString()}`;
}

function montarHeaders(): HeadersInit {
  const chave = process.env.BRAPI_API_KEY;
  return chave ? { Authorization: `Bearer ${chave}` } : {};
}

function calcularQuedaDesde52Semanas(
  precoAtual?: number,
  maxima52s?: number
): number {
  if (!precoAtual || !maxima52s || maxima52s === 0) return 0;
  return Number((((precoAtual - maxima52s) / maxima52s) * 100).toFixed(1));
}

function calcularDividaLiquidaEbitda(
  totalDebt?: number,
  totalCash?: number,
  ebitda?: number
): number {
  if (!ebitda || ebitda === 0) return 0;
  const dividaLiquida = (totalDebt ?? 0) - (totalCash ?? 0);
  return Number((dividaLiquida / ebitda).toFixed(2));
}

function converterParaAcaoMock(resultado: BrapiQuoteResult): AcaoMock | null {
  // Sem preço, não temos nada confiável pra mostrar — melhor deixar o
  // fallback pro mock assumir do que exibir zeros.
  if (!resultado.regularMarketPrice) return null;

  const ticker = resultado.symbol;
  const financeiro = resultado.financialData ?? {};
  const estatisticas = resultado.defaultKeyStatistics ?? {};

  return {
    ticker,
    nomeEmpresa: resultado.longName ?? resultado.shortName ?? ticker,
    setor: SETORES_CONHECIDOS[ticker] ?? "Não classificado",
    origem: "dados_reais",
    indicadores: {
      precoAtual: resultado.regularMarketPrice,
      variacaoDia: resultado.regularMarketChangePercent ?? 0,
      pl: resultado.priceEarnings ?? 0,
      roe: (financeiro.returnOnEquity ?? 0) * 100,
      dy: (estatisticas.dividendYield ?? 0) * 100,
      dividaLiquidaEbitda: calcularDividaLiquidaEbitda(
        financeiro.totalDebt,
        financeiro.totalCash,
        financeiro.ebitda
      ),
      crescimentoReceita5a:
        (financeiro.revenueGrowthAnnual ?? financeiro.revenueGrowth ?? 0) * 100,
      quedaDesde52Semanas: calcularQuedaDesde52Semanas(
        resultado.regularMarketPrice,
        resultado.fiftyTwoWeekHigh
      ),
      // A brapi não expõe volatilidade pronta nesses módulos; aproximamos
      // pela amplitude entre máxima e mínima de 52 semanas até termos uma
      // fonte melhor pra isso.
      volatilidade30d:
        resultado.fiftyTwoWeekHigh && resultado.fiftyTwoWeekLow
          ? Number(
              (
                ((resultado.fiftyTwoWeekHigh - resultado.fiftyTwoWeekLow) /
                  resultado.fiftyTwoWeekHigh) *
                100
              ).toFixed(1)
            )
          : 0,
    },
  };
}

async function buscarDadosReaisVariasAcoes(
  tickers: string[]
): Promise<Map<string, AcaoMock>> {
  const encontrados = new Map<string, AcaoMock>();
  if (tickers.length === 0) return encontrados;

  try {
    const url = montarUrl(tickers.join(","));
    const resposta = await fetch(url, {
      headers: montarHeaders(),
      // Preço de ação muda o dia todo; nunca serve cache de página.
      cache: "no-store",
    });

    if (!resposta.ok) {
      console.warn(
        `brapi respondeu ${resposta.status} para ${tickers.join(",")} — caindo para mock nesses tickers.`
      );
      return encontrados;
    }

    const dados: BrapiResponse = await resposta.json();
    for (const resultado of dados.results ?? []) {
      const acao = converterParaAcaoMock(resultado);
      if (acao) encontrados.set(acao.ticker, acao);
    }
  } catch (erro) {
    console.warn("Falha ao buscar dados reais na brapi, caindo para mock:", erro);
  }

  return encontrados;
}

export async function buscarDadosAcao(ticker: string): Promise<AcaoMock | null> {
  const tickerNormalizado = ticker.toUpperCase().trim();
  const reais = await buscarDadosReaisVariasAcoes([tickerNormalizado]);
  if (reais.has(tickerNormalizado)) return reais.get(tickerNormalizado)!;

  const mock = ACOES_MOCK[tickerNormalizado];
  return mock ? { ...mock, origem: "mock" } : null;
}

export async function buscarDadosVariasAcoes(tickers: string[]): Promise<AcaoMock[]> {
  const tickersNormalizados = tickers.map((t) => t.toUpperCase().trim());
  const reais = await buscarDadosReaisVariasAcoes(tickersNormalizados);

  return tickersNormalizados
    .map((ticker) => {
      if (reais.has(ticker)) return reais.get(ticker)!;
      const mock = ACOES_MOCK[ticker];
      return mock ? { ...mock, origem: "mock" as const } : null;
    })
    .filter((r): r is AcaoMock => r !== null);
}
