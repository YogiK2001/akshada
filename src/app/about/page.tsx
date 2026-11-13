import type { Metadata } from "next";
import { Container, PageIntro, CenteredHeading } from "@/components/ui";
import { Feather, WaveRule } from "@/components/motifs";
import { FramedArt } from "@/components/ArtImage";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Akshada paints devotional subjects in acrylic, slowly, as a practice of sitting with a form.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro kicker="about the artist" title={<>A painter, <em>and a long silence.</em></>} />

      <section className="bg-cream pb-20 pt-6">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <div className="mx-auto w-full max-w-[460px] lg:max-w-[520px]">
              <FramedArt slug="shiva-and-the-devotee" sizes="(min-width: 1024px) 480px, 90vw" caption={{ left: "from the studio", right: "2025" }} />
            </div>
            <div className="max-w-[560px] lg:pt-6">
              <p className="kicker mb-4">the painter</p>
              <h2 className="font-serif text-[40px] font-medium leading-tight text-ink sm:text-[48px]">Akshada</h2>
              <div className="mt-6 space-y-5 text-[17px] leading-[1.85] text-ink-soft lg:text-[19px]">
                <p>Akshada paints devotional subjects: Adiyogi, Devi, the Naga, the linga, Hanuman and Ganapati. Each is less a subject than a presence she returns to.</p>
                <p>She works slowly, in acrylic, treating each painting as a practice of sitting with a form until it settles. Much of the work is waiting, and a good deal of it is leaving things out.</p>
                <p>The paintings are made for quiet rooms: a wall in a home, a corner for sitting, a place where the eye can rest and the mind can follow.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-sand py-20">
        <Feather className="absolute bottom-12 left-10 top-12 hidden h-[calc(100%-6rem)] w-[130px] opacity-50 md:block lg:w-[150px]" />
        <Feather variant="b" className="absolute bottom-12 right-10 top-12 hidden h-[calc(100%-6rem)] w-[130px] opacity-50 md:block lg:w-[150px]" />
        <Container className="relative">
          <CenteredHeading>A note from the studio</CenteredHeading>
          <blockquote className="mx-auto mt-10 max-w-[640px] text-center font-serif text-[22px] italic leading-[1.6] text-quote sm:text-[26px] lg:text-[30px]">
            “Every canvas begins as a long sitting with a single form.”
          </blockquote>
          <p className="kicker mt-6 text-center">— akshada</p>
        </Container>
      </section>

      <section id="process" className="scroll-mt-24 bg-cream py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-[32px] font-medium leading-tight text-ink sm:text-[38px] lg:text-[44px]">Process</h2>
            </div>
            <div className="max-w-[560px] space-y-5 lg:pt-2 text-[17px] leading-[1.85] text-ink-soft lg:text-[19px]">
              <p>The paintings are made in acrylic, on canvas and on paper. Deep blues and reds are built in thin layers, each left to settle before the next, until the colour has depth rather than surface.</p>
              <p>Gold appears sparingly, as an accent: a moon, a thread of light. Most of the painting happens in the quiet morning hours. Every original is one of a kind.</p>
            </div>
          </div>
          <WaveRule className="mx-auto mt-14 block w-[150px] lg:hidden" />
        </Container>
      </section>

      <section className="bg-sand py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-[32px] font-medium leading-tight text-ink sm:text-[38px] lg:text-[44px]">Visit, or write</h2>
            </div>
            <div className="max-w-[560px] lg:pt-2">
              <p className="text-[17px] leading-[1.85] text-ink-soft lg:text-[19px]">
                The studio can be visited by appointment. Please write first and a time will be found together.
              </p>
              <ul className="mt-6 space-y-2 text-[16px] text-ink-soft lg:text-[18px]">
                <li>{site.visiting} · {site.city}</li>
                <li><a href={`mailto:${site.email}`} className="text-link">{site.email}</a></li>
                <li><a href={whatsappUrl("Namaste Akshada, ")} target="_blank" rel="noopener noreferrer" className="text-link">message on whatsapp</a></li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
