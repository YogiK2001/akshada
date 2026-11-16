"use client";

import { useRef } from "react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Painting } from "@/components/Painting";
import { Conch } from "@/components/motifs";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Home hero: the words on the left, Adiyogi, Dissolving whole on a mat on the right (after the buttons on phones).
 * Entrance, once on load: the lines rise 24px and fade in 80ms apart; the painting fades in and settles from 1.04.
 * The server HTML is complete and visible; start states are set by the script only, never under reduced motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { duration: 0.9, ease: "power3.out" } });
        tl.from("[data-hero-line]", { y: 24, opacity: 0, stagger: 0.08, clearProps: "transform,opacity" }, 0).from(
          "[data-hero-art]",
          { scale: 1.04, opacity: 0, clearProps: "transform,opacity" },
          0.1,
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      data-tone="cream"
      aria-labelledby="hero-h"
      className="bg-cream pt-[clamp(24px,3vw,40px)] pb-[clamp(72px,9vw,136px)] text-ink"
    >
      <Container className="grid items-center gap-12 lg:min-h-[calc(88svh-72px)] lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <div data-hero-line>
            <Conch className="mb-8 w-[88px] sm:w-[104px]" />
          </div>
          <h1 id="hero-h" data-hero-line className="max-w-[13ch] text-h1">
            Devotional paintings, made slowly in Pune
          </h1>
          <p data-hero-line className="mt-7 max-w-[40ch] text-lead text-muted">
            Ten original paintings in acrylic, of Adiyogi, the Devi and the lotus pond, for a wall at home or a quiet shrine.
          </p>
          <div data-hero-line className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/works/">View the paintings</ButtonLink>
            <ButtonLink href="/about/" variant="quiet">
              About the artist
            </ButtonLink>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <div data-hero-art>
            <Painting
              slug="adiyogi-dissolving"
              sizes="(min-width: 1024px) 620px, 88vw"
              priority
              mat="sand"
              maxHeight="min(86svh, 880px)"
              className="mx-auto"
              caption={
                <span className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
                  <span className="font-serif text-[17px] text-ink">Adiyogi, Dissolving</span>
                  <span>Acrylic on canvas, 2025</span>
                </span>
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
