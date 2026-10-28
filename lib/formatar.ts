// Formatação de números no padrão brasileiro (vírgula decimal, ponto de milhar).

const MENOS = "−"; // sinal de menos de verdade, mais legível que o hífen

export function formatarNumero(valor: number, casas = 1): string {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  });
}

export function formatarMoeda(valor: number): string {
  return `R$ ${formatarNumero(valor, 2)}`;
}

export function formatarPercentual(valor: number, casas = 1): string {
  return `${formatarNumero(valor, casas)}%`;
}

// Variação do dia com sinal explícito: +2,34% ou −1,21%.
export function formatarVariacao(valor: number): string {
  const arredondado = Number(Math.abs(valor).toFixed(2));
  const sinal = arredondado === 0 ? "" : valor < 0 ? MENOS : "+";
  return `${sinal}${formatarNumero(arredondado, 2)}%`;
}
