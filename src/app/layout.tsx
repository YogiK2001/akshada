import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { asset, site } from "@/lib/site";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-source-serif",
});

const sans = Libre_Franklin({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-libre-franklin",
});

const title = "Akshada: devotional paintings from a studio in Pune";
const description =
  "Original acrylic paintings of Shiva, Devi, Hanuman and the lotus pond, and custom paintings made for a home or shrine. Enquire on WhatsApp.";

/** Set NEXT_PUBLIC_SITE_URL (e.g. https://example.com) at build time once the domain is known. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: { default: title, template: `%s · ${site.fullName}` },
  description,
  openGraph: { title, description, type: "website" },
  icons: { icon: asset("/favicon.svg") },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#faf6ee",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        {/* the share image as a plain tag: page metadata replaces openGraph wholesale, this survives on every page */}
        <meta property="og:image" content={siteUrl ? `${siteUrl}${asset("/share.jpg")}` : asset("/share.jpg")} />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className="min-h-screen bg-cream font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--radius-btn)] focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
