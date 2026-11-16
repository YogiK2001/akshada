"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Scroll reveal: fades content up 20px once, when 15% of it is in view.
 * Progressive: the server HTML is fully visible; only the script sets the start state, and only for
 * elements still below the fold, so nothing in the first screen blinks. Off under prefers-reduced-motion.
 * stagger: animate the descendants marked data-reveal-item (WorkTile has it) 70ms apart instead of the wrapper.
 */
export function Reveal({
  as = "div",
  className,
  stagger = false,
  children,
  id,
}: {
  as?: "div" | "section" | "ul" | "ol" | "article" | "aside";
  className?: string;
  stagger?: boolean;
  id?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const all = stagger ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", el) : [el];
        const below = all.filter((t) => t.getBoundingClientRect().top > window.innerHeight * 0.92);
        if (!below.length) return;
        gsap.set(below, { opacity: 0, y: 20 });
        ScrollTrigger.batch(below, {
          start: "top 85%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.07, overwrite: true, clearProps: "transform,opacity" }),
        });
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [stagger] },
  );

  return createElement(as, { ref, className, id }, children);
}
