import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso | RadarAlpha",
  description: "Regras de uso do RadarAlpha e avisos importantes sobre investimentos.",
};

export default function TermosPage() {
  return (
    <LegalLayout titulo="Termos de Uso">
      <p>
        Ao usar o {SITE.nome}, você concorda com estes termos. Se não concordar, não
        use o site.
      </p>

      <h2>1. O que é o {SITE.nome}</h2>
      <p>
        Uma ferramenta gratuita que organiza indicadores públicos de ações da B3 e
        calcula uma nota de 0 a 10 conforme o perfil de investidor escolhido por
        você, com uma explicação do resultado.
      </p>

      <h2>2. Não é recomendação de investimento</h2>
      <p>
        Todo o conteúdo é informativo e educacional. Os rótulos “favorável”, “neutra”
        e “desfavorável” são apenas o resultado de uma fórmula automática, não uma
        recomendação, oferta, consultoria ou análise personalizada de investimentos.
        O site não conhece a sua situação financeira, seus objetivos nem sua
        tolerância a risco.
      </p>
      <p>
        Investir em ações envolve risco de perda, inclusive do valor investido.
        Resultados passados não garantem resultados futuros. Decida por conta própria
        e, se precisar de orientação, procure um profissional habilitado.
      </p>

      <h2>3. Sobre os dados e as notas</h2>
      <ul>
        <li>
          Os preços e indicadores vêm de uma fonte de terceiros (brapi.dev) e podem ter
          atraso, estar incompletos ou conter erros.
        </li>
        <li>
          Cards marcados como “demo” usam números de demonstração, que não são
          cotações reais.
        </li>
        <li>
          Algumas medidas são aproximações. Por exemplo, a “volatilidade” é estimada
          a partir da diferença entre a máxima e a mínima de 52 semanas.
        </li>
        <li>
          Os pesos e os limites da nota são escolhas do projeto, ainda em teste, e
          não foram validados por estudo ou por especialista.
        </li>
        <li>
          As explicações podem ser geradas por inteligência artificial e podem conter
          imprecisões.
        </li>
      </ul>

      <h2>4. Uso permitido</h2>
      <p>
        Você pode usar o site para consulta pessoal. Não é permitido tentar
        derrubar, sobrecarregar ou invadir o serviço, nem fazer uso automatizado em
        grande volume sem autorização.
      </p>

      <h2>5. Disponibilidade e responsabilidade</h2>
      <p>
        O serviço é oferecido como está, sem garantia de funcionamento contínuo ou de
        exatidão das informações, e pode mudar ou sair do ar a qualquer momento. Na
        medida permitida pela lei, o responsável não responde por perdas decorrentes
        de decisões tomadas com base no conteúdo do site. Isso não afasta direitos
        que a lei garanta a você.
      </p>

      <h2>6. Propriedade</h2>
      <p>
        O código e o design do {SITE.nome} pertencem ao responsável pelo projeto. Os
        dados de mercado pertencem às suas respectivas fontes.
      </p>

      <h2>7. Mudanças e contato</h2>
      <p>
        Estes termos podem mudar; a data no topo mostra a última versão. Dúvidas:{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Veja também a{" "}
        <Link href="/privacidade">Política de Privacidade</Link> e a{" "}
        <Link href="/cookies">Política de Cookies</Link>.
      </p>
    </LegalLayout>
  );
}
