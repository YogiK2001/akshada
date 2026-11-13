import type { SeriesSlug } from "./artworks";

export type Series = {
  slug: SeriesSlug;
  number: string;
  name: string;
  /** short lowercase subtitle, as in the mockup cards ("shiva · meditation") */
  subtitle: string;
  /** artwork used as the series cover */
  cover: string;
  intro: string;
  /** dark ground colour behind the image while it loads (from the mockup palette) */
  ground: string;
};

export const series: Series[] = [
  {
    slug: "adiyogi",
    number: "01",
    name: "Adiyogi",
    subtitle: "shiva · meditation",
    cover: "adiyogi-dissolving",
    intro:
      "The first one to sit still. These canvases return again and again to a faceless, seated Shiva: what remains of a form when the seeking ends, painted in deep blue and points of gold.",
    ground: "#142840",
  },
  {
    slug: "devi",
    number: "02",
    name: "Devi",
    subtitle: "the lotus seat",
    cover: "linga-bhairavi-on-the-lotus",
    intro:
      "She is seated. She is not waiting. Paintings of the fierce and tender mother, Linga Bhairavi, in red, violet and gold, made as offerings as much as pictures.",
    ground: "#2c1018",
  },
  {
    slug: "linga",
    number: "03",
    name: "Linga",
    subtitle: "form to formless",
    cover: "linga-on-the-lotus",
    intro:
      "The simplest form, and the hardest to paint. A series that moves from the linga on its lotus toward pure movement: an ellipse of fire, the form dissolving into what it points to.",
    ground: "#0f1d2e",
  },
  {
    slug: "naga",
    number: "04",
    name: "Naga",
    subtitle: "the watcher",
    cover: "naga",
    intro:
      "Coiled, patient, never asleep. The serpent as guardian of the inner threshold, painted in ember red and black, its body looping into the sign of the infinite.",
    ground: "#3a0e0e",
  },
  {
    slug: "bhakti",
    number: "05",
    name: "Bhakti",
    subtitle: "the devoted ones",
    cover: "hanuman-in-dhyana",
    intro:
      "Portraits of devotion: Hanuman lost in meditation on a bank of lotuses, and Ganapati, who is invoked before anything begins. Warm colour, bold line, a lot of love.",
    ground: "#1a0e1f",
  },
  {
    slug: "lotus-water",
    number: "06",
    name: "Lotus on Water",
    subtitle: "night pond",
    cover: "night-at-the-lotus-pond",
    intro:
      "A long study of stillness on the surface of water. The lotus is small in every canvas. The water is not.",
    ground: "#1a1410",
  },
];

export function getSeries(slug: string): Series | undefined {
  return series.find((s) => s.slug === slug);
}
