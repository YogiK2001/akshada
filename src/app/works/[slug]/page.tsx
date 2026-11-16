import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { Painting } from "@/components/Painting";
import { Section } from "@/components/Section";
import { HowToBuyCompact } from "@/components/works/HowToBuy";
import { MoreWorks } from "@/components/works/MoreWorks";
import { artworks, getArtwork } from "@/content/artworks";
import { getSeries } from "@/content/series";
import { pageMeta } from "@/lib/meta";
import { whatsappUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

/** the first sentence of a painting's description */
function firstSentence(text: string) {
  const m = text.match(/^.*?[.!?](?=\s|$)/);
  return m ? m[0] : text;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getArtwork(slug);
  if (!work) return {};
  const sr = getSeries(work.series);
  return pageMeta(
    `Akshada: ${work.title}, ${work.medium.toLowerCase()}, ${work.year}`,
    `${work.title}, an original painting from the ${sr?.name} series, ${work.medium.toLowerCase()}, ${work.year}. ${firstSentence(work.description)}`,
  );
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getArtwork(slug);
  if (!work) notFound();
  const sr = getSeries(work.series);

  return (
    <>
      <Section tone="cream" containerClassName="grid items-start gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Painting slug={slug} sizes="(min-width: 1024px) 700px, 100vw" priority mat="sand" maxHeight="86vh" className="mx-auto" />
        </div>
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:col-start-9">
          <h1 className="text-h2 text-khaki-deep">{work.title}</h1>
          <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-small">
            <dt className="text-muted">Series</dt>
            <dd>
              {sr ? (
                <Link href={`/series/#${sr.slug}`} className="link-quiet -my-3">
                  {sr.name}
                </Link>
              ) : null}
            </dd>
            <dt className="text-muted">Year</dt>
            <dd>{work.year}</dd>
            <dt className="text-muted">Medium</dt>
            <dd>{work.medium}</dd>
            <dt className="text-muted">Edition</dt>
            <dd>Original, one of a kind</dd>
            <dt className="text-muted">Price</dt>
            <dd>Price on request</dd>
          </dl>
          <p className="mt-6 max-w-[65ch]">{work.description}</p>
          <div className="mt-7">
            <ButtonLink href={whatsappUrl(`Namaste Akshada, I would like to buy "${work.title}" (${work.year}). Could you share the price and details?`)}>
              Enquire to buy on WhatsApp
            </ButtonLink>
          </div>
          <HowToBuyCompact />
        </div>
      </Section>
      <MoreWorks slug={slug} />
    </>
  );
}
