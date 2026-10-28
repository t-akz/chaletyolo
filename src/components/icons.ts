/**
 * Icônes Lucide utilisées sur le site (trait fin).
 * Pour ajouter une icône : choisissez-la sur https://lucide.dev/icons,
 * importez-la ci-dessous et ajoutez-la à la liste « icons ».
 * Les fichiers de contenu font ensuite référence à son nom, ex. « van ».
 */
import ArrowRight from '@lucide/astro/icons/arrow-right';
import ChevronDown from '@lucide/astro/icons/chevron-down';
import ConciergeBell from '@lucide/astro/icons/concierge-bell';
import Mail from '@lucide/astro/icons/mail';
import Menu from '@lucide/astro/icons/menu';
import MessageCircle from '@lucide/astro/icons/message-circle';
import Shirt from '@lucide/astro/icons/shirt';
import Sparkles from '@lucide/astro/icons/sparkles';
import Van from '@lucide/astro/icons/van';
import X from '@lucide/astro/icons/x';

export const icons = {
  'arrow-right': ArrowRight,
  'chevron-down': ChevronDown,
  'concierge-bell': ConciergeBell,
  mail: Mail,
  menu: Menu,
  'message-circle': MessageCircle,
  shirt: Shirt,
  sparkles: Sparkles,
  van: Van,
  x: X,
};

export type IconName = keyof typeof icons;

/** Icône de chacun des 4 services mis en avant (identifiants de src/content/chalet.ts). */
export const serviceIcons: Record<string, IconName> = {
  shuttle: 'van',
  cleaning: 'sparkles',
  concierge: 'concierge-bell',
  linen: 'shirt',
};
