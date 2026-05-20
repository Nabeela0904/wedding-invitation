import Link from "next/link";
import MarigoldPetals from "@/components/haldi/MarigoldPetals";
import HaldiHero from "@/components/haldi/HaldiHero";
import DetailsCard from "@/components/haldi/DetailsCard";

export default function HaldiPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <MarigoldPetals />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/60 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-md transition-colors hover:bg-white/80 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>

      <HaldiHero />
      <DetailsCard />

      <footer className="relative z-10 pb-10 text-center">
        <p className="font-sans text-xs text-gold/50">
          With love &amp; gratitude — Shoaib Faraz Ahmed
        </p>
      </footer>
    </main>
  );
}
