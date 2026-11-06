/**
 * Configuration générale du site.
 *
 * Toutes les valeurs encore inconnues sont marquées « [À FOURNIR] ».
 * Remplacez-les ici : elles sont utilisées partout sur le site.
 */

/** Marqueur affiché tant qu'une information n'a pas été fournie. */
export const TO_PROVIDE = '[À FOURNIR]';

/** Vrai si la valeur a bien été renseignée (n'est plus le marqueur). */
export function isProvided(value: string | null | undefined): value is string {
  return typeof value === 'string' && value.trim() !== '' && !value.includes(TO_PROVIDE);
}

export const site = {
  name: 'Chalet Yolo',

  /**
   * Adresse complète du site, sans barre oblique finale.
   * Domaine chalet-yolo.com (acheté le 06/11/2026, chez OVH) ; adresse principale avec « www »
   * (la version sans www redirige vers www, réglage côté Netlify).
   * Seul endroit où l'adresse est écrite : canoniques, hreflang, Open Graph, JSON-LD,
   * sitemap et robots.txt la lisent ici.
   */
  url: 'https://www.chalet-yolo.com',

  /** Email de contact affiché sur le site. */
  email: TO_PROVIDE,

  /**
   * Numéro WhatsApp au format international, chiffres uniquement,
   * sans « + », sans espaces ni zéro initial. Ex. « 33612345678 ».
   */
  whatsapp: TO_PROVIDE,

  /** Liens vers les réseaux sociaux (URL complètes). */
  social: {
    instagram: TO_PROVIDE,
  },
} as const;

/**
 * Statistiques Umami (sans cookies).
 * Les valeurs viennent du fichier « .env » (en local) ou des variables Netlify.
 * Si l'une des deux est vide, aucun script de statistiques n'est chargé.
 */
export function getAnalytics(): { src: string; websiteId: string } | null {
  const src = import.meta.env.PUBLIC_ANALYTICS_UMAMI_SRC;
  const websiteId = import.meta.env.PUBLIC_ANALYTICS_UMAMI_ID;
  if (!src || !websiteId) return null;
  return { src, websiteId };
}
