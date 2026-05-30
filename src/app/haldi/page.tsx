import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CinematicHaldiScene from "@/components/haldi/CinematicHaldiScene";
import HaldiHero from "@/components/haldi/HaldiHero";
import HaldiClosingFooter from "@/components/haldi/HaldiClosingFooter";

const MarigoldPetals = dynamic(() => import("@/components/haldi/MarigoldPetals"), {
  ssr: false,
});

const DetailsCard = dynamic(() => import("@/components/haldi/DetailsCard"), {
  loading: () => <div className="relative z-10 mx-auto h-40 max-w-lg" aria-hidden />,
});

const HaldiVenueModule = dynamic(() => import("@/components/haldi/HaldiVenueModule"), {
  loading: () => <div className="relative z-10 mx-auto h-40 max-w-lg" aria-hidden />,
});

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahamed",
  description:
    "You are cordially invited to Rasm-e-Haldi of Shoaib Faraz Ahamed — 8th July, 2026.",
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
      <HaldiVenueModule />

      <div className="relative z-10 mx-auto flex max-w-lg justify-end bg-cream px-5 pb-10 pt-2 sm:px-8">
        <a
          href="/nikah"
          className="inline-flex items-center justify-center rounded-full border border-marigold/45 bg-gradient-to-r from-marigold to-saffron px-8 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-cream shadow-gold transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-gold-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/50 active:scale-[0.97]"
        >
          Nikah
        </a>
      </div>

      <HaldiClosingFooter />

      <a
        href="/invitation.html"
        className="main-invitation-link fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/50 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-sm transition-colors hover:bg-white/70 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>
    </main>
  );
}
