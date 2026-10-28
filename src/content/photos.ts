/**
 * Registre des photos du site.
 *
 * Chaque photo a un identifiant (ex. « piscine-01 »), un dossier et un nom de
 * fichier attendu dans src/assets/photos/<dossier>/, et un texte alternatif
 * FR/EN (lu par les lecteurs d'écran et les moteurs de recherche).
 *
 * Pour mettre une vraie photo : déposez le fichier (jpg, jpeg, png, webp ou
 * avif) dans le bon dossier, avec le nom indiqué. Ex. : la photo
 * « piscine-01 » → src/assets/photos/piscine/piscine-01.jpg
 * Tant que le fichier est absent, un aplat neutre avec un libellé s'affiche.
 *
 * Les textes alternatifs ci-dessous décrivent l'espace de manière générique ;
 * précisez-les quand les vraies photos seront là.
 */
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/languages';
import { hiddenPhotoFolders } from './chalet';

/** Dossiers de src/assets/photos/ et leur libellé (affiché sur les aplats de remplacement). */
export const photoFolders = {
  hero: { fr: 'Photo principale', en: 'Main photo' },
  sejour: { fr: 'Séjour', en: 'Living room' },
  cuisine: { fr: 'Cuisine', en: 'Kitchen' },
  chambres: { fr: 'Chambres', en: 'Bedrooms' },
  piscine: { fr: 'Piscine', en: 'Pool' },
  'bien-etre': { fr: 'Bien-être', en: 'Wellness' },
  cinema: { fr: 'Home cinéma', en: 'Home cinema' },
  yoga: { fr: 'Salle de yoga', en: 'Yoga room' },
  jeux: { fr: 'Salle de jeux', en: 'Games room' },
  exterieur: { fr: 'Extérieur', en: 'Exterior' },
  meribel: { fr: 'Méribel', en: 'Méribel' },
} satisfies Record<string, Localized>;

export type PhotoFolder = keyof typeof photoFolders;

export type PhotoSlot = {
  /** Identifiant = nom du fichier sans extension, ex. « piscine-01 ». */
  id: string;
  folder: PhotoFolder;
  alt: Localized;
};

/** Liste des photos attendues. Ajoutez une ligne pour chaque nouvelle photo. */
const slots: PhotoSlot[] = [
  // Photos plein écran (hero) de chaque page
  { id: 'accueil', folder: 'hero', alt: { fr: 'Le Chalet Yolo à Méribel', en: 'Chalet Yolo in Méribel' } },
  { id: 'le-chalet', folder: 'hero', alt: { fr: 'Le Chalet Yolo', en: 'Chalet Yolo' } },
  { id: 'services', folder: 'hero', alt: { fr: 'Les services du Chalet Yolo', en: 'Chalet Yolo services' } },
  { id: 'meribel', folder: 'hero', alt: { fr: 'La station de Méribel', en: 'The resort of Méribel' } },

  // Espaces du chalet
  { id: 'piscine-01', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée', en: 'Heated indoor pool' } },
  { id: 'piscine-02', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée', en: 'Heated indoor pool' } },
  { id: 'bien-etre-01', folder: 'bien-etre', alt: { fr: 'Espace bien-être', en: 'Wellness area' } },
  { id: 'bien-etre-02', folder: 'bien-etre', alt: { fr: 'Espace bien-être', en: 'Wellness area' } },
  { id: 'cinema-01', folder: 'cinema', alt: { fr: 'Home cinéma', en: 'Home cinema' } },
  { id: 'yoga-01', folder: 'yoga', alt: { fr: 'Salle de yoga', en: 'Yoga room' } },
  { id: 'sejour-01', folder: 'sejour', alt: { fr: 'Salon cathédrale avec cheminée', en: 'Cathedral-ceiling living room with fireplace' } },
  { id: 'sejour-02', folder: 'sejour', alt: { fr: 'Séjour', en: 'Living room' } },
  { id: 'cuisine-01', folder: 'cuisine', alt: { fr: 'Cuisine équipée', en: 'Fitted kitchen' } },
  { id: 'chambre-01', folder: 'chambres', alt: { fr: 'Chambre 1', en: 'Bedroom 1' } },
  { id: 'chambre-02', folder: 'chambres', alt: { fr: 'Chambre 2', en: 'Bedroom 2' } },
  { id: 'chambre-03', folder: 'chambres', alt: { fr: 'Chambre 3', en: 'Bedroom 3' } },
  { id: 'chambre-04', folder: 'chambres', alt: { fr: 'Chambre 4', en: 'Bedroom 4' } },
  { id: 'chambre-05', folder: 'chambres', alt: { fr: 'Chambre 5', en: 'Bedroom 5' } },
  { id: 'chambre-06', folder: 'chambres', alt: { fr: 'Chambre 6', en: 'Bedroom 6' } },
  { id: 'exterieur-01', folder: 'exterieur', alt: { fr: 'Le chalet vu de l’extérieur', en: 'The chalet from outside' } },
  { id: 'exterieur-02', folder: 'exterieur', alt: { fr: 'Vue montagne', en: 'Mountain view' } },
  { id: 'meribel-01', folder: 'meribel', alt: { fr: 'Méribel', en: 'Méribel' } },
  { id: 'meribel-02', folder: 'meribel', alt: { fr: 'Méribel', en: 'Méribel' } },
  { id: 'jeux-01', folder: 'jeux', alt: { fr: 'Salle de jeux', en: 'Games room' } },
];

// Tous les fichiers image présents dans src/assets/photos/ (détectés automatiquement).
const files = import.meta.glob<ImageMetadata>('../assets/photos/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true,
  import: 'default',
});

/** Trouve le fichier image d'une photo, quelle que soit son extension. */
function findFile(slot: PhotoSlot): ImageMetadata | undefined {
  const prefix = `../assets/photos/${slot.folder}/${slot.id}.`;
  const path = Object.keys(files).find((key) => key.startsWith(prefix));
  return path ? files[path] : undefined;
}

export type ResolvedPhoto = PhotoSlot & {
  /** Image prête à être optimisée, ou « undefined » si le fichier n'est pas encore là. */
  image: ImageMetadata | undefined;
  /** Vrai si la photo illustre un équipement non confirmé (ne pas l'afficher). */
  hidden: boolean;
};

/** Renvoie une photo par son identifiant. Erreur au build si l'identifiant n'existe pas. */
export function getPhoto(id: string): ResolvedPhoto {
  const slot = slots.find((s) => s.id === id);
  if (!slot) throw new Error(`Photo inconnue : « ${id} ». Ajoutez-la dans src/content/photos.ts.`);
  return { ...slot, image: findFile(slot), hidden: hiddenPhotoFolders().includes(slot.folder) };
}

/** Toutes les photos affichables (sans celles des équipements non confirmés). */
export function getVisiblePhotos(): ResolvedPhoto[] {
  return slots.map((slot) => getPhoto(slot.id)).filter((photo) => !photo.hidden);
}
