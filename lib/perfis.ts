import { PerfilInfo } from "./types";

export const PERFIS: PerfilInfo[] = [
  {
    id: "longo_prazo",
    nome: "Longo prazo",
    descricao: "Prioriza empresas sólidas, com lucro consistente e menos dívida.",
    foco: "P/L saudável, ROE alto, dívida baixa e histórico de crescimento.",
  },
  {
    id: "compra_na_queda",
    nome: "Compra na queda",
    descricao: "Busca boas empresas que caíram de preço sem motivo estrutural.",
    foco: "Queda relevante frente à máxima de 52 semanas, fundamentos ainda saudáveis.",
  },
  {
    id: "volatilidade",
    nome: "Volatilidade",
    descricao: "Foca em ações com movimento de preço forte para operações rápidas.",
    foco: "Volatilidade recente alta e variação do dia relevante.",
  },
];

export function getPerfilInfo(id: string): PerfilInfo | undefined {
  return PERFIS.find((p) => p.id === id);
}
