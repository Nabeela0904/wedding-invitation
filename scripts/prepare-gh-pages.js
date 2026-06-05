const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "out");
const basePath = "/wedding-invitation";

function patchBasePath(html) {
  return html.replace(
    'name="wedding-base-path" content="/"',
    `name="wedding-base-path" content="${basePath}/"`,
  );
}

const indexHtml = patchBasePath(
  fs.readFileSync(path.join(root, "public", "index.html"), "utf8"),
);
const invitationHtml = patchBasePath(
  fs.readFileSync(path.join(root, "public", "invitation.html"), "utf8"),
);

fs.writeFileSync(path.join(outDir, "index.html"), indexHtml);
fs.writeFileSync(path.join(outDir, "invitation.html"), invitationHtml);
fs.writeFileSync(path.join(outDir, ".nojekyll"), "");

console.log("Prepared GitHub Pages output in out/");
