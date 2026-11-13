import Link from "next/link";
import { Container } from "@/components/ui";
import { Conch } from "@/components/motifs";

export default function NotFound() {
  return (
    <section className="bg-cream pb-28 pt-24 sm:pt-32">
      <Container className="text-center">
        <p className="kicker mb-5">— not found —</p>
        <h1 className="display mx-auto max-w-[14ch] lg:max-w-[16ch] text-[44px] sm:text-[64px] lg:text-[76px]">This page <em>has wandered off.</em></h1>
        <p className="mx-auto mt-6 max-w-[460px] text-muted">The page you were looking for is not here. The paintings are, and they are glad of company.</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <Link href="/" className="text-link kicker">back home</Link>
          <Link href="/works/" className="text-link kicker">see the works →</Link>
        </div>
        <Conch className="mx-auto mt-14 w-[160px] opacity-60" />
      </Container>
    </section>
  );
}
