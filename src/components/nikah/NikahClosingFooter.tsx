"use client";

import { motion } from "framer-motion";
import { SITE_FOOTER } from "@/lib/site-copy";
import ParallaxLayer from "./ParallaxLayer";

export default function NikahClosingFooter() {
  return (
    <footer className="relative border-t border-emerald/10 bg-emerald-deep px-5 py-10 text-center sm:px-8">
      <ParallaxLayer offset={12}>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-sans text-xs text-ivory/45"
        >
          {SITE_FOOTER}
        </motion.p>
      </ParallaxLayer>
    </footer>
  );
}
