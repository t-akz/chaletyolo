# CLAUDE.md — Site vitrine Chalet Yolo (Méribel)

Ce fichier est la **mémoire permanente du projet**. Lis-le en entier au début de chaque session.
Les éléments entre crochets `[...]` sont des valeurs à fournir plus tard : **ne jamais les inventer**.

---

## 1. Règles de travail (prioritaires)

1. **Plan d'abord.** Pour toute tâche de plus d'un fichier, présente un plan (fichiers créés/modifiés, approche) et **attends ma validation** avant d'écrire du code.
2. **Compte rendu à chaque étape**, en français simple :
   - ce qui a été fait, expliqué sans jargon (et les termes techniques expliqués) ;
   - un « avant / après » ;
   - fichiers créés/modifiés **et** composants impactés en aval ;
   - la **checklist de preview** (voir §2) adaptée à ce qui vient d'être fait.
3. **N'invente aucun fait** sur le chalet (équipements, distances, services, avis, prix). Source unique : §8. Si une info manque → marqueur visible `[À FOURNIR]`.
4. **Textes éditoriaux** : rédigés par Claude à la demande du client (01/11/2026), ton luxe et contemporain, **à faire relire par le client avant la mise en ligne**. Ils ne contiennent que des faits du §8. Tout nouveau texte suit la même règle ; s'il n'est pas encore rédigé, texte provisoire préfixé `TODO-COPY:`.
5. **Ambiguïté → pose la question** (une à la fois) plutôt que de supposer.
6. **Git** : le dépôt existe déjà (branche `main`, dépôt distant `origin` = GitHub). Ne refais pas `git init`. Un commit par étape **validée par moi**, message clair en français (ex. `feat: page d'accueil FR/EN`). Ne jamais réécrire l'historique. **Le push vers GitHub, c'est moi qui le fais.**
7. **Interdits sans mon accord explicite** :
   - ajouter une dépendance hors stack (§3) ;
   - installer quoi que ce soit en global ;
   - déployer, se connecter à Netlify ou pousser sur un dépôt distant ;
   - modifier les données factuelles du §8 ou les tokens du §5 ;
   - supprimer des fichiers en dehors de ceux que tu as créés dans l'étape en cours.

---

## 2. Preview : c'est moi qui la fais en local

- **Ne lance pas** le serveur de développement toi-même (ni en arrière-plan). Je le lance avec `npm run dev`.
- Toi, avant chaque compte rendu, tu **dois** exécuter et faire passer :
  - `npm run build` (aucune erreur, aucun warning nouveau) ;
  - `npx astro check` (aucune erreur de types).
- À la fin de chaque étape, donne-moi une **checklist de preview** courte et concrète :
  - les **URL locales** à ouvrir (ex. `http://localhost:4321/`, `http://localhost:4321/en/`) ;
  - ce que je dois regarder sur chaque page (ex. « l'en-tête devient crème au scroll », « la lightbox se ferme avec Échap ») ;
  - les largeurs à tester dans les DevTools : 390 px (mobile), 768 px (tablette), 1440 px (desktop).
- J'enverrai mes retours (texte et/ou captures). Corrige, puis redonne une checklist ciblée sur les corrections.
- Netlify Forms **ne fonctionne pas en local** : en local on vérifie uniquement l'affichage et la validation des champs. L'envoi réel se teste sur le deploy preview Netlify.

---

## 3. Stack technique (imposée)

| Brique | Choix |
|---|---|
| Framework | **Astro** (dernière version stable), sortie **100 % statique** |
| Langage | TypeScript (mode strict) |
| Style | **Tailwind CSS**, couleurs/typos pilotées par **variables CSS** (design tokens, §5) |
| i18n | Routage i18n natif d'Astro : FR à la racine (`/`), EN sous `/en/` |
| Images | `astro:assets` (`<Image>` / `<Picture>`), AVIF + WebP, tailles responsive, lazy-loading (sauf hero) |
| Polices | Auto-hébergées via `@fontsource` (pas de Google Fonts en CDN — RGPD) |
| Icônes | Lucide (trait fin), pas d'émojis |
| Hébergement | **Netlify** (`netlify.toml`). Domaine et emails chez OVH (DNS géré chez OVH, pointé vers Netlify). |
| Formulaire | **Netlify Forms** |
| Statistiques | Plausible ou Umami (sans cookies), injecté seulement si `PUBLIC_ANALYTICS_*` est défini dans `.env` |
| SEO | `@astrojs/sitemap`, meta/OG, `hreflang`, JSON-LD |
| JavaScript | Strict minimum (vanilla / scripts Astro). Pas de React/Vue/Svelte |

Pas de base de données, pas de CMS, pas de dépendance superflue.

---

## 4. Arborescence

### Pages
```
FR                     EN
/                      /en/
/le-chalet             /en/the-chalet
/services              /en/services
/meribel               /en/meribel
/galerie               /en/gallery
/contact               /en/contact
/merci                 /en/thank-you
/mentions-legales      /en/legal-notice
/confidentialite       /en/privacy
/404
```
Le sélecteur de langue renvoie vers **la page équivalente** (table de correspondance des routes centralisée).

### Code
```
src/
  config/site.ts          → nom, domaine, email, WhatsApp, réseaux, analytics (toutes les valeurs [À FOURNIR] ici)
  content/chalet.ts       → données factuelles du §8, typées, libellés FR/EN
  content/tarifs.ts       → semaines (samedi → samedi) et prix de la page Offre & Contact (§8 « Tarifs »)
  content/fr/*.json       → textes FR par page
  content/en/*.json       → textes EN par page
  i18n/                   → utilitaires de langue + table des routes
  styles/tokens.css       → tokens du thème A (seul thème)
  components/             → composants (§5.6)
  layouts/BaseLayout.astro
  pages/                  → pages FR + pages/en/
  assets/logo/
  assets/photos/{hero,sejour,cuisine,chambres,piscine,bien-etre,cinema,yoga,jeux,exterieur,meribel}/
```
**Aucun texte affiché en dur dans les composants** : tout passe par `content/`.

---

## 5. Design system

### 5.1 Principes
- Photos **plein écran**, beaucoup d'espace vide, mise en page éditoriale (inspiration : No.14 Verbier — https://www.no14verbier.com/).
- Textes courts : **2–3 lignes max** par bloc, **alignés à gauche** (jamais justifiés).
- **Un seul style de bouton principal** (« Nous contacter »). Les autres actions = liens texte discrets (souligné fin + flèche).
- Animations **lentes et discrètes** (fondu + léger glissement au scroll), `prefers-reduced-motion` respecté. **Pas de carrousel automatique.**
- **Mobile-first**. Contrastes **WCAG AA**.

### 5.2 Thème A — « Chaleureux chic » (seul thème du site)
Les propositions B « Noir, blanc, or » et C « Alpin contemporain » ont été **retirées** : thème A retenu par le client le 06/11/2026. Ne pas les recréer sans demande.

| Token | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#F7F2EA` | Fond principal (crème) |
| `--color-bg-alt` | `#FFFDF9` | Sections alternées |
| `--color-accent-soft` | `#D4B5A3` | Footer, blocs d'accent (nude) |
| `--color-heading` | `var(--color-primary)` = `#6E2A35` | Titres (bordeaux, choix du client du 08/11/2026 ; auparavant taupe `#8B6A55`) |
| `--color-decor` | `#8B6A55` | Taupe des éléments décoratifs : icônes, têtes d'ours, tirets de liste (jamais pour du texte courant) |
| `--color-text` | `#2B2B2B` | Texte courant |
| `--color-primary` | `#6E2A35` | Bouton principal (bordeaux), texte blanc |
| `--color-primary-hover` | bordeaux légèrement plus foncé | Survol |

### 5.3 Token `--color-accent`
Utilisé pour les sur-titres, liens et filets. Sa valeur reproduit la couleur du texte courant (`--color-text`).

### 5.4 Typographie
Police **unique : Raleway** (`@fontsource-variable/raleway`, auto-hébergée), choix du client du 06/11/2026 (Cormorant Garamond retiré ; Manrope gardé uniquement pour les sur-titres).
- **Titres** (h1, h2, h3, chiffres clés, titres de l'accordéon) : **Bold** (700), bordeaux `--color-heading` (sauf sur photo : blanc).
- **Titres des hero** (toutes les pages) : Bold, taille `text-display` ≈ 37 → 85 px — référence : hero de l'accueil.
- **Sur-titres** (tout le site, hero compris) : **Manrope semi-gras (600), 16 px**, majuscules, `letter-spacing` 0.2em (utilitaire `eyebrow`, police `@fontsource-variable/manrope`). Modèle validé par le client : le sur-titre du hero de l'accueil — **ne pas le modifier**.
- **Texte courant** : Regular (400). **Grands textes d'accroche** (≥ 24 px) : Thin (100). Jamais de Thin pour du texte courant (lisibilité).
- **Interface** (menu, boutons, sélecteur de langue, champs) : graisses moyennes (500–600) pour la lisibilité ; liens du menu plein écran en Light (300), en **majuscules** et en **bordeaux** (`--color-heading`).
- **En-tête** (08/11/2026) : bouton « Nous contacter » en **majuscules** (13 px sur mobile, 15 px dès 640 px) ; sélecteur FR | EN 13 px, dans le menu plein écran.
- Échelle fluide (`clamp()`).

### 5.5 Logo
Logo existant (ourson + « Chalet Yolo / MERIBEL ») : `src/assets/logo/[LOGO_FICHIER]`. En attendant, texte « Chalet Yolo ». Prévoir une variante claire pour l'en-tête transparent.

### 5.6 Composants
- `Header` : transparent sur le hero, fond `--color-bg` + légère ombre au scroll. **Sur toutes les largeurs** (choix du client du 08/11/2026) : logo à gauche ; à droite le bouton « Nous contacter » puis, tout à droite, le bouton menu (burger). Le menu (Le chalet, Services, Méribel, Galerie, Contact) est **toujours replié** dans un menu plein écran, avec le sélecteur **FR | EN** en haut (à côté du bouton de fermeture).
- `Hero` : image plein écran (`100svh`), voile sombre léger, accroche + sous-titre + bouton. Option **vidéo de fond** (mp4 muet en boucle + image de repli) activable plus tard.
- `HeroReveal` : hero de l'accueil à deux photos ; la scène reste en place pendant un écran de défilement et la seconde photo monte comme un rideau (fondu si animations réduites, photo seule sans JavaScript). L'en-tête reste transparent tant que la scène est en place ; quand elle remonte, il devient crème et le titre + bouton s'effacent (aucun texte sous l'en-tête).
- `KeyFigures`, `FeatureSection` (photo + texte, alternance gauche/droite), `ServiceList`, `CTASection`, `Accordion`.
- `ServiceTables` : page Services, deux cadres arrondis côte à côte (empilés sur mobile), titre en haut séparé par un filet, lignes **centrées** séparées par la tête d'ourson du logo (`assets/logo/ourson.svg`) (exception au §5.1 validée par le client le 08/11/2026).
- `SpaceColumns` : accordéon de photos de la page Le chalet. Ordinateur (≥ 1024 px) : colonnes côte à côte, titre vertical ; celle survolée ou cliquée s'élargit et montre son texte (toujours une ouverte). Mobile/tablette : bandes empilées qui s'ouvrent vers le bas. Sans JavaScript : tout est affiché.
- `FloorPlans` : grille des plans par niveau (affichés en entier sur fond blanc, jamais rognés ; hors galerie).
- `Gallery` : mosaïque + **lightbox** (clic, clavier, Échap).
- `WhatsAppButton` : flottant bas-droite, `https://wa.me/[WHATSAPP_NUMBER]` + message prérempli FR/EN.
- `Footer` : fond `--color-accent-soft`, liens légaux, Instagram (bloc « Nous suivre » ; Facebook et TikTok retirés par le client le 02/11/2026), email, « Méribel, 73550 ».
- `ContactForm` : §7.
- `PageTabs` : onglets de page (Offre & Contact). Les en-têtes servent de switcher ; trait bordeaux qui glisse sous l'onglet choisi ; contenu en fondu + léger glissement dans le sens du changement (instantané si animations réduites) ; flèches du clavier ; `#id` dans l'adresse ouvre l'onglet (`/contact/#demande`). Sans JavaScript : panneaux l'un sous l'autre.
- `WeekAccordion` : onglet Offre. Accordéon des mois (même fonctionnement que `SpaceColumns`, sans photos : volets côte à côte avec mois à la verticale sur ordinateur ≥ 1024 px, bandes empilées sur mobile/tablette ; ouvert au chargement : le mois en cours, sinon le premier). Une carte par semaine (petite tête d'ours bordeaux dans le coin haut droit) : date d'arrivée puis, **en dessous**, date de départ (samedi → samedi), prix total, et en petit le prix par nuit (total ÷ 7, arrondi). Prix manquant → `[À FOURNIR]`.
- `IntroGate` : écran d'entrée de la page d'accueil, voir §5.8.

### 5.7 Localisation du chalet
- **Confidentialité** : on montre **uniquement le quartier de La Gittaz**, jamais l'emplacement exact du chalet (pas de point, d'adresse précise ni de coordonnées du chalet, nulle part dans le code ni dans les données structurées).
- **Rendu actuel** : sur la page Méribel, section « La station », la phrase « Le chalet se trouve dans le fabuleux quartier La Gittaz. » ; « La Gittaz » est un lien vers `https://www.google.com/maps/search/?api=1&query=La+Gittaz%2C+M%C3%A9ribel` (nouvel onglet).
- Une carte SVG générée depuis OpenStreetMap a été essayée puis **écartée par le client** (02/11/2026) : ne pas la recréer sans demande.

### 5.8 Écran d'entrée (`IntroGate`)
- **Où** : uniquement sur les pages d'accueil `/` et `/en/`. Jamais sur les autres pages (liens directs depuis Google, WhatsApp, etc.).
- **Quand** : **une fois par session, toutes langues confondues** (clé `sessionStorage` commune). Forçable pour les tests avec `?intro=1`.
- **Nature** : un **voile posé au-dessus de la page d'accueil**, qui reste entièrement rendue en dessous (référencement). Le voile n'apparaît que si JavaScript est actif (classe ajoutée par un script inline dans `<head>`, sans flash) ; sans JavaScript, on voit directement l'accueil.
- **Contenu** : fond **bordeaux `#6E2A35`** (en test depuis le 06/11/2026, auparavant noir `#000000` ; couleurs fixes, propres à cet écran), variante claire du logo (le vrai logo, qui contient déjà « MERIBEL » : pas de second « MÉRIBEL », décision du client du 05/11/2026), bouton **« Enter »** (identique en FR et EN), sélecteur discret **Français · English**, petite flèche vers le bas qui rebondit doucement. Couleurs du texte et des traits : blanc cassé `#F2EEE8`. Style : épuré, luxueux, beaucoup d'espace.
- **Ouverture** : clic sur « Enter », touches Entrée / Espace / flèche bas / Page bas, molette ou trackpad **vers le haut ou le bas**, glissement tactile vers le haut ou le bas. Transition « rideau qui se lève » (~0,9 s). Avec `prefers-reduced-motion` : simple fondu court, flèche immobile.
- **Pas d'emballement** : pendant l'écran d'entrée, la page dessous ne défile pas ; après ouverture, l'élan du geste est neutralisé (~0,8 s) et l'accueil commence tout en haut.
- **Langue** : présélection = choix mémorisé (`localStorage`) sinon langue du navigateur (`fr*` → Français, sinon English). Si la langue choisie diffère de la page actuelle, « Enter » mène à l'accueil équivalent (`/` ↔ `/en/`) **sans réafficher l'écran**. Le choix est mémorisé ; le sélecteur de langue de l'en-tête le met aussi à jour. **Aucune redirection automatique** nulle part, aucun cookie.
- **Accessibilité** : focus sur « Enter » à l'affichage, page dessous inactive (`inert`) tant que l'écran est visible, focus rendu à la page après ouverture, libellés FR/EN dans `content/`.
- Conserver les paramètres d'URL (ex. `?utm_source=…`) lors du changement de langue.

---

## 6. Contenu des pages

**Ton** : sobre et factuel (titres, chiffres, descriptions) + **une seule accroche complice par page max** (jeu possible sur « Yolo »). **Vouvoiement** en français.

- **Accueil** (refonte du 06/11/2026, 4 sections) : Hero animé « rideau au défilement » (photo du chalet `hero/accueil` — retouchée : tuyau gris effacé —, puis `piscine-03` qui monte au scroll ; accroche « Méribel, à votre rythme. » / « Méribel, at your own pace. », sur-titre-mot-clé dans le `<h1>` « Chalet de luxe avec chef · Méribel » / « Luxury Catered Chalet · Méribel », bouton) → 4 cartes-photos cliquables (`ImageLinkCards` : Le Chalet → `sejour-02` → Le chalet ; Services → `cuisine-01` → Services ; Méribel → `meribel-03` → Méribel ; Offre & Contact → `piscine-02` → Contact ; titre + court sous-titre factuel sur la photo) → mosaïque 8 photos + lien Galerie → CTA « Parlons de votre séjour » + WhatsApp. (Chiffres clés, équipements phares, services et aperçu Méribel retirés à la demande du client.)
- **Le chalet** (refonte du 06/11/2026, 5 sections) : Hero (`le-chalet-01`) → intro (court texte + 4 chiffres clés) → colonnes d'espaces `SpaceColumns` (piscine · bien-être & spa · home cinéma · yoga · salon & cuisine · salle de jeux **seulement si `confirmed: true`** · chambres & suites ; photo + titre court + texte) → « Floor Plans » `FloorPlans` (un plan par niveau, `photos/plans/plan-niveau-1…5`, aplats tant que les fichiers manquent ; titre FR « Plans du chalet ») → Localisation **provisoire, à retravailler** (phrase + lien Google Maps vers le quartier de La Gittaz, §5.7, et cadre « Carte à venir »). (Cartes chambres, visite par niveau, « Tous les équipements » et CTA retirés à la demande du client ; composants conservés.)
- **Services** (refonte du 08/11/2026, 3 sections) : Hero (inchangé) → « Prestations & Facilities » / « Services & Facilities » (`ServiceTables` : cadre « Prestations » = formules, chef privé, majordome, chauffeur, navette, conciergerie, ménage quotidien, linge, ménage de fin de séjour ; cadre « Facilities » = chambres + équipements phares confirmés) → CTA « Parlons de votre séjour ». (Sections Gastronomie, Inclus et À la carte retirées à la demande du client ; données conservées dans `chalet.ts`.)
- **Méribel** : Hero → la station (+ phrase avec lien Google Maps vers le quartier de La Gittaz, voir §5.7) → activités d'hiver (icônes) → CTA. (La section « Accès » a été retirée volontairement : ne pas la recréer. Section « Localisation » / carte retirée à la demande du client le 02/11/2026.)
- **Galerie** : filtres (Tout · Séjour · Chambres · Bien-être · Loisirs · Extérieur · Méribel) + mosaïque + lightbox.
- **Offre & Contact** (route `contact`, refonte du 08/11/2026) : titre de page caché `<h1>` « Offre & Contact » + deux onglets `PageTabs` :
  1. **Offre** (`#offre`, ouvert par défaut) : « Saison 2026 – 2027 » + 1 ligne d'intro, puis `WeekAccordion` (novembre 2026 → avril 2027 inclus).
  2. **Contact** (`#demande`) : l'ancienne page Contact, inchangée : titre, 1 ligne d'intro, formulaire, bloc « Ou directement » (WhatsApp, email). (Bloc « Accès » retiré à la demande du client le 02/11/2026.)
  Tous les boutons « Nous contacter » mènent à `#demande` (`contactFormPath()` de `src/i18n/utils.ts`) ; la carte « Offre & Contact » de l'accueil mène à l'onglet Offre.
- **Légal** : gabarits avec `[À FOURNIR]` (raison sociale, adresse, SIRET, directeur de publication, hébergeur Netlify Inc., statistiques sans cookies, données du formulaire).

---

## 7. Formulaire (Netlify Forms)

Formulaire en **2 étapes** (une seule visible à la fois avec JavaScript ; les deux l'une sous l'autre sans JavaScript).

**Étape 1 — Le séjour**

| Champ | Type | Obligatoire |
|---|---|---|
| Date d'arrivée | date | **oui** |
| Date de départ | date | **oui** (> arrivée) |
| Dates flexibles | case | non |
| Formule souhaitée | choix unique en boutons : Full Catered · Half Catered · Sur-mesure / À définir | **oui** |
| Adultes / Enfants (« Nombre de convives ») | nombre | non |

**Étape 2 — Le contact**

| Champ | Type | Obligatoire |
|---|---|---|
| Nom et prénom | texte | **oui** |
| Rôle | choix discret : « Je réserve pour moi-même » (par défaut) · « Je suis Assistant(e) Personnel(le) / Family Office / Agent » | oui (pré-coché) |
| Canal de réponse privilégié | choix unique en boutons : WhatsApp · Email · Appel téléphonique | **oui** |
| Téléphone **ou** Email | tel / email — seul le champ correspondant au canal est affiché (WhatsApp ou appel → téléphone ; Email → email) | **oui** |
| Consentement RGPD | case + lien confidentialité | **oui** |

- Un seul formulaire `demande-sejour` en FR et EN, champ caché `langue`.
- Anti-spam `netlify-honeypot`. Validation navigateur, messages d'erreur dans la bonne langue, à côté du champ.
- Redirection vers `/merci` ou `/en/thank-you`.
- Adresse de réception configurée dans le tableau de bord Netlify (procédure dans le README).

---

## 8. Données factuelles — source de vérité (ne rien ajouter)

**Identité** : **Chalet Yolo** (pas « & Spa ») · La Gittaz, Méribel, 73550 Les Allues, Savoie · ensemble des Chalets Célénia · Domaine `chalet-yolo.com` (acheté le 06/11/2026), adresse principale `https://www.chalet-yolo.com` (la version sans www redirige vers www, réglage côté Netlify) · Email `[EMAIL_CONTACT]` · WhatsApp `[WHATSAPP_NUMBER]` · Instagram `[URL]`

**Chiffres** : 350 m² · 15 personnes · 6 chambres dont 4 suites · 6 salles de bain · 5 niveaux avec ascenseur · arrivée 17h00, départ 10h00

**Chambres** : 1 « Chambre Gentiane » → lit 180 · 2 « Chambre Centaurée des montagnes » → lit 180 · 3 « Chambre L'Ancolie » → lit 180 · 4 « Chambre Rose des Alpes » → lit 180 · 5 « Chambre Flocons » → 2 lits superposés · 6 « Chambre Marmottes » → 1 lit simple + 1 lit superposé (noms fournis par le client le 02/11/2026 ; en anglais, nom propre conservé + « Room », ex. « Gentiane Room »)

**Niveaux connus** (le reste `[À FOURNIR]`) :
- 4e : salon cathédrale avec cheminée, grande table, cuisine équipée (double four, frigo américain, lave-vaisselle, cave à vin, Nespresso).
- 3e : 3 chambres en suite (douche + WC séparés) ; une salle de bain avec baignoire.

**Équipements phares** : piscine intérieure chauffée et privative · jacuzzi · bain jacuzzi · sauna · hammam · salle de yoga · home cinéma · salon cathédrale avec cheminée · ascenseur · vue montagne · salle de jeux (`confirmed: false` → **ne pas afficher**)

**Tous les équipements**
- *Cuisine* : cuisine équipée, four, micro-ondes, cuisinière, réfrigérateur, congélateur, lave-vaisselle, machine à café, bouilloire, grille-pain, verres à vin, produits de base
- *Confort* : draps et serviettes, sèche-cheveux, fer à repasser, cintres, radiateurs, eau chaude, TV, internet, espace de travail, balcon, cheminée
- *Entretien* : lave-linge, sèche-linge, aspirateur, produits de nettoyage, ménage professionnel inclus
- *Enfants et bébés* : adapté enfants (2 ans +) et bébés (< 2 ans), chaise haute, lit et matériel bébé
- *Ski et accès* : casier à skis, navette privée vers les pistes, chauffeur
- *Stationnement* : parking privé, intérieur et sécurisé, garage
- *Règles et sécurité* : animaux acceptés, non-fumeur, détecteurs de fumée et de monoxyde de carbone

**Accès pistes** : navette privée incluse matin et soir vers les remontées. Télécabine de l'Olympe accessible à pied `[À CONFIRMER]`.

**Formules** (confirmé par le client le 30/10/2026) : location proposée **exclusivement** en **Half Catered** (demi-pension) ou **Full Catered** (pension complète), avec **chef privé**, **majordome** et **chauffeur**. Contenu exact de chaque formule (repas inclus) `[À FOURNIR]`.
**Non confirmé** : ski-in / ski-out → **ne jamais l'affirmer** (accès aux pistes par navette privée).

**Inclus**
- *Arrivée* : lits préparés, linge, serviettes, peignoirs, chaussons, serviettes de piscine, produits d'accueil.
- *Séjour* : ménage quotidien des pièces de vie (6j/7), changement des serviettes à mi-séjour, buanderie, lit et matériel bébé sur demande, conciergerie dédiée, transport privé en van vers les remontées.
- *Départ* : ménage de fin de séjour inclus, check-out simplifié.

**À la carte**
- *Activités* : matériel de ski livré au chalet, forfaits, massages et soins au chalet, moniteur de ski.
- *Restauration* : petit-déjeuner continental, plats traiteur, carte des vins et champagnes. (Le chef est désormais inclus : voir « Formules ».)
- *Conciergerie* : transferts, voiturier en station, babysitting à domicile.

**Tarifs** (page Offre & Contact, données dans `src/content/tarifs.ts`) : location à la semaine, **du samedi au samedi** (confirmé par le client le 08/11/2026). Saison affichée : novembre 2026 → avril 2027 inclus. Prix de chaque semaine `[À FOURNIR]` ; prix différent selon la formule ? `[À FOURNIR]`.

**Méribel** : fondée en 1938, au cœur des 3 Vallées (600 km de pistes), architecture savoyarde.

**Accès** : A43 → Albertville, RN90 → Moûtiers, D90 → Méribel (19 km) · Gare Moûtiers–Salins-les-Thermes puis bus/taxi · Aéroports : Chambéry 1h30, Genève 2h, Lyon 2h15, Grenoble 2h15.

---

## 9. Photos

- Rangées dans `src/assets/photos/<espace>/`. En attendant : **images de remplacement neutres** (aplat + libellé de l'espace), **jamais de photos de stock**.
- Texte alternatif FR et EN pour chaque image (dans `content/`).
- Hero en priorité (`loading="eager"`, `fetchpriority="high"`).
- README : formats acceptés, ≥ 2400 px de large pour le plein écran, comment ajouter/remplacer une photo.

---

## 10. Qualité

- Lighthouse mobile ≥ 90 (performance, accessibilité, bonnes pratiques, SEO).
- SEO : `title` + `meta description` uniques par page et langue, Open Graph, `hreflang` FR/EN + `x-default` **pointant vers la version anglaise**, `sitemap.xml`, `robots.txt`, canoniques, JSON-LD `LodgingBusiness` (sans prix ni note inventés).
- Accessibilité : HTML sémantique, navigation clavier, focus visible, `lang` correct.
- RGPD : **aucun cookie**.
- Code simple, lisible, commenté en français : il sera maintenu par une seule personne avec l'aide de l'IA.
