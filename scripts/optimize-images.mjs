import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCES_FILE = path.join(root, 'scripts', 'art-sources.json');
const IMAGES_DIR = path.join(root, 'images');
const OUT_DIR = path.join(root, 'public', 'art');
const MANIFEST_FILE = path.join(root, 'src', 'content', 'art-manifest.json');

const WIDTHS = [640, 1080, 1800];
const WEBP_OPTS = { quality: 80, effort: 5 };

sharp.cache(false);

const toHex = ({ r, g, b }) =>
  '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
const kb = (bytes) => (bytes / 1024).toFixed(1);

const sources = JSON.parse(await readFile(SOURCES_FILE, 'utf8'));
const entries = Object.entries(sources);

// An entry is either "file.jpg" or { file, rotate?: degrees clockwise, crop?: { left, top, width, height } as 0-1 fractions of the (rotated) image }
const fileOf = (v) => (typeof v === 'string' ? v : v.file);
const missing = entries.filter(([, v]) => !existsSync(path.join(IMAGES_DIR, fileOf(v))));
if (missing.length > 0) {
  for (const [slug, file] of missing) {
    console.error(`MISSING source for "${slug}": images/${file}`);
  }
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
await mkdir(path.dirname(MANIFEST_FILE), { recursive: true });

const manifest = {};

for (const [slug, v] of entries) {
  const src = path.join(IMAGES_DIR, fileOf(v));
  const opts = typeof v === 'string' ? {} : v;

  // Master image: EXIF-oriented, optionally straightened and cropped to the canvas.
  let master = await sharp(src).rotate().toColourspace('srgb').jpeg({ quality: 95 }).toBuffer();
  if (opts.rotate) {
    master = await sharp(master).rotate(opts.rotate, { background: '#000000' }).jpeg({ quality: 95 }).toBuffer();
  }
  if (opts.crop) {
    const m = await sharp(master).metadata();
    const c = opts.crop;
    const region = {
      left: Math.round(c.left * m.width),
      top: Math.round(c.top * m.height),
      width: Math.round(c.width * m.width),
      height: Math.round(c.height * m.height),
    };
    master = await sharp(master).extract(region).jpeg({ quality: 95 }).toBuffer();
  }
  const { width, height } = await sharp(master).metadata();

  const oriented = () => sharp(master);

  const { dominant } = await oriented().stats();
  const dominantHex = toHex(dominant);

  const outSizes = [];
  for (const w of WIDTHS) {
    const out = path.join(OUT_DIR, `${slug}-${w}.webp`);
    const info = await oriented()
      .resize({ width: w, withoutEnlargement: true })
      .webp(WEBP_OPTS)
      .toFile(out);
    outSizes.push({ w, outWidth: info.width, bytes: info.size });
  }

  manifest[slug] = {
    width,
    height,
    sizes: WIDTHS,
    dominant: dominantHex,
  };

  const parts = outSizes
    .map((s) => `${s.w}w(${s.outWidth}px): ${kb(s.bytes)} KB`)
    .join(', ');
  console.log(`${slug} [${width}x${height}] ${parts}, dominant ${dominantHex}`);
}

await writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
console.log(`Wrote ${path.relative(root, MANIFEST_FILE)} with ${Object.keys(manifest).length} entries`);
