import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "You write",
    text: "Tell Akshada the subject, the size and the wall or shrine the painting is for. A few lines are enough.",
  },
  {
    title: "A first sketch",
    text: "She answers with a first sketch of the painting. You say what feels right and what should change.",
  },
  {
    title: "The painting",
    text: "When the sketch feels right she paints it by hand in acrylic, slowly, as she paints everything.",
  },
];

/** Three steps in words, side by side from 768px, stacked on phones. No numbers. */
export function Steps() {
  return (
    <Reveal as="ol" stagger className="grid gap-8 md:grid-cols-3 md:gap-10">
      {steps.map((s) => (
        <li key={s.title} data-reveal-item="" className="border-t border-khaki pt-5">
          <h3 className="text-h3 text-khaki-deep">{s.title}</h3>
          <p className="mt-3 max-w-[40ch] text-muted">{s.text}</p>
        </li>
      ))}
    </Reveal>
  );
}
