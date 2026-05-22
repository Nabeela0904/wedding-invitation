import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CinematicHaldiScene from "@/components/haldi/CinematicHaldiScene";
import HaldiHero from "@/components/haldi/HaldiHero";
import { SITE_FOOTER } from "@/lib/site-copy";

const MarigoldPetals = dynamic(() => import("@/components/haldi/MarigoldPetals"), {
  ssr: false,
});

const DetailsCard = dynamic(() => import("@/components/haldi/DetailsCard"), {
  loading: () => <div className="relative z-10 mx-auto h-40 max-w-lg" aria-hidden />,
});

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

      <a
        href="/index.html"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/50 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-sm transition-colors hover:bg-white/70 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>

      <footer className="relative z-10 pb-10 text-center">
        <p className="font-sans text-xs text-gold/50">
          {SITE_FOOTER}
        </p>
      </footer>
    </main>
  );
}
