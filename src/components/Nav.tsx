"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";

/** Logo: italic serif wordmark with the small terracotta dot (mockup .bn). */
export function Wordmark({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={`relative inline-block pl-1.5 font-serif italic leading-none tracking-[-0.01em] ${
        tone === "dark" ? "text-ink" : "text-khaki"
      } ${className}`}
    >
      <span aria-hidden className="absolute -left-[0.1em] top-[0.12em] size-[0.2em] rounded-full bg-terracotta" />
      {site.name}
    </span>
  );
}

export function Nav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
    return p.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.07] bg-parchment/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-10 lg:px-16 lg:py-8">
        <Link href="/" aria-label="Akshada, home" className="text-[30px] lg:text-[44px]">
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8 lg:gap-14">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-[13px] lowercase tracking-[0.18em] lg:text-[19px] transition-colors hover:text-terracotta ${
                    isActive(item.href) ? "text-terracotta" : "text-umber"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden>
            {open ? (
              <path d="M5 5l14 14M19 5L5 19" />
            ) : (
              <>
                <path d="M3 8h18" />
                <path d="M3 16h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-ink/[0.07] bg-parchment md:hidden">
          <ul className="flex h-[calc(100dvh-81px)] flex-col items-center justify-center gap-8 pb-16">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-serif text-[34px] italic ${isActive(item.href) ? "text-terracotta" : "text-ink"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
