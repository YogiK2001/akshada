import { artImage, artworks } from "@/content/artworks";
import { WorkTile } from "./WorkTile";

/** label height under a tile, as a share of the tile width, for the balancing estimate */
const LABEL = 0.3;

/** Balanced masonry order: each painting goes to the currently shortest of `cols` columns. */
function balance(slugs: string[], cols: number): string[][] {
  const out: string[][] = Array.from({ length: cols }, () => []);
  const heights = new Array<number>(cols).fill(0);
  for (const slug of slugs) {
    const img = artImage(slug);
    const h = (img ? img.height / img.width : 1.25) + LABEL;
    let min = 0;
    for (let i = 1; i < cols; i++) if (heights[i] < heights[min]) min = i;
    out[min].push(slug);
    heights[min] += h;
  }
  return out;
}

/**
 * A masonry of WorkTiles that keeps every painting's ratio: 3 columns from 1024px, 2 below.
 * One list in the DOM (no duplicate hidden images, no JS needed): CSS columns lay it out and balance it;
 * the items are pre-ordered by a balanced 3-column distribution so the desktop columns start with the
 * first paintings of the list. Pure component: a client parent (a filter) can pass any subset of slugs.
 */
export function Gallery({
  slugs = artworks.map((a) => a.slug),
  headingLevel = "h3",
  priorityCount = 0,
  className = "",
}: {
  slugs?: string[];
  headingLevel?: "h2" | "h3" | "p";
  /** how many of the first tiles load eagerly (when the gallery is in the first screen) */
  priorityCount?: number;
  className?: string;
}) {
  const ordered = balance(slugs, 3).flat();
  const firstOnes = new Set(slugs.slice(0, priorityCount));
  return (
    <ul className={`columns-2 gap-4 sm:gap-6 lg:columns-3 lg:gap-8 ${className}`}>
      {ordered.map((slug) => (
        <li key={slug} className="mb-10 break-inside-avoid lg:mb-14">
          <WorkTile slug={slug} headingLevel={headingLevel} priority={firstOnes.has(slug)} />
        </li>
      ))}
    </ul>
  );
}
