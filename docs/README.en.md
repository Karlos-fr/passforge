<p align="center">
  <img src="assets/logo.png" alt="PassForge logo" width="420" />
</p>

<p align="center">
  <a href="../README.md"><img src="assets/flag-fr.svg" alt="" width="18" height="12" /> Français</a>
  /
  <a href="README.en.md"><img src="assets/flag-gb.svg" alt="" width="18" height="12" /> English</a>
</p>

<p align="center">
  <a href="https://karlos-fr.github.io/passforge/"><strong>Open PassForge</strong></a>
</p>

# PassForge

Fast, secure, multilingual password generator that runs entirely in the browser.

## Features

- Cryptographic generation through `crypto.getRandomValues`.
- Configurable lowercase, uppercase, digits, and special characters.
- Optional exclusion of similar-looking characters.
- Password lengths from 1 to 128 and batches from 1 to 50.
- Individual and batch clipboard copy.
- French, English, German, Italian, Spanish, and Portuguese interface.
- Locally stored light, dark, and system themes.
- Compact or expanded desktop layout and full-screen mobile interface.
- Mobile configuration drawer that overlays the results.
- Localized SEO with canonical URLs, Open Graph, structured data, and sitemap.

## Privacy

Generation is strictly local. No password leaves the browser. PassForge has no account, backend, cookies, advertising, or tracking.

## Development

```powershell
npm install
npm run dev
```

## Build

```powershell
npm run typecheck
npm run build
npm run preview
```

The static website is generated in `dist/`. The public origin used by canonical URLs, social metadata, `robots.txt`, and the sitemap is configurable with `VITE_SITE_ORIGIN`:

```powershell
$env:VITE_SITE_ORIGIN = "https://example.com"
npm run build
```

The default is `https://example.com`. On GitHub, use the `SITE_ORIGIN` repository variable.

## Deployment

Every push to `main` automatically builds and deploys the application to GitHub Pages through GitHub Actions.
