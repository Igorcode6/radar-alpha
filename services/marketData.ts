import { ACOES_MOCK, AcaoMock, SETORES_CONHECIDOS } from "@/lib/mockData";

/**
 * Camada de acesso a dados de mercado.
 *
 * Usa a API v2 da brapi.dev (https://brapi.dev) para preço e indicadores
 * fundamentalistas reais da B3. A v2 divide os dados em três endpoints
 * (cotação, múltiplos e dados financeiros) — por isso fazemos três
 * chamadas em paralelo e juntamos tudo por ticker.
 *
 * Se a busca real falhar por qualquer motivo (ticker sem suporte, chave
 * ausente/inválida, API fora do ar), cai automaticamente para os dados
 * mock daquele ticker — o site nunca quebra enquanto a integração está
 * sendo configurada ou testada.
 *
 * Todos os tickers exigem uma chave gratuita: crie conta em
 * brapi.dev/dashboard e configure BRAPI_API_KEY em .env.local (ou nas
 * variáveis de ambiente do deploy).
 */

const BRAPI_BASE_URL = "https://brapi.dev/api/v2/stocks";

interface BrapiV2Result<T> {
  requestedSymbol: string;
  symbol: string;
  changed?: boolean;
  data: T;
}

interface BrapiV2Response<T> {
  results?: BrapiV2Result<T>[];
  error?: boolean;
  message?: string;
}

interface QuoteData {
  shortName?: string;
  longName?: string;
  regularMarketPrice?: number;
  regularMarketChangePercent?: number;
  fiftyTwoWeekHigh?: number;
  fiftyTwoWeekLow?: number;
}

interface StatisticsData {
  trailingPE?: number;
  dividendYield?: number;
  enterpriseToEbitda?: number;
}

interface FinancialData {
  returnOnEquity?: number;
  totalDebt?: number;
  totalCash?: number;
  ebitda?: number;
  revenueGrowth?: number;
  revenueGrowthAnnual?: number;
}

function montarHeaders(): HeadersInit {
  const chave = process.env.BRAPI_API_KEY;
  return chave ? { Authorization: `Bearer ${chave}` } : {};
}

async function buscarEndpoint<T>(
  caminho: string,
  ticker: string
): Promise<T | null> {
  const url = `${BRAPI_BASE_URL}/${caminho}?symbols=${encodeURIComponent(ticker)}`;

  try {
    const resposta = await fetch(url, {
      headers: montarHeaders(),
      // Preço de ação muda o dia todo; nunca serve cache de página.
      cache: "no-store",
    });

    if (!resposta.ok) {
      console.warn(
        `brapi (${caminho}) respondeu ${resposta.status} para ${ticker} — caindo para mock nesse ticker.`
      );
      return null;
    }

    const dados: BrapiV2Response<T> = await resposta.json();
    return dados.results?.[0]?.data ?? null;
  } catch (erro) {
    console.warn(`Falha ao buscar brapi (${caminho}) para ${ticker}, caindo para mock:`, erro);
    return null;
  }
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

async function buscarDadosReaisUmaAcao(ticker: string): Promise<AcaoMock | null> {
  // O plano gratuito da brapi rejeita o lote inteiro quando um dos tickers
  // pedidos não é suportado por ele (ex: misturar PETR4 com WEGE3). Por
  // isso buscamos um ticker de cada vez: um ticker sem acesso só derruba
  // ele mesmo (cai pro mock), nunca os outros da lista.
  const cotacao = await buscarEndpoint<QuoteData>("quote", ticker);

  // Sem preço, não temos nada confiável pra mostrar — melhor deixar o
  // fallback pro mock assumir do que exibir zeros.
  if (!cotacao?.regularMarketPrice) return null;

  const [stats, financeiro] = await Promise.all([
    buscarEndpoint<StatisticsData>("statistics", ticker),
    buscarEndpoint<FinancialData>("financial-data", ticker),
  ]);

  return montarAcao(ticker, cotacao, stats ?? {}, financeiro ?? {});
}

async function buscarDadosReaisVariasAcoes(
  tickers: string[]
): Promise<Map<string, AcaoMock>> {
  const encontrados = new Map<string, AcaoMock>();
  if (tickers.length === 0) return encontrados;

  // Sequencial (não Promise.all) porque o plano gratuito da brapi só
  // permite 1 requisição simultânea por chave.
  for (const ticker of tickers) {
    const acao = await buscarDadosReaisUmaAcao(ticker);
    if (acao) encontrados.set(ticker, acao);
  }

  return encontrados;
}

function montarAcao(
  ticker: string,
  cotacao: QuoteData,
  stats: StatisticsData,
  financeiro: FinancialData
): AcaoMock {
  return {
    ticker,
    nomeEmpresa: cotacao.longName ?? cotacao.shortName ?? ticker,
    setor: SETORES_CONHECIDOS[ticker] ?? "Não classificado",
    origem: "dados_reais",
    indicadores: {
      precoAtual: cotacao.regularMarketPrice!,
      variacaoDia: cotacao.regularMarketChangePercent ?? 0,
      pl: stats.trailingPE ?? 0,
      roe: (financeiro.returnOnEquity ?? 0) * 100,
      dy: (stats.dividendYield ?? 0) * 100,
      dividaLiquidaEbitda: calcularDividaLiquidaEbitda(
        financeiro.totalDebt,
        financeiro.totalCash,
        financeiro.ebitda
      ),
      crescimentoReceita5a:
        (financeiro.revenueGrowthAnnual ?? financeiro.revenueGrowth ?? 0) * 100,
      quedaDesde52Semanas: calcularQuedaDesde52Semanas(
        cotacao.regularMarketPrice,
        cotacao.fiftyTwoWeekHigh
      ),
      // A brapi não expõe volatilidade pronta nesses módulos; aproximamos
      // pela amplitude entre máxima e mínima de 52 semanas até termos uma
      // fonte melhor pra isso.
      volatilidade30d:
        cotacao.fiftyTwoWeekHigh && cotacao.fiftyTwoWeekLow
          ? Number(
              (
                ((cotacao.fiftyTwoWeekHigh - cotacao.fiftyTwoWeekLow) /
                  cotacao.fiftyTwoWeekHigh) *
                100
              ).toFixed(1)
            )
          : 0,
    },
  };
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
