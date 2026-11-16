"use client";

import { useState } from "react";
import { Gallery } from "@/components/Gallery";
import { PageTitle } from "@/components/PageTitle";
import { Section } from "@/components/Section";
import { artworks, type SeriesSlug } from "@/content/artworks";
import { series } from "@/content/series";

type Filter = "all" | SeriesSlug;

const chips: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  ...series.map((s) => ({ value: s.slug as Filter, label: s.name })),
];

/** The Paintings page top and gallery: the title, filter chips (one row), a polite count, and the filtered gallery. */
export function WorksBrowser() {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = artworks.filter((a) => filter === "all" || a.series === filter);
  const label = chips.find((c) => c.value === filter)?.label ?? "";
  const status =
    filter === "all"
      ? `Showing all ${shown.length} paintings`
      : `Showing ${shown.length} ${shown.length === 1 ? "painting" : "paintings"} in the ${label} series`;

  return (
    <>
      <PageTitle title="Paintings" lead="Ten original paintings in acrylic, in six series. Open one to read about it.">
        <div
          role="group"
          aria-label="Filter paintings by series"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 py-[5px] [scrollbar-width:none] sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 [&::-webkit-scrollbar]:hidden"
        >
          {chips.map((c) => {
            const on = filter === c.value;
            return (
              <button
                key={c.value}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.value)}
                className={`min-h-11 shrink-0 rounded-[var(--radius-btn)] border px-5 text-[15px] font-medium transition-colors duration-200 ${
                  on ? "border-ink bg-ink text-cream" : "border-line bg-transparent text-ink hover:border-ink/50"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <p role="status" aria-live="polite" className="mt-4 text-small text-muted">
          {status}
        </p>
      </PageTitle>
      <Section tone="cream">
        <Gallery key={filter} slugs={shown.map((a) => a.slug)} headingLevel="h2" priorityCount={3} />
      </Section>
    </>
  );
}
