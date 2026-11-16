import Link from "next/link";
import { ButtonLink } from "./Button";
import { Logo } from "./Logo";
import { Feather } from "./motifs";
import { nav, site, whatsappUrl } from "@/lib/site";

const socialLabels: Record<keyof typeof site.socials, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  pinterest: "Pinterest",
};

const linkCls = "link-quiet text-cream/85 hover:text-cream";

/**
 * The same close on every page, on ink: the closing line and the primary button on the left; the studio,
 * the links and the ways to write on the right; the feather; the copyright line. Height comes from the content.
 */
export function Footer() {
  const socials = (Object.keys(site.socials) as (keyof typeof site.socials)[]).filter((k) => site.socials[k]);

  return (
    <footer className="bg-ink text-cream" aria-labelledby="footer-h">
      <div className="container-x py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Feather className="mb-6 w-6" />
            <h2 id="footer-h" className="max-w-[16ch] text-h2 text-khaki">
              Live with a painting
            </h2>
            <p className="mt-5 max-w-[46ch] text-lead text-cream/80">
              Ten originals in acrylic, each one of a kind, painted slowly in a studio in Pune.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <ButtonLink href="/works/">View the paintings</ButtonLink>
              <ButtonLink href="/custom-painting/" variant="quiet" className="text-khaki hover:text-cream">
                Request a custom painting
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:col-start-8 lg:pt-2">
            <div>
              <h3 className="text-[20px] text-khaki">Studio</h3>
              <address className="mt-3 not-italic text-cream/85">
                {site.city}
                <br />
                {site.visiting}
              </address>
              <ul className="mt-4 flex flex-col">
                <li>
                  <a className={linkCls} href={`mailto:${site.email}`}>
                    Email the studio
                  </a>
                </li>
                <li>
                  <a className={linkCls} href={whatsappUrl("Namaste Akshada, ")} target="_blank" rel="noopener noreferrer">
                    Message on WhatsApp
                  </a>
                </li>
                {socials.map((k) => (
                  <li key={k}>
                    <a className={linkCls} href={site.socials[k]} target="_blank" rel="noopener noreferrer">
                      {socialLabels[k]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <nav aria-label="Footer">
              <h3 className="text-[20px] text-khaki">Pages</h3>
              <ul className="mt-3 flex flex-col">
                {nav.map((l) => (
                  <li key={l.href}>
                    <Link className={linkCls} href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-khaki/25 pt-8 text-small text-cream/70 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="inline-flex min-h-11 items-center text-cream" aria-label={`${site.fullName}, home`}>
            <Logo />
          </Link>
          <p>
            &copy; {site.year} {site.fullName}. Paintings made in {site.city}.
          </p>
        </div>
      </div>
    </footer>
  );
}
