# Revue SEO du site Chalet Yolo

*Revue du 30 octobre 2026. Au moment de la revue, `npm run build` passe (19 pages) et `npx astro check` ne trouve aucune erreur.*

## 1. La stratégie SEO en place

Le SEO (référencement naturel) repose ici sur deux choses : une **base technique propre**, et des **textes qui reprennent les faits du chalet**.

| Élément | Ce que ça fait (en clair) | Où c'est géré |
|---|---|---|
| **`<title>` + meta description** uniques par page et par langue | Le titre bleu et les 2 lignes affichés dans les résultats Google | `src/content/{fr,en}/*.json` (bloc `meta`) |
| **URL canonique** | Indique à Google l'adresse « officielle » de la page, pour éviter les doublons (`/le-chalet` et `/le-chalet/`, par exemple) | `src/components/Seo.astro:47` |
| **hreflang** + `x-default` | Relie la version FR à la version EN. Google montre la bonne langue au bon visiteur, et le français aux autres langues (`x-default`) | `Seo.astro:48-49`, alimenté par la table `src/i18n/routes.ts` |
| **URL traduites** | `/le-chalet/` ↔ `/en/the-chalet/` : chaque langue a des adresses lisibles dans sa langue | `src/i18n/routes.ts` |
| **sitemap.xml** + **robots.txt** | La liste des pages à explorer, et l'autorisation d'explorer, données aux moteurs | `astro.config.ts`, `src/pages/robots.txt.ts` |
| **noindex** | Les pages « Merci » et 404 ne doivent pas apparaître dans Google | `Seo.astro:46` |
| **Open Graph** | L'aperçu (image 1200×630, titre, texte) quand on partage un lien sur WhatsApp, Facebook ou LinkedIn | `Seo.astro:52-69` |
| **JSON-LD `LodgingBusiness`** | Une fiche d'identité lisible par les machines : nom, adresse, 6 chambres, arrivée 17h, départ 10h, équipements. Ni prix ni note, conformément au §10 du CLAUDE.md | `src/components/structuredData.ts` (accueil seulement) |
| **Textes alternatifs** des photos en FR/EN | Google Images et lecteurs d'écran ; aucune image n'en manque | `src/content/photos.ts` |
| Performance (site statique, AVIF/WebP, lazy-loading) | La vitesse compte dans le classement mobile | Astro + `astro:assets` |

**Autres choix :**

- `og:locale` anglais = `en_GB` (anglais britannique). C'est cohérent : la clientèle anglophone de Méribel est en grande partie britannique.
- Aucun cookie et des statistiques Umami. Ça n'a pas d'effet direct sur le SEO, mais ça évite un bandeau de consentement qui ralentit et masque la page.

## 2. Les mots-clés : comment ils ont été choisis

Les mots-clés **n'ont pas été choisis à partir d'une étude de recherches** (volumes, concurrence). Ils ont été **tirés uniquement des faits du §8 du CLAUDE.md**, parce que ce fichier interdit d'inventer du texte marketing. La logique :

- **Marque + lieu** dans tous les titres : « Chalet Yolo » + « Méribel ». C'est la base locale : quelqu'un qui cherche « chalet Méribel » doit trouver le site.
- **Requête principale de l'accueil** : « Chalet privé à Méribel » (titre) et « Private chalet in Méribel » en anglais.
- **Critères de choix concrets** dans les descriptions : 350 m², 15 personnes, 6 chambres dont 4 suites, piscine intérieure chauffée. Les gens cherchent souvent par capacité ou par équipement (« chalet 15 personnes Méribel », « chalet piscine Méribel »).
- **Une page par intention** :
  - *Le chalet* : équipements (piscine, bien-être, home cinéma, yoga) ;
  - *Services* : chef à domicile, moniteur de ski, massages, conciergerie ;
  - *Méribel* : « 3 Vallées », « 600 km de pistes », aéroports de Genève, Lyon, Chambéry et Grenoble (les questions d'accès sont très recherchées).
- **Titres de sections (H2)** : ils reprennent les équipements (« Piscine intérieure chauffée et privative », « Home cinéma », « Au cœur des 3 Vallées »).

### Ce qui manque côté mots-clés (à décider avec le client)

1. **« location » / « rental » sont quasi absents.** « location » n'apparaît qu'une fois dans les textes français, « rental » jamais en anglais. Or ce sont probablement les requêtes les plus recherchées : « location chalet Méribel », « chalet rental Meribel ».
2. **« luxe » / « luxury » sont absents.** C'est voulu, car ce n'est pas un fait du §8. Mais « luxury chalet Meribel » est une requête majeure sur ce segment. Ce choix appartient au client.
3. **Asymétrie FR/EN sur la page Méribel** : « Méribel ski resort — Chalet Yolo » en anglais, mais seulement « Méribel — Chalet Yolo » en français. Le titre français pourrait mentionner « station de ski » ou « 3 Vallées ».
4. **Aucune vraie étude de mots-clés.** Avant la mise en ligne, il est recommandé de valider une liste avec un outil (Google Search Console après lancement, ou Semrush/Ubersuggest avant).

## 3. Revue de code : problèmes trouvés

### À régler avant la mise en ligne

**1. Le titre principal (H1) de 4 pages est encore « TODO-COPY: … »**

- Pages concernées : accueil, Le chalet, Services, Méribel, en FR et en EN (`src/components/Hero.astro:60`).
- Le H1 est le signal le plus fort sur la page après le `<title>`. C'est voulu en attendant les textes, mais il faudra que l'accroche fournie contienne le mot-clé. Sinon, on peut intégrer « Chalet privé · Méribel » (aujourd'hui un simple sur-titre) dans le H1.

**2. L'adresse du site est provisoire** : `https://a-fournir.example` (`src/config/site.ts:23`). Les canoniques, hreflang, sitemap, robots.txt et images de partage pointent tous vers ce faux domaine. Il faudra le remplacer dès que le domaine est connu.

### Bugs de code (petits, faciles à corriger)

**3. Le sitemap n'associe pas toutes les pages FR et EN.**

- Le module sitemap d'Astro ne relie que les pages dont l'adresse est identique dans les deux langues (`/services/` ↔ `/en/services/`).
- Résultat : `/le-chalet/`, `/galerie/`, `/mentions-legales/` et `/confidentialite/` n'ont aucune version anglaise déclarée dans `sitemap-0.xml`.
- Les balises dans les pages sont correctes, donc ce n'est pas bloquant, mais c'est incohérent. Correctif : une fonction `serialize` dans `astro.config.ts` qui lit la table `routes.ts`.

**4. La page Services n'a aucune image de partage (FR et EN).**

- La photo `hero/services` n'existe pas encore, et `Seo.astro:36-39` ne prévoit pas de photo de secours.
- Un lien partagé sur WhatsApp s'affiche donc sans image. Correctif : utiliser la photo d'accueil à la place.

**5. L'adresse dans le JSON-LD est approximative.**

- `addressLocality` contient « La Gittaz, Méribel, Les Allues » (`structuredData.ts:24`). Il vaut mieux « Les Allues » (la commune officielle du 73550) dans ce champ, et le hameau ailleurs.
- Plus tard, il faudra aussi ajouter `sameAs` (liens Instagram/Facebook/TikTok) et `geo` (coordonnées), une fois fournis.

### Ce qui est bien fait

- Une seule source pour toutes les adresses (`routes.ts`) : le menu, le sélecteur de langue et hreflang ne peuvent pas diverger.
- Aucun prix ni aucune note inventés dans le JSON-LD.
- Pages « Merci » exclues du sitemap et en noindex.
- Toutes les images ont un texte alternatif, et il y a un seul H1 par page.

## 4. Prochaines étapes

- **Code (points 3, 4 et 5)** : corrections sans texte à inventer, faisables en une étape (`astro.config.ts`, `Seo.astro`, `structuredData.ts`).
- **Mots-clés** (« location », « luxe », titre de la page Méribel) : à valider avec le client, puisque ça touche aux textes.
- **Avant la mise en ligne** : H1 définitifs (point 1) et vrai domaine (point 2).
