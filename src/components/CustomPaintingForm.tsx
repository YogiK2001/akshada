"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { site, whatsappUrl } from "@/lib/site";

const sizes = ["Small, under 18 inches", "Medium, 18 to 36 inches", "Large, 36 inches and up", "Not sure yet"];

type Field = "name" | "message";
const messages: Record<Field, string> = {
  name: "Write your name, so the painter knows who is writing.",
  message: "Write a few lines about the painting you have in mind.",
};

const label = "block text-small font-medium text-ink";
const control =
  "mt-2 block w-full rounded-[var(--radius-mat)] border border-ink/20 bg-cream px-4 text-[17px] text-ink transition-colors hover:border-ink/40 focus-visible:border-ink aria-[invalid=true]:border-terracotta-deep";
const errorCls = "mt-2 text-small text-terracotta-deep";

/**
 * The custom painting form. Name and message are required (inline errors, focus on the first invalid field).
 * On submit it builds the message and opens WhatsApp with it. Nothing is sent until the visitor presses send
 * in WhatsApp, so the status line says only that WhatsApp opened, never that the message was sent.
 * Without JavaScript the form falls back to a mailto: post.
 */
export function CustomPaintingForm({ className = "" }: { className?: string }) {
  const status = useRef<HTMLParagraphElement>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});

  function say(text: string, link?: { href: string; label: string }) {
    const el = status.current;
    if (!el) return;
    el.textContent = text;
    if (link) {
      const a = document.createElement("a");
      a.className = "underline underline-offset-4";
      a.href = link.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = link.label;
      el.append(" ", a);
    }
  }

  function clear(field: Field) {
    if (errors[field]) setErrors((e) => ({ ...e, [field]: false }));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();

    const next: Partial<Record<Field, boolean>> = { name: !v("name"), message: !v("message") };
    setErrors(next);
    const firstBad = (["name", "message"] as Field[]).find((f) => next[f]);
    if (firstBad) {
      (form.elements.namedItem(firstBad) as HTMLElement | null)?.focus();
      say("");
      return;
    }

    const body = [
      "Namaste Akshada, I would like to request a custom painting.",
      "",
      `Name: ${v("name")}`,
      ...([["Contact", v("contact")], ["Subject", v("subject")], ["Size", v("size")]] as const)
        .filter(([, val]) => val)
        .map(([l, val]) => `${l}: ${val}`),
      "",
      v("message"),
    ].join("\n");
    const url = whatsappUrl(body);
    // no "noopener" feature here: it makes window.open return null even when the tab opened, so the line below would call a good open blocked
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    if (win) say("WhatsApp is open with your message. Press send there to finish.");
    else say("Your browser blocked WhatsApp.", { href: url, label: "Open WhatsApp with your message" });
  }

  return (
    <form
      className={`grid gap-6 sm:grid-cols-2 ${className}`}
      action={`mailto:${site.email}`}
      method="post"
      encType="text/plain"
      onSubmit={onSubmit}
      noValidate
    >
      <div>
        <label className={label} htmlFor="f-name">
          Your name
        </label>
        <input
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          aria-invalid={errors.name || undefined}
          aria-describedby={errors.name ? "f-name-err" : undefined}
          onInput={() => clear("name")}
          className={`${control} h-12`}
        />
        {errors.name && (
          <p className={errorCls} id="f-name-err">
            {messages.name}
          </p>
        )}
      </div>
      <div>
        <label className={label} htmlFor="f-contact">
          Phone or email
        </label>
        <input id="f-contact" name="contact" type="text" autoComplete="email" className={`${control} h-12`} />
      </div>
      <div>
        <label className={label} htmlFor="f-subject">
          Subject
        </label>
        <input id="f-subject" name="subject" type="text" autoComplete="off" className={`${control} h-12`} />
      </div>
      <div>
        <label className={label} htmlFor="f-size">
          Size
        </label>
        <div className="relative">
          <select id="f-size" name="size" defaultValue={sizes[3]} className={`${control} h-12 appearance-none pr-10`}>
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M2.5 4.5l3.5 3.5 3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="sm:col-span-2">
        <label className={label} htmlFor="f-message">
          Message
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          required
          aria-invalid={errors.message || undefined}
          aria-describedby={errors.message ? "f-message-err" : undefined}
          onInput={() => clear("message")}
          className={`${control} min-h-36 py-3 leading-[1.6]`}
        />
        {errors.message && (
          <p className={errorCls} id="f-message-err">
            {messages.message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2">
        <Button type="submit" className="self-start">
          Send on WhatsApp
        </Button>
        <p className="text-small text-ink" role="status" ref={status} />
        <p className="text-small text-muted">Your message opens in WhatsApp. Nothing is sent until you press send there.</p>
      </div>
    </form>
  );
}
