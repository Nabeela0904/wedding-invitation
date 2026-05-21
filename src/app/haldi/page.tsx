import type { Metadata } from "next";
import Link from "next/link";
import MountainHero from "@/components/mountain/MountainHero";
import BlessingsSection from "@/components/mountain/BlessingsSection";
import InviteSection from "@/components/mountain/InviteSection";
import MountainRsvpSection from "@/components/mountain/MountainRsvpSection";
import EventDetailsSection from "@/components/mountain/EventDetailsSection";
import ThingsToKnow from "@/components/mountain/ThingsToKnow";
import FollowSection from "@/components/mountain/FollowSection";
import MountainCountdownSection from "@/components/mountain/MountainCountdownSection";
import MountainFooter from "@/components/mountain/MountainFooter";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib & Zeenath",
  description:
    "You are cordially invited to the Haldi ceremony of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="mountain-page relative min-h-screen overflow-x-hidden">
      <MountainHero />
      <BlessingsSection />
      <InviteSection />
      <MountainRsvpSection />
      <EventDetailsSection />
      <ThingsToKnow />
      <FollowSection />
      <MountainCountdownSection />
      <MountainFooter />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/50 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-sm transition-colors hover:bg-white/70 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>
    </main>
  );
}
