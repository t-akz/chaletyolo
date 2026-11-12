/**
 * Icônes Lucide utilisées sur le site (trait fin).
 * Pour ajouter une icône : choisissez-la sur https://lucide.dev/icons,
 * importez-la ci-dessous et ajoutez-la à la liste « icons ».
 * Les fichiers de contenu font ensuite référence à son nom, ex. « van ».
 */
import ArrowLeft from '@lucide/astro/icons/arrow-left';
import ArrowRight from '@lucide/astro/icons/arrow-right';
import ChevronDown from '@lucide/astro/icons/chevron-down';
import ChevronLeft from '@lucide/astro/icons/chevron-left';
import ChevronRight from '@lucide/astro/icons/chevron-right';
import CircleAlert from '@lucide/astro/icons/circle-alert';
import Mail from '@lucide/astro/icons/mail';
import Menu from '@lucide/astro/icons/menu';
import MessageCircle from '@lucide/astro/icons/message-circle';
import Pause from '@lucide/astro/icons/pause';
import Play from '@lucide/astro/icons/play';
import Van from '@lucide/astro/icons/van';
import X from '@lucide/astro/icons/x';

export const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle-alert': CircleAlert,
  mail: Mail,
  menu: Menu,
  'message-circle': MessageCircle,
  pause: Pause,
  play: Play,
  van: Van,
  x: X,
};

export type IconName = keyof typeof icons;
