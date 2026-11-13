import Link from "next/link";
import type { ReactNode } from "react";
import { site, whatsappUrl } from "@/lib/site";
import { Wordmark } from "./Nav";

function Col({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 font-serif text-[21px] lg:text-[28px] font-medium tracking-[0.02em] text-terracotta">{title}</h2>
      <ul className="space-y-3 text-[15px] leading-[1.6] lg:space-y-4 lg:text-[19px]">{children}</ul>
    </div>
  );
}

const linkCls = "text-khaki transition-colors hover:text-cream";

const icons = {
  instagram: (
    <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5h.01" />
  ),
  youtube: (
    <>
      <path d="M2.5 8.2c.2-1.6 1.4-2.8 3-2.9C8 5.1 10 5 12 5s4 .1 6.5.3c1.6.1 2.8 1.3 3 2.9.2 1.3.3 2.5.3 3.8s-.1 2.5-.3 3.8c-.2 1.6-1.4 2.8-3 2.9-2.5.2-4.5.3-6.5.3s-4-.1-6.5-.3c-1.6-.1-2.8-1.3-3-2.9C2.3 14.5 2.2 13.3 2.2 12s.1-2.5.3-3.8Z" />
      <path d="m10 9 5 3-5 3V9Z" />
    </>
  ),
  pinterest: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 20.5 11 11m0 0c.3-1.8 1.4-3 3-3 1.8 0 2.8 1.3 2.8 3.2 0 2.3-1.3 4.3-3.2 4.3-1 0-1.8-.7-1.6-1.7" />
    </>
  ),
} as const;

export function Footer() {
  const socials = (Object.keys(site.socials) as (keyof typeof site.socials)[]).filter((k) => site.socials[k]);

  return (
    <footer data-shot="S05" className="bg-ink text-khaki">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-16 sm:px-10 lg:px-16 lg:pt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          <Col title="Studio">
            <li><Link className={linkCls} href="/about/">About the artist</Link></li>
            <li><Link className={linkCls} href="/about/#process">Process</Link></li>
            <li><Link className={linkCls} href="/journal/">Journal</Link></li>
            <li><Link className={linkCls} href="/commission/">Commission a work</Link></li>
          </Col>
          <Col title="Works">
            <li><Link className={linkCls} href="/works/">All paintings</Link></li>
            <li><Link className={linkCls} href="/series/">The six series</Link></li>
            <li><Link className={linkCls} href="/works/">Recent works</Link></li>
          </Col>
          <Col title="Visit">
            <li className="text-dusk">{site.visiting}</li>
            <li className="text-dusk">{site.city}</li>
            <li><a className={linkCls} href={`mailto:${site.email}`}>{site.email}</a></li>
          </Col>
          <Col title="Follow">
            {socials.length > 0 && (
              <li className="flex gap-4 pb-1">
                {socials.map((k) => (
                  <a key={k} href={site.socials[k]} aria-label={k} className={linkCls} target="_blank" rel="noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {icons[k]}
                    </svg>
                  </a>
                ))}
              </li>
            )}
            <li>
              <a className={linkCls} href={whatsappUrl("Namaste Akshada, I found your work on your website and would love to hear more.")} target="_blank" rel="noreferrer">
                WhatsApp →
              </a>
            </li>
            <li>
              <a className={linkCls} href={`mailto:${site.email}`}>Email →</a>
            </li>
          </Col>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-khaki/20 pt-8 text-[13px] text-dusk lg:mt-20 lg:text-[16px] tracking-[0.04em] text-taupe sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-[24px] lg:text-[32px]" aria-label="Akshada, home">
            <Wordmark tone="light" />
          </Link>
          <p>© {site.year} akshada studio · all rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
