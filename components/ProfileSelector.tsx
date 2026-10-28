"use client";

import { PERFIS } from "@/lib/perfis";
import { PerfilInvestidor } from "@/lib/types";

interface ProfileSelectorProps {
  perfilSelecionado: PerfilInvestidor | null;
  aoSelecionar: (perfil: PerfilInvestidor) => void;
}

export default function ProfileSelector({
  perfilSelecionado,
  aoSelecionar,
}: ProfileSelectorProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {PERFIS.map((perfil) => {
        const selecionado = perfil.id === perfilSelecionado;
        return (
          <button
            key={perfil.id}
            type="button"
            aria-pressed={selecionado}
            onClick={() => aoSelecionar(perfil.id)}
            className={`min-w-0 flex-[1_1_260px] rounded border p-6 text-left transition ${
              selecionado
                ? "border-ouro-claro bg-superficie"
                : "border-ouro-apagado hover:border-ouro"
            }`}
          >
            <span
              className={`block font-display text-2xl ${
                selecionado ? "text-ouro-claro" : "text-creme"
              }`}
            >
              {perfil.nome}
            </span>
            <span className="mt-2 block text-[13px] leading-relaxed text-suave">
              {perfil.descricao}
            </span>
          </button>
        );
      })}
    </div>
  );
}
