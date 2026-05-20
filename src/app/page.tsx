import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-sm uppercase tracking-[0.3em] text-saffron">
        Shoaib &amp; Zeenath
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-gold sm:text-5xl">
        Wedding Invitation
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm text-gold/70">
        Select a celebration to view your invitation.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/haldi"
          className="rounded-full border border-marigold/40 bg-gradient-to-r from-marigold to-saffron px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-cream shadow-gold transition-transform hover:scale-[1.02]"
        >
          Haldi Ceremony
        </Link>
        <a
          href="/index.html"
          className="rounded-full border border-marigold/30 bg-white/50 px-8 py-3 font-sans text-sm font-medium text-gold backdrop-blur-sm transition-colors hover:bg-white/70"
        >
          Main Invitation
        </a>
      </div>
    </main>
  );
}
