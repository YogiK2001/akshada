import Link from "next/link";
import { Conch } from "@/components/motifs";
import { Container } from "@/components/ui";
import { FramedArt } from "@/components/ArtImage";

export function Hero() {
  return (
    <section data-shot="S01" className="relative overflow-hidden bg-cream py-16 sm:py-24 lg:pb-32 lg:pt-28">
      <div className="pointer-events-none absolute inset-x-0 bottom-0" aria-hidden="true">
        <Container>
          <Conch className="block w-[200px] translate-y-1/4 opacity-40 sm:w-[300px] lg:w-[420px] lg:translate-y-[40%]" />
        </Container>
      </div>
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <p className="kicker mb-6 lg:mb-8">— devotional art on canvas —</p>
            <h1 className="display text-[40px] sm:text-[60px] lg:text-[76px] xl:text-[84px]">
              <span className="block lg:whitespace-nowrap">In the stillness</span>
              <span className="block lg:whitespace-nowrap">
                of <em>Adiyogi</em>,
              </span>
              <span className="block lg:whitespace-nowrap">the colour begins.</span>
            </h1>
            <p className="mt-7 max-w-[600px] text-[16px] leading-[1.75] text-muted sm:text-[17px] lg:text-[23px]">
              A small studio of hand-painted works in tribute to the formless: Shiva, Devi, and the inner mountain we each carry.
            </p>
            <Link href="/works/" className="text-link mt-9 inline-block lg:mt-10">
              enter the gallery →
            </Link>
          </div>
          <Link href="/works/adiyogi-dissolving/" className="mx-auto block w-full max-w-[320px] sm:max-w-[420px] lg:justify-self-end lg:ml-auto lg:mr-0 lg:max-w-[540px]">
            <FramedArt
              slug="adiyogi-dissolving"
              ratio="3 / 4"
              priority
              sizes="(min-width: 1024px) 540px, 90vw"
              caption={{ left: "n° 01 / adiyogi series", right: "2025" }}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
