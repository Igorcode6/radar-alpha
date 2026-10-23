import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-cream-border dark:border-graphite-700">
      <div className="mx-auto max-w-5xl px-6 py-10 text-sm text-mist">
        <p className="leading-relaxed">
          Conteúdo informativo e educacional. Não é recomendação de investimento,
          oferta ou consultoria. Rentabilidade passada não garante resultado
          futuro. Os dados de mercado podem ter atraso ou conter erros, e as
          explicações podem ser geradas por inteligência artificial.
        </p>
        <nav aria-label="Páginas legais" className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacidade" className="underline underline-offset-2 hover:text-ink dark:hover:text-cream">
            Política de Privacidade
          </Link>
          <Link href="/termos" className="underline underline-offset-2 hover:text-ink dark:hover:text-cream">
            Termos de Uso
          </Link>
          <Link href="/cookies" className="underline underline-offset-2 hover:text-ink dark:hover:text-cream">
            Política de Cookies
          </Link>
        </nav>
        <p className="mt-5">
          {SITE.nome} é um projeto pessoal de {SITE.responsavel}, sem empresa
          constituída. Contato:{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-2 hover:text-ink dark:hover:text-cream"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
