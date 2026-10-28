import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o projeto | RadarAlpha",
  description:
    "O que é o RadarAlpha, como a nota é calculada, de onde vêm os dados e como o projeto foi feito.",
};

export default function SobrePage() {
  return (
    <LegalLayout titulo="Sobre o projeto" mostrarData={false}>
      <p>
        O {SITE.nome} é um projeto pessoal de estudo e portfólio, criado por{" "}
        {SITE.responsavel}. Não é uma empresa, não vende nada e não é um serviço de
        investimentos.
      </p>

      <h2>O que ele faz</h2>
      <p>
        Você escolhe um perfil (longo prazo, compra na queda ou volatilidade) e as
        ações da B3 que quer ver. O site busca preços e indicadores, calcula uma nota
        de 0 a 10 para o perfil escolhido e explica o resultado em português simples.
      </p>

      <h2>Como a nota funciona</h2>
      <ul>
        <li>
          <strong>Longo prazo:</strong> média de P/L, ROE, dividend yield, dívida
          líquida/EBITDA e crescimento da receita.
        </li>
        <li>
          <strong>Compra na queda:</strong> dá peso dobrado à queda desde a máxima de
          52 semanas e também considera ROE, dívida e P/L.
        </li>
        <li>
          <strong>Volatilidade:</strong> dá peso dobrado à oscilação de preço
          (estimada pela diferença entre a máxima e a mínima de 52 semanas) e também
          considera a variação do dia.
        </li>
      </ul>
      <p>
        A nota vira uma tendência: favorável (7 ou mais), neutra (de 4,5 até menos de
        7) ou desfavorável (abaixo de 4,5). Esses pesos e limites foram escolhidos
        pelo projeto, estão em teste e não foram validados por estudo ou por
        especialista.
      </p>

      <h2>De onde vêm os dados</h2>
      <p>
        Preços e indicadores vêm da brapi.dev e podem ter atraso ou erros. Quando a
        fonte falha para uma ação, o site mostra valores de demonstração, marcados
        como “demo”. As explicações são geradas por regras ou por inteligência
        artificial e podem conter imprecisões.
      </p>

      <h2>Como foi feito</h2>
      <p>
        Next.js, TypeScript e Tailwind, hospedado na Vercel. O desenvolvimento teve
        ajuda de inteligência artificial (Claude, da Anthropic). O código é aberto:{" "}
        <a href={SITE.github}>github.com/Igorcode6/radar-alpha</a>.
      </p>

      <h2>O que o projeto não é</h2>
      <p>
        Não é recomendação, consultoria nem gestão de investimentos. Investir em ações
        envolve risco de perda. Leia os <Link href="/termos">Termos de Uso</Link>.
      </p>

      <p>
        Contato: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalLayout>
  );
}
