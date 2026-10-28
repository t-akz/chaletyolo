# Chalet Yolo — site vitrine

Site vitrine bilingue (français / anglais) du **Chalet Yolo**, chalet privé à Méribel.

- Site **100 % statique** construit avec [Astro](https://astro.build) et Tailwind CSS.
- Hébergé sur **Netlify**, formulaire de contact via **Netlify Forms**.
- Aucun cookie, polices hébergées sur le site, carte chargée seulement au clic.

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
9. [Les trois thèmes de couleurs](#9-les-trois-thèmes-de-couleurs)
10. [Liste de tout ce qui reste à fournir](#10-liste-de-tout-ce-qui-reste-à-fournir)

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
| Email, WhatsApp, réseaux sociaux, adresse du site, position sur la carte | `src/config/site.ts` |
| La liste des photos et leurs textes alternatifs | `src/content/photos.ts` |
| Les fichiers photo | `src/assets/photos/<dossier>/` |
| Les couleurs | `src/styles/tokens.css` |
| Le favicon (icône de l'onglet) | `public/favicon.svg` |
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
   "title": "TODO-COPY: accroche de la page d'accueil",
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
- Les textes provisoires commencent par `TODO-COPY:` : remplacez la ligne entière (préfixe compris) par le texte définitif.

**Modifier un fait** (nombre de chambres, liste des équipements, services inclus…) : tout est dans `src/content/chalet.ts`, avec le libellé français (`fr:`) et anglais (`en:`) côte à côte. Exemple : `{ fr: 'Sauna', en: 'Sauna' }`.

**La salle de jeux** est masquée partout tant que sa ligne dans `chalet.ts` contient `confirmed: false`. Le jour où elle est confirmée, passez à `confirmed: true` : elle apparaît automatiquement sur la page Le chalet, dans la galerie (catégorie Loisirs) et dans les données pour Google. Pensez alors à remplacer son texte `TODO-COPY` dans `chalet.json` (rubrique `games`).

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
| `hero` | `accueil`, `le-chalet`, `services`, `meribel` | Photo plein écran en haut de chaque page (et image de partage sur les réseaux sociaux) |
| `piscine` | `piscine-01`, `piscine-02` | `piscine-01` : Accueil, Le chalet ; les deux : Galerie |
| `bien-etre` | `bien-etre-01`, `bien-etre-02` | `bien-etre-01` : Accueil, Le chalet ; les deux : Galerie |
| `cinema` | `cinema-01` | Accueil, Le chalet, Galerie |
| `yoga` | `yoga-01` | Le chalet, Galerie |
| `sejour` | `sejour-01` (salon cathédrale), `sejour-02` | `sejour-01` : Accueil, Le chalet ; les deux : Galerie |
| `cuisine` | `cuisine-01` | Accueil, Galerie |
| `chambres` | `chambre-01` à `chambre-06` | Cartes des chambres (Le chalet), Galerie ; `chambre-01` aussi dans la mosaïque de l'accueil |
| `exterieur` | `exterieur-01`, `exterieur-02` | `exterieur-01` : Accueil ; les deux : Galerie |
| `meribel` | `meribel-01`, `meribel-02` | `meribel-01` : Accueil, Méribel ; les deux : Galerie |
| `jeux` | `jeux-01` | Le chalet, Galerie — uniquement si la salle de jeux est confirmée |

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
   | Séjour | `sejour`, `cuisine` |
   | Chambres | `chambres` |
   | Bien-être | `piscine`, `bien-etre` |
   | Loisirs | `cinema`, `yoga`, `jeux` |
   | Extérieur | `exterieur` |
   | Méribel | `meribel` |

> Quand les vraies photos sont en place, relisez les textes alternatifs (`alt`) de `photos.ts` : ils sont aujourd'hui génériques (« Piscine intérieure chauffée ») et gagnent à décrire précisément chaque image.

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
| `social.instagram` / `facebook` / `tiktok` | Adresses complètes des pages | `'https://www.instagram.com/…'` |
| `map.latitude` / `map.longitude` | Position du chalet (nombre décimal, **sans** guillemets) | `latitude: 45.39` |

Pour trouver la position : sur <https://www.openstreetmap.org>, clic droit sur le chalet → « Afficher l'adresse » : les deux nombres affichés sont la latitude puis la longitude.

Une fois renseignés, ces éléments apparaissent automatiquement partout (pied de page, page Contact, bouton WhatsApp, carte de la page Méribel, données pour Google).

### Pages légales

`src/content/fr/legal.json`, `src/content/fr/privacy.json` et leurs versions anglaises : remplacez chaque `[À FOURNIR]` (raison sociale, SIRET, directeur de publication, adresse de Netlify, durée de conservation des données…).

> ⚠️ Ces deux pages sont des **modèles**. Faites-les relire par un professionnel (juriste, expert-comptable) avant la mise en ligne.

### Logo

1. Déposez les fichiers du logo dans `src/assets/logo/` : une version **foncée** et une version **claire** (pour l'en-tête transparent sur photo et pour le thème B).
2. Le logo est aujourd'hui écrit en texte dans `src/components/Logo.astro` : demandez à l'assistant IA de le remplacer par les fichiers image (les instructions sont en commentaire en haut de ce fichier).
3. Remplacez aussi le **favicon provisoire** `public/favicon.svg` (le « Y ») par une version du logo (format SVG carré idéalement, sinon PNG 512 × 512 — dans ce cas, adaptez la ligne `<link rel="icon" …>` de `src/layouts/BaseLayout.astro`).

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
Vérifiez à cette occasion que **toutes les cases « Services souhaités » cochées** apparaissent bien dans la demande reçue.

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

## 9. Les trois thèmes de couleurs

Pour présenter plusieurs ambiances au client, le site a trois jeux de couleurs. **Seules les couleurs changent** : la mise en page, les polices et les textes sont identiques.

| Thème | Nom | Adresse | Usage |
|---|---|---|---|
| **A** | « Chaleureux chic » — crème, taupe, bordeaux | normale, ou `?theme=a` | Thème par défaut, celui que voient les visiteurs |
| **B** | « Noir, blanc, or » — fond noir, titres blancs, accents or | `?theme=b` | Proposition sombre à présenter au client |
| **C** | « Alpin contemporain » — blanc neige, vert sapin, bois clair | `?theme=c` | Proposition claire alternative à présenter au client |

### Voir un thème

Ajoutez `?theme=b` ou `?theme=c` à la fin de n'importe quelle adresse du site, par exemple :

- `http://localhost:4321/?theme=b`
- `https://<votre-domaine>/en/?theme=c`

Le choix est mémorisé **pour l'onglet en cours** (pas de cookie) : vous pouvez ensuite naviguer normalement.
Pour revenir au thème par défaut : ajoutez `?theme=a` à l'adresse, ou fermez l'onglet.

### Où sont les couleurs

Toutes les couleurs sont dans `src/styles/tokens.css`, en trois blocs :

- `:root { … }` → thème A (défaut) ;
- bloc repéré `[THEME-C]`, de `THÈME C — « Alpin contemporain »` à `FIN THÈME C` ;
- bloc repéré `[THEME-B]`, de `THÈME B — « Noir, blanc, or »` à `FIN THÈME B`. Il contient aussi les petits ajustements propres au fond noir (anneau de focus or, sélection de texte, filet sous l'en-tête, contour des images de remplacement).

### Supprimer un thème une fois que le client a choisi

Chaque thème alternatif se supprime **séparément**. Les endroits concernés portent le repère `[THEME-B]` ou `[THEME-C]`.

**Supprimer uniquement le thème B (« Noir, blanc, or »)**

1. `src/styles/tokens.css` : effacez tout le bloc qui commence par `THÈME B — « Noir, blanc, or »` et se termine par `FIN THÈME B`.
2. `src/components/ThemeScript.astro` : dans la ligne `var themes = ['b', 'c'];`, retirez `'b'` → `var themes = ['c'];`.

**Supprimer uniquement le thème C (« Alpin contemporain »)**

1. `src/styles/tokens.css` : effacez tout le bloc qui commence par `THÈME C — « Alpin contemporain »` et se termine par `FIN THÈME C`.
2. `src/components/ThemeScript.astro` : dans la ligne `var themes = ['b', 'c'];`, retirez `'c'` → `var themes = ['b'];`.

**Supprimer les deux (on garde seulement le thème A)**

1. `src/styles/tokens.css` : effacez les blocs B et C (voir ci-dessus).
2. `src/components/ThemeScript.astro` : supprimez ce fichier.
3. `src/layouts/BaseLayout.astro` : supprimez les deux lignes qui mentionnent `ThemeScript` (l'`import` en haut du fichier et la balise `<ThemeScript />` dans `<head>`).

Dans tous les cas, vérifiez ensuite avec `npm run build` puis `npx astro check` : aucune erreur ne doit apparaître.

> **Si le client choisit B ou C comme thème par défaut** : recopiez les valeurs de son bloc dans le bloc `:root` du thème A (même fichier). Pour B, déplacez aussi ses « ajustements propres au fond sombre » en retirant le préfixe `:root[data-theme='b']`. Supprimez ensuite les thèmes alternatifs comme ci-dessus, et mettez à jour le §5 de `CLAUDE.md`.

---

## 10. Liste de tout ce qui reste à fournir

État au moment de la livraison. Astuce : dans VS Code, une recherche globale (`Cmd + Maj + F`) sur `À FOURNIR` ou `TODO-COPY` retrouve tous les emplacements.

### Informations `[À FOURNIR]`

| Information | Fichier |
|---|---|
| Adresse du site (domaine) — actuellement `https://a-fournir.example` | `src/config/site.ts` → `url` |
| Email de contact | `src/config/site.ts` → `email` |
| Numéro WhatsApp | `src/config/site.ts` → `whatsapp` |
| Instagram, Facebook, TikTok | `src/config/site.ts` → `social` |
| Position GPS du chalet (carte) | `src/config/site.ts` → `map` |
| Description des niveaux autres que le 3e et le 4e | `src/content/chalet.ts` → `knownLevels` |
| Logo (versions foncée et claire) + favicon définitif | `src/assets/logo/`, `public/favicon.svg` |
| Toutes les photos | `src/assets/photos/…` ([§ 4](#4-ajouter-ou-remplacer-une-photo)) |
| Mentions légales : date de mise à jour, raison sociale, forme juridique et capital, adresse du siège, SIRET, directeur de publication, contact, adresse de Netlify, crédits photos | `src/content/fr/legal.json` + `en/legal.json` |
| Confidentialité : date de mise à jour, responsable du traitement, garanties du transfert hors UE, durée de conservation, statistiques activées ou non, email pour exercer ses droits | `src/content/fr/privacy.json` + `en/privacy.json` |
| Identifiants Umami (si statistiques souhaitées) | Variables Netlify ([§ 8](#8-statistiques-de-visite-umami)) |

### À confirmer

| Information | Fichier |
|---|---|
| Télécabine de l'Olympe accessible à pied (affiché avec « [À CONFIRMER] ») | `src/content/chalet.ts` → `olympeGondola.toConfirm` (passer à `false` une fois confirmé) |
| Salle de jeux (masquée) | `src/content/chalet.ts` → `confirmed: false` |
| Liste complète des activités d'hiver (la page Méribel n'affiche pour l'instant que des faits existants : ski, navette, télécabine, casier à skis) | `src/views/MeribelView.astro` + `src/content/chalet.ts` |

### Textes provisoires `TODO-COPY` (à remplacer en FR **et** en EN)

| Fichier (`src/content/fr/` et `src/content/en/`) | Rubriques |
|---|---|
| `home.json` | `hero.title` (accroche), `intro.text`, `features.pool.text`, `features.wellness.text`, `features.cinema.text`, `features.livingRoom.text` |
| `chalet.json` | `hero.title`, `spaces.pool.text`, `spaces.wellness.text`, `spaces.cinema.text`, `spaces.yoga.text`, `spaces.living.text`, `spaces.games.text` (affiché seulement si la salle de jeux est confirmée) |
| `services.json` | `hero.title` |
| `meribel.json` | `hero.title` |
| `contact.json` | `intro` |
| `thanks.json` | `text` |
| `common.json` | `whatsapp.message` (message prérempli envoyé sur WhatsApp — le préfixe `TODO-COPY:` apparaît aussi dans WhatsApp tant qu'il n'est pas retiré) |

---

## Annexe — vérifications avant publication

- [ ] `npm run build` → « Complete! » sans erreur
- [ ] `npx astro check` → « 0 errors »
- [ ] Plus aucun `TODO-COPY` ni `[À FOURNIR]` visible sur les pages
- [ ] `url` de `src/config/site.ts` = le vrai domaine
- [ ] Formulaire testé sur le site publié (réception de l'email)
- [ ] Lighthouse (Chrome → DevTools → Lighthouse, mode Mobile) sur `npm run preview` : ≥ 90 dans les 4 catégories
