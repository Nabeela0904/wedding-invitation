#!/usr/bin/env node
/**
 * Creates hostinger-upload/ — a folder you can zip and upload to public_html as-is.
 */
const fs = require("fs");
const path = require("path");

const OUT = path.join(process.cwd(), "out");
const DEST = path.join(process.cwd(), "hostinger-upload");

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
    return;
  }
  fs.copyFileSync(src, dest);
}

if (!fs.existsSync(OUT)) {
  console.error("Run: npm run build:hostinger");
  process.exit(1);
}

if (fs.existsSync(DEST)) {
  fs.rmSync(DEST, { recursive: true });
}

copyRecursive(OUT, DEST);

const checklist = [
  "UPLOAD INSTRUCTIONS",
  "===================",
  "1. Open Hostinger File Manager → public_html",
  "2. Delete OLD site files (backup first if needed)",
  "3. Upload EVERYTHING inside hostinger-upload/ into public_html",
  "4. Enable 'Show hidden files' — .htaccess MUST be uploaded",
  "5. Do NOT upload the hostinger-upload folder itself — only its contents",
  "",
  "Test URLs:",
  "  /              → envelope",
  "  /invitation.html",
  "  /haldi/",
  "  /nikah/",
  "  /walima/",
  "",
].join("\n");

fs.writeFileSync(path.join(DEST, "UPLOAD-TO-PUBLIC_HTML.txt"), checklist);
console.log(`\nReady: ${DEST}/`);
console.log("Upload ALL files inside hostinger-upload/ to public_html.\n");
