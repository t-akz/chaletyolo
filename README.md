# Chalet Yolo — site vitrine

Site vitrine bilingue FR/EN du Chalet Yolo (Méribel), construit avec Astro et Tailwind CSS, hébergé sur Netlify.

> Ce README sera complété à l'étape 8 (lancer le projet, modifier un texte, ajouter une photo, déployer…).

---

## Les trois thèmes de couleurs

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

---

## Supprimer un thème une fois que le client a choisi

Chaque thème alternatif se supprime **séparément**. Les endroits concernés portent le repère `[THEME-B]` ou `[THEME-C]`.

### Supprimer uniquement le thème B (« Noir, blanc, or »)

1. **`src/styles/tokens.css`** : effacez tout le bloc qui commence par `THÈME B — « Noir, blanc, or »` et se termine par `FIN THÈME B`.
2. **`src/components/ThemeScript.astro`** : dans la ligne `var themes = ['b', 'c'];`, retirez `'b'` → `var themes = ['c'];`.

### Supprimer uniquement le thème C (« Alpin contemporain »)

1. **`src/styles/tokens.css`** : effacez tout le bloc qui commence par `THÈME C — « Alpin contemporain »` et se termine par `FIN THÈME C`.
2. **`src/components/ThemeScript.astro`** : dans la ligne `var themes = ['b', 'c'];`, retirez `'c'` → `var themes = ['b'];`.

### Supprimer les deux (on garde seulement le thème A)

1. **`src/styles/tokens.css`** : effacez les blocs B et C (voir ci-dessus).
2. **`src/components/ThemeScript.astro`** : supprimez ce fichier.
3. **`src/layouts/BaseLayout.astro`** : supprimez les deux lignes qui mentionnent `ThemeScript` (l'`import` en haut du fichier et la balise `<ThemeScript />` dans `<head>`).

Dans tous les cas, vérifiez ensuite avec `npm run build` puis `npx astro check` : aucune erreur ne doit apparaître.

> **Si le client choisit B ou C comme thème par défaut** : recopiez les valeurs de son bloc dans le bloc `:root` du thème A (même fichier). Pour B, déplacez aussi ses « ajustements propres au fond sombre » en retirant le préfixe `:root[data-theme='b']`. Supprimez ensuite les thèmes alternatifs comme ci-dessus, et mettez à jour le §5 de `CLAUDE.md`.
