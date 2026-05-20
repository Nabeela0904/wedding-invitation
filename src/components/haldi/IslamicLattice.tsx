export default function IslamicLattice() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] opacity-[0.09]"
      aria-hidden
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="cinematic-jaali"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0 L56 28 L28 56 L0 28 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.65"
            />
            <path
              d="M28 8 L40 20 L28 32 L16 20 Z"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="0.55"
            />
            <circle cx="28" cy="28" r="2.5" fill="#F59E0B" opacity="0.9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cinematic-jaali)" />
      </svg>
    </div>
  );
}
