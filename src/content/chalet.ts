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
  resort: 'Méribel',
  postalCode: '73550',
  town: 'Les Allues',
  region: 'Savoie',
  countryCode: 'FR',
  /** Ensemble immobilier dont fait partie le chalet. */
  complex: 'Chalets Célénia',
} as const;

/**
 * Emplacement exact du chalet (fourni par le client le 09/11/2026, qui a levé la
 * règle de confidentialité pour la carte : CLAUDE.md §5.7).
 * Utilisé uniquement par la carte de la page Le chalet (src/components/ChaletMap.astro).
 */
export const chaletLocation = { lat: 45.411467764162786, lng: 6.561211140074287 } as const;

/**
 * Repères affichés autour du chalet sur la même carte (fournis par le client le 10/11/2026 ; Méribel Village déplacé le même jour).
 * « id » = clé du nom dans src/content/{fr,en}/chalet.json → location.map.landmarks.
 */
export const mapLandmarks = [
  { id: 'meribelVillage', lat: 45.4165892174434, lng: 6.564810190447449 },
  { id: 'olympe', lat: 45.40814718699374, lng: 6.561047556284676 },
  { id: 'chaudanne', lat: 45.39116010866575, lng: 6.567440749622259 },
] as const;

// ---------------------------------------------------------------------------
// Chiffres clés
// ---------------------------------------------------------------------------
export const figures = {
  /** Corrigé par le client le 10/11/2026 (auparavant 350). */
  surfaceM2: 330,
  guests: 15,
  bedrooms: 6,
  suites: 4,
  bathrooms: 6,
  levels: 4,
  elevator: true,
  checkIn: '17:00',
  checkOut: '10:00',
} as const;

// ---------------------------------------------------------------------------
// Chambres
// Noms fournis par le client (02/11/2026). En anglais, le nom propre reste
// en français et seul « Chambre » est traduit (« Gentiane Room »).
// ---------------------------------------------------------------------------
export const bedrooms: { number: number; name: Localized; beds: Localized }[] = [
  { number: 1, name: { fr: 'Chambre Gentiane', en: 'Gentiane Room' }, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 2, name: { fr: 'Chambre Centaurée des montagnes', en: 'Centaurée des montagnes Room' }, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 3, name: { fr: 'Chambre L\'Ancolie', en: 'L\'Ancolie Room' }, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 4, name: { fr: 'Chambre Rose des Alpes', en: 'Rose des Alpes Room' }, beds: { fr: 'Lit 180', en: '180 cm bed' } },
  { number: 5, name: { fr: 'Chambre Flocons', en: 'Flocons Room' }, beds: { fr: '2 lits superposés', en: '2 bunk beds' } },
  { number: 6, name: { fr: 'Chambre Marmottes', en: 'Marmottes Room' }, beds: { fr: '1 lit simple + 1 lit superposé', en: '1 single bed + 1 bunk bed' } },
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

/** Dossiers photo à masquer car liés à un équipement non confirmé (ex. « jeux »). */
export function hiddenPhotoFolders(): string[] {
  return allFeatures
    .filter((feature) => !feature.confirmed && feature.photoFolder)
    .map((feature) => feature.photoFolder as string);
}

// ---------------------------------------------------------------------------
// Formules de location (confirmé par le client le 30/10/2026)
// Location proposée exclusivement en Half Catered ou Full Catered,
// avec chef privé, majordome et chauffeur.
// ---------------------------------------------------------------------------
export const catering = {
  formulas: [
    { id: 'half-catered', label: { fr: 'Demi-pension', en: 'Half Catered' } },
    { id: 'full-catered', label: { fr: 'Pension complète', en: 'Full Catered' } },
  ] satisfies { id: string; label: Localized }[],
  staff: [
    { id: 'chef', label: { fr: 'Chef privé', en: 'Private chef' } },
    { id: 'butler', label: { fr: 'Majordome', en: 'Butler' } },
    { id: 'chauffeur', label: { fr: 'Chauffeur', en: 'Chauffeur' } },
  ] satisfies { id: string; label: Localized }[],
};

// ---------------------------------------------------------------------------
// Méribel
// ---------------------------------------------------------------------------
export const meribel = {
  foundedYear: 1938,
  skiArea: { fr: 'Les 3 Vallées', en: 'Les 3 Vallées' } satisfies Localized,
  skiAreaKm: 600,
  architecture: { fr: 'Architecture savoyarde', en: 'Savoyard architecture' } satisfies Localized,
};
