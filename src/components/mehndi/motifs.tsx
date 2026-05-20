/** Inline SVG motifs — no external assets */

export function StarCrescentMotif({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M24 4 L27.5 17.5 L41 17.5 L30.25 26 L34 40 L24 32 L14 40 L17.75 26 L7 17.5 L20.5 17.5 Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="0.6"
      />
      <path
        d="M32 30 C34 26 38 24 42 26 C38 30 36 34 32 36 C30 32 30 30 32 30 Z"
        fill="#B45309"
        opacity="0.85"
      />
    </svg>
  );
}

export function IslamicStarSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2 L18.8 11.2 L28 11.2 L20.6 17 L23.4 26.2 L16 20.4 L8.6 26.2 L11.4 17 L4 11.2 L13.2 11.2 Z"
        fill="#D97706"
        stroke="#B45309"
        strokeWidth="0.5"
      />
      <circle cx="16" cy="16" r="2.5" fill="#F59E0B" />
    </svg>
  );
}

export function MarigoldPetalSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#F97316" />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#FB923C"
        transform="rotate(72 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#EA580C"
        transform="rotate(144 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F59E0B"
        transform="rotate(216 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F97316"
        transform="rotate(288 18 18)"
      />
      <circle cx="18" cy="18" r="4.5" fill="#D97706" />
    </svg>
  );
}

export function LeafAccentSvg({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2 C6 10 4 18 12 30 C20 18 18 10 12 2 Z"
        fill="#15803D"
        opacity="0.75"
      />
      <path
        d="M12 6 C10 14 10 20 12 26"
        stroke="#166534"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}
