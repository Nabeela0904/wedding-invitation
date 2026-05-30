import type { Metadata } from "next";
import dynamic from "next/dynamic";
import CinematicNikahScene from "@/components/nikah/CinematicNikahScene";
import NikahHeroSlide from "@/components/nikah/NikahHeroSlide";
import NikahTimelineSection from "@/components/nikah/NikahTimelineSection";
import NikahVenueModule from "@/components/nikah/NikahVenueModule";
import NikahClosingFooter from "@/components/nikah/NikahClosingFooter";

const NikahPetals = dynamic(() => import("@/components/nikah/NikahPetals"));

export const metadata: Metadata = {
  title: "Nikah Ceremony | Shoaib & Zeenath",
  description:
    "With the blessings of Allah, you are invited to the Nikah ceremony of Shoaib Faraz Ahmed & Zeenath Banu — 09 July, 2026.",
};

export default function NikahPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory text-emerald">
      <NikahPetals />

      <section className="relative min-h-[100svh]">
        <CinematicNikahScene />
        <NikahHeroSlide />
      </section>

      <NikahTimelineSection />
      <NikahVenueModule />
      <NikahClosingFooter />

      <a
        href="/invitation.html"
        className="main-invitation-link fixed left-4 top-4 z-50 rounded-full border border-metallic-gold/35 bg-white/55 px-4 py-2 font-sans text-xs font-medium text-emerald backdrop-blur-sm transition-colors hover:bg-white/75 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>
    </main>
  );
}
