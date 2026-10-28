import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { PERFIS } from "@/lib/perfis";

const PASSOS = [
  {
    titulo: "Perfil",
    texto:
      "Cada perfil dá mais peso a indicadores diferentes: P/L, ROE, dívida, dividendos, queda recente ou oscilação de preço.",
  },
  {
    titulo: "Nota e tendência",
    texto:
      "A nota resume os indicadores. Os números indicam uma tendência favorável, neutra ou desfavorável segundo a fórmula do projeto.",
  },
  {
    titulo: "Limites",
    texto:
      "Os dados vêm da brapi.dev e podem ter atraso. O conteúdo é educacional e não é recomendação de investimento.",
  },
];

export default function LandingPage() {
  return (
    <main id="conteudo" className="flex-1">
      <section
        className="relative overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 78% 40%, #1f1810 0%, #0A0909 62%)",
        }}
      >
        {/* Textura sutil de couro: só aqui, em baixa opacidade, atrás do título. */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-10"
        >
          <filter id="couro">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#couro)" />
        </svg>

        <Container className="relative flex flex-wrap items-center gap-14 py-20 sm:py-28">
          <div className="min-w-0 flex-[1_1_480px]">
            <Eyebrow>Projeto de estudo · B3</Eyebrow>
            <h1 className="mt-6 text-balance font-display text-[40px] font-normal leading-[1.08] tracking-[-0.01em] sm:text-[64px]">
              Ações da B3, lidas pelo seu <em className="text-ouro-claro">perfil</em>.
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-[1.65] text-suave">
              Você escolhe entre longo prazo, compra na queda ou volatilidade. O site
              calcula uma nota de 0 a 10 para PETR4, VALE3, ITUB4 e outras, mostra os
              indicadores e explica o resultado em português simples.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/analysis"
                className="inline-block rounded bg-gradient-to-br from-ouro to-ouro-claro px-[30px] py-[15px] text-sm font-semibold tracking-[0.06em] text-fundo transition hover:brightness-110"
              >
                Analisar ações
              </Link>
              <Link
                href="/sobre"
                className="inline-block rounded border border-ouro px-[29px] py-[14px] text-sm tracking-[0.06em] text-creme transition hover:border-ouro-claro"
              >
                Sobre o projeto
              </Link>
            </div>
          </div>

          <div className="mx-auto flex flex-[0_1_340px] justify-center">
            <div className="rounded-full border border-ouro-linha p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-grande.webp"
                alt="Logo do RadarAlpha: monograma R e A em prata e dourado sobre couro preto"
                width={290}
                height={290}
                className="h-[290px] w-[290px] rounded-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-ouro-linha">
        <Container className="py-20">
          <Eyebrow>Como funciona</Eyebrow>
          <h2 className="mt-5 font-display text-[38px] font-normal leading-[1.2]">
            Um perfil, uma nota, uma explicação.
          </h2>
          <div className="mt-12 flex flex-wrap gap-y-10">
            {PASSOS.map((passo) => (
              <div
                key={passo.titulo}
                className="min-w-0 flex-[1_1_280px] border-l border-ouro-linha px-8"
              >
                <h3 className="font-display text-2xl font-normal text-ouro-claro">
                  {passo.titulo}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.7] text-suave">{passo.texto}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-ouro-linha">
        <Container className="py-20">
          <Eyebrow>Perfis</Eyebrow>
          <div className="mt-8 border-b border-ouro-linha">
            {PERFIS.map((perfil) => (
              <div
                key={perfil.id}
                className="flex flex-wrap gap-x-10 gap-y-3 border-t border-ouro-linha py-7"
              >
                <h3 className="flex-[0_0_240px] font-display text-[28px] font-normal">
                  {perfil.nome}
                </h3>
                <p className="min-w-0 flex-[1_1_280px] text-[15px] leading-[1.7] text-suave">
                  {perfil.descricao}
                </p>
                <p className="min-w-0 flex-[1_1_280px] text-sm leading-[1.7] text-suave">
                  {perfil.foco}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
