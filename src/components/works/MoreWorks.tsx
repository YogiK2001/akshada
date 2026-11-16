import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { WorkTile } from "@/components/WorkTile";
import { artworks, type Artwork } from "@/content/artworks";
import { getSeries } from "@/content/series";

function Step({ work, dir }: { work: Artwork; dir: "prev" | "next" }) {
  return (
    <Link href={`/works/${work.slug}/`} rel={dir} className={`group block py-3 ${dir === "next" ? "sm:text-right" : ""}`}>
      <span className="block text-small text-muted">{dir === "prev" ? "Previous painting" : "Next painting"}</span>
      <span className="mt-1 block font-serif text-[22px] leading-[1.25] tracking-[-0.01em] group-hover:text-terracotta-deep">
        {work.title}
      </span>
    </Link>
  );
}

/** Below a painting: more from its series (or other paintings if it is alone), then previous / next. */
export function MoreWorks({ slug }: { slug: string }) {
  const i = artworks.findIndex((a) => a.slug === slug);
  const work = artworks[i];
  const sr = getSeries(work.series);
  const siblings = artworks.filter((a) => a.series === work.series && a.slug !== slug);
  const prev = artworks[(i - 1 + artworks.length) % artworks.length];
  const next = artworks[(i + 1) % artworks.length];
  const alone = siblings.length === 0;
  // alone in its series: the three paintings that follow it in the list
  // always three tiles: the rest of its series first, then the paintings that follow it in the list
  const rest = [1, 2, 3, 4, 5].map((n) => artworks[(i + n) % artworks.length]).filter((a) => a.series !== work.series);
  const others = [...siblings, ...rest].slice(0, 3);

  return (
    <Section tone="sand" labelledBy="more-h">
      <h2 id="more-h" className="text-h2 text-khaki-deep">
        More paintings
      </h2>
      {!alone && sr && (
        <div className="mt-4">
          <ButtonLink href={`/series/#${sr.slug}`} variant="quiet">
            The {sr.name} series
          </ButtonLink>
        </div>
      )}
      <Reveal as="ul" stagger className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {others.map((a) => (
          <li key={a.slug}>
            <WorkTile slug={a.slug} sizes="(min-width: 1024px) 368px, 50vw" />
          </li>
        ))}
      </Reveal>
      <nav aria-label="Previous and next painting" className="mt-14 grid gap-2 border-t border-line pt-6 sm:grid-cols-2 sm:gap-8">
        <Step work={prev} dir="prev" />
        <Step work={next} dir="next" />
      </nav>
    </Section>
  );
}
