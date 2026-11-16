import type { ReactNode } from "react";
import { Container } from "./Container";

export type Tone = "cream" | "sand" | "ink";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  sand: "bg-sand text-ink",
  ink: "bg-ink text-cream",
};

/**
 * A page section: its ground, the section padding (py-section) and a Container.
 * Two sections in a row on the same tone share one gap (globals.css drops the second one's top padding).
 * Height always comes from the content: never give a section a screen height.
 */
export function Section({
  tone = "cream",
  id,
  labelledBy,
  className = "",
  containerClassName = "",
  contained = true,
  children,
}: {
  tone?: Tone;
  id?: string;
  /** id of the section's heading, for aria-labelledby */
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  /** false: render children without the Container (full-bleed content) */
  contained?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} data-tone={tone} className={`py-section ${toneClass[tone]} ${className}`}>
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}
