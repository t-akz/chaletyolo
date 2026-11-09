# Chalet Yolo — site vitrine

Site vitrine bilingue (français / anglais) du **Chalet Yolo**, chalet privé à Méribel.

- Site **100 % statique** construit avec [Astro](https://astro.build) et Tailwind CSS.
- Hébergé sur **Netlify**, formulaire de contact via **Netlify Forms**.
- Aucun cookie, polices hébergées sur le site. Une seule carte interactive (page Le chalet, MapLibre + OpenFreeMap, sans cookie).

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
12. [Admin des tarifs (page Offre & Contact)](#12-admin-des-tarifs-page-offre--contact)

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
| Les faits sur le chalet (chiffres, chambres, équipements phares, formules) | `src/content/chalet.ts` |
| Email, WhatsApp, réseaux sociaux, adresse du site | `src/config/site.ts` |
| La liste des photos et leurs textes alternatifs | `src/content/photos.ts` |
| Les fichiers photo | `src/assets/photos/<dossier>/` |
| Les couleurs | `src/styles/tokens.css` |
| Le logo / le favicon (icône de l'onglet) | `src/assets/logo/logo-yolo.svg` / `public/favicon.svg` |
| Les adresses des pages | `src/i18n/routes.ts` (+ renommer le fichier dans `src/pages/`) |
| Les tarifs (prix, semaines réservées, mentions, mois) | **Admin `/admin/`** sur le site en ligne ([§ 12](#12-admin-des-tarifs-page-offre--contact)) — plus dans le code |
| Les textes de l'admin (français uniquement) | `src/content/fr/admin.json` |

Correspondance fichiers de textes ↔ pages :

| Fichier | Page |
|---|---|
| `home.json` | Accueil |
| `chalet.json` | Le chalet |
| `services.json` | Services |
| `meribel.json` | Méribel |
| `gallery.json` | Galerie |
| `contact.json` | Offre & Contact (onglets, cartes de l'offre, et tous les libellés et messages d'erreur du formulaire) |
| `admin.json` | Admin des tarifs — **français uniquement** (pas de version `en/`) |
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
   "title": "La montagne autrement.",
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

**Modifier un fait** (nombre de chambres, équipements phares, formules…) : dans `src/content/chalet.ts`, avec le libellé français (`fr:`) et anglais (`en:`) côte à côte. Exemple : `{ fr: 'Sauna', en: 'Sauna' }`. Ces faits alimentent les chiffres clés, la galerie et les données lues par Google.

**Les deux tableaux de la page Services** (« Prestations » et « Facilities ») : toutes leurs lignes sont dans `src/content/fr/services.json` (et `en/services.json`) → `offer.services` et `offer.facilities`, une ligne par élément, dans l'ordre d'affichage. Ajoutez, retirez ou réordonnez librement (pensez à la virgule entre deux lignes, pas après la dernière). Attention : ces listes sont indépendantes de `chalet.ts`. Si vous ajoutez un **équipement** au tableau « Facilities », ajoutez-le aussi dans `chalet.ts` (équipements phares) pour que Google le voie, et inversement.

**La salle de jeux** est masquée partout tant que sa ligne dans `chalet.ts` contient `confirmed: false`. Le jour où elle est confirmée, passez à `confirmed: true` : elle apparaît automatiquement dans la galerie (catégorie Loisirs) et dans les données pour Google ; ajoutez alors aussi sa ligne dans le tableau « Facilities » (`services.json` → `offer.facilities`). (Sa colonne dans l'accordéon de la page Le chalet a été retirée le 09/11/2026 : il faudrait la recréer.)

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
| `plans` | Plus rien à fournir (les 4 niveaux sont des dessins SVG : `public/plans/niveau-X.svg` + étiquettes dans `src/data/plans.ts`) | Section « Floor Plans » de la page Le chalet uniquement (jamais dans la Galerie). Les plans sont affichés en entier sur fond blanc, sans être rognés : un format paysage d'environ 4:3 est idéal (PNG ou JPG, ≥ 1600 px de large) |

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

> **Position du chalet sur la carte** (page Le chalet) : coordonnées dans `src/content/chalet.ts` → `chaletLocation` (`lat` = latitude, `lng` = longitude). Pour déplacer la tête d'ours : dans Google Maps, clic droit sur l'endroit voulu, cliquez sur les deux nombres affichés (ils sont copiés), puis remplacez les deux valeurs. Le niveau de zoom de départ (`zoom: 13.5`) se règle dans `src/scripts/chaletMap.ts`. Les textes de la carte (libellés pour l'accessibilité, messages d'aide) sont dans `src/content/{fr,en}/chalet.json` → `location.map`.
>
> En dehors de cette carte, la position exacte n'est indiquée nulle part (pas d'adresse précise). La page Méribel propose un lien Google Maps vers le **quartier** de La Gittaz (adresse du lien : `src/views/MeribelView.astro`, texte : `src/content/{fr,en}/meribel.json` → `resort.location`).

### Tarifs à la semaine (page Offre & Contact)

Les prix, semaines réservées, mentions spéciales et mois se gèrent depuis l'**admin** `/admin/` du site en ligne, sans toucher au code : voir [§ 12](#12-admin-des-tarifs-page-offre--contact).

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
5. Mettez en place l'admin des tarifs ([§ 12](#12-admin-des-tarifs-page-offre--contact), « Mise en place »).
6. **Nom de domaine** : Domain management → Add a domain, puis suivez les instructions. Ensuite, mettez cette adresse dans `url` de `src/config/site.ts` (sitemap, partage sur les réseaux et Google en dépendent) et republiez.

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
| Numéro WhatsApp | `src/config/site.ts` → `whatsapp` |
| Instagram | `src/config/site.ts` → `social` |
| Photos manquantes : en-tête Services (`hero/services`), `yoga-01`, `chambre-04`, `chambre-06` (et `jeux-01` si la salle de jeux est confirmée) | `src/assets/photos/…` ([§ 4](#4-ajouter-ou-remplacer-une-photo)) |
| Mentions légales : date de mise à jour, raison sociale, forme juridique et capital, adresse du siège, SIRET, directeur de publication, contact, adresse de Netlify, crédits photos | `src/content/fr/legal.json` + `en/legal.json` |
| Confidentialité : date de mise à jour, responsable du traitement, garanties du transfert hors UE, durée de conservation, statistiques activées ou non, email pour exercer ses droits | `src/content/fr/privacy.json` + `en/privacy.json` |
| Identifiants Umami (si statistiques souhaitées) | Variables Netlify ([§ 8](#8-statistiques-de-visite-umami)) |
| Prix de chaque semaine, novembre 2026 → avril 2027 ; le prix dépend-il de la formule (Half / Full Catered) ? | Admin `/admin/` ([§ 12](#12-admin-des-tarifs-page-offre--contact)) |

### À confirmer

| Information | Fichier |
|---|---|
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

## 12. Admin des tarifs (page Offre & Contact)

L'équipe gère elle-même les cartes de l'onglet **Offre** depuis la page **`/admin/`** du site (ex. `https://www.chalet-yolo.com/admin/`) : aucune modification de code, aucun compte GitHub.

### Ce que l'on peut faire

- **Mois** : « Ajouter un mois » (toutes ses semaines, du samedi au samedi, sont créées automatiquement) ou « Retirer ce mois » (avec confirmation).
- **Pour chaque semaine** :
  - **prix total** en euros, chiffres seuls (ex. `18500`) ; le prix par nuit (÷ 7) se calcule tout seul ; laissé vide → la carte affiche « [À FOURNIR] » ;
  - **Réservée** : la carte devient grise, affiche « Réservée » / « Booked », sans prix ni lien « Réserver » ;
  - **mention spéciale** facultative (« Promo », « Exclu web »…) : 25 caractères maximum, **en français ET en anglais**.
- **Enregistrer et publier** : les données sont vérifiées, enregistrées, et le site en ligne est **à jour 1 à 2 minutes plus tard** (Netlify reconstruit le site).

> La page d'admin n'est pas référencée par Google et n'est liée nulle part sur le site. Seules les personnes qui ont le mot de passe peuvent y entrer.

### Comment ça marche (en bref)

```
/admin/ (navigateur) ──► fonctions Netlify (/api/admin/…) ──► stockage Netlify Blobs
                                    │
                                    └──► « build hook » : Netlify reconstruit le site avec les nouveaux tarifs
```

- Fonctions : `netlify/functions/admin-login.mts` (connexion) et `admin-tarifs.mts` (lecture, enregistrement, publication) ; connexion et jeton : `netlify/lib/admin-auth.ts`.
- Stockage : `src/content/tarifs-store.ts`. Règles de vérification (communes au site, à l'admin et au serveur) : `src/content/tarifs.ts`.
- Les **pages publiques restent 100 % statiques** : les tarifs sont lus au moment de la construction du site.
- `src/content/tarifs.json` ne sert que de **données de départ** (en local, et tant que l'admin n'a jamais été utilisé). **Après le premier enregistrement, modifier ce fichier n'a plus d'effet sur le site en ligne** : tout passe par l'admin. Les tarifs ne sont donc pas dans GitHub : pas besoin de `git pull` après une modification de l'équipe.

### Mise en place (une seule fois)

Dans Netlify, ouvrez le site puis **Site configuration → Environment variables → Add a variable** :

| Variable | Valeur | Remarques |
|---|---|---|
| `ADMIN_PASSWORD` | Le mot de passe de l'équipe, **12 caractères minimum** | À transmettre uniquement aux personnes concernées. |
| `ADMIN_SECRET` | Une clé aléatoire de **32 caractères minimum** | Générez-la dans un terminal : `openssl rand -base64 48`. Personne n'a besoin de la connaître. |
| `BUILD_HOOK_URL` | L'adresse du « build hook » (ci-dessous) | Permet à l'admin de republier le site. |

**Créer le build hook** : **Site configuration → Build & deploy → Continuous deployment → Build hooks → Add build hook**, nom « Admin des tarifs », branche `main`. Copiez l'adresse obtenue (`https://api.netlify.com/build_hooks/…`) dans `BUILD_HOOK_URL`.

Puis **redéployez** le site (**Deploys → Trigger deploy → Deploy site**) pour que les variables soient prises en compte.

> **Si le déploiement échoue** avec le message « Tarifs : impossible de lire les données de l’admin (Netlify Blobs) pendant la construction » : créez un jeton personnel (**avatar → User settings → Applications → Personal access tokens → New access token**) et ajoutez-le dans la variable `NETLIFY_BLOBS_TOKEN`, puis redéployez. Ce jeton donne accès à votre compte Netlify : ne le partagez jamais. (Le site s'arrête volontairement plutôt que de publier d'anciens prix.)

### Tester sans risque (deploy preview)

Sur un **deploy preview** (adresse de test d'une branche ou d'une pull request), l'admin enregistre dans un **stockage de test séparé** (« tarifs-apercu ») et **ne republie pas** le site en ligne. Le bandeau de l'admin indique « Aperçu de test ». Pour voir l'effet sur les cartes de l'aperçu, relancez son déploiement (**Deploys → le deploy preview → Retry deploy**).

Les variables `ADMIN_PASSWORD` et `ADMIN_SECRET` doivent aussi s'appliquer aux deploy previews (c'est le cas par défaut : « All deploy contexts »).

> En local (`npm run dev`), l'admin affiche l'écran de connexion mais **ne peut pas fonctionner** (« Connexion impossible… ») : les fonctions et le stockage n'existent que chez Netlify.

### Sécurité

- **Changer le mot de passe** : modifiez `ADMIN_PASSWORD` puis redéployez.
- **Déconnecter tout le monde immédiatement** (ex. mot de passe divulgué) : modifiez `ADMIN_SECRET` puis redéployez.
- Une connexion dure **8 heures** et ne survit pas à la fermeture de l'onglet. **Aucun cookie** n'est utilisé.
- Après un mauvais mot de passe, la réponse est volontairement ralentie (1,5 s).
- Toutes les données sont revérifiées côté serveur : un prix incohérent ou une date qui n'est pas un samedi sont refusés.

### En cas de problème

| Message de l'admin | Que faire |
|---|---|
| « Admin non configurée : ADMIN_PASSWORD… » | Renseignez `ADMIN_PASSWORD` et `ADMIN_SECRET` (longueurs minimales), puis redéployez. |
| « Mot de passe incorrect. » | Vérifiez le mot de passe (majuscules, espaces). |
| « Connexion impossible… » | Pas d'accès Internet, ou page ouverte en local (`npm run dev`). |
| « Votre session a expiré » | Reconnectez-vous : les modifications en cours sont conservées. |
| « Enregistré, mais la mise à jour du site en ligne n'a pas pu être lancée » | Vérifiez `BUILD_HOOK_URL` (build hook supprimé ?). Les données sont bien enregistrées : un redéploiement manuel les publiera. |
| « Le stockage Netlify ne répond pas » | Réessayez quelques minutes plus tard ; si cela persiste, consultez les journaux des fonctions (**Logs → Functions**). |
| « Enregistrement impossible : … » | Le message indique la semaine et le problème (prix à virgule, mention sans traduction…) : corrigez puis réenregistrez. |

---

## Annexe — vérifications avant publication

- [ ] `npm run build` → « Complete! » sans erreur
- [ ] `npx astro check` → « 0 errors »
- [ ] Plus aucun `TODO-COPY` ni `[À FOURNIR]` visible sur les pages, et textes relus par le client
- [ ] `url` de `src/config/site.ts` = le vrai domaine
- [ ] Formulaire testé sur le site publié (réception de l'email)
- [ ] Admin des tarifs : variables Netlify en place, connexion testée, une publication réussie ([§ 12](#12-admin-des-tarifs-page-offre--contact))
- [ ] Lighthouse (Chrome → DevTools → Lighthouse, mode Mobile) sur `npm run preview` : ≥ 90 dans les 4 catégories
