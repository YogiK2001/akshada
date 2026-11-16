import type { ReactNode } from "react";
import { Painting } from "@/components/Painting";
import { Reveal } from "@/components/Reveal";
import { Section, type Tone } from "@/components/Section";

/**
 * One section of the About page: a heading with its text on one side and a whole painting on the other.
 * The painting goes on a mat only on cream (a sand mat would vanish on sand).
 */
export function AboutBlock({
  id,
  tone,
  title,
  slug,
  sizes,
  paintingSide,
  children,
}: {
  id: string;
  tone: Tone;
  title: string;
  slug: string;
  sizes: string;
  paintingSide: "left" | "right";
  children: ReactNode;
}) {
  const left = paintingSide === "left";
  return (
    <Section tone={tone} labelledBy={`${id}-h`} containerClassName="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className={`lg:col-span-5 ${left ? "lg:order-1" : "lg:order-2 lg:col-start-8"}`}>
        <Painting
          slug={slug}
          sizes={sizes}
          mat={tone === "cream" ? "sand" : false}
          maxHeight="min(78svh, 680px)"
          className="mx-auto"
        />
      </Reveal>
      <Reveal className={`lg:col-span-6 ${left ? "lg:order-2 lg:col-start-7" : "lg:order-1 lg:col-start-1"}`}>
        <h2 id={`${id}-h`} className="text-h2 text-khaki-deep">
          {title}
        </h2>
        <div className="mt-6 flex max-w-[65ch] flex-col gap-5 text-[18px] leading-[1.7]">{children}</div>
      </Reveal>
    </Section>
  );
}
