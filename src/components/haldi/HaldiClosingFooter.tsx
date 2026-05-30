"use client";

import { motion } from "framer-motion";
import { SITE_FOOTER } from "@/lib/site-copy";
import ParallaxLayer from "@/components/nikah/ParallaxLayer";

export default function HaldiClosingFooter() {
  return (
    <footer className="relative border-t border-marigold/10 bg-haldi-deep px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <ParallaxLayer offset={12}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center font-sans text-xs text-cream/45 sm:text-left"
          >
            {SITE_FOOTER}
          </motion.p>
        </ParallaxLayer>

        <div className="flex justify-end p-2 sm:p-3">
          <a
            href="/nikah"
            className="inline-flex items-center justify-center rounded-full border border-marigold/45 bg-gradient-to-r from-marigold to-saffron px-8 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-cream shadow-gold transition-[transform,box-shadow] duration-300 hover:scale-[1.03] hover:shadow-gold-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/50 active:scale-[0.97]"
          >
            Nikah
          </a>
        </div>
      </div>
    </footer>
  );
}
