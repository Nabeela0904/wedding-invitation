import type { Metadata } from "next";
import Link from "next/link";
import AmbientGlow from "@/components/haldi/AmbientGlow";
import MarigoldPetals from "@/components/haldi/MarigoldPetals";
import HaldiHero from "@/components/haldi/HaldiHero";
import DetailsCard from "@/components/haldi/DetailsCard";
import HaldiFooter from "@/components/haldi/HaldiFooter";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "You are cordially invited to the Haldi ceremony of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AmbientGlow />
      <MarigoldPetals />
      <HaldiHero />
      <DetailsCard />
      <HaldiFooter />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/25 bg-white/70 px-4 py-2 font-sans text-xs font-medium text-gold shadow-sm backdrop-blur-lg transition-[opacity,transform] duration-300 hover:opacity-90 active:scale-[0.98] sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>
    </main>
  );
}
