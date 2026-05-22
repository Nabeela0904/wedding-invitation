import type { Metadata } from "next";
import dynamic from "next/dynamic";
import WalimaLoader from "@/components/walima/WalimaLoader";
import CinematicWalimaScene from "@/components/walima/CinematicWalimaScene";
import WalimaHeroSlide from "@/components/walima/WalimaHeroSlide";
import WalimaTimelineSection from "@/components/walima/WalimaTimelineSection";
import WalimaVenueModule from "@/components/walima/WalimaVenueModule";

const WalimaPetals = dynamic(() => import("@/components/walima/WalimaPetals"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Walima Ceremony | Shoaib & Zeenath",
  description:
    "Mr & Mrs Meer Ahmed request the honour of your presence at the Walima ceremony — Sunday 11th July, 2026.",
};

export default function WalimaPage() {
  return (
    <WalimaLoader>
      <main className="relative min-h-screen overflow-x-hidden bg-champagne-light text-emerald">
        <WalimaPetals />

        <section className="relative min-h-[100svh]">
          <CinematicWalimaScene />
          <WalimaHeroSlide />
        </section>

        <WalimaTimelineSection />
        <WalimaVenueModule />

        <footer className="border-t border-emerald/10 bg-emerald-deep py-10 text-center">
          <p className="font-sans text-xs text-champagne-light/45">
            With love &amp; gratitude — Shoaib &amp; Zeenath
          </p>
        </footer>

        <a
          href="/index.html"
          className="fixed left-4 top-4 z-50 rounded-full border border-metallic-gold/35 bg-white/55 px-4 py-2 font-sans text-xs font-medium text-emerald backdrop-blur-sm transition-colors hover:bg-white/75 sm:left-6 sm:top-6 sm:text-sm"
        >
          ← Main Invitation
        </a>
      </main>
    </WalimaLoader>
  );
}
