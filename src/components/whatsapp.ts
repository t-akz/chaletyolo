/**
 * Lien WhatsApp avec message prérempli dans la langue de la page.
 * Le numéro vient de src/config/site.ts ; le message de src/content/<langue>/common.json.
 *
 * Interrupteur « whatsappEnabled » (13/11/2026, demande du client) : tant que le numéro
 * n'est pas renseigné dans src/config/site.ts, rien de ce qui permet de JOINDRE le chalet
 * par WhatsApp n'est affiché (bouton flottant, pied de page, bandeaux « Parlons de votre
 * séjour », bloc « Ou directement »). Renseigner le numéro réaffiche tout.
 * L'option « WhatsApp » du formulaire (canal de réponse du visiteur) reste toujours visible.
 */
import { isProvided, site } from '../config/site';
import type { Lang } from '../i18n/languages';
import { getContent } from '../i18n/utils';

/** Vrai quand le numéro WhatsApp du chalet est renseigné. */
export const whatsappEnabled = isProvided(site.whatsapp);

export function whatsappUrl(lang: Lang): string {
  const text = encodeURIComponent(getContent(lang, 'common').whatsapp.message);
  const number = isProvided(site.whatsapp) ? site.whatsapp.replace(/\D/g, '') : '';
  return `https://wa.me/${number}?text=${text}`;
}
