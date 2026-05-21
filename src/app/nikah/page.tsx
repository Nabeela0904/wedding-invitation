import type { Metadata } from "next";
import NikahLoader from "@/components/nikah/NikahLoader";
import NikahHeroSlide from "@/components/nikah/NikahHeroSlide";
import NikahTimelineSection from "@/components/nikah/NikahTimelineSection";
import NikahVenueModule from "@/components/nikah/NikahVenueModule";
import NikahClosingFooter from "@/components/nikah/NikahClosingFooter";

export const metadata: Metadata = {
  title: "Nikah Ceremony | Shoaib & Zeenath",
  description:
    "With the blessings of Allah, you are invited to the Nikah ceremony of Shoaib Faraz Ahmed & Zeenath Banu — 09 July, 2026.",
};

export default function NikahPage() {
  return (
    <NikahLoader>
      <main className="relative overflow-x-hidden bg-warm-ivory text-charcoal">
        <NikahHeroSlide />
        <NikahTimelineSection />
        <NikahVenueModule />
        <NikahClosingFooter />

        <a
          href="/index.html"
          className="fixed left-4 top-4 z-50 rounded-none border border-metallic-gold/40 bg-warm-ivory/90 px-4 py-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-charcoal backdrop-blur-sm transition-[transform,background-color] duration-300 hover:scale-[1.02] hover:bg-warm-ivory sm:left-6 sm:top-6"
        >
          ← Main Invitation
        </a>
      </main>
    </NikahLoader>
  );
}
