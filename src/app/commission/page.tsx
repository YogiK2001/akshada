import type { Metadata } from "next";
import { Container, PageIntro } from "@/components/ui";
import { CommissionForm } from "@/components/commission/CommissionForm";
import { FramedArt } from "@/components/ArtImage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commission",
  description: "A small number of private commissions are accepted. Each begins with a conversation.",
};

const steps = [
  { n: "i", t: "A message", d: "Write a few lines about what you have in mind, and where the painting might live." },
  { n: "ii", t: "A conversation", d: "We talk about the subject, the size and the colours. Timelines are agreed together." },
  { n: "iii", t: "A first sketch", d: "A small sketch is shared so the composition can be felt before any paint is laid." },
  { n: "iv", t: "The painting", d: "The work is painted slowly, in layers, in the quiet morning hours." },
  { n: "v", t: "Delivery", d: "The finished painting is packed with care and sent, or collected from the studio." },
];

export default function CommissionPage() {
  return (
    <>
      <PageIntro kicker="commissioned works" title={<>A canvas, <em>for your room.</em></>}>
        <p>A small number of private commissions are accepted. Each begins with a conversation.</p>
      </PageIntro>

      <section className="bg-cream pb-20 pt-6">
        <Container>
          <div className="mx-auto grid max-w-[1100px] items-start gap-16 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-20">
          <ol className="w-full divide-y-[0.5px] divide-ink/20 border-y-[0.5px] border-ink/20">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[56px_1fr] items-baseline gap-4 py-8 sm:grid-cols-[80px_1fr] sm:gap-8 lg:py-9">
                <span className="font-serif text-[44px] italic leading-none text-taupe sm:text-[60px] lg:text-[56px]" aria-hidden="true">{s.n}</span>
                <div>
                  <h2 className="font-serif text-[22px] font-medium text-ink sm:text-[24px] lg:text-[26px]">{s.t}</h2>
                  <p className="mt-1.5 max-w-[640px] text-[15px] leading-[1.75] text-ink-soft lg:text-[18px]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="sticky top-28 ml-auto hidden w-full lg:block lg:max-w-[440px]">
            <FramedArt slug="linga-bhairavi-on-the-lotus" ratio="4 / 5" sizes="440px" caption={{ left: "from the studio", right: "2025" }} />
          </div>
          </div>
        </Container>
      </section>

      <section id="begin" className="scroll-mt-24 bg-cream pb-24">
        <Container>
          <div className="mx-auto max-w-[880px]">
            <CommissionForm />
            <p className="mt-6 text-center text-[14px] text-muted lg:text-[18px]">
              Prefer email? Write to <a href={`mailto:${site.email}`} className="text-link">{site.email}</a>.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
