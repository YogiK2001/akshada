"use client";

import { useState, type FormEvent } from "react";
import { site, whatsappUrl } from "@/lib/site";

const sizes = [
  "small, under 18″",
  "medium, 18–36″",
  "large, 36″ and up",
  "not sure yet",
];

type Errors = { name?: string; message?: string };

const field =
  "w-full rounded-[2px] border border-ink/20 bg-cream px-4 py-3 text-[17px] text-ink-soft placeholder:text-taupe/70 transition-colors focus:border-terracotta focus:outline-none focus-visible:outline-none";
const label = "kicker mb-2 block text-[13px] lg:text-[14px]";
const err = "mt-1.5 text-[13px] text-terracotta-deep";

export function CommissionForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<{ url: string; mailto: string } | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const name = v("name");
    const message = v("message");
    const next: Errors = {};
    if (!name) next.name = "Please tell me your name.";
    if (!message) next.message = "Please write a few lines about the painting you have in mind.";
    setErrors(next);
    if (next.name || next.message) {
      const first = next.name ? "name" : "message";
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const body = [
      "Namaste Akshada, I would like to commission a painting.",
      "",
      `Name: ${name}`,
      ...(
        [
          ["Contact", v("contact")],
          ["Subject", v("subject")],
          ["Size", v("size")],
          ["For", v("place")],
        ] as const
      )
        .filter(([, val]) => val)
        .map(([label, val]) => `${label}: ${val}`),
      "",
      message,
    ].join("\n");
    const url = whatsappUrl(body);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Commission enquiry")}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener");
    setSent({ url, mailto });
  }

  if (sent) {
    return (
      <div className="hairline-inset bg-sand px-6 py-14 text-center sm:px-12" role="status">
        <p className="kicker mb-4">— thank you —</p>
        <h2 className="font-serif text-[30px] font-medium text-indigo">Your message is ready.</h2>
        <p className="mx-auto mt-4 max-w-[460px] text-[16px] leading-[1.8] text-muted">
          WhatsApp should have opened with your message ready. Just press send.
        </p>
        <p className="mt-6 text-[14px] text-muted">
          Nothing opened? <a href={sent.url} target="_blank" rel="noopener noreferrer" className="text-link">open whatsapp</a>
          {" or "}
          <a href={sent.mailto} className="text-link">send it by email</a>.
        </p>
        <button type="button" onClick={() => setSent(null)} className="kicker mt-8 underline-offset-4 hover:underline">
          edit and start again
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="hairline-inset bg-sand px-6 py-10 sm:px-12 sm:py-14 lg:p-14">
      <p className="kicker mb-3 text-center">— begin a commission —</p>
      <h2 className="mb-10 text-center font-serif text-[30px] font-medium text-indigo sm:text-[36px] lg:text-[40px]">Tell me about the painting</h2>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className={label}>your name *</label>
          <input
            id="c-name" name="name" type="text" autoComplete="name" required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "c-name-err" : undefined}
            className={`${field} h-12`}
          />
          {errors.name && <p id="c-name-err" className={err}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-contact" className={label}>phone or email</label>
          <input id="c-contact" name="contact" type="text" autoComplete="email" className={`${field} h-12`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-subject" className={label}>subject or form</label>
          <input id="c-subject" name="subject" type="text" placeholder="Adiyogi, for a north wall" className={`${field} h-12`} />
        </div>
        <div>
          <label htmlFor="c-size" className={label}>size</label>
          <div className="relative">
            <select id="c-size" name="size" defaultValue={sizes[3]} className={`${field} h-12 appearance-none pr-10`}>
              {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <svg viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-terracotta" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M1 1.5l5 5 5-5" /></svg>
          </div>
        </div>
        <div>
          <label htmlFor="c-place" className={label}>where it will live</label>
          <input id="c-place" name="place" type="text" placeholder="a quiet corner of the living room" className={`${field} h-12`} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="c-message" className={label}>message *</label>
          <textarea
            id="c-message" name="message" rows={5} required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "c-message-err" : undefined}
            className={`${field} min-h-40 resize-y`}
          />
          {errors.message && <p id="c-message-err" className={err}>{errors.message}</p>}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 sm:w-auto rounded-[2px] bg-terracotta px-7 py-3.5 text-[12px] lowercase tracking-[0.22em] whitespace-nowrap lg:px-8 lg:py-4 lg:text-[14px] lg:tracking-[0.18em] text-cream transition-colors hover:bg-terracotta-deep"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.200zm4.500-6.100c-.2-.1-1.500-.7-1.700-.8-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100a6.700 6.700 0 0 1-3.300-2.900c-.2-.4.200-.4.700-1.300.1-.2 0-.3 0-.5l-.8-1.800c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.100-.7.300-.2.300-.9.900-.9 2.200s.9 2.500 1.100 2.700c.1.200 1.800 2.800 4.400 3.900 1.600.7 2.300.7 3.100.6.500-.1 1.500-.6 1.700-1.200.2-.6.2-1.100.2-1.200-.1-.1-.3-.2-.5-.3z" />
          </svg>
          send on whatsapp →
        </button>
      </div>
    </form>
  );
}
