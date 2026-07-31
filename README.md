# PassForge

PassForge est une petite application web en TypeScript pour générer des mots de passe sécurisés avec des options simples et une interface sobre.

## Fonctionnalités

- Génération de plusieurs mots de passe.
- Options FR/EN avec détection automatique de la langue navigateur.
- Cases : chiffres, minuscules, majuscules, caractères spéciaux.
- Option d’exclusion des caractères similaires.
- Longueur et nombre de mots de passe configurables.
- Copie individuelle et copie de tout le lot.

## Démarrage en local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Déploiement GitHub Pages

Ce dépôt est configuré pour déployer automatiquement sur GitHub Pages via GitHub Actions.

### URL attendue

Après la première exécution du workflow, l’application est disponible à :
https://Karlos-fr.github.io/passforge/

## Architecture

- `index.html` : structure de l’application.
- `src/main.ts` : état UI, événements, rendu et actions.
- `src/generator.ts` : logique de génération.
- `src/i18n.ts` : traductions et gestion de la langue.
- `src/styles.css` : style sobre, contrasté et minimal.

## Remarque sécurité

La génération utilise `crypto.getRandomValues` pour une source aléatoire cryptographique côté navigateur.
