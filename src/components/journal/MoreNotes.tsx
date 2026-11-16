import Link from "next/link";
import { longDate, type JournalEntry } from "@/content/journal";

/** "More notes": two rows and a way back to the journal. */
export function MoreNotes({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="mx-auto max-w-[65ch]">
      <h2 id="more-h" className="text-h3">
        More notes
      </h2>
      <ul className="mt-6 border-t border-line">
        {entries.map((e) => (
          <li key={e.slug} className="border-b border-line">
            <Link
              href={`/journal/${e.slug}/`}
              className="group -mx-3 block rounded-[var(--radius-mat)] px-3 py-6 transition-colors duration-200 hover:bg-cream focus-visible:bg-cream"
            >
              <span className="block font-serif text-[22px] leading-[1.25] transition-colors group-hover:text-terracotta-deep group-focus-visible:text-terracotta-deep">
                {e.title}
              </span>
              <span className="mt-1 block text-small capitalize text-muted">{longDate(e.date)}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/journal/" className="link-quiet mt-8 inline-flex min-h-12 items-center">
        Back to the journal
      </Link>
    </div>
  );
}
