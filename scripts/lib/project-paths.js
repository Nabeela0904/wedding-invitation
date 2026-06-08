const fs = require("fs");
const path = require("path");

/** Project root (folder containing package.json), regardless of process.cwd(). */
function getProjectRoot() {
  let dir = path.resolve(__dirname, "..", "..");

  for (let i = 0; i < 8; i += 1) {
    if (fs.existsSync(path.join(dir, "package.json"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }

  return process.cwd();
}

/** Next.js static export output directory (default: out/). */
function getOutDir() {
  return path.join(getProjectRoot(), "out");
}

module.exports = { getProjectRoot, getOutDir };
