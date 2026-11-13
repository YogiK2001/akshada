import type { Metadata } from "next";
import { PageIntro } from "@/components/ui";
import { GalleryGrid } from "@/components/works/GalleryGrid";

export const metadata: Metadata = {
  title: "Works",
  description: "Hand-painted devotional originals by Akshada, made slowly, one long sitting at a time.",
};

export default function WorksPage() {
  return (
    <>
      <PageIntro kicker="the gallery" title={<>Each canvas, <em>a long sitting.</em></>}>
        <p>Every painting here is a hand-painted original, made slowly in acrylic, one layer at a time. Choose a series, or wander through them all.</p>
      </PageIntro>
      <GalleryGrid />
    </>
  );
}
