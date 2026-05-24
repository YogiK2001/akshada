# akshada — artist website

A small, static multi-page site for the painter Akshada — built from a cream-and-terracotta visual language with conch and feather motifs, in tribute to devotional art.

## Pages

| Page              | File                |
| ----------------- | ------------------- |
| Home              | `index.html`        |
| Works (gallery)   | `works.html`        |
| Series            | `series.html`       |
| Journal           | `journal.html`      |
| About             | `about.html`        |
| Commission        | `commission.html`   |

## Local preview

It's pure HTML/CSS — open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Adding real artwork

Drop image files into `images/` using the names listed in `images/README.md`. Missing images fall back to stylized SVG/glyph placeholders automatically (via `onerror`).

## Deployment

Deployed via GitHub Pages from the `main` branch root.

## Structure

```
.
├── index.html          home
├── works.html          gallery
├── series.html         six series
├── journal.html        studio notes
├── about.html          artist bio
├── commission.html     commission flow + form
├── css/styles.css      shared styles
└── images/             artwork (drop files here)
```
