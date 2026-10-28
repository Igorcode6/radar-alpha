// Título pequeno de seção: filete dourado + rótulo em caixa alta.
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3.5">
      <span aria-hidden="true" className="block h-px w-10 bg-ouro" />
      <span className="eyebrow">{children}</span>
    </div>
  );
}
