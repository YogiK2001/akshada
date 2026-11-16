import type { ReactNode } from "react";
import { artImage, getArtwork } from "@/content/artworks";
import { asset } from "@/lib/site";

type Props = {
  slug: string;
  /** the sizes attribute, e.g. "(min-width: 1024px) 560px, 100vw". Match it to the real rendered width. */
  sizes: string;
  /** first screen only: eager load, high fetch priority */
  priority?: boolean;
  /** a framed look: a sand (or ink) mat with a hairline inset */
  mat?: "sand" | "ink" | false;
  /** small label under the painting (e.g. title and year) */
  caption?: ReactNode;
  alt?: string;
  className?: string;
  /**
   * Cap the painting's height (e.g. "86vh") while keeping it whole: the figure narrows to
   * min(100%, maxHeight x ratio). Use for tall paintings shown large.
   */
  maxHeight?: string;
  /**
   * Thumbnails only (nav, list rows): crop to this aspect ratio, e.g. "1 / 1", using the painting's focus point.
   * Leave unset everywhere else: the painting is then shown whole at its own ratio.
   */
  crop?: string;
};

/**
 * One painting, whole, at its natural ratio (from art-manifest.json), with a srcset of the generated WebPs
 * and its dominant colour as the placeholder. Inside a link with the `group` class the image scales to 1.03
 * within its frame on hover. Never put text over it, tint it or cut it into a band.
 */
export function Painting({ slug, sizes, priority = false, mat = false, caption, alt, className = "", maxHeight, crop }: Props) {
  const img = artImage(slug);
  const work = getArtwork(slug);
  if (!img || !work) return null;
  const srcSet = img.sizes.map((w) => `${asset(img.srcFor(w))} ${w}w`).join(", ");
  const ratio = img.width / img.height;
  const Tag = caption ? "figure" : "div";
  const matClass = mat === "sand" ? "mat" : mat === "ink" ? "mat mat-ink" : "";
  return (
    <Tag
      className={`block ${className}`}
      style={maxHeight ? { width: `min(100%, calc(${maxHeight} * ${ratio.toFixed(4)}))` } : undefined}
    >
      <div className={matClass}>
        <div
          className={`overflow-hidden ${mat ? "rounded-[2px]" : "rounded-[var(--radius-mat)]"}`}
          style={{ aspectRatio: crop ?? `${img.width} / ${img.height}`, backgroundColor: img.dominant }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset(img.srcFor(1080))}
            srcSet={srcSet}
            sizes={sizes}
            width={img.width}
            height={img.height}
            alt={alt ?? `${work.title}, ${work.medium.toLowerCase()}, ${work.year}`}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            className="block h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={crop ? { objectPosition: work.focus ?? "50% 50%" } : undefined}
          />
        </div>
      </div>
      {caption && <figcaption className="mt-3 text-small text-muted">{caption}</figcaption>}
    </Tag>
  );
}
