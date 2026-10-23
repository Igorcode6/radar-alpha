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
          700: "#1C5A45",
        },
        // Cores de TEXTO com contraste mínimo de 4.5:1 nos dois temas (WCAG AA).
        // Os valores mudam em app/globals.css conforme o tema (claro/escuro).
        brand: "rgb(var(--brand-text) / <alpha-value>)",
        negative: "rgb(var(--neg-text) / <alpha-value>)",
        caution: "rgb(var(--caution-text) / <alpha-value>)",
        // Alerta/atenção (âmbar) e negativo (terracota)
        amber: {
          100: "#F7ECD3",
          500: "#C98A2E",
        },
        terracotta: {
          500: "#C1574A",
        },
        // Texto secundário; escurece no tema claro para manter o contraste.
        mist: "rgb(var(--mist) / <alpha-value>)",
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
