# Plan de migration Astro → React (en attente)

*Plan rédigé le 1er novembre 2026. **Statut : en attente.** Le site reste sur Astro pour l'instant.*

## Pourquoi

- Pouvoir modifier le site dans **Lovable**.
- Mieux connaître **React** qu'Astro.

## Choix technique

Lovable ne gère pas Next.js : ses projets reposent sur **Vite + React + React Router + Tailwind**.

Pour garder le SEO, on ajoute un **pré-rendu au build** (`vite-react-ssg`) : chaque page est générée en vrai HTML, comme aujourd'hui avec Astro. Lovable, lui, travaille en mode développement classique.

## Réserves

- **L'import dans Lovable n'est pas garanti.** Lovable est surtout prévu pour des projets créés chez lui. Il faudra vérifier que l'import d'un dépôt GitHub existant se passe bien.
- **L'IA de Lovable ne connaît pas les règles du CLAUDE.md** (pré-rendu, aucun fait inventé, tokens, etc.). Il faudra les lui donner (par exemple dans la « knowledge » du projet Lovable).
- **Plus de JavaScript envoyé au navigateur** : environ 60 à 90 Ko de React sur chaque page. L'objectif Lighthouse ≥ 90 reste atteignable, mais avec moins de marge.

## Étapes

Tout se fait sur une branche `react`, avec un commit par étape validée. `main` reste intact.

| Étape | Contenu |
|---|---|
| **1. Socle** | Projet Vite + React + TypeScript strict + React Router + Tailwind v4. On reprend tels quels `content/`, `config/`, `i18n/`, `tokens.css`, les polices et les photos. On adapte `netlify.toml` et on retire Astro. |
| **2. Structure commune** | Mise en page, balises SEO (title, canonique, hreflang, Open Graph, JSON-LD), script des thèmes A/B/C sans flash, Header, Footer et bouton WhatsApp. |
| **3. Photos** | Composant `<Photo>` qui génère AVIF/WebP en plusieurs tailles (`vite-imagetools`), et les aplats neutres conservés. |
| **4. Pages** | Accueil, Le chalet, Services, Méribel, Galerie (lightbox), Contact (formulaire en 2 étapes compatible Netlify Forms, avec déclaration statique du formulaire), pages légales, Merci, 404, en FR et en EN. |
| **5. SEO final** | `sitemap.xml` (qui corrige au passage le bug des paires FR/EN, voir `REVUE-SEO.md`), `robots.txt`, puis vérification que les 19 pages HTML sont complètes. |
| **6. Documentation** | Mise à jour du CLAUDE.md (§2 et §3 : nouvelle stack, nouvelles commandes de vérification) et du README (procédure Lovable incluse). |

## Dépendances (accord explicite nécessaire avant de commencer, §1.7 du CLAUDE.md)

- **Ajoutées :** `react`, `react-dom`, `react-router`, `vite`, `@vitejs/plugin-react`, `vite-react-ssg`, `lucide-react`, `vite-imagetools`.
- **Retirées :** `astro`, `@astrojs/sitemap`, `@astrojs/check`, `@lucide/astro`.
- **Gardées :** Tailwind, `@fontsource`, `sharp`, TypeScript.

## Vérifications avant chaque compte rendu

`npm run build` + `npx tsc --noEmit` (au lieu de `npx astro check`), plus un contrôle du HTML généré : chaque page doit contenir son texte sans JavaScript.
