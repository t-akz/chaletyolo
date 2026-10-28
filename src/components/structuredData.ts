/**
 * Données structurées JSON-LD « LodgingBusiness » (hébergement) pour Google.
 * Uniquement des faits de src/content/chalet.ts et src/config/site.ts :
 * AUCUN prix ni AUCUNE note (§10 de CLAUDE.md).
 * Email et téléphone ne sont ajoutés que s'ils sont renseignés.
 */
import { isProvided, site } from '../config/site';
import { figures, identity, visibleFeatures } from '../content/chalet';
import type { Lang } from '../i18n/languages';
import { localizedPath } from '../i18n/utils';

export function lodgingBusinessJsonLd(lang: Lang, description: string, imageUrl?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: identity.name,
    description,
    url: new URL(localizedPath('home', lang), site.url).href,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(isProvided(site.email) ? { email: site.email } : {}),
    ...(isProvided(site.whatsapp) ? { telephone: `+${site.whatsapp.replace(/\D/g, '')}` } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${identity.hamlet}, ${identity.resort}, ${identity.town}`,
      postalCode: identity.postalCode,
      addressRegion: identity.region,
      addressCountry: identity.countryCode,
    },
    numberOfRooms: figures.bedrooms,
    checkinTime: figures.checkIn,
    checkoutTime: figures.checkOut,
    // « Animaux acceptés » figure dans la liste des équipements (§8).
    petsAllowed: true,
    // Équipements phares confirmés uniquement (la salle de jeux n'y figure pas).
    amenityFeature: visibleFeatures().map((feature) => ({
      '@type': 'LocationFeatureSpecification',
      name: feature.label[lang],
      value: true,
    })),
  };
}
