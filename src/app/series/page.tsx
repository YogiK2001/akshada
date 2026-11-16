import { PageTitle } from "@/components/PageTitle";
import { SeriesBlock } from "@/components/series/SeriesBlock";
import { series } from "@/content/series";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Akshada: six series of devotional paintings",
  "Six series of acrylic paintings by Akshada: Adiyogi, Devi, Linga, Naga, Bhakti and Lotus on Water, each with the paintings that belong to it.",
);

export default function SeriesPage() {
  return (
    <>
      <PageTitle title="Series" lead="Six groups of paintings, each gathered around one subject." />
      {series.map((s, i) => (
        <SeriesBlock key={s.slug} s={s} index={i} />
      ))}
    </>
  );
}
