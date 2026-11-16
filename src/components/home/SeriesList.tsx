import Link from "next/link";
import { Painting } from "@/components/Painting";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { artworksInSeries } from "@/content/artworks";
import { series } from "@/content/series";

/** the first sentence of a series text, up to a colon, as its one line */
function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](?=\s|$)/);
  const s = m ? m[0] : text;
  return s.includes(":") ? `${s.split(":")[0]}.` : s;
}

/** The six series as rows: a focused cover thumbnail, the name, one line, the count. Each links to /series/#slug. */
export function SeriesList() {
  return (
    <Section tone="sand" id="series" labelledBy="series-h">
      <div className="mb-12 grid gap-5 lg:grid-cols-12 lg:gap-8">
        <h2 id="series-h" className="text-h2 text-khaki-deep lg:col-span-5">
          Six series
        </h2>
        <p className="max-w-[46ch] text-lead text-muted lg:col-span-6 lg:col-start-7 lg:pt-3">
          Each painting belongs to a series, gathered around one presence: Shiva, the Devi, the linga, the serpent, the devoted ones and the water.
        </p>
      </div>
      <Reveal as="ul" stagger className="grid border-t border-line md:grid-cols-2 md:gap-x-8 lg:gap-x-16">
        {series.map((s) => {
          const n = artworksInSeries(s.slug).length;
          return (
            <li key={s.slug} className="border-b border-line" data-reveal-item="">
              <Link href={`/series/#${s.slug}`} className="group flex items-center gap-5 py-6 sm:gap-7">
                <Painting slug={s.cover} sizes="120px" crop="4 / 5" className="w-[88px] shrink-0 sm:w-[112px]" alt="" />
                <span className="min-w-0">
                  <span className="block font-serif text-[clamp(24px,2.2vw,30px)] leading-[1.15] tracking-[-0.01em] transition-colors group-hover:text-terracotta-deep">
                    {s.name}
                  </span>
                  <span className="mt-1.5 block text-muted">{firstSentence(s.intro)}</span>
                  <span className="mt-1.5 block text-small text-muted">
                    {n} {n === 1 ? "painting" : "paintings"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
