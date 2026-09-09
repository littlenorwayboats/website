export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        className="h-12 w-12 shrink-0 text-gold"
        role="img"
        aria-hidden="true"
      >
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="#1a1612"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M18 28c0-8 6-14 14-14s14 6 14 14v4H18v-4Z"
          fill="#c9c4bc"
          stroke="#8a8378"
          strokeWidth="1.2"
        />
        <path d="M24 20h16v4H24z" fill="#8a8378" />
        <path
          d="M20 32h24l2 6H18l2-6Z"
          fill="#b8b2a8"
          stroke="#6b6560"
          strokeWidth="1"
        />
        <path
          d="M12 44c8 6 32 6 42-2-10 8-28 10-42 2Z"
          fill="#d4b483"
        />
        <path
          d="M10 42c4 1 8-6 12-2 3 3 8 1 10-2 3 4 8 5 12 1 3 3 8 4 12 0"
          fill="none"
          stroke="#e8d4a8"
          strokeWidth="1.4"
        />
        <circle cx="16" cy="42" r="2.2" fill="#8b2e2e" />
        <circle cx="26" cy="44" r="2.2" fill="#2e5a8b" />
        <circle cx="38" cy="44" r="2.2" fill="#8b2e2e" />
        <circle cx="48" cy="42" r="2.2" fill="#2e5a8b" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-sm tracking-[0.18em] text-gold uppercase sm:text-base">
          Little Norway
        </span>
        <span className="text-[0.65rem] font-semibold tracking-[0.32em] text-parchment uppercase">
          Boats
        </span>
      </span>
    </span>
  );
}
