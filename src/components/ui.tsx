import type { ReactNode } from "react";
import { WaveRule } from "./motifs";

/** Page wrapper width used across the site. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-10 lg:px-16 ${className}`}>{children}</div>;
}

/** Small spaced terracotta label, e.g. "— devotional art on canvas —". */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker ${className}`}>{children}</p>;
}

/** Centered indigo serif heading with the wave rule beneath (mockup "A note from the studio"). */
export function CenteredHeading({ children, as: Tag = "h2", className = "", dots = true }: { children: ReactNode; as?: "h1" | "h2"; className?: string; dots?: boolean }) {
  return (
    <div className={`text-center ${className}`}>
      <Tag className="font-serif text-[34px] font-medium leading-tight text-indigo sm:text-[44px] lg:text-[52px]">{children}</Tag>
      <WaveRule dots={dots} className="mx-auto mt-4 block w-[170px] lg:w-[250px]" />
    </div>
  );
}

/**
 * Standard intro block for inner pages: kicker, khaki display title with italic ink emphasis, lede.
 * Pass the title with <em> for the dark italic part.
 */
export function PageIntro({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-cream pb-12 pt-16 sm:pt-24 lg:pt-32">
      <Container className="text-center">
        <Kicker className="mb-6">— {kicker} —</Kicker>
        <h1 className="display mx-auto max-w-[20ch] text-[42px] sm:text-[60px] lg:text-[76px]">{title}</h1>
        {children && <div className="mx-auto mt-7 max-w-[620px] text-[17px] leading-[1.8] text-muted lg:text-[19px]">{children}</div>}
      </Container>
    </section>
  );
}
