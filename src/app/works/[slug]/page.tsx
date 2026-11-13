import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArtImage } from "@/components/ArtImage";
import { Container, Kicker } from "@/components/ui";
import { WorkCard } from "@/components/works/WorkCard";
import { artImage, artworks, getArtwork } from "@/content/artworks";
import { getSeries } from "@/content/series";
import { whatsappUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getArtwork(slug);
  if (!work) return {};
  return { title: work.title, description: work.caption };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getArtwork(slug);
  const img = artImage(slug);
  if (!work || !img) notFound();
  const sr = getSeries(work.series);

  const idx = artworks.findIndex((a) => a.slug === slug);
  const prev = artworks[(idx - 1 + artworks.length) % artworks.length];
  const next = artworks[(idx + 1) % artworks.length];

  const sameSeries = artworks.filter((a) => a.series === work.series && a.slug !== slug);
  const more = sameSeries.length > 0 ? sameSeries : [1, 2, 3].map((n) => artworks[(idx + n) % artworks.length]);
  const moreTitle = sameSeries.length > 0 ? "more from the series" : "more to look at";

  const rows: [string, string][] = [
    ["medium", work.medium],
    ["year", String(work.year)],
    ["series", sr?.name ?? work.series],
  ];

  return (
    <>
      <section className="bg-cream pb-20 pt-10 sm:pt-14">
        <Container>
          <Link href="/works/" className="text-[15px] lowercase tracking-[0.04em] text-taupe transition-colors hover:text-terracotta lg:text-[17px]">
            ← all works
          </Link>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[58fr_42fr] lg:gap-20">
            <figure className="hairline-inset bg-canvas p-5 sm:p-10">
              <div className="mx-auto max-w-full" style={{ aspectRatio: `${img.width} / ${img.height}`, maxHeight: "82vh" }}>
                <ArtImage slug={slug} fit="contain" priority sizes="(min-width: 1024px) 700px, 100vw" />
              </div>
            </figure>

            <div className="self-start lg:sticky lg:top-36">
              {sr && (
                <Kicker>
                  <Link href={`/series/#${sr.slug}`} className="transition-opacity hover:opacity-70">
                    {sr.number} · {sr.name} series
                  </Link>
                </Kicker>
              )}
              <h1 className="mt-4 font-serif text-[34px] font-medium leading-[1.1] text-ink sm:text-[44px] lg:text-[60px]">{work.title}</h1>
              <dl className="mt-8 border-t border-ink/15 text-[15px] lg:text-[16px]">
                {rows.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-ink/15 py-3">
                    <dt className="text-[13px] lowercase tracking-[0.2em] text-taupe lg:text-[14px]">{k}</dt>
                    <dd className="text-right text-ink-soft">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-[16px] leading-[1.8] text-muted lg:text-[19px]">{work.description}</p>
              {work.inSitu && <p className="mt-4 text-[13px] italic text-taupe">photographed in the studio</p>}

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={whatsappUrl(`Namaste Akshada, I would like to know more about "${work.title}" (${work.year}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block whitespace-nowrap bg-terracotta px-7 py-4 text-center text-[12px] lowercase tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep max-sm:w-full lg:text-[14px]"
                >
                  Enquire about this painting
                </a>
                <Link href="/commission/" className="text-link whitespace-nowrap text-[15px] tracking-[0.04em] lg:text-[17px]">
                  commission a similar work →
                </Link>
              </div>

              {sr && (
                <div className="mt-12 border-t border-ink/15 pt-8">
                  <Kicker>{sr.number} · {sr.name} series</Kicker>
                  <ul className="mt-4 flex flex-wrap gap-3">
                    {(sameSeries.length > 0 ? sameSeries : [getArtwork(sr.cover)!]).map((w) => (
                      <li key={w.slug} className="w-[72px] lg:w-[88px]">
                        <Link href={`/works/${w.slug}/`} aria-label={w.title} title={w.title} className="hairline-inset block bg-canvas p-1.5">
                          <span className="block overflow-hidden bg-night" style={{ aspectRatio: "4 / 5" }}>
                            <ArtImage slug={w.slug} sizes="88px" alt={w.title} />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/series/#${sr.slug}`} className="text-link mt-5 inline-block text-[15px] tracking-[0.04em] lg:text-[17px]">
                    see the series →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-sand py-20">
        <Container>
          <Kicker className="mb-8">{moreTitle}</Kicker>
          <ul className="grid grid-cols-2 items-start gap-4 sm:gap-8 lg:grid-cols-3 lg:gap-10">
            {more.slice(0, 3).map((w, i) => (
              <li key={w.slug} className={i === 2 ? "hidden sm:block" : ""}>
                <WorkCard work={w} uniform sizes="(min-width: 1024px) 360px, 50vw" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <nav aria-label="Previous and next painting" className="border-t border-ink/10 bg-cream py-10">
        <Container className="flex items-start justify-between gap-6">
          <Link href={`/works/${prev.slug}/`} className="group max-w-[45%]">
            <span className="block text-[13px] lowercase tracking-[0.2em] text-taupe lg:text-[14px]">← previous</span>
            <span className="mt-1 block font-serif italic text-ink transition-opacity group-hover:opacity-70 sm:text-[18px] lg:text-[24px]">{prev.title}</span>
          </Link>
          <Link href={`/works/${next.slug}/`} className="group max-w-[45%] text-right">
            <span className="block text-[13px] lowercase tracking-[0.2em] text-taupe lg:text-[14px]">next →</span>
            <span className="mt-1 block font-serif italic text-ink transition-opacity group-hover:opacity-70 sm:text-[18px] lg:text-[24px]">{next.title}</span>
          </Link>
        </Container>
      </nav>
    </>
  );
}
