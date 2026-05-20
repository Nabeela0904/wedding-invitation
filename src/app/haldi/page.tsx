import type { Metadata } from "next";
import Link from "next/link";
import JaaliPattern from "@/components/haldi/JaaliPattern";
import AmbientPetals from "@/components/haldi/AmbientPetals";
import HaldiInvitation from "@/components/haldi/HaldiInvitation";
import MusicPlayer from "@/components/haldi/MusicPlayer";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "You are cordially invited to attend Rasm-e-Haldi of Shoaib Faraz Ahmed — 8th July, 2026.",
};

export default function HaldiPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <JaaliPattern />
      <AmbientPetals />
      <HaldiInvitation />
      <MusicPlayer />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border-2 border-marigold/35 bg-white/60 px-4 py-2 font-sans text-xs font-medium text-deep-gold backdrop-blur-md transition-opacity hover:opacity-90 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>

      <footer className="relative z-10 pb-28 text-center">
        <p className="font-sans text-xs text-deep-gold/50">
          With love &amp; gratitude — Shoaib Faraz Ahmed
        </p>
      </footer>
    </main>
  );
}
