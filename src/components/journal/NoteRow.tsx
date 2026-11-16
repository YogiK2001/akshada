import Link from "next/link";
import { longDate, type JournalEntry } from "@/content/journal";

/** One note in the journal list. The whole row is a single link. */
export function NoteRow({ entry }: { entry: JournalEntry }) {
  return (
    <li className="border-b border-line" data-reveal-item="">
      <Link
        href={`/journal/${entry.slug}/`}
        className="group -mx-3 grid gap-2 rounded-[var(--radius-mat)] px-3 py-7 transition-colors duration-200 hover:bg-sand focus-visible:bg-sand md:grid-cols-12 md:gap-8 md:py-9"
      >
        <p className="text-small text-muted md:col-span-3 md:pt-2">
          <time dateTime={entry.date} className="capitalize">
            {longDate(entry.date)}
          </time>
          <span className="block">{entry.topic}</span>
        </p>
        <div className="md:col-span-8">
          <h2 className="font-serif text-[24px] leading-[1.2] tracking-[-0.01em] transition-colors group-hover:text-terracotta-deep group-focus-visible:text-terracotta-deep sm:text-[30px]">
            {entry.title}
          </h2>
          <p className="mt-3 max-w-[60ch] text-muted">{entry.excerpt}</p>
        </div>
        <span
          aria-hidden="true"
          className="hidden self-center text-[22px] text-khaki-deep transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none md:col-span-1 md:block md:justify-self-end"
        >
          &rarr;
        </span>
      </Link>
    </li>
  );
}
