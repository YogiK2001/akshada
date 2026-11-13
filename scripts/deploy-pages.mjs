// Build the site for GitHub Pages and publish out/ to the gh-pages branch.
// Works without GitHub Actions (Pages source: "Deploy from a branch" -> gh-pages, / root).
// Usage: npm run deploy
import { execSync } from "node:child_process";
import { mkdtempSync, cpSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const out = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = out("git remote get-url origin");
const sha = out("git rev-parse --short HEAD");

console.log("Building with base path /akshada ...");
run("npm run build", { env: { ...process.env, PAGES_BASE_PATH: "/akshada" } });

const dir = mkdtempSync(path.join(tmpdir(), "akshada-pages-"));
try {
  cpSync("out", dir, { recursive: true });
  writeFileSync(path.join(dir, ".nojekyll"), ""); // keep the _next/ folder
  const git = (c) => run(`git ${c}`, { cwd: dir });
  git("init -q -b gh-pages");
  git("add -A");
  git(`commit -q -m "Deploy ${sha}"`);
  git(`push -f "${remote}" gh-pages`);
  console.log(`Published ${sha} to gh-pages.`);
} finally {
  rmSync(dir, { recursive: true, force: true });
}
