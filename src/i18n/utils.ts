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
import frChalet from '../content/fr/chalet.json';
import enChalet from '../content/en/chalet.json';
import frServices from '../content/fr/services.json';
import enServices from '../content/en/services.json';
import frMeribel from '../content/fr/meribel.json';
import enMeribel from '../content/en/meribel.json';
import frGallery from '../content/fr/gallery.json';
import enGallery from '../content/en/gallery.json';
import frDev from '../content/fr/dev.json';
import enDev from '../content/en/dev.json';

const fr = {
  common: frCommon,
  home: frHome,
  chalet: frChalet,
  services: frServices,
  meribel: frMeribel,
  gallery: frGallery,
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
    chalet: enChalet,
    services: enServices,
    meribel: enMeribel,
    gallery: enGallery,
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

/**
 * Remplace les repères « {nom} » d'un texte par des valeurs.
 * Ex. format('Fondée en {year}', { year: 1938 }) → « Fondée en 1938 ».
 * Sert à insérer les chiffres de src/content/chalet.ts dans les textes.
 */
export function format(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
