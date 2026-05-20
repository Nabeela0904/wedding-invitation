export default function JaaliPattern() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03]"
      aria-hidden
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="haldi-jaali"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M24 0 L48 24 L24 48 L0 24 Z"
              fill="none"
              stroke="#B45309"
              strokeWidth="0.55"
            />
            <path
              d="M24 6 L36 18 L24 30 L12 18 Z"
              fill="none"
              stroke="#EA580C"
              strokeWidth="0.45"
            />
            <circle cx="24" cy="24" r="2.5" fill="#F59E0B" />
            <path
              d="M24 12 L30 18 L24 24 L18 18 Z"
              fill="none"
              stroke="#B45309"
              strokeWidth="0.4"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#haldi-jaali)" />
      </svg>
    </div>
  );
}
