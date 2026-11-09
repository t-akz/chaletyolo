# Chalet Yolo — site vitrine

Site vitrine bilingue (français / anglais) du **Chalet Yolo**, chalet privé à Méribel.

- Site **100 % statique** construit avec [Astro](https://astro.build) et Tailwind CSS.
- Hébergé sur **Netlify**, formulaire de contact via **Netlify Forms**.
- Aucun cookie, polices hébergées sur le site, pas de carte intégrée (simple lien vers Google Maps).

Ce guide s'adresse à une personne **non développeuse**. Pour chaque modification, la démarche est toujours la même :
**modifier un fichier → vérifier en local → publier.**

---

## Sommaire

1. [Lancer le projet sur votre ordinateur](#1-lancer-le-projet-sur-votre-ordinateur)
2. [Où se trouve quoi](#2-où-se-trouve-quoi)
3. [Modifier un texte](#3-modifier-un-texte)
4. [Ajouter ou remplacer une photo](#4-ajouter-ou-remplacer-une-photo)
5. [Renseigner les informations « [À FOURNIR] »](#5-renseigner-les-informations--à-fournir-)
6. [Formulaire de contact : recevoir les demandes par email](#6-formulaire-de-contact--recevoir-les-demandes-par-email)
7. [Déployer sur Netlify](#7-déployer-sur-netlify)
8. [Statistiques de visite (Umami)](#8-statistiques-de-visite-umami)
9. [Les couleurs du site](#9-les-couleurs-du-site)
10. [Liste de tout ce qui reste à fournir](#10-liste-de-tout-ce-qui-reste-à-fournir)
11. [Écran d'entrée de la page d'accueil](#11-écran-dentrée-de-la-page-daccueil)

---

## 1. Lancer le projet sur votre ordinateur

### Prérequis (une seule fois)

- **Node.js** version 22.23 ou plus récente (version 24 conseillée) : <https://nodejs.org>.
  Pour vérifier, tapez `node -v` dans le Terminal.
- Un éditeur de texte, par exemple **Visual Studio Code**.

### Installer (une seule fois, ou après une mise à jour des dépendances)

Dans le Terminal, placez-vous dans le dossier du projet, puis :

```bash
npm install
```

### Les commandes utiles

| Commande | À quoi elle sert |
|---|---|
| `npm run dev` | Lance le site en local sur <http://localhost:4321>. La page se met à jour à chaque enregistrement. `Ctrl + C` pour arrêter. |
| `npm run build` | Construit la version finale du site (dossier `dist/`). Doit se terminer par « Complete! » sans erreur. |
| `npm run preview` | Affiche la version construite (après `npm run build`) — à utiliser pour tester Lighthouse. |
| `npx astro check` | Vérifie qu'aucune erreur ne s'est glissée (texte manquant dans une langue, faute de frappe dans un nom…). Doit afficher « 0 errors ». |

> **Avant chaque publication**, lancez `npm run build` puis `npx astro check` : s'ils passent sans erreur, le site est publiable.

### Adresses locales

| Page | Français | Anglais |
|---|---|---|
| Accueil | <http://localhost:4321/> | <http://localhost:4321/en/> |
| Le chalet | `/le-chalet/` | `/en/the-chalet/` |
| Services | `/services/` | `/en/services/` |
| Méribel | `/meribel/` | `/en/meribel/` |
| Galerie | `/galerie/` | `/en/gallery/` |
| Contact | `/contact/` | `/en/contact/` |
| Merci (après le formulaire) | `/merci/` | `/en/thank-you/` |
| Mentions légales | `/mentions-legales/` | `/en/legal-notice/` |
| Confidentialité | `/confidentialite/` | `/en/privacy/` |
| Page introuvable | `/404` (n'importe quelle adresse inconnue) | — |

---

## 2. Où se trouve quoi

| Je veux modifier… | Fichier(s) |
|---|---|
| Un texte d'une page | `src/content/fr/<page>.json` **et** `src/content/en/<page>.json` |
| Les textes communs (menu, pied de page, boutons, message WhatsApp) | `src/content/fr/common.json` et `src/content/en/common.json` |
| Les faits sur le chalet (chiffres, chambres, équipements, services, accès) | `src/content/chalet.ts` |
| Email, WhatsApp, réseaux sociaux, adresse du site | `src/config/site.ts` |
| La liste des photos et leurs textes alternatifs | `src/content/photos.ts` |
| Les fichiers photo | `src/assets/photos/<dossier>/` |
| Les couleurs | `src/styles/tokens.css` |
| Le logo / le favicon (icône de l'onglet) | `src/assets/logo/logo-yolo.svg` / `public/favicon.svg` |
| Les adresses des pages | `src/i18n/routes.ts` (+ renommer le fichier dans `src/pages/`) |

Correspondance fichiers de textes ↔ pages :

| Fichier | Page |
|---|---|
| `home.json` | Accueil |
| `chalet.json` | Le chalet |
| `services.json` | Services |
| `meribel.json` | Méribel |
| `gallery.json` | Galerie |
| `contact.json` | Contact (dont tous les libellés et messages d'erreur du formulaire) |
| `thanks.json` | Merci |
| `legal.json` | Mentions légales |
| `privacy.json` | Confidentialité |
| `notfound.json` | Page introuvable (404) |
| `common.json` | Éléments présents sur toutes les pages |

> Aucun texte n'est écrit directement dans le code des pages : **tout** est dans ces fichiers.

---

## 3. Modifier un texte

1. Ouvrez le fichier de la page dans `src/content/fr/` (français) **et** son jumeau dans `src/content/en/` (anglais).
2. Modifiez **uniquement le texte entre guillemets à droite** des deux-points. Exemple :

   ```json
   "title": "Méribel, à votre rythme.",
   ```
   devient
   ```json
   "title": "Votre nouvelle accroche",
   ```
3. Enregistrez, regardez le résultat avec `npm run dev`.
4. Lancez `npx astro check` : il signale toute erreur.

**Règles à respecter**

- Ne changez **jamais** ce qui est à gauche des deux-points (`"title"`, `"text"`…) : c'est le nom de la rubrique, utilisé par le code.
- Les fichiers FR et EN doivent avoir **exactement les mêmes rubriques**. Si une rubrique manque d'un côté, `npx astro check` affiche une erreur.
- Gardez les guillemets `"` autour du texte et la virgule en fin de ligne quand il y en avait une. Pour écrire un guillemet **dans** un texte, utilisez les guillemets français « » ou l'apostrophe typographique ’.
- Les repères entre accolades, comme `{skiAreaKm}` ou `{time}`, sont remplacés automatiquement par un chiffre venant de `chalet.ts` : laissez-les tels quels.
- Les accroches et textes de présentation ont été rédigés par Claude (novembre 2026) : faites-les relire par le client. Un texte encore provisoire commence par `TODO-COPY:` : remplacez la ligne entière (préfixe compris).

**Modifier un fait** (nombre de chambres, liste des équipements, services inclus…) : tout est dans `src/content/chalet.ts`, avec le libellé français (`fr:`) et anglais (`en:`) côte à côte. Exemple : `{ fr: 'Sauna', en: 'Sauna' }`.

**La salle de jeux** est masquée partout tant que sa ligne dans `chalet.ts` contient `confirmed: false`. Le jour où elle est confirmée, passez à `confirmed: true` : elle apparaît automatiquement sur la page Le chalet, dans la galerie (catégorie Loisirs) et dans les données pour Google. Pensez alors à relire son texte dans `chalet.json` (rubrique `games`) : il reste volontairement général.

---

## 4. Ajouter ou remplacer une photo

### Le principe

Chaque emplacement photo du site a un **nom** (ex. `piscine-01`) et un **dossier** (ex. `piscine`). Tant qu'aucun fichier ne porte ce nom, un aplat de couleur affiche le nom de l'espace et le fichier attendu (ex. « piscine/piscine-01 »).

**Pour mettre une vraie photo : déposez le fichier au bon endroit avec le bon nom.** C'est tout — le site le détecte, le convertit en formats modernes (AVIF, WebP) et crée automatiquement plusieurs tailles.

Exemple : la photo `piscine-01` → `src/assets/photos/piscine/piscine-01.jpg`

### Formats et tailles

- Formats acceptés : **JPG, JPEG, PNG, WebP, AVIF**.
- Photos plein écran (dossier `hero`) : **au moins 2400 px de large**, format paysage.
- Autres photos : au moins **1600 px** de large conseillé.
- Le site redimensionne et compresse tout seul : déposez les originaux en bonne qualité.
- Évitez espaces et accents dans les noms de fichiers.

### Les emplacements existants

| Dossier | Noms de fichiers attendus | Où elles apparaissent |
|---|---|---|
| `hero` | `accueil`, `le-chalet-01` (page Le chalet), `le-chalet` (plus utilisée), `services`, `meribel` | Photo plein écran en haut de chaque page (et image de partage sur les réseaux sociaux) |
| `piscine` | `piscine-01` à `piscine-04` | `piscine-01` : Le chalet ; `piscine-02` : Accueil (carte Offre & Contact) ; `piscine-03` : Accueil (photo qui monte dans le hero) ; `piscine-04` : Accueil (mosaïque) — fichier de 1447 px de large, à remplacer par une version ≥ 2400 px si elle sert un jour en plein écran ; Galerie : toutes sauf `piscine-03` |
| `bien-etre` | `bien-etre-01`, `bien-etre-02` | `bien-etre-01` : Accueil, Le chalet ; les deux : Galerie |
| `cinema` | `cinema-01` | Accueil, Le chalet, Galerie |
| `yoga` | `yoga-01`, `yoga-02` | `yoga-01` : Le chalet ; `yoga-02` : Accueil (mosaïque) ; les deux : Galerie |
| `sejour` | `sejour-01` (salon cathédrale), `sejour-02` (feu de cheminée) | `sejour-01` : Accueil, Le chalet ; `sejour-02` : Accueil (carte « Le Chalet ») ; les deux : Galerie |
| `cuisine` | `cuisine-01` | Accueil, Galerie |
| `chambres` | `chambre-01` à `chambre-06` | Galerie ; `chambre-01` aussi dans la mosaïque de l'accueil et la colonne « Chambres & suites » (Le chalet) |
| `exterieur` | `exterieur-01`, `exterieur-02` (entrée avec l'ours) | `exterieur-01` : Accueil (mosaïque) — fichier de 896 px de large seulement, à remplacer par une version ≥ 2400 px ; les deux : Galerie |
| `meribel` | `meribel-01` à `meribel-03` | `meribel-03` : Accueil (carte Méribel), Méribel ; les trois : Galerie |
| `salles-de-bain` | `sdb-01`, `sdb-02`, `sdb-03` | Galerie (filtre Chambres) |
| `services` | `service-01` (local à skis) | Galerie (filtre Séjour). `service-02` (apéritif) a été retirée de la galerie ; son fichier reste dans le dossier. |
| `jeux` | `jeux-01` | Le chalet, Galerie — uniquement si la salle de jeux est confirmée |
| `plans` | `plan-niveau-1` à `plan-niveau-5` (un plan par niveau) | Section « Floor Plans » de la page Le chalet uniquement (jamais dans la Galerie). Les plans sont affichés en entier sur fond blanc, sans être rognés : un format paysage d'environ 4:3 est idéal (PNG ou JPG, ≥ 1600 px de large) |

> Le dossier `images/` à la racine du projet contient les **originaux** fournis par le client. Il n'est pas envoyé sur GitHub (voir `.gitignore`) : le site n'utilise que les copies de `src/assets/photos/`.

### Remplacer une photo

Remplacez le fichier par un autre **portant le même nom**. Si la nouvelle photo a une autre extension (ex. `.png` au lieu de `.jpg`), supprimez l'ancienne pour qu'il n'y ait qu'un fichier par nom.

### Ajouter une nouvelle photo (par ex. dans la galerie)

1. Déposez le fichier, ex. `src/assets/photos/chambres/chambre-01-b.jpg`.
2. Dans `src/content/photos.ts`, ajoutez une ligne dans la liste `slots`, sur le modèle des autres :

   ```ts
   { id: 'chambre-01-b', folder: 'chambres', alt: { fr: 'Chambre 1, salle de bain', en: 'Bedroom 1, bathroom' } },
   ```
   - `id` = nom du fichier **sans** l'extension ;
   - `alt` = description de la photo en français et en anglais (lue par les lecteurs d'écran et par Google — décrivez ce qu'on voit).
3. La photo apparaît automatiquement dans la galerie, dans la catégorie de son dossier :

   | Filtre de la galerie | Dossiers |
   |---|---|
   | Séjour | `sejour`, `cuisine`, `services` |
   | Chambres | `chambres`, `salles-de-bain` |
   | Bien-être | `piscine`, `bien-etre` |
   | Loisirs | `cinema`, `yoga`, `jeux` |
   | Extérieur | `exterieur` |
   | Méribel | `meribel` |

> Quand les vraies photos sont en place, relisez les textes alternatifs (`alt`) de `photos.ts` : ils sont aujourd'hui génériques (« Piscine intérieure chauffée ») et gagnent à décrire précisément chaque image.

**Retirer une photo de la Galerie** sans la supprimer du site : ajoutez `inGallery: false` à sa ligne dans `src/content/photos.ts` (ex. `piscine-03`).

La **mosaïque de l'accueil** (8 photos) est définie dans `src/views/HomeView.astro`, liste `mosaicPhotos` : remplacez un nom par un autre pour changer de photo.

---

## 5. Renseigner les informations « [À FOURNIR] »

Tout ce qui manque s'affiche sur le site avec le repère visible **[À FOURNIR]**. La liste complète est au [§ 10](#10-liste-de-tout-ce-qui-reste-à-fournir).

### `src/config/site.ts` — coordonnées du site

| Ligne | Quoi mettre | Exemple |
|---|---|---|
| `url` | Adresse complète du site, **sans** `/` à la fin | `'https://www.chalet-yolo.com'` |
| `email` | Email de contact affiché | `'contact@chalet-yolo.com'` |
| `whatsapp` | Numéro au format international, **chiffres uniquement**, sans `+`, sans espaces, sans le 0 initial | `'33612345678'` |
| `social.instagram` | Adresse complète de la page | `'https://www.instagram.com/…'` |
Une fois renseignés, ces éléments apparaissent automatiquement partout (pied de page, page Contact, bouton WhatsApp, données pour Google).

> La position exacte du chalet n'est volontairement renseignée **nulle part** (sécurité du bien). La page Méribel propose seulement un lien Google Maps vers le **quartier** de La Gittaz (adresse du lien : `src/views/MeribelView.astro`, texte : `src/content/{fr,en}/meribel.json` → `resort.location`).

### `src/content/tarifs.ts` — prix à la semaine (page Offre & Contact)

Une ligne par semaine (du **samedi au samedi**), de novembre 2026 à avril 2027. Remplacez `null` par le **prix total de la semaine en euros**, sans espace ni symbole :

```ts
{ start: '2026-12-19', price: 18500 },
```

- Le prix par nuit (total ÷ 7, arrondi à l'euro) et la mise en forme (« 18 500 € » / « €18,500 ») sont calculés automatiquement.
- Tant qu'une semaine vaut `null`, sa carte affiche **[À FOURNIR]**.
- Nouvelle saison : ajoutez les samedis d'arrivée à la liste, dans l'ordre (les mois apparaissent tout seuls). Pensez à mettre à jour le titre `offer.title` de `src/content/{fr,en}/contact.json`.

### Pages légales

`src/content/fr/legal.json`, `src/content/fr/privacy.json` et leurs versions anglaises : remplacez chaque `[À FOURNIR]` (raison sociale, SIRET, directeur de publication, adresse de Netlify, durée de conservation des données…).

> ⚠️ Ces deux pages sont des **modèles**. Faites-les relire par un professionnel (juriste, expert-comptable) avant la mise en ligne.

### Logo

Le logo est en place : `src/assets/logo/logo-yolo.svg` (copie de l'original `images/logo_yolo.svg`, dont la couleur a été retirée).

- Sa couleur s'adapte toute seule : **blanc** sur l'en-tête transparent (photo), **rouge `#b9121b`** sur fond clair. Ce rouge est réglé par la ligne `--color-logo` de `src/styles/tokens.css`.
- Sa taille se règle dans `src/components/Header.astro` (classe `h-15`, en-tête) et `src/components/Footer.astro` (classe `h-14`, pied de page).
- **Changer de logo** : remplacez `src/assets/logo/logo-yolo.svg` par le nouveau fichier SVG, puis supprimez-y les couleurs (`fill="#…"`, bloc `<style>`) et ajoutez `fill="currentColor"` sur la première balise `<svg …>` — ou demandez-le à l'assistant IA.
- Le **favicon** (`public/favicon.svg`) reprend la tête d'ourson du logo sur fond crème.

---

## 6. Formulaire de contact : recevoir les demandes par email

Le formulaire s'appelle **`demande-sejour`** (le même pour le français et l'anglais ; le champ `langue` indique `fr` ou `en`). Il est géré par **Netlify Forms** : aucun serveur à installer.

> ⚠️ **L'envoi ne fonctionne pas en local** (`npm run dev`) : c'est normal. En local, on vérifie seulement l'affichage et les messages d'erreur. L'envoi réel se teste sur le site publié par Netlify (ou un « deploy preview »).

### Activer la réception (une seule fois, après le premier déploiement)

1. Dans Netlify, ouvrez le site → **Forms**.
2. Si demandé, activez la **détection des formulaires** (« Enable form detection »), puis **redéployez** le site (Deploys → Trigger deploy) pour que Netlify repère le formulaire.
3. Le formulaire **demande-sejour** apparaît dans la liste.
4. Pour recevoir chaque demande par email : **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification**. Choisissez le formulaire `demande-sejour` et indiquez l'adresse de réception.

> Les menus de Netlify évoluent parfois : si un intitulé a changé, cherchez « Form notifications » dans la documentation Netlify.

### Tester l'envoi

Sur le site publié : remplissez le formulaire, envoyez → vous devez arriver sur la page **Merci**, et la demande apparaît dans **Forms → demande-sejour** (puis dans votre boîte email).
Vérifiez à cette occasion que la **formule** (toujours `full-catered`, champ caché), le **rôle**, le **canal de réponse** et le **téléphone ou l'email** apparaissent bien dans la demande reçue.

### Anti-spam

Un champ invisible (« bot-field ») piège les robots : si un robot le remplit, Netlify ignore l'envoi. Les demandes douteuses restantes vont dans l'onglet **Spam** de Forms.

---

## 7. Déployer sur Netlify

Le fichier `netlify.toml` contient déjà tous les réglages (commande de construction, dossier publié, version de Node, en-têtes de sécurité).

### Première mise en ligne

1. Envoyez le projet sur GitHub (`git push`).
2. Sur <https://app.netlify.com> : **Add new site → Import an existing project → GitHub**, choisissez le dépôt.
3. Netlify lit `netlify.toml` : laissez les réglages proposés (Build command `npm run build`, Publish directory `dist`) et lancez le déploiement.
4. Activez le formulaire ([§ 6](#6-formulaire-de-contact--recevoir-les-demandes-par-email)).
5. **Nom de domaine** : Domain management → Add a domain, puis suivez les instructions. Ensuite, mettez cette adresse dans `url` de `src/config/site.ts` (sitemap, partage sur les réseaux et Google en dépendent) et republiez.

### Mises à jour suivantes

À chaque `git push` sur la branche principale, Netlify reconstruit et republie le site automatiquement (2–3 minutes).
Sur une autre branche ou une « pull request », Netlify crée un **deploy preview** (adresse de test) sans toucher au site public.

---

## 8. Statistiques de visite (Umami)

Les statistiques utilisent **Umami**, sans cookies (aucun bandeau de consentement nécessaire). Elles sont **désactivées** tant que les deux variables ci-dessous sont vides.

1. Créez un site dans Umami (<https://umami.is>) et notez l'**URL du script** et le **Website ID**.
2. Dans Netlify : **Site configuration → Environment variables**, ajoutez :
   - `PUBLIC_ANALYTICS_UMAMI_SRC` = l'URL du script (ex. `https://cloud.umami.is/script.js`)
   - `PUBLIC_ANALYTICS_UMAMI_ID` = le Website ID
3. Redéployez le site.
4. Mettez à jour la page Confidentialité (« Mesure d'audience activée : oui »).

Pour tester en local : copiez `.env.example` en `.env` et remplissez les deux lignes (le fichier `.env` n'est jamais envoyé sur GitHub).

---

## 9. Les couleurs du site

Le site n'a qu'un seul jeu de couleurs : le thème **A « Chaleureux chic »** (crème, taupe, bordeaux). Les propositions B (« Noir, blanc, or ») et C (« Alpin contemporain ») ont été retirées après le choix du client (06/11/2026).

Toutes les couleurs sont dans `src/styles/tokens.css`, dans le bloc `:root { … }`. Changer une valeur à cet endroit la change sur tout le site. Ne mettez jamais une couleur « en dur » dans un composant.

Pensez à garder des contrastes suffisants (norme WCAG AA) : par exemple, le taupe décoratif (`--color-decor`) n'est jamais utilisé pour du texte courant ; les titres sont en bordeaux (`--color-heading`).

---

## 10. Liste de tout ce qui reste à fournir

État au moment de la livraison. Astuce : dans VS Code, une recherche globale (`Cmd + Maj + F`) sur `À FOURNIR` retrouve tous les emplacements.

### Informations `[À FOURNIR]`

| Information | Fichier |
|---|---|
| Email de contact | `src/config/site.ts` → `email` |
| Numéro WhatsApp | `src/config/site.ts` → `whatsapp` |
| Instagram | `src/config/site.ts` → `social` |
| Description des niveaux autres que le 3e et le 4e | `src/content/chalet.ts` → `knownLevels` |
| Photos manquantes : en-tête Services (`hero/services`), `yoga-01`, `chambre-04`, `chambre-06` (et `jeux-01` si la salle de jeux est confirmée) ; plans `plans/plan-niveau-1` à `plan-niveau-5` | `src/assets/photos/…` ([§ 4](#4-ajouter-ou-remplacer-une-photo)) |
| Mentions légales : date de mise à jour, raison sociale, forme juridique et capital, adresse du siège, SIRET, directeur de publication, contact, adresse de Netlify, crédits photos | `src/content/fr/legal.json` + `en/legal.json` |
| Confidentialité : date de mise à jour, responsable du traitement, garanties du transfert hors UE, durée de conservation, statistiques activées ou non, email pour exercer ses droits | `src/content/fr/privacy.json` + `en/privacy.json` |
| Identifiants Umami (si statistiques souhaitées) | Variables Netlify ([§ 8](#8-statistiques-de-visite-umami)) |
| Prix de chaque semaine, novembre 2026 → avril 2027 ; le prix dépend-il de la formule (Half / Full Catered) ? | `src/content/tarifs.ts` ([§ 5](#5-renseigner-les-informations--à-fournir-)) |

### À confirmer

| Information | Fichier |
|---|---|
| Télécabine de l'Olympe accessible à pied (affiché avec « [À CONFIRMER] ») | `src/content/chalet.ts` → `olympeGondola.toConfirm` (passer à `false` une fois confirmé) |
| Salle de jeux (masquée) | `src/content/chalet.ts` → `confirmed: false` |

### Textes rédigés par Claude (à faire relire par le client, en FR **et** en EN)

| Fichier (`src/content/fr/` et `src/content/en/`) | Rubriques |
|---|---|
| `home.json` | `hero.title` (accroche), `intro.cards` (titres et sous-titres des 4 cartes-photos) |
| `chalet.json` | `hero.title`, `intro.text`, les titres courts `spaces.*.title`, `spaces.pool.text`, `spaces.wellness.text`, `spaces.cinema.text`, `spaces.yoga.text`, `spaces.living.text`, `spaces.rooms.text`, `spaces.games.text` (affiché seulement si la salle de jeux est confirmée), `location.text` |
| `services.json` | `hero.title` |
| `meribel.json` | `hero.title` |
| `contact.json` | `intro`, `offer.title`, `offer.intro` |
| `thanks.json` | `text` |
| `common.json` | `whatsapp.message` (message prérempli envoyé sur WhatsApp) |

---

## 11. Écran d'entrée de la page d'accueil

Sur `/` et `/en/` uniquement, un voile noir (logo, bouton « Enter », choix **Français · English**) s'affiche **une fois par onglet**, avant l'accueil. La page d'accueil complète reste dessous : Google la lit normalement, et sans JavaScript on voit directement l'accueil.

| Pour… | Faire |
|---|---|
| Revoir l'écran (tests) | ajouter `?intro=1` à l'adresse, ex. <http://localhost:4321/?intro=1> ou <http://localhost:4321/en/?intro=1> |
| Le revoir « comme un visiteur » | ouvrir un nouvel onglet en navigation privée |
| Changer ses textes | `src/content/fr/home.json` et `src/content/en/home.json`, bloc `introGate` (« Enter » est identique dans les deux langues) |
| Le désactiver | dans `src/views/HomeView.astro`, retirer le mot `intro` de la ligne `<BaseLayout … hero intro>` |

Fichiers : `src/components/IntroGate.astro` (l'écran), `src/components/IntroGateScript.astro` (le petit script qui l'affiche sans « flash »), `src/scripts/introStorage.ts` (noms des mémoires).

**Mémoires du navigateur utilisées** (ce ne sont pas des cookies, rien n'est envoyé) :
- `chalet-yolo-intro-vue` (mémoire de l'onglet, effacée à sa fermeture) : l'écran a déjà été vu ;
- `chalet-yolo-langue` (mémoire durable) : langue choisie, sur l'écran d'entrée ou avec le sélecteur FR | EN de l'en-tête. Elle sert uniquement à présélectionner la langue sur l'écran d'entrée ; il n'y a **aucune redirection automatique**.

---

## Annexe — vérifications avant publication

- [ ] `npm run build` → « Complete! » sans erreur
- [ ] `npx astro check` → « 0 errors »
- [ ] Plus aucun `TODO-COPY` ni `[À FOURNIR]` visible sur les pages, et textes relus par le client
- [ ] `url` de `src/config/site.ts` = le vrai domaine
- [ ] Formulaire testé sur le site publié (réception de l'email)
- [ ] Lighthouse (Chrome → DevTools → Lighthouse, mode Mobile) sur `npm run preview` : ≥ 90 dans les 4 catégories
