import { ButtonLink } from "@/components/Button";
import { Section } from "@/components/Section";
import { WaveRule } from "@/components/motifs";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Akshada: page not found",
  "This page does not exist. The paintings, the series and the journal are on the rest of the site.",
);

export default function NotFound() {
  return (
    <Section tone="cream">
      <h1 className="max-w-[18ch] text-h1 text-khaki-deep">This page is not here</h1>
      <WaveRule className="mt-6 block w-[150px]" />
      <p className="mt-6 max-w-[50ch] text-lead text-muted">The address may have changed. The paintings are still on the site.</p>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ButtonLink href="/works/">View the paintings</ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Go to the home page
        </ButtonLink>
      </div>
    </Section>
  );
}
