import Link from "next/link";
import { Container, Kicker } from "@/components/ui";
import { ArtImage } from "@/components/ArtImage";
import { series } from "@/content/series";

export function SelectedWorks() {
  return (
    <section data-shot="S03" className="bg-cream py-16 sm:py-24 lg:pb-24 lg:pt-28">
      <Container>
        <div className="mb-10 flex items-end justify-between gap-6 lg:mb-14">
          <div>
            <Kicker className="mb-3">selected works</Kicker>
            <h2 className="display text-[34px] sm:text-[44px] lg:text-[64px]">
              Six series, <em>one silence.</em>
            </h2>
          </div>
          <Link href="/series/" className="kicker shrink-0 border-b-[0.5px] border-terracotta/70 pb-1 transition-opacity hover:opacity-70">
            view all →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {series.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/series/#${s.slug}`}
                className="hairline-inset hairline-inset-light before:!border-white/30 group relative block aspect-[3/4] overflow-hidden transition-transform duration-500 hover:-translate-y-1"
                style={{ backgroundColor: s.ground }}
              >
                <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                  <ArtImage slug={s.cover} sizes="(min-width: 1024px) 380px, 50vw" alt="" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,8,6,0.85)] from-0% to-transparent to-55%" />
                <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[rgba(10,8,6,0.55)] to-transparent" />
                <span className="absolute left-4 top-4 z-[2] text-[11px] tracking-[0.3em] text-[rgba(255,235,210,0.9)] [text-shadow:0_1px_6px_rgba(0,0,0,.6)] sm:left-5 sm:top-5 sm:text-[11px] lg:left-6 lg:top-6 lg:text-[17px] lg:tracking-[0.28em]">
                  {s.number}
                </span>
                <div className="absolute inset-x-4 bottom-4 z-[2] sm:inset-x-5 sm:bottom-5 lg:inset-x-6 lg:bottom-6">
                  <h3 className="font-serif text-[18px] italic leading-tight text-[#ebe0c9] sm:text-[22px] lg:text-[32px]">{s.name}</h3>
                  <p className="mt-1 text-[11px] lowercase tracking-[0.18em] text-gold sm:text-[11px] lg:text-[17px] lg:tracking-[0.22em]">{s.subtitle}</p>
                </div>
                <span className="sr-only">View the {s.name} series</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
