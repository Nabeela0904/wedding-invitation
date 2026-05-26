import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { mainInvitationPath } from "@/lib/site-base-path";
import CinematicWalimaScene from "@/components/walima/CinematicWalimaScene";
import WalimaHeroSlide from "@/components/walima/WalimaHeroSlide";
import WalimaTimelineSection from "@/components/walima/WalimaTimelineSection";
import WalimaVenueModule from "@/components/walima/WalimaVenueModule";
import { SITE_FOOTER } from "@/lib/site-copy";

const WalimaPetals = dynamic(() => import("@/components/walima/WalimaPetals"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Walima Ceremony | Shoaib & Zeenath",
  description:
    "Mr & Mrs Meer Ahmed request the honour of your presence at the Walima ceremony — Saturday 11th July, 2026.",
};

export default function WalimaPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-cream text-wine">
      <WalimaPetals />

      <section className="relative min-h-[100svh]">
        <CinematicWalimaScene />
        <WalimaHeroSlide />
      </section>

      <WalimaTimelineSection />
      <WalimaVenueModule />

      <footer className="border-t border-wine/10 bg-wine-deep py-10 text-center">
        <p className="font-sans text-xs text-cream/45">{SITE_FOOTER}</p>
      </footer>

      <a
        href={mainInvitationPath()}
        className="main-invitation-link fixed left-4 top-4 z-50 rounded-full border border-wine/25 bg-white/55 px-4 py-2 font-sans text-xs font-medium text-wine backdrop-blur-sm transition-colors hover:bg-white/75 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>
    </main>
  );
}
