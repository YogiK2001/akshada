import { artImage, getArtwork } from "@/content/artworks";
import { asset } from "@/lib/site";

type Props = {
  slug: string;
  /** CSS sizes attribute, e.g. "(min-width: 1024px) 33vw, 100vw" */
  sizes: string;
  className?: string;
  /** "cover" fills a fixed-ratio box (uses the artwork's focus point); "contain" shows the whole painting */
  fit?: "cover" | "contain";
  priority?: boolean;
  alt?: string;
};

/**
 * Responsive painting image from public/art (generated WebP at 640/1080/1800).
 * Renders a plain <img> with srcset so it works in a static export.
 * The parent sets the box size; the dominant colour shows while loading.
 */
export function ArtImage({ slug, sizes, className = "", fit = "cover", priority = false, alt }: Props) {
  const img = artImage(slug);
  const work = getArtwork(slug);
  if (!img || !work) return null;
  const srcSet = img.sizes.map((w) => `${asset(img.srcFor(w))} ${w}w`).join(", ");
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset(img.srcFor(1080))}
      srcSet={srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt ?? `${work.title}, ${work.medium.toLowerCase()}, ${work.year}`}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={`h-full w-full ${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
      style={{ objectPosition: fit === "cover" ? work.focus ?? "50% 50%" : undefined, backgroundColor: img.dominant }}
    />
  );
}

/**
 * The mockup's framed canvas: a warm mat (#efe6d2) with a hairline inset border,
 * the painting inside, and an optional caption row beneath.
 */
export function FramedArt({
  slug,
  sizes,
  ratio = "3 / 4",
  caption,
  priority,
  className = "",
}: {
  slug: string;
  sizes: string;
  ratio?: string;
  caption?: { left: string; right: string };
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`hairline-inset bg-canvas p-[18px] ${className}`}>
      <div className="overflow-hidden bg-night" style={{ aspectRatio: ratio }}>
        <ArtImage slug={slug} sizes={sizes} priority={priority} />
      </div>
      {caption && (
        <figcaption className="flex justify-between gap-4 pt-4 text-[11px] lowercase tracking-[0.22em] text-taupe lg:text-[15px]">
          <span>{caption.left}</span>
          <span className="text-terracotta">{caption.right}</span>
        </figcaption>
      )}
    </figure>
  );
}
