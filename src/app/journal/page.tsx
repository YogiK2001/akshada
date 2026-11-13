import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/ui";
import { WaveRule } from "@/components/motifs";
import { ArtImage } from "@/components/ArtImage";
import { journal, shortDate } from "@/content/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the studio: on painting, pigment, patience and the forms Akshada returns to.",
};

export default function JournalPage() {
  return (
    <>
      <PageIntro kicker="from the studio" title={<>Notes, <em>slowly written.</em></>}>
        <p>Small notes on the work, the colours, and the quiet hours in which the paintings arrive.</p>
      </PageIntro>
      <section className="bg-cream pb-24 pt-6">
        <div className="mx-auto w-full max-w-[1100px] px-5 sm:px-8">
          <ul className="border-t-[0.5px] border-ink/20">
            {journal.map((e) => (
              <li key={e.slug} className="border-b-[0.5px] border-ink/20 py-10 lg:py-14">
                <article className="flex flex-col gap-6 sm:flex-row sm:gap-9">
                  {e.artwork && (
                    <Link href={`/journal/${e.slug}/`} aria-hidden="true" tabIndex={-1} className="block w-full shrink-0 sm:w-[150px] lg:w-[240px]">
                      <div className="hairline-inset bg-canvas p-2.5">
                        <div className="aspect-[4/3] overflow-hidden bg-night sm:aspect-[3/4]">
                          <ArtImage slug={e.artwork} sizes="(min-width: 1024px) 240px, (min-width: 640px) 150px, 90vw" alt="" />
                        </div>
                      </div>
                    </Link>
                  )}
                  <div className="min-w-0">
                    <p className="kicker mb-3 text-[13px] !tracking-[0.16em] lg:text-[15px]">{e.topic} · {shortDate(e.date)}</p>
                    <h2 className="font-serif text-[26px] font-medium leading-[1.2] text-ink sm:text-[30px] lg:text-[34px]">
                      <Link href={`/journal/${e.slug}/`} className="transition-colors hover:text-terracotta">{e.title}</Link>
                    </h2>
                    <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.75] text-muted lg:text-[19px]">{e.excerpt}</p>
                    <Link href={`/journal/${e.slug}/`} className="text-link kicker mt-5 inline-block text-[13px] !tracking-[0.16em] lg:text-[15px]">
                      read on →
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <WaveRule className="mx-auto block w-[150px]" />
            <p className="mt-5 font-serif text-[18px] italic text-muted lg:text-[20px]">More notes are on their way.</p>
          </div>
        </div>
      </section>
    </>
  );
}
