import type { Metadata } from "next";
import Link from "next/link";
import { ArtImage } from "@/components/ArtImage";
import { Container, Kicker, PageIntro } from "@/components/ui";
import { artworksInSeries } from "@/content/artworks";
import { series, type Series } from "@/content/series";

export const metadata: Metadata = {
  title: "Series",
  description: "Six series of devotional paintings by Akshada, arranged by name.",
};

function Heading({ s, className = "" }: { s: Series; className?: string }) {
  return (
    <div className={className}>
      <Kicker>{s.number} · {s.subtitle}</Kicker>
      <h2 className="mt-4 font-serif text-[34px] font-medium leading-[1.1] text-ink sm:text-[40px] lg:text-[52px]">{s.name}</h2>
    </div>
  );
}

export default function SeriesPage() {
  return (
    <>
      <PageIntro kicker="six series, one silence" title={<>The work, <em>arranged by name.</em></>}>
        <p>The paintings gather themselves into six groups. Each began with a single canvas and kept asking for another.</p>
      </PageIntro>
      {series.map((s, i) => {
        const works = artworksInSeries(s.slug);
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} className={`scroll-mt-28 py-14 sm:py-24 lg:py-28 ${i % 2 === 0 ? "bg-cream" : "bg-sand"}`}>
            <Container>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <Heading s={s} className="lg:hidden" />
                <div className={`mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:max-w-[560px] ${flip ? "lg:order-2" : ""}`}>
                  <figure className="hairline-inset bg-canvas p-[18px]">
                    <div className="overflow-hidden bg-night" style={{ aspectRatio: "3 / 4" }}>
                      <ArtImage slug={s.cover} sizes="(min-width: 1024px) 560px, 300px" />
                    </div>
                    <figcaption className="flex justify-between pt-3.5 text-[13px] lowercase tracking-[0.2em] text-taupe lg:text-[14px]">
                      <span>n° {s.number}</span>
                      <span className="text-terracotta">
                        {works.length} {works.length === 1 ? "work" : "works"}
                      </span>
                    </figcaption>
                  </figure>
                </div>
                <div className={flip ? "lg:order-1" : ""}>
                  <Heading s={s} className="hidden lg:block" />
                  <p className="text-[16px] leading-[1.85] text-muted lg:mt-6 lg:max-w-[560px] lg:text-[19px]">{s.intro}</p>
                  <ul className="mt-8 flex flex-wrap items-start gap-4">
                    {works.map((w) => (
                      <li key={w.slug} className="w-24 lg:w-[150px]">
                        <Link href={`/works/${w.slug}/`} aria-label={w.title} className="group block">
                          <span className="hairline-inset block overflow-hidden bg-night" style={{ aspectRatio: "3 / 4" }}>
                            <ArtImage slug={w.slug} sizes="150px" alt={w.title} className="transition-transform duration-700 group-hover:scale-[1.03]" />
                          </span>
                          <span className="mt-2 block truncate font-serif text-[13px] italic leading-tight text-ink lg:text-[14px]">{w.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/works/${works[0]?.slug ?? ""}/`} className="text-link mt-8 inline-block text-[15px] tracking-[0.04em] lg:text-[17px]">
                    see the paintings →
                  </Link>
                </div>
              </div>
            </Container>
          </section>
        );
      })}
    </>
  );
}
