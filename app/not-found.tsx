import Link from "next/link";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <main id="conteudo" className="flex-1">
      <Container className="py-24">
        <Eyebrow>Erro 404</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-normal leading-tight">
          Página não encontrada
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-suave">
          O endereço não existe ou foi movido.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block rounded border border-ouro px-7 py-3.5 text-sm tracking-[0.06em] text-creme transition hover:border-ouro-claro"
        >
          Voltar ao início
        </Link>
      </Container>
    </main>
  );
}
