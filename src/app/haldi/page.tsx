import type { Metadata } from "next";
import Link from "next/link";
import CinematicHaldiScene from "@/components/haldi/CinematicHaldiScene";
import MarigoldPetals from "@/components/haldi/MarigoldPetals";
import HaldiHero from "@/components/haldi/HaldiHero";
import DetailsCard from "@/components/haldi/DetailsCard";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "You are cordially invited to Rasm-e-Haldi of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream">
      <MarigoldPetals />

      <section className="relative min-h-[100svh]">
        <CinematicHaldiScene />
        <HaldiHero />
      </section>

      <DetailsCard />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/50 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-sm transition-colors hover:bg-white/70 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>

      <footer className="relative z-10 pb-10 text-center">
        <p className="font-sans text-xs text-gold/50">
          With love &amp; gratitude — Shoaib &amp; Zeenath
        </p>
      </footer>
    </main>
  );
}
