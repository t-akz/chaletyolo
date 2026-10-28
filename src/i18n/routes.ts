/**
 * Table de correspondance des pages FR ↔ EN.
 *
 * C'est la SEULE source des adresses du site : menu, sélecteur de langue,
 * balises hreflang et sitemap la lisent toutes.
 * Pour renommer une adresse, modifiez-la ici ET renommez le fichier
 * correspondant dans src/pages/ (ou src/pages/en/).
 */
import type { Lang } from './languages';

export const routes = {
  home: { fr: '/', en: '/en/' },
  chalet: { fr: '/le-chalet/', en: '/en/the-chalet/' },
  services: { fr: '/services/', en: '/en/services/' },
  meribel: { fr: '/meribel/', en: '/en/meribel/' },
  gallery: { fr: '/galerie/', en: '/en/gallery/' },
  contact: { fr: '/contact/', en: '/en/contact/' },
  thanks: { fr: '/merci/', en: '/en/thank-you/' },
  legal: { fr: '/mentions-legales/', en: '/en/legal-notice/' },
  privacy: { fr: '/confidentialite/', en: '/en/privacy/' },
} as const satisfies Record<string, Record<Lang, string>>;

/** Identifiant d'une page, ex. « chalet ». */
export type RouteKey = keyof typeof routes;
