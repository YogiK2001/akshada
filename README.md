# Akshada: devotional art on canvas

Website for the painter Akshada. Built with Next.js (static export) and Tailwind CSS, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build (static files in `out/`):

```bash
npm run build
npm start          # serves out/ on http://localhost:3000
```

## Editing content

Everything Akshada may want to change is plain data:

| What | File |
| --- | --- |
| Email, city, WhatsApp number, social links | `src/lib/site.ts` |
| Paintings (titles, years, descriptions) | `src/content/artworks.ts` |
| The six series | `src/content/series.ts` |
| Journal posts | `src/content/journal.ts` |

### WhatsApp

The commission form and the "enquire" buttons open WhatsApp with a ready-written message.
Set `whatsapp` in `src/lib/site.ts` to her number in international format, digits only
(for India: `91` followed by the 10-digit number). While it is empty, WhatsApp opens and
the visitor chooses who to send the message to.

### Adding a painting

1. Put the original photo in `images/` (this folder is not committed).
2. Add `"<slug>": "<filename>"` to `scripts/art-sources.json`.
3. Run `npm run images`. This writes web-sized WebP files to `public/art/` and updates `src/content/art-manifest.json`.
4. Add an entry with the same slug to `src/content/artworks.ts`.

## Deploying

```bash
npm run deploy
```

This builds the site with the `/akshada` base path and publishes `out/` to the `gh-pages` branch,
which GitHub Pages serves (Settings → Pages → Deploy from a branch → `gh-pages`, `/`).
Live at https://yogik2001.github.io/akshada/.

`.github/workflows/deploy.yml` is an alternative that builds on GitHub Actions; it is set to manual
runs only until Actions is available on the account.

## Structure

```
src/app/            pages (home, works, works/[slug], series, journal, journal/[slug], about, commission)
src/components/     shared UI: nav, footer, framed paintings, line-art motifs
src/content/        paintings, series, journal
src/lib/site.ts     site settings
scripts/            image optimisation
public/art/         optimised paintings
```
