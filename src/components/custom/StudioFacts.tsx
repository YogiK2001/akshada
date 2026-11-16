import { site } from "@/lib/site";

/** The studio facts beside the form. */
export function StudioFacts() {
  return (
    <dl className="mt-6 grid gap-5">
      <div>
        <dt className="text-small font-medium text-ink">Studio</dt>
        <dd className="mt-1 text-muted">{site.city}</dd>
      </div>
      <div>
        <dt className="text-small font-medium text-ink">Visits</dt>
        <dd className="mt-1 text-muted">{site.visiting}</dd>
      </div>
      <div>
        <dt className="text-small font-medium text-ink">How the message travels</dt>
        <dd className="mt-1 max-w-[34ch] text-muted">The form opens WhatsApp with your message ready. You press send there.</dd>
      </div>
    </dl>
  );
}
