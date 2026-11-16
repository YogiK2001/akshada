import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { AboutArtist } from "@/components/home/AboutArtist";
import { CustomPainting } from "@/components/home/CustomPainting";
import { Hero } from "@/components/home/Hero";
import { JournalList } from "@/components/home/JournalList";
import { SeriesList } from "@/components/home/SeriesList";
import { Statement } from "@/components/home/Statement";

export const metadata: Metadata = {
  title: { absolute: "Akshada: devotional paintings from a studio in Pune" },
};

/** six of the ten, one or two from each series; Adiyogi, Dissolving is already in the hero */
const selected = [
  "shiva-and-the-devotee",
  "linga-bhairavi-on-the-lotus",
  "hanuman-in-dhyana",
  "from-form-to-the-formless",
  "naga",
  "night-at-the-lotus-pond",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section tone="cream" id="selected" labelledBy="selected-h">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <h2 id="selected-h" className="text-h2">
            Selected works
          </h2>
          <ButtonLink href="/works/" variant="quiet">
            All ten paintings
          </ButtonLink>
        </div>
        <Reveal stagger>
          <Gallery slugs={selected} />
        </Reveal>
      </Section>
      <Statement />
      <SeriesList />
      <AboutArtist />
      <CustomPainting />
      <JournalList />
    </>
  );
}
