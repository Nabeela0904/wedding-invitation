/** Mughal arch silhouette — decorative frame accent */
export default function MehrabAccent() {
  return (
    <div
      className="pointer-events-none absolute inset-x-4 top-0 h-16 opacity-30 sm:inset-x-8 sm:h-20"
      aria-hidden
    >
      <svg
        viewBox="0 0 400 80"
        className="h-full w-full"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 80 L0 40 Q200 -20 400 40 L400 80 Z"
          stroke="#D4AF37"
          strokeWidth="1"
          fill="url(#archFill)"
        />
        <defs>
          <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#D4AF37" stopOpacity="0.08" />
            <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
