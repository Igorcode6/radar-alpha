import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade — RadarAlpha",
  description: "Como o RadarAlpha trata dados, de acordo com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <LegalLayout titulo="Política de Privacidade">
      <p>
        Esta política explica, em linguagem simples, quais dados o {SITE.nome} trata
        e por quê, de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018,
        a LGPD).
      </p>

      <h2>1. Quem é o responsável</h2>
      <p>
        O {SITE.nome} é um projeto pessoal de {SITE.responsavel}, ainda sem empresa
        constituída. Para qualquer assunto sobre privacidade, escreva para{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>2. O que nós coletamos</h2>
      <p>
        O site não tem cadastro, login, formulário, newsletter nem pagamento. Nós não
        pedimos nome, e-mail, telefone ou qualquer documento. Os únicos dados
        envolvidos são:
      </p>
      <ul>
        <li>
          <strong>Suas escolhas na ferramenta:</strong> o perfil de investidor e as
          ações selecionadas. Elas são enviadas ao servidor só para gerar a análise,
          não ficam ligadas a você e não são guardadas em banco de dados.
        </li>
        <li>
          <strong>Dados técnicos de acesso:</strong> como endereço IP, tipo de
          navegador e data e hora do acesso. Eles são registrados automaticamente pela
          empresa de hospedagem (Vercel) para manter o site funcionando e seguro.
        </li>
        <li>
          <strong>Preferência de tema (claro ou escuro):</strong> fica salva apenas no
          seu próprio navegador e não é enviada para nós.
        </li>
      </ul>
      <p>
        Nós não usamos ferramentas de análise de audiência, pixels de anúncio ou
        outros rastreadores.
      </p>

      <h2>3. Para que usamos esses dados</h2>
      <p>
        Apenas para fazer o site funcionar, gerar as análises que você pediu e
        proteger o serviço contra abuso e falhas. Nós não vendemos dados e não os
        usamos para publicidade.
      </p>

      <h2>4. Com quem os dados passam</h2>
      <p>Para o site funcionar, usamos serviços de terceiros:</p>
      <ul>
        <li>
          <strong>Vercel:</strong> hospedagem do site, que registra os dados técnicos
          de acesso citados acima.
        </li>
        <li>
          <strong>brapi.dev:</strong> fonte dos preços e indicadores das ações. Nosso
          servidor envia a ela apenas os códigos das ações consultadas (por exemplo,
          PETR4), nunca informações sobre você.
        </li>
        <li>
          <strong>Anthropic:</strong> quando a explicação por inteligência artificial
          está ativa, nosso servidor envia a ela os indicadores da ação e o perfil
          escolhido para gerar o texto. Nenhum dado pessoal é enviado.
        </li>
      </ul>
      <p>
        Alguns desses serviços podem processar dados em servidores fora do Brasil.
      </p>

      <h2>5. Por quanto tempo guardamos</h2>
      <p>
        Nós não guardamos dados pessoais em banco de dados próprio. Os registros
        técnicos de acesso ficam com a hospedagem, pelo prazo definido por ela.
      </p>

      <h2>6. Seus direitos</h2>
      <p>
        A LGPD garante direitos como confirmar se há tratamento dos seus dados,
        acessá-los, corrigi-los, pedir a eliminação e obter informações sobre com
        quem foram compartilhados. Para exercer qualquer um deles, escreva para{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Você também pode procurar
        a Autoridade Nacional de Proteção de Dados (ANPD).
      </p>

      <h2>7. Mudanças nesta política</h2>
      <p>
        Se o site passar a coletar outros dados (por exemplo, com cadastro ou
        análise de audiência), esta página será atualizada antes disso, e a data no
        topo mudará.
      </p>
    </LegalLayout>
  );
}
