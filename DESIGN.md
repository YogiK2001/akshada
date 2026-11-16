# Akshada: design direction (branch `redesign`)

The site sells one thing: Akshada's hand-painted devotional originals and private commissions, from a studio in Pune. The paintings are the product and the attraction. The design's job is to show them whole, large and calm, the way they would hang on a lamp-lit wall, and to make "commission a painting" one tap away.

Feel: a quiet ashram gallery. Cream walls, old temple-wood brown, sindoor terracotta, a little khaki line-art. Clean and sleek, but with one or two moments that stop the scroll.

## Why this rewrite

The previous pass used a kit that locks every section to exactly one or two screen heights. That caused the defects the client saw. All of these must be gone:

1. Whole screens of empty space (after the statement, in the steps, an empty last screen on every page).
2. Content overflowing its section and overlapping the next one (works page at 1366: tiles run under the statement text).
3. Paintings cropped until unreadable (hero on phones shows only sky; the footer strip; thin bands).
4. Paintings used as random decoration on pages they do not belong to (a Devi painting beside a note on Shiva).
5. Headings written for a checker, not a person ("Paintings in series one to three", "Naga paintings", "More paintings to look at").
6. Commission buttons in places they do not belong (a journal article's header).
7. The ashram character lost: no conch, no feather, no wave rule, no deep brown close.
8. An odd phone grid (two small tiles, then one wide one) and a floating filter block on the works page.

## Hard rules

- **No kit.** Remove `public/assets/` (the tasteskill kit), `src/components/kit/`, `KitBoot`, the `data-type` / `page-type` / `site-kind` attributes and metas, and every kit class. Style with Tailwind 4 (`@theme` tokens in `src/app/globals.css`) and small React components. Use `next/link` for internal links again.
- **Natural heights.** No section has a fixed or minimum screen height, except the home hero, which may use `min-height` up to about 88svh on wide screens only. Content sets the height; padding sets the rhythm.
- **Paintings are shown whole.** Default is the full painting at its own aspect ratio (width and height are in `src/content/art-manifest.json`). Never tint, desaturate, overlay text on, or cut a painting into a thin band. A crop is allowed only for small thumbnails (nav, list rows), and must use the painting's `focus` from `src/content/artworks.ts`.
- **A painting appears only where it belongs:** its own tile or page, its series, or a page whose text is about it.
- **Nothing invented.** No press, exhibitions, prices, awards, reviews, client names, delivery promises or dates beyond what is in `src/content/*` and `src/lib/site.ts`. Contacts stay placeholders (`hello@akshada.example`; WhatsApp number empty).
- **No slop:** no eyebrow labels in uppercase mono, no 01/02/03 counters, no gradients, no glow, no decorative particles, no em dashes in copy.

## Tokens

Colours:
- `cream` #faf6ee: page ground
- `sand` #f1e8d8: alternate ground, mats behind paintings
- `ink` #2d2520: text, and the dark ground (statement band, footer)
- `muted` #6b5d4a: secondary text (4.5:1 or more on cream and sand; never for body copy smaller than 16px on sand without checking contrast)
- `terracotta` #c84a2e: the one accent: primary buttons, links on hover, one highlighted phrase
- `khaki` #c5b48f: line-art motifs, hairlines on the dark ground
- `gold` #d49b3e: tiny accents only (a dot, a rule end)
- hairline on light: `ink` at 12% opacity

Type (load with `next/font/google`, `display: swap`):
- Display: Source Serif 4, weight 400, tracking -0.02em, `text-wrap: balance`
- Text: Libre Franklin 400/500
- Scale: h1 clamp(40px, 6vw, 84px) / 1.04; h2 clamp(30px, 3.6vw, 52px) / 1.1; h3 22 to 26px / 1.25; lead 19 to 22px / 1.5; body 17px / 1.65; small 14px. Nothing below 13px.
- Measure: body copy at most 65ch.

Space and grid:
- Container: max-width 1280px, side padding 20px (phone), 40px (tablet), 64px (desktop). Left and right edges equal on every section.
- Section padding block: clamp(72px, 9vw, 136px). Dark bands the same. Consecutive sections on the same ground share one gap, not two.
- 12-column grid, 24px gutter (16px on phones).
- Radius: 6px on paintings' mats and inputs, 999px never. Buttons 8px.

## Components (shared, in `src/components/`)

- `Container`, `Section` (props: `tone="cream" | "sand" | "ink"`, `id`, `labelledBy`).
- `Button` / `ButtonLink`: `primary` (terracotta, cream text), `secondary` (hairline outline), `quiet` (text link with an underline that draws on hover). Height 48px, 44px minimum on phones. Visible `:focus-visible` ring: 2px terracotta, 2px offset, on everything interactive.
- `Painting`: the whole painting at its natural ratio, `srcset` from the manifest, dominant colour as placeholder, optional `mat` (a sand or ink mat with a hairline inset, like a framed work), `priority` for the first screen. Hover inside a link: the image scales to 1.03 inside its frame over 500ms.
- `WorkTile`: a linked `Painting` with the title (serif, 20px) and one line of facts (series, year) under it. This is a label, as in a gallery, and is wanted.
- `Gallery`: a masonry of `WorkTile`s that keeps each painting's ratio: 3 columns from 1024px, 2 columns below, with the items balanced (the old `GalleryGrid` balanced-masonry logic is in git history: `git show HEAD:src/components/works/GalleryGrid.tsx`).
- Motifs: `Conch`, `Feather`, `WaveRule` line-art in khaki (in git history: `git show HEAD:src/components/motifs.tsx`). Use sparingly: the conch once in the home hero or statement, the wave rule as a section divider or under a page title, the feather in the footer. Never more than one motif in view.
- `Reveal`: scroll reveal wrapper (below).
- `Nav`: logo left or centre (terracotta ring mark + "akshada" in serif), links Paintings, Series, Journal, About, and the primary button "Commission a painting". Sticky, cream at 92% with a hairline once scrolled. Phone: a menu button opening a full-height sheet with large serif links; focus trapped; closes on Escape, on navigation and on the close button; `aria-expanded` kept right.
- `Footer`: on `ink`. Left: a closing line in serif ("Have a painting made for your home"), one line, the primary button. Right or below: Studio (Pune, India; by appointment), links, Email the studio, Message on WhatsApp, socials only when set in `site.ts`. A feather motif. Copyright line. One screen at most, no empty space, the same on every page.

## Motion (GSAP)

Use `gsap` with `@gsap/react` (`useGSAP`) and `ScrollTrigger`. Everything is progressive: with JavaScript off or `prefers-reduced-motion: reduce`, all content is visible and still. Never hide content in CSS and wait for a script to show it; set start states from the script.

- Home hero, once on load: heading lines rise 24px and fade in with an 80ms stagger; the painting fades in and settles from scale 1.04; 900ms, `power3.out`.
- `Reveal`: sections and tiles fade up 20px once when 15% in view; tiles stagger 70ms.
- The statement band (the one attention moment): the quote sits in large serif on `ink`; its words go from 25% to 100% opacity as the band scrolls through (scrubbed), with "the unseen" turning terracotta.
- Hover: painting zoom 1.03, button press 0.98, underline draw. Nothing else moves. No parallax, no pinning, no carousels.
- Animate only `transform` and `opacity`.

## Pages

**Home**
1. Hero: two columns from 1024px. Left: h1 "Devotional paintings, made slowly in Pune", a lead of one or two plain sentences (ten originals in acrylic, six series, commissions for a home or shrine), the buttons "Commission a painting" and "See the paintings". Right: `adiyogi-dissolving` whole, on a mat, with its title and year as a small label under it. On phones the painting comes after the buttons and is still whole.
2. Selected works: h2 "Selected works", link "All ten paintings", a `Gallery` of six.
3. Statement band on `ink`: "The artist does not paint what is seen. She sits long enough that the unseen begins to paint itself." with the conch.
4. The series: h2 "Six series", six rows or cards, each with its cover painting as a focused thumbnail, name, one line, count; links to `/series/#<slug>`.
5. Commissions: h2 "How a commission works", three steps side by side (stacked on phones), in words: "You write", "A first sketch", "The painting". Then the form beside the studio facts: name, phone or email, subject, size, message, "Send on WhatsApp". Keep the existing behaviour in `src/components/home/CommissionForm.tsx`: name and message required, inline errors, opens `whatsappUrl(...)`, the status line says WhatsApp opened and never says "sent".
6. From the journal: the three notes as a simple list (title, date, one line). No invented content.
7. Footer.

**Paintings (`/works/`)**: page title "Paintings" with the wave rule and one line. Filter chips in one row under the title (All plus six series; horizontal scroll on phones; `aria-pressed`; keyboard reachable; a polite live region with the count). A `Gallery` of all ten.

**A painting (`/works/[slug]/`)**: from 1024px, the painting whole and large on the left (up to about 60% width, max-height about 86vh, on a mat), the facts on the right and sticky: title (h1), series, year, medium, the description, "Enquire on WhatsApp" (opens `whatsappUrl` with the title), a quiet link back to the series. Below: "More from this series" (or, if it is alone in its series, "More paintings") as three tiles, and previous / next links by title.

**Series (`/series/`)**: page title "Series" and a line. Six blocks, each `id=<slug>`: the series name (h2), its text from `series.ts`, its paintings as tiles. Alternate cream and sand.

**Journal (`/journal/`)**: page title "Journal" and a line. The notes as rows: date, title (serif), the first line. No pictures unless the note itself has a cover in the content.

**A note (`/journal/[slug]/`)**: one centred column, 65ch: date and tag, title, the text, then "More notes" as two rows. No commission buttons in the header. A painting appears only if the note is about that painting.

**About (`/about/`)**: title "About Akshada". Her text from the existing content in two or three short sections (the painter; how the paintings are made; the studio in Pune, by appointment), with one or two paintings shown whole beside the text, and a closing link to commissions.

**Commission (`/commission/`)**: title "Commission a painting", the three steps, the form, the studio facts.

**Not found**: one short screen: "This page is not here", links to home and to the paintings.

Every page: one `h1`, headings in order, a real `<title>` and description (keep `src/lib/meta.ts`), `og:image` (`/share.jpg`), the favicon, a skip link, `lang="en"`.

## Done means

- `npm run build` passes (static export, typecheck clean).
- `node .taste-skill/audit/audit.mjs` (screenshots at 1440x900, 1366x768, 820x1180, 390x844 of every page, into `.taste-skill/audit/`): no horizontal overflow, no broken images, no console errors, and the screenshots, looked at one by one, show no overlap, no empty screens, no cropped paintings.
- The functional checks pass: filter, enquire link, form validation and WhatsApp URL, phone menu, every internal link 200.

## Direction change from the client (overrides anything above that conflicts)

The site is a gallery that sells Akshada's paintings. It is not a pitch for a service.

1. **Never use the word "commission"** (or "commissions", "commissioned") anywhere a visitor can see: copy, buttons, nav, headings, titles, meta descriptions, alt text, the WhatsApp message. In India the word reads as a cut or a bribe. Say "custom painting": "Request a custom painting", "A painting made for your home". The route moves from `/commission/` to `/custom-painting/` (update `nav` in `src/lib/site.ts`, links, meta, and delete the old route). Component and file names should change too (`CustomPaintingForm`).
2. **Buying an existing painting is the main action.** The primary button in the nav and the home hero is "View the paintings" (to `/works/`). On a painting's page the primary button is "Enquire to buy on WhatsApp" (prefilled with the title). Each painting page lists: "Original, one of a kind", medium, year, and "Price on request" (no prices or sizes are invented; if `artworks.ts` has no size, show none). Add one short "How to buy" block (on the painting page and on `/works/`): enquire on WhatsApp, Akshada replies with price and details, the painting is yours. No shipping or timing promises.
3. **Art first on home.** Order: (1) hero: the painting large and whole, short h1, one line, buttons "View the paintings" and a quiet "About the artist"; (2) the gallery, large, directly after; (3) the statement band; (4) the six series; (5) about the artist, short, with a link; (6) one compact "A painting made for your home" section: two sentences and one button to `/custom-painting/` (the form lives on that page only, not on home); (7) journal list; (8) footer. The footer's closing line is about the paintings ("Live with a painting"), with "View the paintings" as its button and a quiet link "Request a custom painting".
4. **The Isha-inspired ashram feel comes forward:** conch, feather and wave line-art in khaki, serif headings (khaki-brown is allowed for large display headings if contrast is 4.5:1 or more; otherwise ink), cream and sand grounds, the deep brown footer, devotional framing in the words (Adiyogi, Linga Bhairavi, a home shrine, a place to sit). It is "inspired by": no Isha Foundation name, logo, trademarks or wording that implies an affiliation.

## Component API (foundation, for the page builders)

Everything below is in place and builds. Reuse it; do not add a second button, container or image component. Copy rule: the word "commission" never appears in anything a visitor sees; say "custom painting". Internal links use `next/link` (or `ButtonLink`) with plain paths like `/works/`: Next adds the base path itself, so never wrap an internal href in `asset()`. `asset()` is only for files in `public/` (images, favicon).

### Tokens (Tailwind 4 `@theme` in `src/app/globals.css`)

- Colours: `cream`, `sand`, `ink`, `muted`, `terracotta`, `terracotta-deep` (hover on primary, error text, current nav link), `khaki` (motifs, and headings and hairlines on ink), `khaki-deep` #7a6440 (large serif display headings on cream or sand, 5.2:1 on cream), `gold` (tiny accents), `line` (ink at 12%, hairlines on light). Use as `bg-*`, `text-*`, `border-*`, e.g. `border-line`, `border-khaki/25`.
- Fonts: `font-serif` (Source Serif 4, 400 and italic), `font-sans` (Libre Franklin 400/500, the body default). Loaded with `next/font/google` in `layout.tsx`.
- Type: `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-body`, `text-small` (each sets size, line height and tracking). h1, h2, h3 are serif 400 with `text-wrap: balance` by default.
- Radius: `rounded-[var(--radius-mat)]` (6px: mats, inputs, image frames), `rounded-[var(--radius-btn)]` (8px: buttons).
- Custom utilities: `container-x` (max 1280px, side padding 20/40/64px), `py-section` (padding block clamp(72px, 9vw, 136px)), `mat` and `mat mat-ink` (framed look with a hairline inset), `link-quiet` (text link, underline draws on hover), `link-nav`.
- Base: Tailwind preflight is on; one focus ring (`:focus-visible`, 2px terracotta, 2px offset); `[id]` has `scroll-margin-top: 88px` for the sticky nav; reduced motion stops CSS transitions; two sections in a row on the same tone share one gap automatically (`data-tone` rule).

### Recipes (reuse these so the pages read as one system)

- Section head with a link: `<div className="mb-10 flex flex-wrap items-end justify-between gap-4"><h2 className="text-h2">...</h2><ButtonLink variant="quiet" ... /></div>`
- Two columns from 1024px: `containerClassName="grid gap-12 lg:grid-cols-12 lg:gap-8"`, children `lg:col-span-6` and `lg:col-span-5 lg:col-start-8`.
- Body copy column: `max-w-[65ch]`. Lead under a heading: `mt-5 max-w-[48ch] text-lead text-muted`.
- Button row: `mt-8 flex flex-wrap items-center gap-3`.
- List rows (journal, series): `<ul className="border-t border-line">`, `<li className="border-b border-line">`, link `group block py-6`; titles `group-hover:text-terracotta-deep`.
- Small facts: `<dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-small">` with `dt` in `text-muted`.
- Alternate grounds: `tone={i % 2 === 0 ? "sand" : "cream"}`. Ink band: `tone="ink"`, display heading `text-khaki`.
- Never give a section a screen height (only the home hero may use `lg:min-h-[88svh]`).

### Components (`src/components/`)

- **`Container.tsx`** `Container({ as?, className?, children })`: the `container-x` wrapper.
  `<Container className="grid gap-8">...</Container>`
- **`Section.tsx`** `Section({ tone?: "cream" | "sand" | "ink" = "cream", id?, labelledBy?, className?, containerClassName?, contained? = true, children })`: ground, `py-section` and a Container; renders `<section data-tone>`.
  `<Section tone="sand" id="devi" labelledBy="devi-h"><h2 id="devi-h" className="text-h2">Devi</h2>...</Section>`
- **`Button.tsx`** `Button({ variant?: "primary" | "secondary" | "quiet", type? = "button", ...buttonProps })`, `ButtonLink({ href, variant?, className?, children, ...anchorProps })`, `buttonClass(variant, className)`. 48px high, press scale 0.98. `ButtonLink` uses next/link for `/paths`, a plain `<a>` for `#id` and `mailto:`, and opens `http(s)` links in a new tab with `noopener`. `secondary` and `quiet` take the current text colour, so they work on ink.
  `<ButtonLink href="/works/">View the paintings</ButtonLink>`
  `<ButtonLink href={whatsappUrl(message)}>Enquire to buy on WhatsApp</ButtonLink>`
  `<ButtonLink href="/about/" variant="quiet">About the artist</ButtonLink>`
- **`Painting.tsx`** `Painting({ slug, sizes, priority?, mat?: "sand" | "ink" | false, caption?, alt?, className?, maxHeight?, crop? })`: the whole painting at its manifest ratio, srcset 640/1080/1800, dominant colour behind it. `maxHeight="86vh"` narrows the figure so a tall painting stays whole within that height (add `className="mx-auto"` to centre it). `crop="1 / 1"` is for small thumbnails only (uses the artwork's `focus`). Hover zoom 1.03 works when an ancestor link has the class `group`. Give `sizes` the real rendered width.
  `<Painting slug="adiyogi-dissolving" sizes="(min-width: 1024px) 440px, 90vw" priority mat="sand" maxHeight="72svh" caption="Adiyogi, Dissolving, 2025" />`
- **`WorkTile.tsx`** `WorkTile({ slug, sizes?, priority?, headingLevel?: "h2" | "h3" | "p" = "h3", className? })`: linked painting, serif title (20px), "Series, year". Carries `data-reveal-item`.
  `<WorkTile slug="naga" />`
- **`Gallery.tsx`** `Gallery({ slugs? = all ten, headingLevel?, priorityCount? = 0, className? })`: balanced masonry, 2 columns below 1024px, 3 from 1024px. One `<ul>` laid out with CSS columns (no JS, no duplicate images), pre-ordered by a balanced 3-column distribution. Pure, so a client filter can pass any subset of slugs. Use `headingLevel="h2"` when it sits right under the h1.
  `<Reveal stagger><Gallery slugs={artworksInSeries("devi").map((a) => a.slug)} /></Reveal>`
- **`Reveal.tsx`** (client) `Reveal({ as? = "div", className?, id?, stagger? = false, children })`: fades up 20px once at 15% in view; `stagger` animates the `[data-reveal-item]` descendants 70ms apart. Only elements below the fold at load are hidden, by the script, never by CSS; off under reduced motion; transform and opacity are cleared after the tween.
  `<Reveal as="article" className="lg:col-span-6">...</Reveal>`
- **`src/lib/gsap.ts`** (client): `gsap`, `ScrollTrigger`, `useGSAP` with the plugins registered, and `MOTION_OK` (the no-preference media query). Build the hero entrance and the scrubbed statement band from these inside `gsap.matchMedia().add(MOTION_OK, ...)`, set start states from the script only, and clear props at the end.
- **`motifs.tsx`** `Conch({ className?, color? })`, `Feather({ className?, color?, variant?: "a" | "b" })`, `WaveRule({ className?, color?, dots? })`: khaki line art, aria-hidden. Conch once (home hero or statement band; it is in the minimal home hero now), wave rule under titles, feather in the footer. One motif in view at a time.
  `<WaveRule className="mt-6 block w-[150px]" />`
- **`PageTitle.tsx`** `PageTitle({ title, lead?, children? })`: the top of an inner page on cream: h1 (`text-h1 text-khaki-deep`), wave rule, one line; `children` go under it (filter chips). Follow it with a cream `Section` and the gap is shared.
  `<PageTitle title="Paintings" lead="Ten original paintings in acrylic, in six series.">{chips}</PageTitle>`
- **`Logo.tsx`** `Logo({ className? })`: ring mark and "akshada" in serif, colour from the parent.
- **`Nav.tsx`** (client, in the layout): sticky, cream at 92%, hairline once scrolled. Links from `nav` in `src/lib/site.ts` (Paintings, Series, Journal, About, Custom painting); primary button "View the paintings" (hidden below 640px, it is in the sheet). Below 1024px a "Menu" button opens a full-height sheet (`#site-menu`, role dialog): focus moves in and is trapped, Escape and Close return focus to the button, any link or route change closes it, `aria-expanded` follows it, page scroll is locked while open. Current page gets `aria-current="page"`.
- **`Footer.tsx`** (in the layout, the same on every page): on ink. Feather, "Live with a painting" (khaki serif), one line, "View the paintings" and a quiet "Request a custom painting"; Studio (city, by appointment, Email the studio, Message on WhatsApp, socials only when set in `site.ts`); Pages (from `nav`); logo and copyright.
- **`CustomPaintingForm.tsx`** (client) `CustomPaintingForm({ className? })`: name, phone or email, subject, size, message, "Send on WhatsApp". Name and message are required, with inline errors and focus on the first invalid field; it opens `whatsappUrl(...)` ("Namaste Akshada, I would like to request a custom painting." and the fields); the status line says WhatsApp opened, never "sent"; mailto fallback without JS. Lives on `/custom-painting/` only, on a sand panel: `<div className="rounded-[var(--radius-mat)] bg-sand p-6 sm:p-8">`.

### State of the pages after the foundation run

Each page file is a minimal, correct version to be replaced (right h1, real data, metadata from `src/lib/meta.ts`, `generateStaticParams` and `dynamicParams = false` kept): home (hero with conch, six-painting gallery), `/works/` (title and gallery of ten, no filter or "How to buy" yet), `/works/[slug]/` (painting on a mat, facts with "Original, one of a kind" and "Price on request", "Enquire to buy on WhatsApp"; no "How to buy", related tiles or previous / next yet), `/series/` (six alternating blocks with galleries), `/journal/` and the notes, `/about/` (text only), `/custom-painting/` (title, studio facts, form; no steps yet), not found.
