/**
 * The paintings. Titles and copy are working names chosen from each subject;
 * Akshada can rename anything here. Image files are generated into public/art/
 * by `npm run images` (see scripts/art-sources.json); dimensions come from
 * src/content/art-manifest.json, which that script writes.
 */
import manifest from "./art-manifest.json";

export type SeriesSlug = "adiyogi" | "devi" | "linga" | "naga" | "bhakti" | "lotus-water";

export type Artwork = {
  slug: string;
  title: string;
  series: SeriesSlug;
  year: number;
  medium: string;
  /** one line, shown under the title in grids */
  caption: string;
  /** a short paragraph for the detail page */
  description: string;
  /** CSS object-position for crops in fixed-ratio frames */
  focus?: string;
  /** true when the source is a photo of the canvas in a room (lamp, cloth) rather than a flat scan */
  inSitu?: boolean;
};

type ManifestEntry = { width: number; height: number; sizes: number[]; dominant: string };
const art = manifest as Record<string, ManifestEntry>;

export const artworks: Artwork[] = [
  {
    slug: "adiyogi-dissolving",
    title: "Adiyogi, Dissolving",
    series: "adiyogi",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "the seated one, becoming sky",
    description:
      "A seated form at the bottom of a deep blue night, its outline breaking into gold and white points that rise and drift like a river of stars. The figure is barely there. What remains is the stillness, and the sky it has become.",
    focus: "50% 70%",
  },
  {
    slug: "shiva-and-the-devotee",
    title: "Shiva and the Devotee",
    series: "adiyogi",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "the crescent moon, the folded hands",
    description:
      "Shiva in blue, faceless, the crescent moon caught in his hair. Below him a devotee with long golden hair sits with folded hands among gold lotuses. Nothing is asked. Nothing needs to be.",
    focus: "50% 35%",
  },
  {
    slug: "linga-bhairavi-on-the-lotus",
    title: "Linga Bhairavi on the Lotus",
    series: "devi",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "the fierce mother, seated",
    description:
      "Devi in her fierce, tender form, seated on a violet lotus inside a ring of red flame. Blue skin, gold ornament, one foot lowered toward the world. The red around her is not anger. It is heat, and protection.",
    focus: "50% 45%",
  },
  {
    slug: "bhairavi-by-lamplight",
    title: "Bhairavi, by Lamplight",
    series: "devi",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "her face, in ember and night",
    description:
      "A small canvas of the Devi's face in deep red, set inside a burst of blue and ember strokes, the serpent mark curling at her side. It lives on the altar, beside the lamp, and was painted to be seen by its light.",
    focus: "50% 45%",
  },
  {
    slug: "linga-on-the-lotus",
    title: "Linga on the Lotus",
    series: "linga",
    year: 2026,
    medium: "Acrylic on paper",
    caption: "moon, serpent, and the open flower",
    description:
      "The linga rises from a blue lotus, marked with three gold lines, under a full moon. A red serpent curve sweeps up beside it and small gold flowers fall like embers across a warm orange ground.",
    focus: "50% 45%",
  },
  {
    slug: "from-form-to-the-formless",
    title: "From Form to the Formless",
    series: "linga",
    year: 2026,
    medium: "Acrylic on canvas",
    caption: "an ellipse of fire in the dark",
    description:
      "An ellipse of red and gold turning inside a dark blue field, the brushwork spiralling out from the centre. The form is almost gone here. It is the same linga, seen from further inside.",
    focus: "50% 50%",
  },
  {
    slug: "naga",
    title: "Naga",
    series: "naga",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "the watcher at the threshold",
    description:
      "A cobra raised against a field of red, its hood dark and scaled, its body looping into the sign of the infinite. The guardian does not sleep. It keeps the threshold between the outer and the inner.",
    focus: "50% 40%",
  },
  {
    slug: "hanuman-in-dhyana",
    title: "Hanuman in Dhyana",
    series: "bhakti",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "strength, sitting still",
    description:
      "Hanuman in meditation, seated on a bank of red and pink lotuses, his body glowing orange against an ember sky. The strongest of devotees, painted at rest, eyes lowered, mala at his chest.",
    focus: "50% 45%",
  },
  {
    slug: "ganapati",
    title: "Ganapati",
    series: "bhakti",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "the remover of obstacles",
    description:
      "Ganapati drawn in a few bold strokes of red and gold over a turquoise and blue ground, the trunk curving into a single lotus. Painted to begin things with.",
    focus: "50% 50%",
  },
  {
    slug: "night-at-the-lotus-pond",
    title: "Night at the Lotus Pond",
    series: "lotus-water",
    year: 2025,
    medium: "Acrylic on canvas",
    caption: "red robe, blue water, open flowers",
    description:
      "A figure in a red robe rests at the edge of a pond at night, the water deep blue and full of lotuses, some still closed, some opening. A study of stillness on the surface of water.",
    focus: "40% 50%",
  },
];

export function getArtwork(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

export function artworksInSeries(series: SeriesSlug): Artwork[] {
  return artworks.filter((a) => a.series === series);
}

/** Image info for an artwork: base path for srcset, natural size, dominant colour for placeholders. */
export function artImage(slug: string) {
  const m = art[slug];
  if (!m) return null;
  return { ...m, srcFor: (w: number) => `/art/${slug}-${w}.webp` };
}
