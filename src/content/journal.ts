/**
 * Journal entries. These three are PLACEHOLDER posts written for layout,
 * to be replaced with Akshada's own words. Body paragraphs are plain strings.
 */
export type JournalEntry = {
  slug: string;
  title: string;
  /** lowercase topic, as in the mockup ("on shiva", "process", "studio") */
  topic: string;
  date: string; // ISO yyyy-mm-dd
  excerpt: string;
  /** artwork slug to show with the post, optional */
  artwork?: string;
  body: string[];
};

export const journal: JournalEntry[] = [
  {
    slug: "adiyogi-with-no-face",
    title: "Why I painted Adiyogi with no face",
    topic: "on shiva",
    date: "2026-01-12",
    excerpt:
      "The features kept arriving. I kept wiping them off. Eventually only the silence remained on the canvas.",
    artwork: "shiva-and-the-devotee",
    body: [
      "The features kept arriving: a brow, the line of a nose, the curve of a closed eye. Each morning I painted them and each evening I wiped them away with the side of my palm.",
      "Somewhere in that back and forth I understood that I was not failing to finish him. I was finishing him, every time. The face that finally stayed is no face at all, a calm blue oval with the moon caught in the hair above it.",
      "It is the most honest portrait I have made.",
    ],
  },
  {
    slug: "colour-on-a-cold-morning",
    title: "Colour on a cold morning",
    topic: "process",
    date: "2026-01-04",
    excerpt:
      "Some blues only arrive if you give them time. A note on mixing slowly, and on the lamp that stays lit beside the easel.",
    artwork: "adiyogi-dissolving",
    body: [
      "Some blues only arrive if you give them time. I mix the night of a canvas over a whole morning, a little ultramarine, a little black, a touch of white, layer over layer until it stops looking like paint.",
      "The lamp beside the easel stays lit while I work. It is not a ritual exactly. It is more like keeping someone company.",
    ],
  },
  {
    slug: "the-lotus-does-not-pose",
    title: "The lotus does not pose for me",
    topic: "studio",
    date: "2025-12-28",
    excerpt:
      "A small note on patience, water, and the pond that opens at a different hour each time I arrive.",
    artwork: "night-at-the-lotus-pond",
    body: [
      "I have been trying to paint the same pond for two seasons. The lotuses open at a different hour each time I arrive.",
      "I am beginning to suspect that this is the lesson, and that the painting will be finished when I stop trying to catch them.",
    ],
  },
];

export function getEntry(slug: string): JournalEntry | undefined {
  return journal.find((j) => j.slug === slug);
}

/** "12 jan" style short date used on cards (mockup style). */
export function shortDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toLowerCase();
}

/** "12 january 2026" long date for entry pages. */
export function longDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).toLowerCase();
}
