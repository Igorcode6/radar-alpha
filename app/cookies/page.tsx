import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies — RadarAlpha",
  description: "O que o RadarAlpha guarda no seu navegador.",
};

export default function CookiesPage() {
  return (
    <LegalLayout titulo="Política de Cookies">
      <p>
        Cookies são pequenos arquivos que um site grava no seu navegador. Esta página
        explica o que o {SITE.nome} guarda ali.
      </p>

      <h2>O que usamos</h2>
      <p>
        O {SITE.nome} não define cookies de rastreamento, de publicidade nem de
        análise de audiência. A única informação que o site grava no seu navegador é
        a sua preferência de tema (claro ou escuro), usando o armazenamento local
        (localStorage), com o nome <code>radar-theme</code>. Ela serve só para lembrar
        sua escolha, fica no seu aparelho e não é enviada para nós.
      </p>

      <h2>Como apagar</h2>
      <p>
        Você pode apagar esse dado a qualquer momento nas configurações do seu
        navegador, na parte de dados do site ou de armazenamento local. Se fizer
        isso, o site volta ao tema escuro, que é o padrão.
      </p>

      <h2>Aviso de cookies</h2>
      <p>
        Como não usamos cookies de rastreamento, o site não exibe faixa de
        consentimento de cookies. Se isso mudar, por exemplo ao adicionar análise de
        audiência ou anúncios, a faixa será implementada e esta página atualizada
        antes.
      </p>

      <p>
        Dúvidas: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Veja também a{" "}
        <Link href="/privacidade">Política de Privacidade</Link>.
      </p>
    </LegalLayout>
  );
}
