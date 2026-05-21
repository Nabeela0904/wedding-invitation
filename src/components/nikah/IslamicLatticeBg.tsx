"use client";

/** Subtle Islamic geometric lattice overlay */
export default function IslamicLatticeBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
              <path d='M40 0 L80 40 L40 80 L0 40 Z' fill='none' stroke='%23064e3b' stroke-width='0.8'/>
              <circle cx='40' cy='40' r='12' fill='none' stroke='%23d4af37' stroke-width='0.6'/>
              <path d='M40 10 L50 40 L40 70 L30 40 Z' fill='none' stroke='%23064e3b' stroke-width='0.5'/>
            </svg>
          `)}")`,
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(212,175,55,0.08), transparent 55%), linear-gradient(180deg, #fdfbf7 0%, #f8f4ec 45%, #fdfbf7 100%)",
        }}
      />
    </div>
  );
}
