import Link from "next/link";
import { Painting } from "./Painting";
import { getArtwork } from "@/content/artworks";
import { getSeries } from "@/content/series";

/**
 * A linked painting with its gallery label under it: the title in serif and one line of facts (series, year).
 * Carries data-reveal-item so a <Reveal stagger> around a list of tiles staggers them.
 */
export function WorkTile({
  slug,
  sizes = "(min-width: 1024px) 368px, (min-width: 640px) 45vw, 50vw",
  priority = false,
  headingLevel = "h3",
  className = "",
}: {
  slug: string;
  sizes?: string;
  priority?: boolean;
  /** the title's element; keep headings in order on the page (h2 when the tiles sit right under the h1) */
  headingLevel?: "h2" | "h3" | "p";
  className?: string;
}) {
  const w = getArtwork(slug);
  if (!w) return null;
  const Title = headingLevel;
  return (
    <Link href={`/works/${slug}/`} className={`group block ${className}`} data-reveal-item="">
      <Painting slug={slug} sizes={sizes} priority={priority} />
      <Title className="mt-4 font-serif text-[20px] leading-[1.25] tracking-[-0.01em] text-ink">{w.title}</Title>
      <p className="mt-1 text-small text-muted">
        {getSeries(w.series)?.name}, {w.year}
      </p>
    </Link>
  );
}
