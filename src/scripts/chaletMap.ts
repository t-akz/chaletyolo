/**
 * Carte interactive de la page Le chalet (MapLibre + fonds OpenFreeMap).
 *
 * Ce fichier n'est chargé qu'à l'approche de la carte (voir ChaletMap.astro) :
 * MapLibre pèse environ 450 Ko (compressé), inutile de le télécharger si on ne va pas jusque-là.
 *
 * - Fond « Positron » d'OpenFreeMap (gratuit, sans compte, sans clé, sans cookie),
 *   légèrement réchauffé aux couleurs du site.
 * - Pistes de ski et remontées mécaniques d'OpenSnowMap (gratuit, sans clé), par-dessus.
 * - Repère : la tête d'ours du logo, sur l'emplacement exact du chalet.
 * - Molette : zoom seulement avec Ctrl / ⌘ ; mobile : deux doigts pour déplacer
 *   (sinon la page resterait « coincée » dans la carte en défilant).
 */
import { Map as MapLibreMap, Marker, NavigationControl, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
// Le « worker » de MapLibre (calculs en arrière-plan) est copié tel quel dans le site.
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';

setWorkerUrl(workerUrl);

/** Style du fond de carte (OpenFreeMap). */
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';

/** Couche des pistes de ski (OpenSnowMap, gratuit, sans clé). */
const PISTES_TILES = 'https://tiles.opensnowmap.org/pistes/{z}/{x}/{y}.png';

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
}

export function mountChaletMap(container: HTMLElement, { lat, lng, locale, marker }: ChaletMapOptions): void {
  const map = new MapLibreMap({
    container,
    style: STYLE_URL,
    center: [lng, lat],
    zoom: 13.5,
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

    // Pistes de ski et remontées mécaniques (OpenSnowMap, ajoutées le 09/11/2026) :
    // images transparentes posées sur le fond, sous les noms de lieux.
    map.addSource('pistes', {
      type: 'raster',
      tiles: [PISTES_TILES],
      tileSize: 256,
      maxzoom: 18,
      attribution: '<a href="https://www.opensnowmap.org" target="_blank" rel="noopener">© OpenSnowMap</a>',
    });
    const firstLabelLayer = map.getStyle().layers.find((layer) => layer.type === 'symbol')?.id;
    map.addLayer({ id: 'pistes', type: 'raster', source: 'pistes', paint: { 'raster-opacity': 0.8 } }, firstLabelLayer);
  });

  // Petits écrans : sources de la carte repliées derrière le bouton (i) (elles
  // s'ouvrent au clic), sinon le bandeau couvrirait le bas de la carte.
  map.once('load', () => {
    if (window.matchMedia('(max-width: 639px)').matches) {
      container.querySelector('.maplibregl-ctrl-attrib')?.classList.remove('maplibregl-compact-show');
    }
  });

  new Marker({ element: marker, anchor: 'center' }).setLngLat([lng, lat]).addTo(map);
}
