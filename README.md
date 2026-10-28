# Chalet Yolo — site vitrine

Site vitrine bilingue FR/EN du Chalet Yolo (Méribel), construit avec Astro et Tailwind CSS, hébergé sur Netlify.

> Ce README sera complété à l'étape 8 (lancer le projet, modifier un texte, ajouter une photo, déployer…).

---

## Thème alternatif C — « Alpin contemporain »

Le site a deux jeux de couleurs :

- **Thème A — « Chaleureux chic »** : le thème par défaut (crème, taupe, bordeaux).
- **Thème C — « Alpin contemporain »** : une proposition alternative à présenter au client (blanc neige, vert sapin, bois clair, gris pierre pour les filets).

Seules les couleurs changent : la mise en page est identique.

### Voir le thème C

Ajoutez `?theme=c` à la fin de n'importe quelle adresse du site, par exemple :

- `http://localhost:4321/?theme=c`
- `https://<votre-domaine>/en/?theme=c`

Le choix est mémorisé **pour l'onglet en cours** (pas de cookie) : vous pouvez ensuite naviguer normalement.
Pour revenir au thème par défaut : ajoutez `?theme=a` à l'adresse, ou fermez l'onglet.

### Supprimer le thème C

Quand le client a choisi, le thème C peut être retiré en 3 gestes. Tous les endroits concernés portent le repère `[THEME-C]`.

1. **`src/styles/tokens.css`** : effacez tout le bloc qui commence par `THÈME C — « Alpin contemporain »` et se termine par `FIN THÈME C`.
2. **`src/components/ThemeScript.astro`** : supprimez ce fichier.
3. **`src/layouts/BaseLayout.astro`** : supprimez les deux lignes qui mentionnent `ThemeScript` (l'`import` en haut du fichier et la balise `<ThemeScript />` dans `<head>`).

Vérifiez ensuite avec `npm run build` puis `npx astro check` : aucune erreur ne doit apparaître.

> Si le client préfère le thème C comme thème **par défaut**, ne supprimez rien : il suffit de recopier les valeurs du bloc C dans le bloc `:root` du thème A (même fichier), puis de supprimer le thème C comme ci-dessus. Pensez à mettre à jour le §5 de `CLAUDE.md`.
