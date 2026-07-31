# Plan de développement – App de génération de mots de passe (TypeScript)

## Objectif
Créer une application de génération de mots de passe en TypeScript qui permet de configurer les paramètres de génération selon les options demandées, avec interface multilingue **FR/EN** et détection automatique de la langue via le navigateur.

## Fonctionnalités à implémenter

1. **Interface de configuration**
   - Case à cocher : `Include digits`
   - Case à cocher : `Include lowercase letters`
   - Case à cocher : `Include uppercase letters`
   - Case à cocher : `Include special characters`
   - Case à cocher : `Exclude similar characters`
   - Contrôle `Password length` (nombre de caractères par mot de passe)
   - Contrôle `Number of passwords` (nombre de mots de passe à générer)

2. **Validation**
   - Au moins un type de caractères doit être activé.
   - La longueur doit être >= 1.
   - Le nombre de mots de passe doit être >= 1.

3. **Génération**
   - Génération en TypeScript via `window.crypto.getRandomValues` (navigateur) ou `crypto.randomInt` (Node si besoin).
   - Exclusion optionnelle des caractères similaires.
   - Produire exactement `Number of passwords` résultats.

4. **Affichage**
   - Liste des mots de passe générés.
   - Bouton de copie par mot de passe (et option copier tout).
   - Message de confirmation de copie.

5. **Ergonomie**
   - Désactiver le bouton “Générer” tant que la configuration est invalide.
   - Reset vers les valeurs par défaut.

6. **Internationalisation (i18n)**
   - Ajouter le support des langues **français** (`fr`) et **anglais** (`en`) dès la première version.
   - Détection automatique de la langue au chargement : utiliser `navigator.language` et `navigator.languages`.
   - Fallback explicite sur `fr` si la langue détectée n’est pas supportée.
   - Texte UI complet (labels, placeholders, erreurs, boutons, messages) via dictionnaire.
   - Option de bascule manuelle FR/EN (toggle ou select).
   - Persistance du choix utilisateur (optionnelle) via `localStorage`.

## Arborescence cible (proposée)

- `src/` : logique de génération + état
- `src/index.html` : interface
- `src/main.ts` : logique UI (ou framework équivalent)
- `src/i18n/` : fichiers/dictionnaires de traductions `fr.json`, `en.json` ou objet TS.
- `README.md` : instructions d’installation et d’utilisation

## Étapes de réalisation

1. Définir la structure du projet TypeScript (package, build, scripts).
2. Implémenter le générateur de caractères avec exclusions et validation.
3. Connecter l’UI aux options listées.
4. Ajouter le module i18n (dictionnaires FR/EN, détection navigateur, fallback, sélection langue).
5. Ajouter le module d’internationalisation avec mise à jour dynamique des libellés.
6. Ajouter la copie, les validations, les messages utilisateur.
7. Tester les cas FR/EN (labels/valeurs par défaut, erreurs, succès).
8. Documenter le projet (README + exemples d’usage, note sur la détection de langue).

## Direction artistique (UI)

- Style visuel: sobre, élégant, "geek minimaliste", sans effet "AI générative" ni décoration excessive.
- Typographie: fonte monospace lisible (ex: `JetBrains Mono` ou `IBM Plex Mono`) pour un rendu technique propre.
- Palette: fond sobre (clair ou foncé), accents cyan/vert mesurés.
- Layout: structure claire en blocs (config / actions / résultats), espacements simples.
- Composants: cases à cocher et boutons à bordure fine, contraste propre, état hover discret.
- Résultats: zone de sortie avec polices fixes, lignes alignées, sans animation tape-à-l'œil.
