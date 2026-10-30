/**
 * Données structurées JSON-LD pour Google et les moteurs de réponse (IA) :
 * le chalet est à la fois un hébergement (« LodgingBusiness ») et une maison
 * individuelle (« SingleFamilyResidence »).
 *
 * Uniquement des faits de src/content/chalet.ts et src/config/site.ts :
 * AUCUN prix ni AUCUNE note (§10 de CLAUDE.md). Google exige que ces données
 * reflètent ce qui est visible sur le site : n'ajoutez rien qui n'y figure pas.
 * Email, téléphone, coordonnées GPS et réseaux sociaux ne sont ajoutés que
 * s'ils sont renseignés.
 */
import { isProvided, site } from '../config/site';
import { catering, figures, identity, visibleFeatures } from '../content/chalet';
import type { Lang } from '../i18n/languages';
import { localizedPath } from '../i18n/utils';

export function lodgingBusinessJsonLd(lang: Lang, description: string, imageUrl?: string) {
  const { latitude, longitude } = site.map;
  const socialLinks = Object.values(site.social).filter(isProvided);

  return {
    '@context': 'https://schema.org',
    '@type': ['LodgingBusiness', 'SingleFamilyResidence'],
    name: identity.name,
    description,
    url: new URL(localizedPath('home', lang), site.url).href,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(isProvided(site.email) ? { email: site.email } : {}),
    ...(isProvided(site.whatsapp) ? { telephone: `+${site.whatsapp.replace(/\D/g, '')}` } : {}),
    ...(socialLinks.length > 0 ? { sameAs: socialLinks } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: identity.hamlet,
      addressLocality: identity.town,
      postalCode: identity.postalCode,
      addressRegion: identity.region,
      addressCountry: identity.countryCode,
    },
    // La station et le domaine skiable, pour situer le chalet (Méribel, Les 3 Vallées).
    containedInPlace: {
      '@type': 'Place',
      name: `${identity.resort}, Les 3 Vallées`,
    },
    ...(latitude !== null && longitude !== null
      ? { geo: { '@type': 'GeoCoordinates', latitude, longitude } }
      : {}),
    floorSize: { '@type': 'QuantitativeValue', value: figures.surfaceM2, unitCode: 'MTK' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: figures.guests },
    numberOfRooms: figures.bedrooms,
    numberOfBedrooms: figures.bedrooms,
    numberOfBathroomsTotal: figures.bathrooms,
    checkinTime: figures.checkIn,
    checkoutTime: figures.checkOut,
    // « Animaux acceptés » figure dans la liste des équipements (§8).
    petsAllowed: true,
    // Équipements phares confirmés (la salle de jeux n'y figure pas),
    // puis formules et personnel (chef privé, majordome, chauffeur).
    amenityFeature: [
      ...visibleFeatures().map((feature) => feature.label[lang]),
      ...catering.formulas.map((formula) => formula.label[lang]),
      ...catering.staff.map((member) => member.label[lang]),
    ].map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
  };
}
