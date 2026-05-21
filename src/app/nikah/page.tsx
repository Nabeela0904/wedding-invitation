import type { Metadata } from "next";
import IslamicLatticeBg from "@/components/nikah/IslamicLatticeBg";
import NikahHero from "@/components/nikah/NikahHero";
import NikahEventDetails from "@/components/nikah/NikahEventDetails";
import NikahVenueSection from "@/components/nikah/NikahVenueSection";

export const metadata: Metadata = {
  title: "Nikah Ceremony | Shoaib & Zeenath",
  description:
    "With the blessings of Allah, you are invited to the Nikah ceremony of Shoaib Faraz Ahmed & Zeenath Banu — 09 July, 2026.",
};

export default function NikahPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory text-emerald">
      <IslamicLatticeBg />
      <NikahHero />
      <NikahEventDetails />
      <NikahVenueSection />

      <a
        href="/index.html"
        className="fixed left-4 top-4 z-50 rounded-full border border-metallic-gold/35 bg-white/60 px-4 py-2 font-sans text-xs font-medium text-emerald backdrop-blur-sm transition-colors hover:bg-white/80 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>

      <footer className="relative z-10 pb-10 text-center">
        <p className="font-sans text-xs text-emerald/45">
          With love &amp; gratitude — Shoaib &amp; Zeenath
        </p>
      </footer>
    </main>
  );
}
