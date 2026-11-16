import Link from "next/link";
import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { journal, longDate } from "@/content/journal";

/** The three studio notes as rows: date, title, one line. */
export function JournalList() {
  return (
    <Section tone="cream" labelledBy="journal-h">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 id="journal-h" className="text-h2">
          From the journal
        </h2>
        <ButtonLink href="/journal/" variant="quiet">
          All notes
        </ButtonLink>
      </div>
      <Reveal as="ul" stagger className="border-t border-line">
        {journal.map((e) => (
          <li key={e.slug} className="border-b border-line" data-reveal-item="">
            <Link href={`/journal/${e.slug}/`} className="group grid gap-2 py-7 md:grid-cols-12 md:gap-8 md:py-9">
              <time dateTime={e.date} className="text-small text-muted md:col-span-3 md:pt-1.5">
                {longDate(e.date)}
              </time>
              <span className="md:col-span-9">
                <span className="block font-serif text-[clamp(22px,2.2vw,30px)] leading-[1.2] tracking-[-0.01em] transition-colors group-hover:text-terracotta-deep">
                  {e.title}
                </span>
                <span className="mt-2 block max-w-[62ch] text-muted">{e.excerpt}</span>
              </span>
            </Link>
          </li>
        ))}
      </Reveal>
    </Section>
  );
}
