#!/usr/bin/env node
/**
 * Verifies the static export in out/ is ready to upload to Hostinger public_html.
 */
const fs = require("fs");
const path = require("path");
const { getOutDir, getProjectRoot } = require("./lib/project-paths");

const OUT = getOutDir();

const required = [
  "index.html",
  ".htaccess",
  "invitation.html",
  "haldi/index.html",
  "nikah/index.html",
  "walima/index.html",
  "404.html",
  "404/index.html",
  "_next",
];

let failed = false;

if (!fs.existsSync(OUT)) {
  console.error(`FAIL: out/ not found at ${OUT}`);
  console.error(`Project root: ${getProjectRoot()}`);
  console.error("Ensure next.config.js has output: \"export\", then run: npm run build");
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

const indexHtml = path.join(OUT, "index.html");
if (fs.existsSync(indexHtml)) {
  const indexContent = fs.readFileSync(indexHtml, "utf8");
  if (!indexContent.includes("envelope-page")) {
    console.error("FAIL: out/index.html is not the envelope page (run copy-static-entry-pages.js after build)");
    failed = true;
  }
}

const htaccess = fs.readFileSync(path.join(OUT, ".htaccess"), "utf8");
if (!htaccess.includes("RewriteRule ^(haldi|nikah|walima|mehndi)/$")) {
  console.error("FAIL: .htaccess missing trailingSlash route rewrites");
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log(`\nDeploy: upload ALL files inside ${OUT} to public_html.`);
console.log("Enable “Show hidden files” so .htaccess is uploaded.\n");
