import { ButtonLink } from "@/components/Button";
import { Painting } from "@/components/Painting";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { site } from "@/lib/site";

/** A short word about the painter beside one whole painting (the small altar canvas painted to be seen by lamplight). */
export function AboutArtist() {
  return (
    <Section tone="cream" labelledBy="about-h" containerClassName="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-5">
        <Painting
          slug="bhairavi-by-lamplight"
          sizes="(min-width: 1024px) 460px, 88vw"
          mat="sand"
          maxHeight="min(80svh, 680px)"
          className="mx-auto lg:mx-0"
          caption={
            <span className="flex flex-wrap justify-between gap-x-4 gap-y-0.5">
              <span className="font-serif text-[17px] text-ink">Bhairavi, by Lamplight</span>
              <span>Acrylic on canvas, 2025</span>
            </span>
          }
        />
      </Reveal>
      <Reveal className="lg:col-span-6 lg:col-start-7">
        <h2 id="about-h" className="text-h2">
          About the artist
        </h2>
        <div className="mt-7 flex max-w-[52ch] flex-col gap-5">
          <p className="text-lead">
            Akshada paints Adiyogi, Devi, the Naga, the linga, Hanuman and Ganapati in acrylic, in a studio in {site.city.split(",")[0]}.
          </p>
          <p className="text-muted">
            She works slowly, treating each painting as a practice of sitting with a form until it settles. Much of the work is
            waiting, and a good deal of it is leaving things out.
          </p>
        </div>
        <ButtonLink href="/about/" variant="quiet" className="mt-6">
          More about Akshada
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
