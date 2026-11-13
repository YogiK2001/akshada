import Link from "next/link";
import { CenteredHeading, Container } from "@/components/ui";
import { journal, shortDate } from "@/content/journal";

export function JournalPreview() {
  return (
    <section data-shot="S04" className="bg-sand py-16 sm:py-24 lg:py-28">
      <Container>
        <CenteredHeading dots={false}>Latest from the journal</CenteredHeading>
        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {journal.map((e) => (
            <Link
              key={e.slug}
              href={`/journal/${e.slug}/`}
              className="group flex flex-col border-[0.5px] border-ink/10 bg-cream p-7 lg:px-9 lg:py-10 transition-transform duration-500 hover:-translate-y-0.5"
            >
              <p className="kicker mb-5 lg:!tracking-[0.24em]">
                {e.topic} · {shortDate(e.date)}
              </p>
              <h3 className="font-serif text-[22px] leading-snug lg:text-[28px] text-ink">{e.title}</h3>
              <p className="mt-4 text-[16px] leading-[1.7] text-ink-soft/85 lg:text-[20px] lg:leading-[1.6]">{e.excerpt}</p>
              <span className="mt-auto block pt-6 text-[13px] lowercase tracking-[0.2em] lg:text-[18px] lg:tracking-[0.18em] text-terracotta">read on →</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
