import { ButtonLink } from "@/components/Button";
import { PageTitle } from "@/components/PageTitle";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { AboutBlock } from "@/components/about/AboutBlock";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta(
  "Akshada: a painter of devotional subjects in Pune",
  "Akshada paints Adiyogi, Devi, the Naga, the linga, Hanuman and Ganapati in acrylic. The studio is in Pune and is open by appointment.",
);

export default function AboutPage() {
  return (
    <>
      <PageTitle
        title="About Akshada"
        lead="Akshada paints Adiyogi, Devi, the Naga, the linga, Hanuman and Ganapati in acrylic, in a studio in Pune."
      />

      <AboutBlock
        id="painter"
        tone="cream"
        title="The painter"
        slug="shiva-and-the-devotee"
        sizes="(min-width: 1024px) 440px, 90vw"
        paintingSide="left"
      >
        <p>Each subject is less a subject than a presence she returns to.</p>
        <p>
          She works slowly, in acrylic, treating each painting as a practice of sitting with a form until it settles. Much of
          the work is waiting, and a good deal of it is leaving things out.
        </p>
        <p>
          The paintings are made for quiet rooms: a wall in a home, a corner for sitting, a place where the eye can rest and
          the mind can follow.
        </p>
      </AboutBlock>

      <AboutBlock
        id="making"
        tone="sand"
        title="How the paintings are made"
        slug="adiyogi-dissolving"
        sizes="(min-width: 1024px) 440px, 90vw"
        paintingSide="right"
      >
        <p>
          The paintings are made in acrylic, on canvas and on paper. Deep blues and reds are built in thin layers, each left
          to settle before the next, until the colour has depth rather than surface.
        </p>
        <p>
          Gold appears sparingly, as an accent: a moon, a thread of light. Most of the painting happens in the quiet morning
          hours. Every original is one of a kind.
        </p>
      </AboutBlock>

      <Section tone="cream" labelledBy="studio-h">
        <Reveal className="mx-auto max-w-[65ch] text-center">
          <h2 id="studio-h" className="text-h2 text-khaki-deep">
            The studio in Pune
          </h2>
          <p className="mt-6 text-[18px] leading-[1.7]">
            The studio is in {site.city}. It can be visited by appointment: please write first, and a time will be found
            together.
          </p>
          <p className="mt-10 font-serif text-[clamp(22px,2.4vw,30px)] leading-[1.3] tracking-[-0.01em]">
            The paintings are made for quiet rooms. Come and look at them.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <ButtonLink href="/works/">View the paintings</ButtonLink>
            <ButtonLink href="/custom-painting/" variant="quiet">
              Request a custom painting
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
