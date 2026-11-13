import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { WaveRule } from "@/components/motifs";
import { ArtImage, FramedArt } from "@/components/ArtImage";
import { artworks, getArtwork } from "@/content/artworks";
import { getEntry, journal, longDate } from "@/content/journal";

export const dynamicParams = false;

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return { title: entry.title, description: entry.excerpt };
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const work = entry.artwork ? getArtwork(entry.artwork) : undefined;
  const idx = journal.findIndex((e) => e.slug === slug);
  const more = artworks.filter((a) => a.slug !== entry.artwork).slice(0, 3);
  const next = journal[(idx + 1) % journal.length];

  return (
    <article className="bg-cream pb-24 pt-16 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-[760px]">
          <header className="text-center">
            <p className="kicker mb-5">{entry.topic} · {longDate(entry.date)}</p>
            <h1 className="font-serif text-[34px] font-medium leading-[1.15] text-ink sm:text-[48px] lg:text-[60px]">{entry.title}</h1>
            <WaveRule className="mx-auto mt-6 block w-[150px]" />
          </header>

          {work && (
            <Link href={`/works/${work.slug}/`} className="mx-auto mt-12 block max-w-[420px] lg:max-w-[560px]" aria-label={`View ${work.title}`}>
              <FramedArt slug={work.slug} sizes="(min-width: 1024px) 560px, (min-width: 768px) 420px, 90vw" caption={{ left: work.title, right: String(work.year) }} />
            </Link>
          )}

          <div className="mt-12 space-y-7 text-[18px] leading-[1.85] text-ink-soft lg:text-[21px]">
            {entry.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-16 text-center">
            <WaveRule className="mx-auto block w-[150px]" />
            <p className="kicker mb-6 mt-6 text-[12px]">from the gallery</p>
            <ul className="grid grid-cols-3 gap-3 sm:gap-5">
              {more.map((a) => (
                <li key={a.slug} className="mx-auto w-full lg:max-w-[220px]">
                  <Link href={`/works/${a.slug}/`} className="block" aria-label={a.title}>
                    <div className="hairline-inset bg-canvas p-2 sm:p-3">
                      <div className="overflow-hidden bg-night" style={{ aspectRatio: "4 / 5" }}>
                        <ArtImage slug={a.slug} sizes="(min-width: 768px) 220px, 30vw" />
                      </div>
                    </div>
                    <span className="mt-2 block text-left font-serif text-[14px] italic leading-snug text-muted sm:text-[14px]">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Journal" className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t-[0.5px] border-ink/20 pt-6">
            <Link href="/journal/" className="text-link text-[16px] tracking-[0.06em] lg:text-[18px]">← all notes</Link>
            {next && next.slug !== entry.slug && (
              <Link href={`/journal/${next.slug}/`} className="text-link text-right text-[16px] tracking-[0.06em] lg:text-[18px]">next note: {next.title} →</Link>
            )}
          </nav>
        </div>
      </Container>
    </article>
  );
}
