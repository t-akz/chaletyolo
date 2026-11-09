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
 * Les textes alternatifs décrivent ce que montre la photo. Le mot-clé de la
 * page (ex. « chalet de luxe à Méribel ») n'y figure qu'avec parcimonie, sur
 * les photos principales, pour éviter le bourrage de mots-clés.
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
  'salles-de-bain': { fr: 'Salles de bain', en: 'Bathrooms' },
  piscine: { fr: 'Piscine', en: 'Pool' },
  'bien-etre': { fr: 'Bien-être', en: 'Wellness' },
  cinema: { fr: 'Home cinéma', en: 'Home cinema' },
  yoga: { fr: 'Salle de yoga', en: 'Yoga room' },
  jeux: { fr: 'Salle de jeux', en: 'Games room' },
  exterieur: { fr: 'Extérieur', en: 'Exterior' },
  meribel: { fr: 'Méribel', en: 'Méribel' },
  services: { fr: 'Services', en: 'Services' },
  /** Plans du chalet (section « Floor Plans » de la page Le chalet) : jamais dans la galerie. */
  plans: { fr: 'Plan', en: 'Floor plan' },
} satisfies Record<string, Localized>;

export type PhotoFolder = keyof typeof photoFolders;

/**
 * Catégories des filtres de la galerie, et dossiers qui les composent.
 * Les libellés des filtres sont dans src/content/{fr,en}/gallery.json.
 * Les dossiers « hero » (photos plein écran des pages) et « plans » (plans du chalet)
 * n'apparaissent pas dans la galerie.
 */
export const galleryCategories = {
  sejour: ['sejour', 'cuisine', 'services'],
  chambres: ['chambres', 'salles-de-bain'],
  'bien-etre': ['piscine', 'bien-etre'],
  loisirs: ['cinema', 'yoga', 'jeux'],
  exterieur: ['exterieur'],
  meribel: ['meribel'],
} as const satisfies Record<string, readonly PhotoFolder[]>;

export type GalleryCategory = keyof typeof galleryCategories;

/** Catégorie de galerie d'un dossier (ou « undefined » s'il n'est pas dans la galerie). */
export function categoryOf(folder: PhotoFolder): GalleryCategory | undefined {
  const entries = Object.entries(galleryCategories) as [GalleryCategory, readonly PhotoFolder[]][];
  return entries.find(([, folders]) => folders.includes(folder))?.[0];
}

export type PhotoSlot = {
  /** Identifiant = nom du fichier sans extension, ex. « piscine-01 ». */
  id: string;
  folder: PhotoFolder;
  alt: Localized;
  /**
   * Retouche facultative appliquée à l'affichage (filtre CSS), ex.
   * « brightness(0.9) » pour assombrir une photo trop blanche.
   * Le fichier d'origine n'est pas modifié : supprimez la ligne pour revenir à l'original.
   */
  filter?: string;
  /**
   * Cadrage facultatif quand la photo est rognée pour remplir son cadre
   * (position CSS « horizontal vertical »). Ex. « center 75% » : on voit
   * plutôt le bas de la photo. « 0% » = haut, « 50% » = centre (défaut), « 100% » = bas.
   */
  position?: string;
  /**
   * « false » : la photo reste utilisable sur les pages, mais n'apparaît pas
   * dans la Galerie. Par défaut, toute photo déclarée y figure.
   */
  inGallery?: false;
};

/** Liste des photos attendues. Ajoutez une ligne pour chaque nouvelle photo. */
const slots: PhotoSlot[] = [
  // Photos plein écran (hero) de chaque page
  // « accueil » : photo du chalet retouchée le 06/11/2026 (tuyau gris effacé à droite de l'ours) ;
  // la version d'origine, identique sinon, est hero/le-chalet.jpg.
  { id: 'accueil', folder: 'hero', alt: { fr: 'Façade en bois et pierre du Chalet Yolo sous la neige, chalet de luxe à Méribel', en: 'Snow-covered wood and stone façade of Chalet Yolo, a luxury catered chalet in Méribel' } },
  { id: 'le-chalet-01', folder: 'hero', alt: { fr: 'Salon cathédrale du Chalet Yolo avec cheminée, charpente en bois et baies vitrées sur la montagne', en: 'Cathedral-ceiling living room at Chalet Yolo with fireplace, timber beams and picture windows onto the mountains' } },
  { id: 'le-chalet', folder: 'hero', alt: { fr: 'Le Chalet Yolo sous la neige, à Méribel dans les 3 Vallées', en: 'Chalet Yolo under snow in Méribel, Les 3 Vallées' } },
  { id: 'services', folder: 'hero', alt: { fr: 'Table dressée pour le repas devant une baie vitrée avec vue sur la montagne', en: 'Table set for a meal by a large window with a mountain view' }, position: 'center 75%' },
  { id: 'meribel', folder: 'hero', alt: { fr: 'La station de Méribel enneigée, au cœur des 3 Vallées', en: 'Méribel ski resort under snow, in the heart of Les 3 Vallées' } },

  // Espaces du chalet
  { id: 'piscine-01', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée et salon de détente d’un chalet haut de gamme à Méribel', en: 'Heated indoor pool and lounge of a luxury chalet in Méribel' } },
  { id: 'piscine-02', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée sous une fenêtre en arc', en: 'Heated indoor pool beneath an arched window' } },
  // Hors galerie à la demande du client (09/11/2026) ; reste la photo qui monte dans le hero de l'accueil.
  { id: 'piscine-03', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée aux carreaux émeraude, éclairée par des spots', en: 'Heated indoor pool with emerald tiles and soft spotlights' }, inGallery: false },
  { id: 'piscine-04', folder: 'piscine', alt: { fr: 'Piscine intérieure chauffée aux carreaux émeraude, avec échelle en inox et tableaux colorés', en: 'Heated indoor pool with emerald tiles, a steel ladder and colourful artworks' } },
  { id: 'bien-etre-01', folder: 'bien-etre', alt: { fr: 'Spa du chalet avec douche et sauna', en: 'Chalet spa with shower and sauna' } },
  { id: 'bien-etre-02', folder: 'bien-etre', alt: { fr: 'Hammam voûté de l’espace bien-être', en: 'Vaulted hammam in the spa' } },
  { id: 'cinema-01', folder: 'cinema', alt: { fr: 'Home cinéma avec grand écran et canapé d’angle', en: 'Home cinema with large screen and corner sofa' } },
  { id: 'yoga-01', folder: 'yoga', alt: { fr: 'Salle de yoga', en: 'Yoga room' } },
  { id: 'yoga-02', folder: 'yoga', alt: { fr: 'Salle de yoga avec grand miroir, ballons et tapis de yoga', en: 'Yoga room with a large mirror, exercise balls and yoga mats' } },
  { id: 'sejour-01', folder: 'sejour', alt: { fr: 'Salon cathédrale avec cheminée et poutres en bois', en: 'Cathedral-ceiling living room with fireplace and timber beams' } },
  { id: 'sejour-02', folder: 'sejour', alt: { fr: 'Séjour avec feu de cheminée, suspensions en verre et cuisine ouverte sous charpente en bois', en: 'Living room with a log fire, glass pendant lights and open kitchen under timber beams' } },
  { id: 'cuisine-01', folder: 'cuisine', alt: { fr: 'Cuisine équipée sous charpente en bois, avec îlot', en: 'Fitted kitchen with island under timber beams' } },
  { id: 'chambre-01', folder: 'chambres', alt: { fr: 'Chambre Gentiane', en: 'Gentiane Room' } },
  { id: 'chambre-02', folder: 'chambres', alt: { fr: 'Chambre Centaurée des montagnes', en: 'Centaurée des montagnes Room' } },
  { id: 'chambre-03', folder: 'chambres', alt: { fr: 'Chambre L’Ancolie', en: 'L’Ancolie Room' } },
  { id: 'chambre-04', folder: 'chambres', alt: { fr: 'Chambre Rose des Alpes', en: 'Rose des Alpes Room' } },
  { id: 'chambre-05', folder: 'chambres', alt: { fr: 'Chambre Flocons', en: 'Flocons Room' } },
  { id: 'chambre-06', folder: 'chambres', alt: { fr: 'Chambre Marmottes', en: 'Marmottes Room' } },
  { id: 'sdb-01', folder: 'salles-de-bain', alt: { fr: 'Salle de bain avec double vasque et peignoirs Chalet Yolo', en: 'Bathroom with double basin and Chalet Yolo bathrobes' } },
  { id: 'sdb-02', folder: 'salles-de-bain', alt: { fr: 'Salle de bain en pierre grise avec double vasque', en: 'Grey stone bathroom with double basin' } },
  { id: 'sdb-03', folder: 'salles-de-bain', alt: { fr: 'Salle de bain avec baignoire et double vasque', en: 'Bathroom with bathtub and double basin' } },
  { id: 'exterieur-01', folder: 'exterieur', alt: { fr: 'Façade en bois et pierre du chalet sous la neige', en: 'Snow-covered wood and stone façade of the chalet' } },
  { id: 'meribel-01', folder: 'meribel', alt: { fr: 'Méribel', en: 'Méribel' } },
  { id: 'meribel-02', folder: 'meribel', alt: { fr: 'Méribel', en: 'Méribel' } },
  // Neige très lumineuse : légèrement assombrie (90 %) et contrastée (+5 %).
  { id: 'meribel-03', folder: 'meribel', alt: { fr: 'Méribel', en: 'Méribel' }, filter: 'brightness(0.9) contrast(1.05)' },
  { id: 'jeux-01', folder: 'jeux', alt: { fr: 'Salle de jeux', en: 'Games room' } },

  // Illustrations des services (galerie, filtre « Séjour »)
  { id: 'service-01', folder: 'services', alt: { fr: 'Local à skis avec chaussures, casques et vestes', en: 'Ski room with boots, helmets and jackets' } },
  // « service-02 » (apéritif) retirée de la galerie à la demande du client (05/11/2026) ; son fichier services/service-02.png reste dans le dossier.
  // exterieur-02 prend sa place dans la galerie (dernière position).
  { id: 'exterieur-02', folder: 'exterieur', alt: { fr: 'Entrée du chalet en bois et pierre sous la neige, avec une sculpture d’ours au-dessus de la porte', en: 'Snow-covered wood and stone entrance of the chalet, with a bear sculpture above the door' } },
  // Plans du chalet, un par niveau (section « Floor Plans » de la page Le chalet).
  { id: 'plan-niveau-1', folder: 'plans', alt: { fr: 'Plan du 1er niveau du chalet', en: 'Floor plan of level 1 of the chalet' } },
  { id: 'plan-niveau-2', folder: 'plans', alt: { fr: 'Plan du 2e niveau du chalet', en: 'Floor plan of level 2 of the chalet' } },
  { id: 'plan-niveau-3', folder: 'plans', alt: { fr: 'Plan du 3e niveau du chalet', en: 'Floor plan of level 3 of the chalet' } },
  { id: 'plan-niveau-4', folder: 'plans', alt: { fr: 'Plan du 4e niveau du chalet', en: 'Floor plan of level 4 of the chalet' } },
  { id: 'plan-niveau-5', folder: 'plans', alt: { fr: 'Plan du 5e niveau du chalet', en: 'Floor plan of level 5 of the chalet' } },
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

/**
 * Photos de la galerie : toutes les photos affichables, sauf les photos plein écran (hero)
 * et celles marquées « inGallery: false ».
 */
export function getGalleryPhotos(): (ResolvedPhoto & { category: GalleryCategory })[] {
  return getVisiblePhotos().flatMap((photo) => {
    if (photo.inGallery === false) return [];
    const category = categoryOf(photo.folder);
    return category ? [{ ...photo, category }] : [];
  });
}
