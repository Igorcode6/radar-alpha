import Link from "next/link";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-6 py-12 sm:py-20 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl">
          <p className="label-eyebrow text-sage-500">Radar de oportunidades · B3</p>
          <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Ações brasileiras, lidas do seu jeito de investir.
          </h1>
          <p className="mt-5 text-balance text-lg leading-relaxed text-mist">
            Escolha um perfil — longo prazo, compra na queda ou volatilidade —
            e receba uma leitura clara de PETR4, VALE3, ITUB4 e outras ações,
            com nota, indicadores e uma explicação em português simples.
          </p>
          <Link
            href="/analysis"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 font-mono text-sm uppercase tracking-wide text-cream transition hover:bg-sage-600"
          >
            Analisar ações agora
          </Link>
        </div>

        <div className="grid w-full max-w-sm grid-cols-2 gap-4">
          <StatCard
            icone="pulso"
            label="Ibovespa"
            valor="128.742"
            delta="+1,26%"
            deltaPositivo
            legenda="vs. período anterior"
          />
          <StatCard
            icone="raio"
            label="Ações cobertas"
            valor="5"
            legenda="PETR4, VALE3 e mais"
          />
          <StatCard
            icone="alvo"
            label="Perfis"
            valor="3"
            legenda="longo prazo, queda, volatilidade"
          />
          <StatCard
            icone="grafico"
            label="Score"
            valor="0–10"
            legenda="por perfil, com explicação"
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          <Etapa
            numero="01"
            titulo="Escolha o perfil"
            texto="Longo prazo, compra na queda ou volatilidade — cada um olha para indicadores diferentes."
          />
          <Etapa
            numero="02"
            titulo="Veja o score"
            texto="Cada ação recebe uma nota de 0 a 10, calculada a partir de P/L, ROE, dívida, dividend yield e mais."
          />
          <Etapa
            numero="03"
            titulo="Entenda o porquê"
            texto="Uma explicação simples traduz os números em uma recomendação: comprar, observar ou evitar."
          />
        </div>
      </section>
    </main>
  );
}

function Etapa({
  numero,
  titulo,
  texto,
}: {
  numero: string;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="rounded-xl border border-cream-border bg-cream-card p-6 dark:border-graphite-700 dark:bg-graphite-900">
      <p className="font-mono text-xs text-sage-500">{numero}</p>
      <p className="mt-2 font-display text-lg font-semibold">{titulo}</p>
      <p className="mt-2 text-sm leading-relaxed text-mist">{texto}</p>
    </div>
  );
}
