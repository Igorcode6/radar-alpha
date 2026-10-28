export default function Logo() {
  return (
    <span className="flex items-center gap-3.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.webp"
        alt=""
        width={44}
        height={44}
        className="h-11 w-11 rounded-full"
      />
      <span className="flex flex-col gap-0.5">
        <span className="font-display text-xl uppercase tracking-[0.28em] text-creme">
          RadarAlpha
        </span>
        <span className="eyebrow">Análise de ações da B3</span>
      </span>
    </span>
  );
}
