export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-sage-500 text-cream">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12h4l2 7 4-14 3 10 2-3h5" />
        </svg>
      </span>
      <div className="leading-tight">
        <p className="font-display text-lg font-semibold tracking-tight">
          Radar<span className="text-sage-500">Alpha</span>
        </p>
        <p className="label-eyebrow -mt-0.5">Terminal de pesquisa</p>
      </div>
    </div>
  );
}
