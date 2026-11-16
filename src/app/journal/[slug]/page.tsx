import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Painting } from "@/components/Painting";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { WaveRule } from "@/components/motifs";
import { MoreNotes } from "@/components/journal/MoreNotes";
import { getArtwork } from "@/content/artworks";
import { getEntry, journal, longDate } from "@/content/journal";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

/** Notes that are plainly about one painting. Others show no painting. */
const aboutPainting: Record<string, string> = {
  "adiyogi-with-no-face": "shiva-and-the-devotee",
};

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) return {};
  return pageMeta(`Akshada: ${entry.title}`, entry.excerpt);
}

export default async function JournalEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();
  const others = journal.filter((e) => e.slug !== slug).slice(0, 2);
  const paintingSlug = aboutPainting[slug];
  const work = paintingSlug ? getArtwork(paintingSlug) : undefined;

  return (
    <>
      <Section tone="cream" labelledBy="note-h">
        <article className="mx-auto max-w-[65ch]">
          <header>
            <p className="text-small text-muted">
              <time dateTime={entry.date} className="capitalize">
                {longDate(entry.date)}
              </time>
              , {entry.topic}
            </p>
            <h1 id="note-h" className="mt-4 text-[clamp(34px,4.6vw,56px)] leading-[1.08] text-khaki-deep">
              {entry.title}
            </h1>
            <WaveRule className="mt-6 block w-[150px]" />
          </header>
          {work && (
            <Reveal className="mt-12">
              <Painting
                slug={work.slug}
                sizes="(min-width: 768px) 420px, 90vw"
                mat="sand"
                maxHeight="min(70svh, 640px)"
                className="mx-auto"
                caption={`${work.title}, ${work.year}`}
              />
            </Reveal>
          )}
          <div className="mt-10 flex flex-col gap-6 text-lead">
            {entry.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </Section>
      <Section tone="sand" labelledBy="more-h">
        <MoreNotes entries={others} />
      </Section>
    </>
  );
}
