#!/usr/bin/env node
/**
 * Verifies the static export in /out is ready to upload to Hostinger public_html.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "out");

const required = [
  "index.html",
  ".htaccess",
  "invitation.html",
  "haldi/index.html",
  "nikah/index.html",
  "walima/index.html",
  "404/index.html",
  "_next",
];

let failed = false;

if (!fs.existsSync(OUT)) {
  console.error("FAIL: out/ folder not found. Run: npm run build");
  process.exit(1);
}

for (const rel of required) {
  const full = path.join(OUT, rel);
  if (!fs.existsSync(full)) {
    console.error(`FAIL: missing out/${rel}`);
    failed = true;
  } else {
    console.log(`OK: out/${rel}`);
  }
}

const htaccess = fs.readFileSync(path.join(OUT, ".htaccess"), "utf8");
if (!htaccess.includes("DirectoryIndex index.html")) {
  console.error("FAIL: .htaccess missing DirectoryIndex index.html");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("\nHostinger deploy: upload ALL files inside out/ to public_html.");
console.log("Enable “Show hidden files” so .htaccess is uploaded.");
console.log("Set .env.local before build if you use EmailJS on Mehndi RSVP.\n");
