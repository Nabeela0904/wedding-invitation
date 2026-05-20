import type { Metadata } from "next";
import Link from "next/link";
import ScrollProgress from "@/components/haldi/ScrollProgress";
import CinematicBackdrop from "@/components/haldi/CinematicBackdrop";
import IslamicLattice from "@/components/haldi/IslamicLattice";
import GoldDust from "@/components/haldi/GoldDust";
import CinematicHero from "@/components/haldi/CinematicHero";
import StorySection from "@/components/haldi/StorySection";
import DetailsCard from "@/components/haldi/DetailsCard";
import HaldiFooter from "@/components/haldi/HaldiFooter";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "A cinematic invitation to the Haldi ceremony of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="haldi-cinematic relative min-h-screen overflow-x-hidden bg-midnight">
      <ScrollProgress />
      <CinematicBackdrop />
      <IslamicLattice />
      <GoldDust />

      <CinematicHero />
      <StorySection />
      <DetailsCard />
      <HaldiFooter />

      <Link
        href="/"
        className="fixed left-4 top-5 z-50 rounded-sm border border-luxe-gold/25 bg-black/50 px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-luxe-cream/80 backdrop-blur-md transition-[opacity,transform] duration-300 hover:border-luxe-gold/45 hover:text-luxe-cream active:scale-[0.98] sm:left-6 sm:top-6 sm:text-xs"
      >
        ← Home
      </Link>
    </main>
  );
}
