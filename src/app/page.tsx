import { Hero } from "@/components/home/Hero";
import { StudioNote } from "@/components/home/StudioNote";
import { SelectedWorks } from "@/components/home/SelectedWorks";
import { JournalPreview } from "@/components/home/JournalPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StudioNote />
      <SelectedWorks />
      <JournalPreview />
    </>
  );
}
