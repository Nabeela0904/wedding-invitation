import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NikahLocationHero from "@/components/nikah/location/NikahLocationHero";
import NikahLocationMap from "@/components/nikah/location/NikahLocationMap";
import NikahLocationDetails from "@/components/nikah/location/NikahLocationDetails";
import { NIKAH_EVENT } from "@/lib/nikah-event";

const NikahPetals = dynamic(() => import("@/components/nikah/NikahPetals"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Nikah Venue & Location | Shoaib & Zeenath",
  description:
    "Directions and venue details for the Nikah ceremony at Noorunisa Enclave, Meerani's residence — 09 July, 2026.",
};

export default function NikahLocationPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-ivory text-emerald">
      <NikahPetals />

      <NikahLocationHero />

      <section className="relative mx-auto grid max-w-6xl gap-8 px-5 pb-24 pt-4 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:pb-28">
        <NikahLocationMap />
        <NikahLocationDetails />
      </section>

      <footer className="border-t border-emerald/10 bg-emerald-deep px-5 py-12 text-center sm:px-8">
        <p className="mx-auto max-w-xl font-sans text-[11px] font-medium uppercase leading-[2] tracking-[0.18em] text-ivory/70">
          {NIKAH_EVENT.closingLine}
        </p>
      </footer>

      <a
        href="/index.html"
        className="fixed left-4 top-4 z-50 rounded-full border border-metallic-gold/35 bg-white/55 px-4 py-2 font-sans text-xs font-medium text-emerald backdrop-blur-sm transition-colors hover:bg-white/75 sm:left-6 sm:top-6 sm:text-sm"
      >
        ← Main Invitation
      </a>
    </main>
  );
}
