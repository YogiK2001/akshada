import { site } from "@/lib/site";

/** The logo: a terracotta ring mark and the name in serif. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 font-serif text-[24px] leading-none tracking-[-0.01em] ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <circle cx="8" cy="8" r="5.5" fill="none" stroke="var(--color-terracotta)" strokeWidth="3" />
      </svg>
      {site.name}
    </span>
  );
}
