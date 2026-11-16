import { HowToBuyBand } from "@/components/works/HowToBuy";
import { WorksBrowser } from "@/components/works/WorksBrowser";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Akshada: ten acrylic paintings in six series",
  "Ten original devotional paintings in acrylic by Akshada, in six series: Adiyogi, Devi, Linga, Naga, Bhakti and Lotus on Water. Open one to read about it or to ask about it on WhatsApp.",
);

export default function WorksPage() {
  return (
    <>
      <WorksBrowser />
      <HowToBuyBand />
    </>
  );
}
