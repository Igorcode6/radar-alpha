export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="leading-tight">
        <p className="font-display text-lg font-semibold tracking-tight">
          Radar<span className="text-brand">Alpha</span>
        </p>
        <p className="label-eyebrow -mt-0.5">Análise de ações</p>
      </div>
    </div>
  );
}
