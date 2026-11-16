import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { NoteRow } from "@/components/journal/NoteRow";
import { journal } from "@/content/journal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Akshada: studio notes from a painter in Pune",
  "Short studio notes by Akshada on the paintings, the colours and the hours they are made in.",
);

export default function JournalPage() {
  return (
    <>
      <PageTitle title="Journal" lead="Short notes from the studio, on the paintings and the hours they are made in." />
      <Section tone="cream">
        <Reveal stagger>
          <ul className="border-t border-line">
            {journal.map((e) => (
              <NoteRow key={e.slug} entry={e} />
            ))}
          </ul>
        </Reveal>
      </Section>
    </>
  );
}
