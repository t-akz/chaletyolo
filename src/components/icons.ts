/**
 * Icônes Lucide utilisées sur le site (trait fin).
 * Pour ajouter une icône : choisissez-la sur https://lucide.dev/icons,
 * importez-la ci-dessous et ajoutez-la à la liste « icons ».
 * Les fichiers de contenu font ensuite référence à son nom, ex. « van ».
 */
import ArrowRight from '@lucide/astro/icons/arrow-right';
import BedDouble from '@lucide/astro/icons/bed-double';
import CableCar from '@lucide/astro/icons/cable-car';
import Car from '@lucide/astro/icons/car';
import ChevronDown from '@lucide/astro/icons/chevron-down';
import ChevronLeft from '@lucide/astro/icons/chevron-left';
import ChevronRight from '@lucide/astro/icons/chevron-right';
import ConciergeBell from '@lucide/astro/icons/concierge-bell';
import Layers from '@lucide/astro/icons/layers';
import Lock from '@lucide/astro/icons/lock';
import Mail from '@lucide/astro/icons/mail';
import MapPin from '@lucide/astro/icons/map-pin';
import Menu from '@lucide/astro/icons/menu';
import MessageCircle from '@lucide/astro/icons/message-circle';
import MountainSnow from '@lucide/astro/icons/mountain-snow';
import PlaneLanding from '@lucide/astro/icons/plane-landing';
import Shirt from '@lucide/astro/icons/shirt';
import Sparkles from '@lucide/astro/icons/sparkles';
import TrainFront from '@lucide/astro/icons/train-front';
import Van from '@lucide/astro/icons/van';
import X from '@lucide/astro/icons/x';

export const icons = {
  'arrow-right': ArrowRight,
  'bed-double': BedDouble,
  'cable-car': CableCar,
  car: Car,
  'chevron-down': ChevronDown,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'concierge-bell': ConciergeBell,
  layers: Layers,
  lock: Lock,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  'message-circle': MessageCircle,
  'mountain-snow': MountainSnow,
  'plane-landing': PlaneLanding,
  shirt: Shirt,
  sparkles: Sparkles,
  'train-front': TrainFront,
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
