import { NextRequest, NextResponse } from "next/server";
import { analisarAcoes } from "@/services/stockAnalysis";
import { AnalyzeStockRequest, AnalyzeStockResponse, PerfilInvestidor } from "@/lib/types";
import { TICKERS_DISPONIVEIS } from "@/lib/mockData";

const PERFIS_VALIDOS: PerfilInvestidor[] = [
  "longo_prazo",
  "compra_na_queda",
  "volatilidade",
];

export async function POST(request: NextRequest) {
  let body: AnalyzeStockRequest;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { erro: "Corpo da requisição inválido. Envie um JSON válido." },
      { status: 400 }
    );
  }

  const { tickers, perfil } = body;

  if (!Array.isArray(tickers) || tickers.length === 0) {
    return NextResponse.json(
      { erro: "Envie ao menos um ticker no campo 'tickers' (ex: ['PETR4'])." },
      { status: 400 }
    );
  }

  if (!perfil || !PERFIS_VALIDOS.includes(perfil)) {
    return NextResponse.json(
      { erro: `Campo 'perfil' inválido. Use um de: ${PERFIS_VALIDOS.join(", ")}.` },
      { status: 400 }
    );
  }

  const tickersNormalizados = tickers.map((t) => String(t).toUpperCase());

  const tickersValidos = tickersNormalizados.filter((t) =>
    TICKERS_DISPONIVEIS.includes(t)
  );

  const tickersInvalidos = tickersNormalizados.filter(
    (t) => !TICKERS_DISPONIVEIS.includes(t)
  );

  if (tickersValidos.length === 0) {
    return NextResponse.json(
      { erro: "Nenhum ticker válido foi enviado." },
      { status: 400 }
    );
  }

  try {
    const resultados = await analisarAcoes(tickersValidos, perfil);

    const resposta: AnalyzeStockResponse = {
      resultados,
      perfil,
      geradoEm: new Date().toISOString(),
    };

    return NextResponse.json({
      ...resposta,
      ...(tickersInvalidos.length > 0 && {
        aviso: `Tickers não encontrados e ignorados: ${tickersInvalidos.join(", ")}`,
      }),
    });
  } catch (erro) {
    console.error("Erro ao analisar ações:", erro);
    return NextResponse.json(
      { erro: "Erro interno ao processar a análise." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    tickersDisponiveis: TICKERS_DISPONIVEIS,
    perfisDisponiveis: PERFIS_VALIDOS,
    exemploDeUso: {
      metodo: "POST",
      body: { tickers: ["PETR4", "VALE3"], perfil: "longo_prazo" },
    },
  });
}
