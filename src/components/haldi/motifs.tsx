/** Inline SVG motifs — no external image assets */

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
        fill="#F59E0B"
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

function eightPointedStarPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
): string {
  const points: string[] = [];
  for (let i = 0; i < 16; i++) {
    const angle = (Math.PI / 8) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return `${points.join(" ")} Z`;
}

const STAR_8 = eightPointedStarPath(16, 16, 14, 6);

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
      <path d={STAR_8} fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
      <circle cx="16" cy="16" r="2" fill="#F59E0B" />
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
      <ellipse cx="18" cy="9" rx="5.5" ry="10" fill="#EA580C" />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F97316"
        transform="rotate(72 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#F59E0B"
        transform="rotate(144 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#EA580C"
        transform="rotate(216 18 18)"
      />
      <ellipse
        cx="18"
        cy="9"
        rx="5.5"
        ry="10"
        fill="#FB923C"
        transform="rotate(288 18 18)"
      />
      <circle cx="18" cy="18" r="4.5" fill="#D97706" />
    </svg>
  );
}
