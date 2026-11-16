import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { WorkTile } from "@/components/WorkTile";
import { artworksInSeries } from "@/content/artworks";
import type { Series } from "@/content/series";

/**
 * One series: its name, its text and its paintings shown whole.
 * Odd blocks mirror the layout from 1024px (paintings left, text right) so the page does not read as one repeated row.
 */
export function SeriesBlock({ s, index }: { s: Series; index: number }) {
  const works = artworksInSeries(s.slug);
  const mirrored = index % 2 === 1;
  const single = works.length === 1;
  return (
    <Section id={s.slug} tone={index % 2 === 0 ? "sand" : "cream"} labelledBy={`${s.slug}-h`} containerClassName={`grid gap-10 lg:grid-cols-12 lg:gap-8 ${single ? "lg:items-center" : ""}`}>
      <div className={single ? `lg:col-span-5 ${mirrored ? "lg:col-start-8" : ""}` : `lg:col-span-4 ${mirrored ? "lg:col-start-9" : ""}`}>
        <h2 id={`${s.slug}-h`} className="text-h2 text-khaki-deep">
          {s.name}
        </h2>
        <p className={`mt-5 max-w-[48ch] text-muted ${single ? "lg:text-lead" : ""}`}>{s.intro}</p>
      </div>
      <Reveal
        as="ul"
        stagger
        className={`grid items-start gap-4 sm:gap-6 lg:gap-8 ${single ? "w-full max-w-[560px] grid-cols-1 lg:col-span-6" : "grid-cols-2 lg:col-span-8"} ${
          mirrored ? "lg:col-start-1 lg:row-start-1" : ""
        }`}
      >
        {works.map((a) => (
          <li key={a.slug}>
            <WorkTile slug={a.slug} sizes={single ? "(min-width: 1024px) 560px, 90vw" : "(min-width: 1024px) 368px, 50vw"} />
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
