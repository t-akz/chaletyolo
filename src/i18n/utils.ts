/**
 * Utilitaires de langue : textes de chaque page et adresses FR/EN.
 */
import { languages, type Lang } from './languages';
import { routes, type RouteKey } from './routes';

// Textes par page. Pour ajouter une page : importez ses deux fichiers JSON
// et ajoutez-les dans « content » ci-dessous.
import frCommon from '../content/fr/common.json';
import enCommon from '../content/en/common.json';
import frHome from '../content/fr/home.json';
import enHome from '../content/en/home.json';
import frChalet from '../content/fr/chalet.json';
import enChalet from '../content/en/chalet.json';
import frPoolSpa from '../content/fr/pool-spa.json';
import enPoolSpa from '../content/en/pool-spa.json';
import frServices from '../content/fr/services.json';
import enServices from '../content/en/services.json';
import frMeribel from '../content/fr/meribel.json';
import enMeribel from '../content/en/meribel.json';
import frGallery from '../content/fr/gallery.json';
import enGallery from '../content/en/gallery.json';
import frContact from '../content/fr/contact.json';
import enContact from '../content/en/contact.json';
import frThanks from '../content/fr/thanks.json';
import enThanks from '../content/en/thanks.json';
import frLegal from '../content/fr/legal.json';
import enLegal from '../content/en/legal.json';
import frPrivacy from '../content/fr/privacy.json';
import enPrivacy from '../content/en/privacy.json';
import frNotFound from '../content/fr/notfound.json';
import enNotFound from '../content/en/notfound.json';

const fr = {
  common: frCommon,
  home: frHome,
  chalet: frChalet,
  poolSpa: frPoolSpa,
  services: frServices,
  meribel: frMeribel,
  gallery: frGallery,
  contact: frContact,
  thanks: frThanks,
  legal: frLegal,
  privacy: frPrivacy,
  notFound: frNotFound,
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
    poolSpa: enPoolSpa,
    services: enServices,
    meribel: enMeribel,
    gallery: enGallery,
    contact: enContact,
    thanks: enThanks,
    legal: enLegal,
    privacy: enPrivacy,
    notFound: enNotFound,
  },
};

/** Renvoie les textes d'une page dans la langue demandée. */
export function getContent<K extends keyof Content>(lang: Lang, page: K): Content[K] {
  return content[lang][page];
}

/** Adresse relative d'une page dans une langue, ex. localizedPath('chalet', 'en') → « /en/the-chalet/ ». */
export function localizedPath(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}

/**
 * Adresse de l'onglet « Contact » (formulaire) de la page Offre & Contact,
 * ex. « /contact/#demande ». Utilisée par tous les boutons « Nous contacter ».
 */
export function contactFormPath(lang: Lang): string {
  return `${routes.contact[lang]}#demande`;
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
