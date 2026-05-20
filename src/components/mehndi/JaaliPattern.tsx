export default function JaaliPattern() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      aria-hidden
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="jaali-lattice"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0 L56 28 L28 56 L0 28 Z"
              fill="none"
              stroke="#B45309"
              strokeWidth="0.6"
            />
            <circle cx="28" cy="28" r="3" fill="#D97706" />
            <path
              d="M28 8 L36 20 L28 32 L20 20 Z"
              fill="none"
              stroke="#B45309"
              strokeWidth="0.5"
            />
            <path
              d="M8 28 L20 36 L32 28 L20 20 Z"
              fill="none"
              stroke="#B45309"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#jaali-lattice)" />
      </svg>
    </div>
  );
}
