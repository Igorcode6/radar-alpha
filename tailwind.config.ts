import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fundo "papel" — terminal de pesquisa, não dashboard escuro genérico
        cream: {
          DEFAULT: "#F6F2E8",
          card: "#FFFFFF",
          border: "#E6E0D2",
        },
        ink: {
          DEFAULT: "#14181A",
          soft: "#434B47",
        },
        // Verde principal — sinal positivo e marca
        sage: {
          400: "#3FA878",
          500: "#2F8F6D",
          600: "#246E55",
        },
        // Alerta/atenção (âmbar) e negativo (terracota)
        amber: {
          100: "#F7ECD3",
          500: "#C98A2E",
        },
        terracotta: {
          500: "#C1574A",
        },
        mist: "#8A8F89",
        // Tema escuro (toggle)
        graphite: {
          950: "#111513",
          900: "#161B18",
          800: "#1D2320",
          700: "#293330",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
