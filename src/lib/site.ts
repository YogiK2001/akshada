/**
 * Site-wide settings. Everything Akshada may want to change lives here.
 * Placeholders are marked TODO. Empty strings hide the related UI.
 */
export const site = {
  name: "akshada",
  fullName: "Akshada",
  tagline: "devotional art on canvas",
  description:
    "A small studio of hand-painted devotional works by Akshada: Shiva, Devi, and the inner mountain we each carry.",
  // TODO: real details
  email: "hello@akshada.art",
  city: "Pune, India",
  visiting: "By appointment only",
  /**
   * WhatsApp number in international format, digits only, no + or spaces.
   * Example for India: "919876543210". While empty, the commission form opens
   * WhatsApp with the message ready and lets the visitor choose the contact.
   */
  whatsapp: "",
  // Social profile URLs. Leave "" to hide an icon.
  socials: {
    instagram: "",
    youtube: "",
    pinterest: "",
  },
  year: 2026,
} as const;

export const nav = [
  { href: "/works/", label: "works" },
  { href: "/series/", label: "series" },
  { href: "/journal/", label: "journal" },
  { href: "/about/", label: "about" },
  { href: "/commission/", label: "commission" },
] as const;

/** Prefix a public asset path with the deploy base path (GitHub Pages project site). */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Build a WhatsApp click-to-chat URL with a prefilled message. */
export function whatsappUrl(message: string): string {
  const text = encodeURIComponent(message);
  return site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${text}`
    : `https://wa.me/?text=${text}`;
}
