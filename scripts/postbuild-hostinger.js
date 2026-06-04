#!/usr/bin/env node
/**
 * After next build: add flat .html fallbacks for Hostinger when folder routing fails.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "out");

const flatCopies = [
  ["haldi/index.html", "haldi.html"],
  ["nikah/index.html", "nikah.html"],
  ["walima/index.html", "walima.html"],
  ["mehndi/index.html", "mehndi.html"],
];

if (!fs.existsSync(OUT)) {
  console.error("postbuild-hostinger: out/ not found");
  process.exit(1);
}

for (const [src, dest] of flatCopies) {
  const from = path.join(OUT, src);
  const to = path.join(OUT, dest);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`postbuild: copied ${src} → ${dest}`);
  }
}

// Ensure envelope is at root (from public/)
const envelope = path.join(OUT, "index.html");
if (!fs.existsSync(envelope)) {
  console.error("postbuild-hostinger: missing out/index.html — check public/index.html exists");
  process.exit(1);
}

const head = fs.readFileSync(envelope, "utf8");
if (!head.includes("envelope-page") && !head.includes("envelope-overlay")) {
  console.warn("postbuild-hostinger: warning — out/index.html may not be the envelope page");
}

console.log("postbuild-hostinger: done");
