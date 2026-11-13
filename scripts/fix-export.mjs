// Next 16 static export writes segment prefetch payloads as nested folders
// (works/__next.works/__PAGE__.txt) while the client router requests flat names
// (works/__next.works.__PAGE__.txt). Static hosts (GitHub Pages) have no rewrite,
// so we add flat copies next to the nested ones.
import { readdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
let copied = 0;

async function filesUnder(dir) {
  const res = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) res.push(...(await filesUnder(p)));
    else res.push(p);
  }
  return res;
}

async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const p = path.join(dir, e.name);
    if (e.name.startsWith("__next.")) {
      for (const f of await filesUnder(p)) {
        const flat = [e.name, ...path.relative(p, f).split(path.sep)].join(".");
        await copyFile(f, path.join(dir, flat));
        copied++;
      }
    } else {
      await walk(p);
    }
  }
}

await stat(out);
await walk(out);
console.log(`fix-export: wrote ${copied} flat prefetch files`);
