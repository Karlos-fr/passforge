<p align="center">
  <img src="docs/assets/logo.png" alt="Logo PassForge" width="420" />
</p>

<p align="center">
  <a href="README.md"><img src="docs/assets/flag-fr.svg" alt="" width="18" height="12" /> Français</a>
  /
  <a href="docs/README.en.md"><img src="docs/assets/flag-gb.svg" alt="" width="18" height="12" /> English</a>
</p>

<p align="center">
  <a href="https://karlos-fr.github.io/passforge/"><strong>Ouvrir PassForge</strong></a>
</p>

# PassForge

Générateur de mots de passe sécurisé, rapide et multilingue qui fonctionne entièrement dans le navigateur.

## Fonctionnalités

- Génération cryptographique avec `crypto.getRandomValues`.
- Minuscules, majuscules, chiffres et caractères spéciaux configurables.
- Exclusion optionnelle des caractères similaires.
- Longueur de 1 à 128 caractères et génération de 1 à 50 mots de passe.
- Copie individuelle ou globale dans le presse-papiers.
- Interface en français, anglais, allemand, italien, espagnol et portugais.
- Thèmes clair, sombre et système, mémorisés localement.
- Mode compact ou élargi sur desktop et interface plein écran sur mobile.
- Configuration mobile escamotable qui se superpose aux résultats.
- SEO localisé avec canonical, Open Graph, données structurées et sitemap.

## Confidentialité

La génération est strictement locale. Aucun mot de passe ne quitte le navigateur. PassForge n’utilise ni compte, ni backend, ni cookie, ni publicité, ni outil de suivi.

## Développement

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

Le site statique est produit dans `dist/`. L’origine publique des canonical, métadonnées sociales, `robots.txt` et du sitemap est configurable avec `VITE_SITE_ORIGIN` :

```powershell
$env:VITE_SITE_ORIGIN = "https://example.com"
npm run build
```

La valeur par défaut est `https://example.com`. Sur GitHub, utilisez la variable de dépôt `SITE_ORIGIN`.

## Architecture

```text
src/
├── generator.ts     # Génération cryptographique et validation
├── i18n.ts          # Traductions et détection de langue
├── layout.ts        # Persistance du mode élargi
├── main.ts          # État, rendu et interactions
├── options-store.ts # Persistance de la configuration
├── seo.ts           # Métadonnées localisées côté navigateur
├── seo-content.json # Titres et descriptions par langue
├── styles.css       # Interface desktop et mobile
└── theme.ts         # Thèmes clair, sombre et système

scripts/             # Génération des pages SEO statiques
public/              # Logo, favicon, robots.txt et sitemap
```

## Déploiement

Chaque push sur `main` construit et déploie automatiquement l’application avec GitHub Actions sur GitHub Pages.
