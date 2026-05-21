import type { Metadata } from "next";
import Link from "next/link";
import MountainScene from "@/components/mountain/MountainScene";
import MountainHero from "@/components/mountain/MountainHero";
import BlessingsSection from "@/components/mountain/BlessingsSection";
import InviteSection from "@/components/mountain/InviteSection";
import EventDetailsSection from "@/components/mountain/EventDetailsSection";
import ThingsToKnow from "@/components/mountain/ThingsToKnow";
import MountainRsvpSection from "@/components/mountain/MountainRsvpSection";
import MountainCountdownSection from "@/components/mountain/MountainCountdownSection";
import MountainFooter from "@/components/mountain/MountainFooter";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "You are cordially invited to the Haldi ceremony of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="mountain-page relative min-h-screen overflow-x-hidden">
      <MountainScene />

      <MountainHero />
      <BlessingsSection />
      <InviteSection />
      <EventDetailsSection />
      <ThingsToKnow />
      <MountainRsvpSection />
      <MountainCountdownSection />
      <MountainFooter />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-white/50 bg-white/70 px-4 py-2 font-sans text-xs font-medium text-mountain-ink shadow-sm backdrop-blur-md transition-opacity hover:opacity-90 sm:left-6 sm:top-6"
      >
        ← Home
      </Link>
    </main>
  );
}
