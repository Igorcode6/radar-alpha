import Link from "next/link";
import Container from "./Container";
import { SITE } from "@/lib/site";

const LINK =
  "py-2.5 text-ouro-claro underline underline-offset-2 transition hover:text-creme";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-ouro-linha">
      <Container className="py-10 text-[13px] leading-[1.7] text-suave">
        <p className="max-w-[760px]">
          Conteúdo informativo e educacional. Não é recomendação de investimento,
          oferta ou consultoria. Rentabilidade passada não garante resultado
          futuro. Os dados de mercado podem ter atraso ou conter erros, e as
          explicações podem ser geradas por inteligência artificial.
        </p>
        <nav aria-label="Links do rodapé" className="mt-5 flex flex-wrap gap-x-7 gap-y-1">
          <Link href="/sobre" className={LINK}>
            Sobre o projeto
          </Link>
          <Link href="/privacidade" className={LINK}>
            Política de Privacidade
          </Link>
          <Link href="/termos" className={LINK}>
            Termos de Uso
          </Link>
          <Link href="/cookies" className={LINK}>
            Política de Cookies
          </Link>
          <a href={SITE.github} className={LINK}>
            Código no GitHub
          </a>
        </nav>
        <p className="mt-3">
          {SITE.nome} é um projeto pessoal de {SITE.responsavel}, sem empresa
          constituída. Contato:{" "}
          <a href={`mailto:${SITE.email}`} className="text-ouro-claro underline underline-offset-2 hover:text-creme">
            {SITE.email}
          </a>
        </p>
      </Container>
    </footer>
  );
}
