import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { whatsappUrl } from "@/lib/site";

const steps = [
  { title: "Enquire on WhatsApp", text: "Message Akshada about the painting you have in mind." },
  { title: "Akshada replies", text: "She writes back with the price and the details of the painting." },
  { title: "The painting is yours", text: "Once you have decided, the original is yours to live with." },
];

/** The "How to buy" band on the Paintings page. */
export function HowToBuyBand() {
  return (
    <Section tone="sand" labelledBy="how-to-buy-h">
      <Reveal>
        <h2 id="how-to-buy-h" className="text-h2 text-khaki-deep">
          How to buy
        </h2>
        <ol className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-3 md:gap-10">
          {steps.map((s) => (
            <li key={s.title}>
              <h3 className="text-h3">{s.title}</h3>
              <p className="mt-3 max-w-[40ch] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <ButtonLink href={whatsappUrl("Namaste Akshada, I would like to ask about your paintings.")}>Enquire on WhatsApp</ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}

/** The short "How to buy" lines under a painting's facts. */
export function HowToBuyCompact() {
  return (
    <section aria-labelledby="how-to-buy-h" className="mt-8 border-t border-line pt-5">
      <h2 id="how-to-buy-h" className="text-h3">
        How to buy
      </h2>
      <ol className="mt-3 space-y-1 text-small text-muted">
        <li>Enquire to buy on WhatsApp.</li>
        <li>Akshada replies with the price and details.</li>
        <li>The painting is yours.</li>
      </ol>
    </section>
  );
}
