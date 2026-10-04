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
    <div className="grid gap-4 sm:grid-cols-3">
      {PERFIS.map((perfil) => {
        const selecionado = perfil.id === perfilSelecionado;
        return (
          <button
            key={perfil.id}
            onClick={() => aoSelecionar(perfil.id)}
            className={`rounded-xl border p-5 text-left transition ${
              selecionado
                ? "border-sage-500 bg-sage-500/[0.06]"
                : "border-cream-border bg-cream-card hover:border-sage-500/40 dark:border-graphite-700 dark:bg-graphite-900"
            }`}
          >
            <p className="font-display text-lg font-semibold">{perfil.nome}</p>
            <p className="mt-1 text-sm text-mist">{perfil.descricao}</p>
            <p className="label-eyebrow mt-3 text-sage-500">{perfil.foco}</p>
          </button>
        );
      })}
    </div>
  );
}
