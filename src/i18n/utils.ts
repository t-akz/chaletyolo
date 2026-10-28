/**
 * Utilitaires de langue : textes de chaque page et adresses FR/EN.
 */
import { languages, defaultLang, type Lang } from './languages';
import { routes, type RouteKey } from './routes';

// Textes par page. Pour ajouter une page : importez ses deux fichiers JSON
// et ajoutez-les dans « content » ci-dessous.
import frCommon from '../content/fr/common.json';
import enCommon from '../content/en/common.json';
import frHome from '../content/fr/home.json';
import enHome from '../content/en/home.json';
import frDev from '../content/fr/dev.json';
import enDev from '../content/en/dev.json';

const fr = {
  common: frCommon,
  home: frHome,
  dev: frDev,
};

/** Forme attendue des textes : celle des fichiers français. */
type Content = typeof fr;

/**
 * Textes de toutes les pages, par langue.
 * Le type « Content » oblige les fichiers anglais à avoir exactement les mêmes
 * rubriques que les fichiers français : un oubli provoque une erreur dans
 * « npx astro check ».
 */
const content: Record<Lang, Content> = {
  fr,
  en: {
    common: enCommon,
    home: enHome,
    dev: enDev,
  },
};

/** Renvoie les textes d'une page dans la langue demandée. */
export function getContent<K extends keyof Content>(lang: Lang, page: K): Content[K] {
  return content[lang][page];
}

/** Déduit la langue à partir de l'adresse de la page (« /en/… » → anglais). */
export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split('/');
  return (languages as readonly string[]).includes(first ?? '') ? (first as Lang) : defaultLang;
}

/** Adresse relative d'une page dans une langue, ex. localizedPath('chalet', 'en') → « /en/the-chalet/ ». */
export function localizedPath(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/** Liste des versions d'une page dans chaque langue (pour hreflang et le sélecteur de langue). */
export function getAlternates(key: RouteKey): { lang: Lang; path: string }[] {
  return languages.map((lang) => ({ lang, path: routes[key][lang] }));
}
