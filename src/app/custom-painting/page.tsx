import { CustomPaintingForm } from "@/components/CustomPaintingForm";
import { PageTitle } from "@/components/PageTitle";
import { Section } from "@/components/Section";
import { Steps } from "@/components/custom/Steps";
import { StudioFacts } from "@/components/custom/StudioFacts";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "Akshada: request a custom devotional painting, made in Pune",
  "Request a custom devotional painting in acrylic from Akshada, made for your home or shrine. Send the subject, the size and the wall it is for; the message opens in WhatsApp.",
);

/* The form lives on this page only. */
export default function CustomPaintingPage() {
  return (
    <>
      <PageTitle
        title="Request a custom painting"
        lead="A painting made for your home or shrine. It begins with a message about the subject, the size and the place it is for."
      />
      <Section tone="cream" labelledBy="steps-h">
        <h2 id="steps-h" className="sr-only">
          How it goes
        </h2>
        <Steps />
      </Section>
      <Section tone="sand" id="request" labelledBy="form-h" containerClassName="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="form-h" className="text-h2 text-khaki-deep">
            Write to the studio
          </h2>
          <StudioFacts />
        </div>
        <div className="rounded-[var(--radius-mat)] bg-cream p-6 sm:p-8 lg:col-span-7 lg:col-start-6">
          <CustomPaintingForm />
        </div>
      </Section>
    </>
  );
}
