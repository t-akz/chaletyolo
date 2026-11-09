/**
 * Stockage des tarifs chez Netlify (Netlify Blobs) — côté SERVEUR uniquement :
 * construction du site (build) et fonctions de l'admin (netlify/functions/).
 * Ne jamais importer ce fichier dans un script exécuté par le navigateur.
 *
 * - Site en ligne (contexte Netlify « production ») : magasin « tarifs ».
 * - Deploy previews et autres contextes : magasin séparé « tarifs-apercu »,
 *   pour que les essais ne touchent jamais les vraies données.
 * - En local (npm run build / npm run dev) : pas de stockage Netlify, on lit
 *   les données de départ src/content/tarifs.json.
 */
import { getStore } from '@netlify/blobs';
import seed from './tarifs.json';
import { parseSeason, type Season } from './tarifs';

/** Clé sous laquelle la saison est enregistrée dans le magasin. */
export const SEASON_KEY = 'saison';

/** Vrai pour le site en ligne (et uniquement lui). */
export const isProduction = (context: string | undefined) => context === 'production';

/** Ouvre le magasin des tarifs correspondant au contexte Netlify. */
export function openSeasonStore(context: string | undefined) {
  const name = isProduction(context) ? 'tarifs' : 'tarifs-apercu';
  // Accès de secours par l'API Netlify, si la configuration automatique manque
  // pendant la construction : jeton personnel NETLIFY_BLOBS_TOKEN (voir README).
  const token = process.env.NETLIFY_BLOBS_TOKEN;
  const siteID = process.env.SITE_ID;
  return token && siteID
    ? getStore({ name, siteID, token, consistency: 'strong' })
    : getStore({ name, consistency: 'strong' });
}

/** Données de départ (src/content/tarifs.json), vérifiées. */
export const seedSeason = (): Season => parseSeason(seed);

/** Saison enregistrée par l'admin, ou null si l'admin n'a jamais été utilisé. */
export async function readStoredSeason(context: string | undefined): Promise<Season | null> {
  const stored: unknown = await openSeasonStore(context).get(SEASON_KEY, { type: 'json' });
  return stored === null || stored === undefined ? null : parseSeason(stored);
}

let cached: Promise<Season> | undefined;

/**
 * Saison utilisée pour construire la page Offre & Contact (lue une seule fois par build).
 * - En local : données de départ.
 * - Chez Netlify : données de l'admin si elles existent, sinon données de départ.
 * - Site en ligne : si le stockage est illisible, la construction S'ARRÊTE
 *   (mieux vaut ne pas publier que publier d'anciens prix).
 */
export function loadSeason(): Promise<Season> {
  cached ??= (async () => {
    const context = process.env.CONTEXT; // défini par Netlify pendant la construction
    if (!context) return seedSeason();

    let stored: Season | null;
    try {
      stored = await readStoredSeason(context);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Tarifs invalides')) throw error;
      if (isProduction(context)) {
        throw new Error(
          'Tarifs : impossible de lire les données de l’admin (Netlify Blobs) pendant la construction. ' +
            'Ajoutez la variable NETLIFY_BLOBS_TOKEN dans les réglages Netlify (voir README, « Admin des tarifs »).',
          { cause: error },
        );
      }
      console.log(`[tarifs] Stockage Netlify indisponible (contexte « ${context} ») : données de départ utilisées.`);
      return seedSeason();
    }

    console.log(`[tarifs] ${stored ? 'Données enregistrées par l’admin' : 'Données de départ (admin jamais utilisé)'} — contexte « ${context} ».`);
    return stored ?? seedSeason();
  })();
  return cached;
}
