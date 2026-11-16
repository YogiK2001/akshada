import type { ElementType, ReactNode } from "react";

/** Max width 1280px, side padding 20 / 40 / 64px. Same left and right edges on every section. */
export function Container({
  as: Tag = "div",
  className = "",
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={`container-x ${className}`}>{children}</Tag>;
}
