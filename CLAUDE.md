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
4. **N'invente pas de textes marketing.** Les textes éditoriaux seront fournis séparément. En attendant : faits bruts du §8, et texte provisoire préfixé `TODO-COPY:` pour chaque accroche/intro.
5. **Ambiguïté → pose la question** (une à la fois) plutôt que de supposer.
6. **Git** : un commit par étape **validée par moi**, message clair en français (ex. `feat: page d'accueil FR/EN`). Ne jamais réécrire l'historique.
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
  - les **URL locales** à ouvrir (ex. `http://localhost:4321/`, `http://localhost:4321/en/`, `…?theme=b`) ;
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
| Hébergement | **Netlify** (`netlify.toml`) |
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
  content/fr/*.json       → textes FR par page
  content/en/*.json       → textes EN par page
  i18n/                   → utilitaires de langue + table des routes
  styles/tokens.css       → tokens thème A + thème B
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
- **Mobile-first**. Contrastes **WCAG AA** dans les deux thèmes.

### 5.2 Thème A — « Chaleureux chic » (par défaut)
| Token | Valeur | Usage |
|---|---|---|
| `--color-bg` | `#F7F2EA` | Fond principal (crème) |
| `--color-bg-alt` | `#FFFDF9` | Sections alternées |
| `--color-accent-soft` | `#D4B5A3` | Footer, blocs d'accent (nude) |
| `--color-heading` | `#8B6A55` | Titres (taupe) — **uniquement ≥ 24px** (contraste) |
| `--color-text` | `#2B2B2B` | Texte courant |
| `--color-primary` | `#6E2A35` | Bouton principal (bordeaux), texte blanc |
| `--color-primary-hover` | bordeaux légèrement plus foncé | Survol |

### 5.3 Thème B — « Exclusif sombre » (démo client)
| Token | Valeur |
|---|---|
| `--color-bg` | `#1E1E1C` |
| `--color-bg-alt` | `#2A2724` |
| `--color-accent-soft` | `#3A3631` |
| `--color-heading` | `#B89B6A` |
| `--color-text` | `#EDE8DF` |
| `--color-primary` | `#B89B6A` (texte `#1E1E1C`) |

**Bascule** : `?theme=b` → attribut `data-theme="b"` sur `<html>`, mémorisé en `sessionStorage`, annulable avec `?theme=a`. Script inline dans `<head>` (pas de flash). Code du thème B **isolé et facile à supprimer** (procédure dans le README). Seules les couleurs changent, pas la mise en page.

### 5.4 Typographie
- Titres : **Cormorant Garamond** (400–500), grandes tailles.
- Texte et interface : **Manrope**.
- Sur-titres : Manrope, petites majuscules espacées (`letter-spacing` ≈ 0.2em, 12–13px).
- Échelle fluide (`clamp()`).

### 5.5 Logo
Logo existant (ourson + « Chalet Yolo / MERIBEL ») : `src/assets/logo/[LOGO_FICHIER]`. En attendant, texte « Chalet Yolo ». Prévoir une variante claire pour l'en-tête transparent.

### 5.6 Composants
- `Header` : transparent sur le hero, fond crème + légère ombre au scroll. Logo, menu (Le chalet, Services, Méribel, Galerie, Contact), sélecteur **FR | EN**, bouton « Nous contacter ». Mobile : menu plein écran.
- `Hero` : image plein écran (`100svh`), voile sombre léger, accroche + sous-titre + bouton. Option **vidéo de fond** (mp4 muet en boucle + image de repli) activable plus tard.
- `KeyFigures`, `FeatureSection` (photo + texte, alternance gauche/droite), `ServiceList`, `CTASection`, `Accordion`.
- `Gallery` : mosaïque + **lightbox** (clic, clavier, Échap).
- `WhatsAppButton` : flottant bas-droite, `https://wa.me/[WHATSAPP_NUMBER]` + message prérempli FR/EN.
- `Footer` : fond nude, liens légaux, Instagram/Facebook/TikTok, email, « Méribel, 73550 ».
- `ContactForm` : §7.

---

## 6. Contenu des pages

**Ton** : sobre et factuel (titres, chiffres, descriptions) + **une seule accroche complice par page max** (jeu possible sur « Yolo »). **Vouvoiement** en français.

- **Accueil** : Hero (piscine ou extérieur neige, accroche `TODO-COPY`, sous-titre « Chalet privé · Méribel », bouton) → Chiffres clés (350 m² · 15 personnes · 6 chambres · 6 salles de bain) → Intro 2 lignes `TODO-COPY` + lien → 4 équipements phares en `FeatureSection` (piscine intérieure chauffée · espace bien-être · home cinéma · salon cathédrale avec cheminée) → 4 services inclus (navette privée · ménage quotidien · conciergerie · linge et peignoirs) → aperçu Méribel → mosaïque 6–8 photos → CTA « Parlons de votre séjour » + WhatsApp.
- **Le chalet** : Hero → chiffres + localisation (La Gittaz) → une `FeatureSection` par espace (piscine · bien-être · cinéma · yoga · salon/cuisine · salle de jeux **seulement si `confirmed: true`**) → 6 cartes chambres → visite par niveau (5 niveaux, ascenseur) → `Accordion` « Tous les équipements » → CTA.
- **Services** : Hero → Inclus (Arrivée · Pendant le séjour · Départ) → À la carte (Activités · Restauration · Conciergerie) → « Sur demande, auprès de notre conciergerie » + CTA.
- **Méribel** : Hero → la station → activités d'hiver (icônes) → accès (voiture, train, aéroports) → carte chargée **au clic** (pas de cookie) → CTA.
- **Galerie** : filtres (Tout · Séjour · Chambres · Bien-être · Loisirs · Extérieur · Méribel) + mosaïque + lightbox.
- **Contact** : titre, 1 ligne d'intro, formulaire, bloc « Ou directement » (WhatsApp, email), accès résumé.
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

**Identité** : **Chalet Yolo** (pas « & Spa ») · La Gittaz, Méribel, 73550 Les Allues, Savoie · ensemble des Chalets Célénia · Domaine `[DOMAINE]` · Email `[EMAIL_CONTACT]` · WhatsApp `[WHATSAPP_NUMBER]` · Instagram/Facebook/TikTok `[URL]`

**Chiffres** : 350 m² · 15 personnes · 6 chambres dont 4 suites · 6 salles de bain · 5 niveaux avec ascenseur · arrivée 17h00, départ 10h00

**Chambres** : 1 → lit 180 · 2 → lit 180 · 3 → lit 180 · 4 → lit 180 · 5 → 2 lits superposés · 6 → 1 lit simple + 1 lit superposé

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

**Inclus**
- *Arrivée* : lits préparés, linge, serviettes, peignoirs, chaussons, serviettes de piscine, produits d'accueil.
- *Séjour* : ménage quotidien des pièces de vie (6j/7), changement des serviettes à mi-séjour, buanderie, lit et matériel bébé sur demande, conciergerie dédiée, transport privé en van vers les remontées.
- *Départ* : ménage de fin de séjour inclus, check-out simplifié.

**À la carte**
- *Activités* : matériel de ski livré au chalet, forfaits, massages et soins au chalet, moniteur de ski.
- *Restauration* : petit-déjeuner continental, plats traiteur, chef à domicile, carte des vins et champagnes.
- *Conciergerie* : transferts, voiturier en station, babysitting à domicile.

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
- SEO : `title` + `meta description` uniques par page et langue, Open Graph, `hreflang` FR/EN + `x-default`, `sitemap.xml`, `robots.txt`, canoniques, JSON-LD `LodgingBusiness` (sans prix ni note inventés).
- Accessibilité : HTML sémantique, navigation clavier, focus visible, `lang` correct.
- RGPD : **aucun cookie**.
- Code simple, lisible, commenté en français : il sera maintenu par une seule personne avec l'aide de l'IA.
