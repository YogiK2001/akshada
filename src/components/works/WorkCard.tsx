import Link from "next/link";
import { ArtImage } from "@/components/ArtImage";
import { artImage, type Artwork } from "@/content/artworks";

/**
 * Gallery card: canvas mat, hairline inset, painting, then title / year / caption.
 * Default shows the painting whole at its natural ratio; `uniform` crops to 4:5 using the focus point.
 */
export function WorkCard({
  work,
  sizes = "(min-width: 1024px) 400px, 50vw",
  uniform = false,
}: {
  work: Artwork;
  sizes?: string;
  uniform?: boolean;
}) {
  const img = artImage(work.slug);
  const ratio = uniform || !img ? "4 / 5" : `${img.width} / ${img.height}`;
  return (
    <Link href={`/works/${work.slug}/`} className="group block">
      <div className="hairline-inset bg-canvas p-2 sm:p-3 lg:p-[18px]">
        <div className="overflow-hidden bg-night" style={{ aspectRatio: ratio }}>
          <ArtImage slug={work.slug} sizes={sizes} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        </div>
      </div>
      <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 lg:mt-[18px]">
        <h3 className="font-serif text-[15px] italic leading-snug text-ink sm:text-[19px] lg:text-[24px]">{work.title}</h3>
        <span className="mt-1 shrink-0 text-[11px] lowercase sm:mt-0 tracking-[0.2em] text-terracotta lg:text-[13px]">{work.year}</span>
      </div>
      <p className="mt-1 text-[12px] leading-snug text-taupe sm:text-[13px] lg:text-[16px]">{work.caption}</p>
    </Link>
  );
}
