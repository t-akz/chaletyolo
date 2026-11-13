/**
 * Carte interactive de la page Le chalet (MapLibre + fonds OpenFreeMap).
 *
 * Ce fichier n'est chargé qu'à l'approche de la carte (voir ChaletMap.astro) :
 * MapLibre pèse environ 450 Ko (compressé), inutile de le télécharger si on ne va pas jusque-là.
 *
 * - Fond « Positron » d'OpenFreeMap (gratuit, sans compte, sans clé, sans cookie),
 *   légèrement réchauffé aux couleurs du site.
 * - Repère : la tête d'ours du logo, sur l'emplacement exact du chalet.
 * - 3 repères autour (Méribel Village, Olympe, La Chaudanne) : triangle + nom.
 *   Au chargement, la carte se cadre pour que le chalet et les 3 repères soient visibles.
 * - Trait pointillé très léger du chalet vers les repères qui ont une durée, avec une pastille
 *   (« 4 min »…) au milieu du trait (demande du client du 10/11/2026). Pas de trajet vers
 *   Olympe (retiré à la demande du client le 13/11/2026) : le repère reste.
 * (Pistes de ski OpenSnowMap retirées à la demande du client le 10/11/2026.)
 * - Molette : zoom seulement avec Ctrl / ⌘ ; mobile : deux doigts pour déplacer
 *   (sinon la page resterait « coincée » dans la carte en défilant).
 */
import { Map as MapLibreMap, Marker, NavigationControl, setWorkerUrl, type FilterSpecification } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// Le « worker » de MapLibre (calculs en arrière-plan) est copié tel quel dans le site.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

setWorkerUrl(workerUrl);

/** Style du fond de carte (OpenFreeMap). */
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

/** Teintes du fond, accordées au thème (CLAUDE.md §5.2). */
type PaintProperty = Parameters<MapLibreMap['setPaintProperty']>[1];
const TINTS: [layer: string, property: PaintProperty, color: string][] = [
  ['background', 'background-color', '#F7F2EA'],
  ['landuse_residential', 'fill-color', '#EFE8DD'],
  ['building', 'fill-color', '#EAE2D5'],
  ['park', 'fill-color', '#E8E9DF'],
  ['landcover_wood', 'fill-color', '#E1E4DA'],
];

export interface ChaletMapOptions {
  lat: number;
  lng: number;
  /** Libellés de l'interface de la carte, dans la langue de la page. */
  locale: Record<string, string>;
  /** Élément HTML du repère (tête d'ours). */
  marker: HTMLElement;
  /**
   * Repères autour du chalet : position, élément HTML (triangle + nom) et, facultative,
   * pastille de durée. Sans pastille : ni trait pointillé ni durée, seulement le repère.
   */
  landmarks: {
    lat: number;
    lng: number;
    element: HTMLElement;
    duration?: HTMLElement;
  }[];
}

/** Trait pointillé chalet → repère : taupe des éléments décoratifs (CLAUDE.md §5.2), très léger. */
const ROUTE_PAINT = {
  'line-color': '#8B6A55',
  'line-opacity': 0.6,
  'line-width': 1.25,
  'line-dasharray': [2, 3],
};

/**
 * Distance minimale (en pixels) entre le centre de la tête d'ours et le centre d'une pastille
 * de durée : rayon de la tête d'ours (24) + demi-diagonale de la pastille + petite marge.
 * Quand le milieu du trait est plus près que ça (trait court, petit zoom), la pastille
 * se décale sur le côté droit du trait pour ne pas passer sous la tête d'ours.
 */
const DURATION_CLEARANCE = 50;

/**
 * Nom de lieu du fond de carte masqué, car il ferait doublon avec notre repère
 * « Méribel Village » (demande du client du 10/11/2026). Le test ignore les
 * majuscules et accepte « Méribel » / « Meribel », avec ou sans tiret.
 */
const BASE_NAME = ['downcase', ['coalesce', ['get', 'name:latin'], ['get', 'name'], '']];
const HIDE_BASE_LABEL = [
  'all',
  ['in', 'village', BASE_NAME],
  ['any', ['in', 'méribel', BASE_NAME], ['in', 'meribel', BASE_NAME]],
];

/**
 * Marges (en pixels) autour des repères lors du cadrage ; plus en bas pour le nom sous le triangle.
 * Plus serrées sur petit écran, où la carte est petite.
 */
const FIT_PADDING = { top: 48, right: 64, bottom: 72, left: 64 };
const FIT_PADDING_SMALL = { top: 32, right: 24, bottom: 48, left: 24 };

export function mountChaletMap(container: HTMLElement, { lat, lng, locale, marker, landmarks }: ChaletMapOptions): void {
  // Cadrage de départ : la zone qui contient le chalet et tous les repères.
  const points = [[lng, lat], ...landmarks.map((landmark) => [landmark.lng, landmark.lat])];
  const lngs = points.map(([x]) => x);
  const lats = points.map(([, y]) => y);

  const map = new MapLibreMap({
    container,
    style: STYLE_URL,
    bounds: [Math.min(...lngs), Math.min(...lats), Math.max(...lngs), Math.max(...lats)],
    fitBoundsOptions: { padding: window.matchMedia('(max-width: 639px)').matches ? FIT_PADDING_SMALL : FIT_PADDING },
    minZoom: 9,
    maxZoom: 17,
    cooperativeGestures: true,
    dragRotate: false,
    pitchWithRotate: false,
    touchPitch: false,
    attributionControl: { compact: true },
    locale,
  });

  map.touchZoomRotate.disableRotation();
  map.keyboard.disableRotation();
  map.addControl(new NavigationControl({ showCompass: false }), 'top-right');

  map.on('style.load', () => {
    for (const [layer, property, color] of TINTS) {
      if (map.getLayer(layer)) map.setPaintProperty(layer, property, color);
    }

    // Noms de lieux du fond : on retire « Méribel Village » (voir HIDE_BASE_LABEL).
    for (const layer of map.getStyle().layers) {
      if (layer.type !== 'symbol' || layer['source-layer'] !== 'place') continue;
      const current = map.getFilter(layer.id);
      const hide = ['!', HIDE_BASE_LABEL];
      map.setFilter(layer.id, (current ? ['all', current, hide] : hide) as FilterSpecification);
    }

    // Traits pointillés du chalet vers chaque repère qui a une durée, sous les noms de lieux du fond.
    map.addSource('chalet-routes', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: landmarks.filter((landmark) => landmark.duration).map((landmark) => ({
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: [[lng, lat], [landmark.lng, landmark.lat]] },
        })),
      },
    });
    const firstLabelLayer = map.getStyle().layers.find((layer) => layer.type === 'symbol')?.id;
    map.addLayer(
      { id: 'chalet-routes', type: 'line', source: 'chalet-routes', layout: { 'line-cap': 'round' }, paint: ROUTE_PAINT },
      firstLabelLayer,
    );
  });

  // Petits écrans : sources de la carte repliées derrière le bouton (i) (elles
  // s'ouvrent au clic), sinon le bandeau couvrirait le bas de la carte.
  map.once('load', () => {
    if (window.matchMedia('(max-width: 639px)').matches) {
      container.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
    }
  });

  // Repères autour : la pointe du triangle (en haut de l'élément) est posée sur l'endroit exact.
  for (const landmark of landmarks) {
    new Marker({ element: landmark.element, anchor: 'top' }).setLngLat([landmark.lng, landmark.lat]).addTo(map);
  }

  // Pastilles de durée : au milieu de chaque trait, décalées sur le côté si elles
  // tomberaient sous la tête d'ours (voir DURATION_CLEARANCE). Recalculées à chaque zoom.
  const durations = landmarks.flatMap((landmark) =>
    landmark.duration
      ? [{ landmark, marker: new Marker({ element: landmark.duration, anchor: 'center' }).setLngLat([lng, lat]).addTo(map) }]
      : [],
  );

  const placeDurations = () => {
    const chalet = map.project([lng, lat]);
    for (const { landmark, marker: durationMarker } of durations) {
      const target = map.project([landmark.lng, landmark.lat]);
      const length = Math.hypot(target.x - chalet.x, target.y - chalet.y) || 1;
      // Direction du trait, et perpendiculaire orientée vers l'est (côté du décalage).
      const ux = (target.x - chalet.x) / length;
      const uy = (target.y - chalet.y) / length;
      const [nx, ny] = -uy > 0 || (uy === 0 && ux < 0) ? [-uy, ux] : [uy, -ux];
      const along = length / 2;
      const aside = Math.sqrt(Math.max(0, DURATION_CLEARANCE ** 2 - along ** 2));
      durationMarker.setLngLat(map.unproject([chalet.x + ux * along + nx * aside, chalet.y + uy * along + ny * aside]));
    }
  };
  placeDurations();
  map.on('zoom', placeDurations);
  map.once('load', placeDurations);

  // Le chalet en dernier : sa tête d'ours passe au-dessus des autres repères.
  new Marker({ element: marker, anchor: 'center' }).setLngLat([lng, lat]).addTo(map);
}
