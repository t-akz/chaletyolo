/**
 * Données factuelles du Chalet Yolo — SOURCE DE VÉRITÉ (§8 de CLAUDE.md).
 *
 * Règles :
 * - ne rien ajouter qui ne figure pas dans CLAUDE.md §8 ;
 * - une information manquante = « [À FOURNIR] » (constante TO_PROVIDE) ;
 * - chaque libellé existe en français (fr) et en anglais (en).
 */
import type { Localized } from '../i18n/languages';

// ---------------------------------------------------------------------------
// Identité
// ---------------------------------------------------------------------------
export const identity = {
  name: 'Chalet Yolo',
  hamlet: 'La Gittaz',
  resort: 'Méribel',
  postalCode: '73550',
  town: 'Les Allues',
  region: 'Savoie',
  countryCode: 'FR',
  /** Ensemble immobilier dont fait partie le chalet. */
  complex: 'Chalets Célénia',
} as const;

// ---------------------------------------------------------------------------
// Chiffres clés
// ---------------------------------------------------------------------------
export const figures = {
  surfaceM2: 350,
  guests: 15,
  bedrooms: 6,
  suites: 4,
  bathrooms: 6,
  levels: 5,
  elevator: true,
  checkIn: '17:00',
  checkOut: '10:00',
} as const;

// ---------------------------------------------------------------------------
// Chambres
// ---------------------------------------------------------------------------
export const bedrooms: { number: number; beds: Localized }[] = [
  { number: 1, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 2, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 3, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 4, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 5, beds: { fr: '2 lits superposés', en: '2 bunk beds' } },
  { number: 6, beds: { fr: '1 lit simple + 1 lit superposé', en: '1 single bed + 1 bunk bed' } },
];

// ---------------------------------------------------------------------------
// Niveaux (5 au total, desservis par ascenseur).
// Seuls les niveaux connus sont listés ; les autres sont « [À FOURNIR] ».
// ---------------------------------------------------------------------------
export const knownLevels: { level: number; items: Localized[] }[] = [
  {
    level: 4,
    items: [
      { fr: 'Salon cathédrale avec cheminée', en: 'Cathedral-ceiling living room with fireplace' },
      { fr: 'Grande table', en: 'Large dining table' },
      {
        fr: 'Cuisine équipée (double four, frigo américain, lave-vaisselle, cave à vin, Nespresso)',
        en: 'Fitted kitchen (double oven, American-style fridge, dishwasher, wine cellar, Nespresso)',
      },
    ],
  },
  {
    level: 3,
    items: [
      { fr: '3 chambres en suite (douche + WC séparés)', en: '3 en-suite bedrooms (shower + separate WC)' },
      { fr: 'Une salle de bain avec baignoire', en: 'A bathroom with bathtub' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Équipements phares
// « confirmed: false » → l'équipement n'est affiché NULLE PART sur le site.
// « photoFolder » → dossier de src/assets/photos/ qui illustre l'équipement.
// ---------------------------------------------------------------------------
export type Feature = {
  id: string;
  label: Localized;
  confirmed: boolean;
  photoFolder?: string;
};

const allFeatures: Feature[] = [
  { id: 'pool', label: { fr: 'Piscine intérieure chauffée et privative', en: 'Heated private indoor pool' }, confirmed: true, photoFolder: 'piscine' },
  { id: 'jacuzzi', label: { fr: 'Jacuzzi', en: 'Jacuzzi' }, confirmed: true, photoFolder: 'bien-etre' },
  { id: 'jacuzzi-bath', label: { fr: 'Bain jacuzzi', en: 'Jacuzzi bath' }, confirmed: true, photoFolder: 'bien-etre' },
  { id: 'sauna', label: { fr: 'Sauna', en: 'Sauna' }, confirmed: true, photoFolder: 'bien-etre' },
  { id: 'hammam', label: { fr: 'Hammam', en: 'Hammam' }, confirmed: true, photoFolder: 'bien-etre' },
  { id: 'yoga', label: { fr: 'Salle de yoga', en: 'Yoga room' }, confirmed: true, photoFolder: 'yoga' },
  { id: 'cinema', label: { fr: 'Home cinéma', en: 'Home cinema' }, confirmed: true, photoFolder: 'cinema' },
  { id: 'living-room', label: { fr: 'Salon cathédrale avec cheminée', en: 'Cathedral-ceiling living room with fireplace' }, confirmed: true, photoFolder: 'sejour' },
  { id: 'elevator', label: { fr: 'Ascenseur', en: 'Lift' }, confirmed: true },
  { id: 'mountain-view', label: { fr: 'Vue montagne', en: 'Mountain view' }, confirmed: true, photoFolder: 'exterieur' },
  { id: 'games-room', label: { fr: 'Salle de jeux', en: 'Games room' }, confirmed: false, photoFolder: 'jeux' },
];

/** Équipements phares affichables (uniquement ceux confirmés). À utiliser partout. */
export function visibleFeatures(): Feature[] {
  return allFeatures.filter((feature) => feature.confirmed);
}

/** Vrai si un équipement est confirmé (ex. isFeatureConfirmed('games-room')). */
export function isFeatureConfirmed(id: string): boolean {
  return allFeatures.some((feature) => feature.id === id && feature.confirmed);
}

/** Dossiers photo à masquer car liés à un équipement non confirmé (ex. « jeux »). */
export function hiddenPhotoFolders(): string[] {
  return allFeatures
    .filter((feature) => !feature.confirmed && feature.photoFolder)
    .map((feature) => feature.photoFolder as string);
}

// ---------------------------------------------------------------------------
// Tous les équipements (pour l'accordéon « Tous les équipements »)
// ---------------------------------------------------------------------------
export const amenities: { id: string; title: Localized; items: Localized[] }[] = [
  {
    id: 'kitchen',
    title: { fr: 'Cuisine', en: 'Kitchen' },
    items: [
      { fr: 'Cuisine équipée', en: 'Fitted kitchen' },
      { fr: 'Four', en: 'Oven' },
      { fr: 'Micro-ondes', en: 'Microwave' },
      { fr: 'Cuisinière', en: 'Cooker' },
      { fr: 'Réfrigérateur', en: 'Fridge' },
      { fr: 'Congélateur', en: 'Freezer' },
      { fr: 'Lave-vaisselle', en: 'Dishwasher' },
      { fr: 'Machine à café', en: 'Coffee machine' },
      { fr: 'Bouilloire', en: 'Kettle' },
      { fr: 'Grille-pain', en: 'Toaster' },
      { fr: 'Verres à vin', en: 'Wine glasses' },
      { fr: 'Produits de base', en: 'Basic supplies' },
    ],
  },
  {
    id: 'comfort',
    title: { fr: 'Confort', en: 'Comfort' },
    items: [
      { fr: 'Draps et serviettes', en: 'Bed linen and towels' },
      { fr: 'Sèche-cheveux', en: 'Hair dryer' },
      { fr: 'Fer à repasser', en: 'Iron' },
      { fr: 'Cintres', en: 'Hangers' },
      { fr: 'Radiateurs', en: 'Radiators' },
      { fr: 'Eau chaude', en: 'Hot water' },
      { fr: 'TV', en: 'TV' },
      { fr: 'Internet', en: 'Internet' },
      { fr: 'Espace de travail', en: 'Workspace' },
      { fr: 'Balcon', en: 'Balcony' },
      { fr: 'Cheminée', en: 'Fireplace' },
    ],
  },
  {
    id: 'housekeeping',
    title: { fr: 'Entretien', en: 'Housekeeping' },
    items: [
      { fr: 'Lave-linge', en: 'Washing machine' },
      { fr: 'Sèche-linge', en: 'Tumble dryer' },
      { fr: 'Aspirateur', en: 'Vacuum cleaner' },
      { fr: 'Produits de nettoyage', en: 'Cleaning products' },
      { fr: 'Ménage professionnel inclus', en: 'Professional cleaning included' },
    ],
  },
  {
    id: 'children',
    title: { fr: 'Enfants et bébés', en: 'Children and babies' },
    items: [
      { fr: 'Adapté aux enfants (2 ans et +)', en: 'Suitable for children (2 years and over)' },
      { fr: 'Adapté aux bébés (moins de 2 ans)', en: 'Suitable for babies (under 2)' },
      { fr: 'Chaise haute', en: 'High chair' },
      { fr: 'Lit et matériel bébé', en: 'Cot and baby equipment' },
    ],
  },
  {
    id: 'ski',
    title: { fr: 'Ski et accès', en: 'Skiing and access' },
    items: [
      { fr: 'Casier à skis', en: 'Ski locker' },
      { fr: 'Navette privée vers les pistes', en: 'Private shuttle to the slopes' },
      { fr: 'Chauffeur', en: 'Driver' },
    ],
  },
  {
    id: 'parking',
    title: { fr: 'Stationnement', en: 'Parking' },
    items: [
      { fr: 'Parking privé, intérieur et sécurisé', en: 'Private, indoor and secure parking' },
      { fr: 'Garage', en: 'Garage' },
    ],
  },
  {
    id: 'rules',
    title: { fr: 'Règles et sécurité', en: 'Rules and safety' },
    items: [
      { fr: 'Animaux acceptés', en: 'Pets allowed' },
      { fr: 'Non-fumeur', en: 'Non-smoking' },
      { fr: 'Détecteur de fumée', en: 'Smoke detector' },
      { fr: 'Détecteur de monoxyde de carbone', en: 'Carbon monoxide detector' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Accès aux pistes
// ---------------------------------------------------------------------------
export const slopesAccess = {
  shuttle: {
    fr: 'Navette privée incluse matin et soir vers les remontées',
    en: 'Private shuttle included morning and evening to the ski lifts',
  } satisfies Localized,
  /** À confirmer : ne pas présenter comme acquis. */
  olympeGondola: {
    label: {
      fr: "Télécabine de l'Olympe accessible à pied",
      en: 'Olympe gondola within walking distance',
    } satisfies Localized,
    toConfirm: true,
  },
};

// ---------------------------------------------------------------------------
// Services inclus
// ---------------------------------------------------------------------------
export const included: { id: 'arrival' | 'stay' | 'departure'; title: Localized; items: Localized[] }[] = [
  {
    id: 'arrival',
    title: { fr: 'Arrivée', en: 'Arrival' },
    items: [
      { fr: 'Lits préparés', en: 'Beds made up' },
      { fr: 'Linge', en: 'Linen' },
      { fr: 'Serviettes', en: 'Towels' },
      { fr: 'Peignoirs', en: 'Bathrobes' },
      { fr: 'Chaussons', en: 'Slippers' },
      { fr: 'Serviettes de piscine', en: 'Pool towels' },
      { fr: "Produits d'accueil", en: 'Toiletries' },
    ],
  },
  {
    id: 'stay',
    title: { fr: 'Pendant le séjour', en: 'During your stay' },
    items: [
      { fr: 'Ménage quotidien des pièces de vie (6j/7)', en: 'Daily cleaning of living areas (6 days a week)' },
      { fr: 'Changement des serviettes à mi-séjour', en: 'Towel change mid-stay' },
      { fr: 'Buanderie', en: 'Laundry room' },
      { fr: 'Lit et matériel bébé sur demande', en: 'Cot and baby equipment on request' },
      { fr: 'Conciergerie dédiée', en: 'Dedicated concierge' },
      { fr: 'Transport privé en van vers les remontées', en: 'Private van transport to the ski lifts' },
    ],
  },
  {
    id: 'departure',
    title: { fr: 'Départ', en: 'Departure' },
    items: [
      { fr: 'Ménage de fin de séjour inclus', en: 'End-of-stay cleaning included' },
      { fr: 'Check-out simplifié', en: 'Simplified check-out' },
    ],
  },
];

/** Les 4 services inclus mis en avant sur la page d'accueil (§6). */
export const highlightedServices: { id: string; label: Localized }[] = [
  { id: 'shuttle', label: { fr: 'Navette privée', en: 'Private shuttle' } },
  { id: 'cleaning', label: { fr: 'Ménage quotidien', en: 'Daily cleaning' } },
  { id: 'concierge', label: { fr: 'Conciergerie', en: 'Concierge' } },
  { id: 'linen', label: { fr: 'Linge et peignoirs', en: 'Linen and bathrobes' } },
];

// ---------------------------------------------------------------------------
// Services à la carte
// ---------------------------------------------------------------------------
export const aLaCarte: { id: 'activities' | 'dining' | 'concierge'; title: Localized; items: Localized[] }[] = [
  {
    id: 'activities',
    title: { fr: 'Activités', en: 'Activities' },
    items: [
      { fr: 'Matériel de ski livré au chalet', en: 'Ski equipment delivered to the chalet' },
      { fr: 'Forfaits', en: 'Ski passes' },
      { fr: 'Massages et soins au chalet', en: 'Massages and treatments at the chalet' },
      { fr: 'Moniteur de ski', en: 'Ski instructor' },
    ],
  },
  {
    id: 'dining',
    title: { fr: 'Restauration', en: 'Dining' },
    items: [
      { fr: 'Petit-déjeuner continental', en: 'Continental breakfast' },
      { fr: 'Plats traiteur', en: 'Catered dishes' },
      { fr: 'Chef à domicile', en: 'Private chef' },
      { fr: 'Carte des vins et champagnes', en: 'Wine and champagne list' },
    ],
  },
  {
    id: 'concierge',
    title: { fr: 'Conciergerie', en: 'Concierge' },
    items: [
      { fr: 'Transferts', en: 'Transfers' },
      { fr: 'Voiturier en station', en: 'Valet service in the resort' },
      { fr: 'Babysitting à domicile', en: 'Babysitting at the chalet' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Méribel
// ---------------------------------------------------------------------------
export const meribel = {
  foundedYear: 1938,
  skiArea: { fr: 'Les 3 Vallées', en: 'Les 3 Vallées' } satisfies Localized,
  skiAreaKm: 600,
  architecture: { fr: 'Architecture savoyarde', en: 'Savoyard architecture' } satisfies Localized,
};

// ---------------------------------------------------------------------------
// Accès
// ---------------------------------------------------------------------------
export const access = {
  road: {
    steps: ['A43 → Albertville', 'RN90 → Moûtiers', 'D90 → Méribel'],
    /** Distance de Moûtiers à Méribel par la D90. */
    lastLegKm: 19,
  },
  train: {
    fr: 'Gare de Moûtiers–Salins-les-Thermes, puis bus ou taxi',
    en: 'Moûtiers–Salins-les-Thermes station, then bus or taxi',
  } satisfies Localized,
  airports: [
    { name: { fr: 'Chambéry', en: 'Chambéry' }, duration: '1h30' },
    { name: { fr: 'Genève', en: 'Geneva' }, duration: '2h' },
    { name: { fr: 'Lyon', en: 'Lyon' }, duration: '2h15' },
    { name: { fr: 'Grenoble', en: 'Grenoble' }, duration: '2h15' },
  ] satisfies { name: Localized; duration: string }[],
};
