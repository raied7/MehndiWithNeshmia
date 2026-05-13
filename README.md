# Mehndi with Neshmia

A static single-page portfolio site for Neshmia's mehndi (henna) services.

## Run locally

It's plain HTML/CSS/JS — open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customise

- **Contact email** — edit `INQUIRY_EMAIL` at the top of `script.js`. The
  inquiry form composes a `mailto:` link, so no backend is needed.
- **Social links** — update the Instagram / WhatsApp / email links in the
  footer of `index.html`.
- **Gallery photos** — replace the placeholder tiles inside
  `.gallery-grid` with real images, e.g.
  `<img src="images/bridal-1.jpg" alt="Bridal hands" />`, and adjust the
  `.gallery-img` rule in `styles.css` if needed.
- **Copy** — the about, services, and hero text live directly in
  `index.html` and can be edited in place.

## Deploying

Drop the folder onto any static host (GitHub Pages, Netlify, Vercel,
Cloudflare Pages) — no build step required.
