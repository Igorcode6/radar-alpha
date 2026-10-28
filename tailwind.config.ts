import type { Config } from "tailwindcss";

// Paleta e tipografia da direção visual "luxo clássico": preto profundo com
// dourado só como acento. Os contrastes sobre o fundo (#0A0909) foram medidos:
// ouro 5,99:1, ouro claro 10,79:1, creme 15,17:1, suave 7,74:1, alta 7,31:1,
// baixa 6,69:1. A cor "linha" (2,4:1) só serve de divisor decorativo.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fundo: "#0A0909",
        superficie: "#171514",
        creme: "#E8E0D1",
        suave: "#AAA096",
        ouro: {
          DEFAULT: "#A88945",
          claro: "#D8BC79",
          apagado: "#7A6232", // bordas de botões e campos (3,4:1)
          linha: "#654923", // só divisores decorativos
        },
        alta: "#4CAF7A",
        baixa: "#E0786B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
