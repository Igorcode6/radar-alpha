import { ACOES_MOCK, AcaoMock } from "@/lib/mockData";

/**
 * Camada de acesso a dados de mercado.
 *
 * Hoje retorna dados mock. Amanhã, troque o corpo desta função por uma
 * chamada a uma API real (ex: Brapi, Alpha Vantage, B3) SEM alterar
 * a assinatura — o resto do app (scoring, rotas, UI) não precisa mudar.
 */
export async function buscarDadosAcao(ticker: string): Promise<AcaoMock | null> {
  const tickerNormalizado = ticker.toUpperCase().trim();
  const dado = ACOES_MOCK[tickerNormalizado];
  return dado ?? null;
}

export async function buscarDadosVariasAcoes(tickers: string[]): Promise<AcaoMock[]> {
  const resultados = await Promise.all(tickers.map(buscarDadosAcao));
  return resultados.filter((r): r is AcaoMock => r !== null);
}
