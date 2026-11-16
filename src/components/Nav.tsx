"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

/**
 * Sticky top bar: logo, the four links, the primary button. Cream at 92% with a hairline once scrolled.
 * Below 1024px the links move into a full-height sheet: focus trapped, Escape and the close button close it,
 * as does any navigation; aria-expanded follows it; focus returns to the menu button.
 */
export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const current = (href: string) => (pathname.startsWith(href) ? "page" : undefined);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // hairline once scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close on navigation (render-time reset when the path changes)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  // while open: lock the page scroll, trap focus, close on Escape, close when the viewport grows past the sheet
  useEffect(() => {
    if (!open) return;
    const sheet = sheetRef.current;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const focusables = () =>
      Array.from(sheet?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && (document.activeElement === first || !sheet?.contains(document.activeElement))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (document.activeElement === last || !sheet?.contains(document.activeElement))) {
        e.preventDefault();
        first.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && close(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open, close]);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-cream/92 transition-colors duration-300 ${
        scrolled ? "border-line" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="-my-2 inline-flex min-h-11 items-center text-ink" aria-label={`${site.fullName}, home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-8">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={current(l.href)}
                  className="link-quiet link-nav text-[16px] text-ink aria-[current=page]:text-terracotta-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/works/" className="max-sm:hidden">
            View the paintings
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-btn)] px-3 text-[16px] font-medium text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Menu
          </button>
        </div>
      </div>

      <div
        ref={sheetRef}
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!open}
        className="fixed inset-0 z-50 h-[100dvh] overflow-y-auto bg-cream lg:hidden"
      >
        <div className="container-x flex min-h-full flex-col">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="inline-flex min-h-11 items-center text-ink" onClick={() => close(false)}>
              <Logo />
            </Link>
            <button
              type="button"
              className="inline-flex min-h-11 items-center gap-2 rounded-[var(--radius-btn)] px-3 text-[16px] font-medium text-ink"
              onClick={() => close()}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Close
            </button>
          </div>
          <nav aria-label="Menu" className="pt-8">
            <ul className="flex flex-col gap-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={current(l.href)}
                    onClick={() => close(false)}
                    className="inline-flex min-h-14 items-center font-serif text-[40px] leading-tight tracking-[-0.02em] text-ink aria-[current=page]:text-terracotta-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto flex flex-col gap-4 border-t border-line py-8">
            <ButtonLink href="/works/" onClick={() => close(false)} className="self-start">
              View the paintings
            </ButtonLink>
            <p className="text-small text-muted">
              Studio in {site.city}. {site.visiting}.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
