"use client";

import { Fragment, useRef } from "react";
import { Container } from "@/components/Container";
import { WaveRule } from "@/components/motifs";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const before = "The artist does not paint what is seen. She sits long enough that".split(" ");
const accent = ["the", "unseen"];
const after = "begins to paint itself.".split(" ");

/**
 * The statement band on ink, the page's one attention moment. As the band scrolls through, its words go from
 * 25% to 100% opacity (scrubbed). "the unseen" is terracotta. Without JS or with reduced motion: all words at full strength.
 */
export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tween = gsap.fromTo(
          "[data-word]",
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: {
              trigger: "[data-quote]",
              start: "top 80%",
              end: "bottom 45%",
              scrub: 0.6,
              // once read, the quote stays whole (scrolling back up does not dim it again)
              onLeave: (self) => {
                self.kill();
                tween.progress(1);
              },
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const word = (w: string, i: number, cls = "") => (
    <Fragment key={`${w}-${i}`}>
      <span data-word className={cls}>
        {w}
      </span>{" "}
    </Fragment>
  );

  return (
    <section ref={root} data-tone="ink" aria-label="From the studio" className="bg-ink py-[clamp(96px,13vw,200px)] text-cream">
      <Container>
        <figure className="mx-auto max-w-[1040px] text-center">
          <WaveRule className="mx-auto mb-10 block w-[150px]" />
          <blockquote data-quote>
            <p className="font-serif text-[clamp(34px,5.4vw,80px)] leading-[1.12] tracking-[-0.02em] [text-wrap:balance]">
              {before.map((w, i) => word(w, i))}
              {accent.map((w, i) => word(w, i, "text-terracotta"))}
              {after.map((w, i) => word(w, i))}
            </p>
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
