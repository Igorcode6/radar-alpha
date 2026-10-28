import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies | RadarAlpha",
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
        O {SITE.nome} não define cookies próprios, nem de rastreamento, de
        publicidade ou de análise de audiência, e não grava dados no armazenamento
        local do seu navegador. Não há nada guardado no seu aparelho para
        identificar você.
      </p>

      <h2>Sobre o botão de tema</h2>
      <p>
        Uma versão anterior do site tinha um botão de tema claro ou escuro, que
        guardava a sua escolha no navegador (armazenamento local, com o nome{" "}
        <code>radar-theme</code>). Esse botão foi removido e o dado não é mais
        usado. Se você chegou a usá-lo, pode apagar o dado antigo nas configurações
        do navegador, na parte de dados do site ou de armazenamento local.
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
