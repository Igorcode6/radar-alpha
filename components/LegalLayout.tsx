import Eyebrow from "./Eyebrow";
import { SITE } from "@/lib/site";

interface LegalLayoutProps {
  titulo: string;
  children: React.ReactNode;
  mostrarData?: boolean;
}

// Página de texto corrido: políticas, termos e "Sobre o projeto".
export default function LegalLayout({
  titulo,
  children,
  mostrarData = true,
}: LegalLayoutProps) {
  return (
    <main id="conteudo" className="flex-1">
      <article className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
        <Eyebrow>{mostrarData ? "Documento" : "Projeto"}</Eyebrow>
        <h1 className="mt-6 font-display text-4xl font-normal leading-tight sm:text-[44px]">
          {titulo}
        </h1>
        {mostrarData && (
          <p className="rotulo mt-3">Última atualização: {SITE.atualizadoEm}</p>
        )}
        <div className="mt-10 space-y-4 text-[15px] leading-[1.75] text-creme/90 [&_a]:text-ouro-claro [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-creme [&_code]:rounded [&_code]:bg-superficie [&_code]:px-1.5 [&_code]:py-0.5 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:text-ouro-claro [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-creme [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </main>
  );
}
