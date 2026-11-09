// Données des plans du chalet.
// Coordonnées des étiquettes exprimées dans le repère de l'image (viewBox).
export type Lang = 'fr' | 'en';

export interface PlanLabel {
  x: number;
  y: number;
  fr: string;
  en: string;
  /** Taille de police dans le repère du plan (défaut : 52). */
  size?: number;
  /** Coupe l'étiquette en deux lignes (pièces étroites). */
  wrap?: boolean;
  /** Écrit l'étiquette à la verticale (pièces étroites et hautes). */
  rotate?: boolean;
}

export interface Plan {
  title: Record<Lang, string>;
  width: number;
  height: number;
  labels: PlanLabel[];
}

export const plans: Record<string, Plan> = {
  'niveau-1': {
    title: { fr: 'Niveau 1', en: 'Level 1' },
    width: 1330,
    height: 1500,
    labels: [
      { x: 286, y: 317, fr: 'Dortoir', en: 'Dormitory' },
      { x: 596, y: 288, fr: 'Salle De Bain', en: 'Bathroom', size: 40 },
      { x: 322, y: 882, fr: 'Home Cinéma', en: 'Home Cinema' },
      { x: 928, y: 740, fr: 'Hammam', en: 'Steam Room', size: 40 },
      { x: 898, y: 975, fr: 'Toilettes', en: 'Restroom', size: 40 },
      { x: 1207, y: 920, fr: 'Douche Sensorielle', en: 'Sensory Shower', size: 34, wrap: true },
      { x: 436, y: 1265, fr: 'Fitness & Yoga Room', en: 'Fitness & Yoga Room' },
      { x: 1043, y: 1292, fr: 'Sauna', en: 'Sauna' },
      { x: 882, y: 206, fr: 'Ascenseur', en: 'Elevator', size: 44 },
      { x: 1142, y: 166, fr: 'Escalier', en: 'Stairs', size: 44 },
    ],
  },
  'niveau-3': {
    title: { fr: 'Niveau 3', en: 'Level 3' },
    width: 2240,
    height: 1330,
    labels: [
      { x: 215, y: 165, fr: 'Salle De Bain 1', en: 'Bathroom 1', size: 52 },
      { x: 265, y: 640, fr: 'Chambre 1', en: 'Bedroom 1', size: 70 },
      { x: 452, y: 140, fr: 'Toilettes', en: 'Restroom', size: 44, rotate: true },
      { x: 594, y: 140, fr: 'Toilettes', en: 'Restroom', size: 44 },
      { x: 780, y: 140, fr: 'Ascenseur', en: 'Elevator', size: 48 },
      { x: 1018, y: 95, fr: 'Escalier', en: 'Stairs', size: 54 },
      { x: 622, y: 680, fr: 'Salle De Bain 2', en: 'Bathroom 2', size: 52, wrap: true },
      { x: 950, y: 700, fr: 'Chambre 2', en: 'Bedroom 2', size: 70 },
      { x: 1370, y: 650, fr: 'Chambre 3', en: 'Bedroom 3', size: 70 },
      { x: 1215, y: 175, fr: 'Toilettes', en: 'Restroom', size: 44, rotate: true },
      { x: 1440, y: 175, fr: 'Salle De Bain 3', en: 'Bathroom 3', size: 52 },
      { x: 267, y: 1015, fr: 'Balcon', en: 'Balcony', size: 56 },
      { x: 892, y: 1015, fr: 'Balcon', en: 'Balcony', size: 56 },
      { x: 1850, y: 800, fr: 'Terrasse', en: 'Terrace', size: 80 },
    ],
  },
  'niveau-4': {
    title: { fr: 'Niveau 4', en: 'Level 4' },
    width: 1690,
    height: 1600,
    labels: [
      { x: 460, y: 190, fr: 'Terrasse', en: 'Terrace', size: 70 },
      { x: 360, y: 680, fr: 'Cuisine', en: 'Kitchen', size: 62 },
      { x: 390, y: 1260, fr: 'Salle À Manger', en: 'Dining Room', size: 62 },
      { x: 1190, y: 980, fr: 'Salon', en: 'Living Room', size: 62 },
      { x: 1100, y: 340, fr: 'Ascenseur', en: 'Elevator', size: 50 },
      { x: 1425, y: 290, fr: 'Escalier', en: 'Stairs', size: 50 },
      { x: 785, y: 1080, fr: 'Cheminée', en: 'Fireplace', size: 44, rotate: true },
    ],
  },
};
