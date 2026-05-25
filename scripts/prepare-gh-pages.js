const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const basePath = "/wedding-invitation";

const indexSource = fs.readFileSync(path.join(root, "public", "index.html"), "utf8");
const indexHtml = indexSource.replace(
  'name="wedding-base-path" content="/"',
  `name="wedding-base-path" content="${basePath}/"`,
);

fs.writeFileSync(path.join(outDir, "index.html"), indexHtml);
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

console.log("Prepared GitHub Pages output in out/");
