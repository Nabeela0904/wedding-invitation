#!/usr/bin/env node
/**
 * Next.js app/page.tsx overwrites out/index.html with a redirect stub.
 * Copy the static envelope and invitation pages from public/ after build.
 */
const fs = require("fs");
const path = require("path");
const { getOutDir, getProjectRoot } = require("./lib/project-paths");

const OUT = getOutDir();
const PUBLIC = path.join(getProjectRoot(), "public");

const copies = [
  { from: "index.html", label: "envelope entry" },
  { from: "invitation.html", label: "main invitation" },
];

for (const { from, label } of copies) {
  const src = path.join(PUBLIC, from);
  const dest = path.join(OUT, from);

  if (!fs.existsSync(src)) {
    console.error(`FAIL: missing public/${from}`);
    process.exit(1);
  }

  fs.copyFileSync(src, dest);
  console.log(`OK: copied public/${from} → out/${from} (${label})`);
}
