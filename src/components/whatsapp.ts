/**
 * Lien WhatsApp avec message prérempli dans la langue de la page.
 * Le numéro vient de src/config/site.ts ; le message de src/content/<langue>/common.json.
 * Tant que le numéro n'est pas renseigné, le lien ouvre WhatsApp avec le
 * message prérempli et laisse choisir le destinataire.
 */
import { isProvided, site } from '../config/site';
import type { Lang } from '../i18n/languages';
import { getContent } from '../i18n/utils';

export function whatsappUrl(lang: Lang): string {
  const text = encodeURIComponent(getContent(lang, 'common').whatsapp.message);
  const number = isProvided(site.whatsapp) ? site.whatsapp.replace(/\D/g, '') : '';
  return `https://wa.me/${number}?text=${text}`;
}
