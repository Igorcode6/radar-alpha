import Link from "next/link";
import Header from "@/components/Header";

export default function LandingPage() {
  return (
    <main id="conteudo" className="min-h-screen">
      <Header />

      <section className="mx-auto max-w-5xl px-6 py-14 sm:py-24">
        <p className="label-eyebrow text-brand">Projeto de estudo, B3</p>
        <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
          Ações da B3, lidas pelo seu perfil.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-lg leading-relaxed text-mist">
          Você escolhe entre longo prazo, compra na queda ou volatilidade. O site
          calcula uma nota de 0 a 10 para PETR4, VALE3, ITUB4 e outras, mostra os
          indicadores e explica o resultado em português simples.
        </p>
        <Link
          href="/analysis"
          className="mt-8 inline-block rounded-md bg-sage-600 px-5 py-3 font-mono text-sm text-cream transition hover:bg-sage-700"
        >
          Analisar ações
        </Link>
      </section>

      <section className="mx-auto max-w-5xl border-t border-cream-border px-6 py-12 dark:border-graphite-700">
        <h2 className="font-display text-xl font-semibold">Como funciona</h2>
        <dl className="mt-6 grid gap-8 text-sm leading-relaxed sm:grid-cols-3">
          <div>
            <dt className="font-semibold">Perfil</dt>
            <dd className="mt-1 text-mist">
              Cada perfil dá mais peso a indicadores diferentes: P/L, ROE, dívida,
              dividendos, queda recente ou oscilação de preço.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Nota e tendência</dt>
            <dd className="mt-1 text-mist">
              A nota resume os indicadores. Os números indicam uma tendência
              favorável, neutra ou desfavorável segundo a fórmula do projeto.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Limites</dt>
            <dd className="mt-1 text-mist">
              Os dados vêm da brapi.dev e podem ter atraso. O conteúdo é
              educacional e não é recomendação de investimento.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
