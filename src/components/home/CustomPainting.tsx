import { ButtonLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

/** The compact custom-painting section: two sentences and one button. The form lives on /custom-painting/ only. */
export function CustomPainting() {
  return (
    <Section tone="sand" labelledBy="custom-h">
      <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <h2 id="custom-h" className="max-w-[18ch] text-h2">
            A painting made for your home
          </h2>
          <p className="mt-6 max-w-[54ch] text-lead text-muted">
            Akshada also paints new work for a particular wall or a home shrine. Write with the subject, the size and the place
            it is for, and a first sketch comes before any paint.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
          <ButtonLink href="/custom-painting/">Request a custom painting</ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
