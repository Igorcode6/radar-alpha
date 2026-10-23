import Header from "@/components/Header";
import { SITE } from "@/lib/site";

interface LegalLayoutProps {
  titulo: string;
  children: React.ReactNode;
}

export default function LegalLayout({ titulo, children }: LegalLayoutProps) {
  return (
    <main id="conteudo" className="min-h-screen">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pb-24">
        <h1 className="font-display text-3xl font-semibold">{titulo}</h1>
        <p className="mt-2 label-eyebrow">Última atualização: {SITE.atualizadoEm}</p>
        <div className="mt-8 space-y-4 leading-relaxed [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_a]:underline [&_a]:underline-offset-2 [&_a]:text-brand">
          {children}
        </div>
      </article>
    </main>
  );
}
