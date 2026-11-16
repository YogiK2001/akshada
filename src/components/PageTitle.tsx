import type { ReactNode } from "react";
import { Container } from "./Container";
import { WaveRule } from "./motifs";

/**
 * The top of an inner page: the h1, the wave rule and one line. On cream.
 * The next cream section shares its gap (its top padding is dropped), so the content follows at the bottom padding here.
 * children: anything that belongs under the line (filter chips, a back link).
 */
export function PageTitle({ title, lead, children }: { title: ReactNode; lead?: ReactNode; children?: ReactNode }) {
  return (
    <section data-tone="cream" className="bg-cream pt-[clamp(48px,7vw,104px)] pb-[clamp(40px,5vw,72px)] text-ink">
      <Container>
        <h1 className="max-w-[20ch] text-h1 text-khaki-deep">{title}</h1>
        <WaveRule className="mt-6 block w-[150px]" />
        {lead && <p className="mt-6 max-w-[60ch] text-lead text-muted">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
