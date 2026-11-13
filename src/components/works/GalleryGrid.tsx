"use client";

import { useMemo, useState } from "react";
import { artImage, artworks, type Artwork } from "@/content/artworks";
import { series } from "@/content/series";
import { WorkCard } from "./WorkCard";

const META_HEIGHT = 0.18;

/** Balanced masonry: each item goes to the currently shortest column. */
function distribute(items: Artwork[], cols: number): Artwork[][] {
  const out: Artwork[][] = Array.from({ length: cols }, () => []);
  const heights = new Array(cols).fill(0);
  for (const w of items) {
    const img = artImage(w.slug);
    const h = (img ? img.height / img.width : 1.25) + META_HEIGHT;
    let min = 0;
    for (let i = 1; i < cols; i++) if (heights[i] < heights[min]) min = i;
    out[min].push(w);
    heights[min] += h;
  }
  return out;
}

export function GalleryGrid() {
  const [active, setActive] = useState<string>("all");
  const items = useMemo(() => (active === "all" ? artworks : artworks.filter((a) => a.series === active)), [active]);
  const three = useMemo(() => distribute(items, 3), [items]);
  const two = useMemo(() => distribute(items, 2), [items]);
  const filters = [{ slug: "all", name: "all" }, ...series.map((s) => ({ slug: s.slug as string, name: s.name }))];

  return (
    <section className="bg-cream pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16">
        <div role="group" aria-label="Filter paintings by series" className="-mx-5 flex gap-x-6 overflow-x-auto whitespace-nowrap border-b border-ink/15 px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:justify-center sm:gap-x-8 sm:overflow-visible sm:px-0 lg:gap-x-10">
          {filters.map((f) => (
            <button
              key={f.slug}
              type="button"
              aria-pressed={active === f.slug}
              onClick={() => setActive(f.slug)}
              className={`min-h-11 shrink-0 cursor-pointer text-[13px] lowercase tracking-[0.16em] underline-offset-[6px] transition-colors lg:text-[15px] ${
                active === f.slug ? "text-terracotta underline decoration-1" : "text-muted hover:text-ink"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {items.length} paintings shown
        </p>

        <div className="mt-10 hidden items-start gap-10 lg:flex">
          {three.map((col, i) => (
            <ul key={i} className="flex min-w-0 flex-1 flex-col gap-14">
              {col.map((w) => (
                <li key={w.slug}>
                  <WorkCard work={w} />
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="mt-8 flex items-start gap-4 sm:mt-10 sm:gap-8 lg:hidden">
          {two.map((col, i) => (
            <ul key={i} className="flex min-w-0 flex-1 flex-col gap-8 sm:gap-10">
              {col.map((w) => (
                <li key={w.slug}>
                  <WorkCard work={w} sizes="(min-width: 640px) 45vw, 50vw" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
