import type { Metadata } from "next";
import Link from "next/link";
import JaaliPattern from "@/components/mehndi/JaaliPattern";
import FloatingAmbience from "@/components/mehndi/FloatingAmbience";
import MehndiInvitation from "@/components/mehndi/MehndiInvitation";

export const metadata: Metadata = {
  title: "Rasm-e-Haldi | Shoaib Faraz Ahmed",
  description:
    "You are cordially invited to attend Rasm-e-haldi of Shoaib Faraz Ahmed.",
};

export default function MehndiPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <JaaliPattern />
      <FloatingAmbience />

      <Link
        href="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-marigold/30 bg-white/60 px-4 py-2 font-sans text-xs font-medium text-gold backdrop-blur-md transition-colors hover:bg-white/80 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Wedding Home
      </Link>

      <MehndiInvitation />

      <footer className="relative z-10 pb-10 text-center">
        <p className="font-sans text-xs text-gold/50">
          With love &amp; gratitude — Shoaib Faraz Ahmed
        </p>
      </footer>
    </main>
  );
}
