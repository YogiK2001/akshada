import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "quiet";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] px-6 text-[16px] font-medium leading-none whitespace-nowrap transition-[transform,background-color,border-color,color] duration-200 active:scale-[0.98] select-none";

const variants: Record<ButtonVariant, string> = {
  // terracotta-deep: cream on it is 5.9:1 (cream on plain terracotta is only 4.3:1, under AA for 16px text)
  primary: `${base} bg-terracotta-deep text-cream hover:bg-terracotta-dark`,
  // hairline outline in the current text colour: works on cream, sand and ink
  secondary: `${base} border border-current/30 text-current hover:border-current`,
  quiet: "link-quiet text-current",
};

export function buttonClass(variant: ButtonVariant = "primary", className = "") {
  return `${variants[variant]} ${className}`;
}

/** A <button>. Default type="button". */
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

/**
 * A link styled as a button. Internal paths ("/works/") go through next/link, which adds the base path itself:
 * never wrap them in asset(). "#id", mailto:, tel: and http(s) links render a plain <a>; http(s) ones open in a new tab.
 */
export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string; variant?: ButtonVariant; children: ReactNode }) {
  const cls = buttonClass(variant, className);
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  const external = /^https?:/.test(href);
  return (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
