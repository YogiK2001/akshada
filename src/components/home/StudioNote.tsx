import { Feather } from "@/components/motifs";
import { CenteredHeading, Container, Kicker } from "@/components/ui";

export function StudioNote() {
  return (
    <section data-shot="S02" className="relative overflow-hidden bg-sand py-20 sm:py-28 lg:py-28">
      <Feather variant="a" className="pointer-events-none absolute left-2 top-6 hidden h-[200px] w-[80px] opacity-50 sm:block lg:left-[56px] lg:top-10 lg:h-[400px] lg:w-[160px]" />
      <Feather variant="b" className="pointer-events-none absolute bottom-6 right-2 hidden h-[200px] w-[80px] -scale-x-100 opacity-50 sm:block lg:bottom-10 lg:right-[56px] lg:h-[360px] lg:w-[144px]" />
      <Container className="relative text-center">
        <CenteredHeading>A note from the studio</CenteredHeading>
        <blockquote className="mx-auto mt-10 max-w-[900px] font-serif text-[20px] italic leading-[1.7] text-quote sm:text-[24px] lg:text-[32px] lg:leading-[1.7]">
          “The artist does not paint what is seen. She sits long enough that the unseen begins to paint itself.”
        </blockquote>
        <Kicker className="mt-10 lg:mt-12">— from the studio notes</Kicker>
      </Container>
    </section>
  );
}
