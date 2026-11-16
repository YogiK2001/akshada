import type { Metadata } from "next";

/** A page's title ("Akshada: ...") and description, with the same words for the share tags. */
export function pageMeta(title: string, description: string): Metadata {
  return {
    title: { absolute: title },
    description,
    openGraph: { title, description, type: "website" },
  };
}
