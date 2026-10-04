"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Escuro é o padrão do site; só vira claro se a pessoa escolher isso.
  const [escuro, setEscuro] = useState(true);

  useEffect(() => {
    const salvo = window.localStorage.getItem("radar-theme");
    const deveEscurecer = salvo !== "light";
    setEscuro(deveEscurecer);
    document.documentElement.classList.toggle("dark", deveEscurecer);
  }, []);

  function alternar() {
    const novo = !escuro;
    setEscuro(novo);
    document.documentElement.classList.toggle("dark", novo);
    window.localStorage.setItem("radar-theme", novo ? "dark" : "light");
  }

  return (
    <button
      onClick={alternar}
      aria-label={escuro ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-cream-border text-ink transition hover:bg-cream-card dark:border-graphite-700 dark:text-cream dark:hover:bg-graphite-800"
    >
      {escuro ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
