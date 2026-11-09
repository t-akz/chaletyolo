/**
 * Fonction Netlify — lecture et enregistrement des tarifs (admin).
 * Toutes les requêtes demandent un jeton de session (en-tête « Authorization: Bearer … »).
 *
 * GET /api/admin/tarifs
 *   → { season, source: "admin" | "depart", production }
 * PUT /api/admin/tarifs   corps : la saison complète { months: [...] }
 *   → vérifie les données (mêmes règles que le site : src/content/tarifs.ts),
 *     les enregistre (Netlify Blobs) puis, sur le site en ligne, déclenche la
 *     republication via BUILD_HOOK_URL.
 *   → { ok, published, production } | 400 message d'erreur en français.
 *
 * Deploy previews : magasin séparé « tarifs-apercu » et pas de republication du
 * site en ligne (voir src/content/tarifs-store.ts).
 */
import { parseSeason } from '../../src/content/tarifs';
import { SEASON_KEY, isProduction, openSeasonStore, readStoredSeason, seedSeason } from '../../src/content/tarifs-store';
import { NOT_CONFIGURED, adminConfigured, isAuthorized, json } from '../lib/admin-auth';

/** Taille maximale acceptée pour les données envoyées (une saison pèse quelques ko). */
const MAX_BODY_BYTES = 200_000;

/** Contexte Netlify : « production », « deploy-preview », « branch-deploy »… */
type FunctionContext = { deploy?: { context?: string } };

/** Message si le stockage Netlify ne répond pas. */
const STORE_ERROR = 'Le stockage Netlify ne répond pas. Réessayez dans un instant ; si cela persiste, voir README.';

export default async (request: Request, context?: FunctionContext): Promise<Response> => {
  try {
    return await handle(request, context);
  } catch (error) {
    console.error('[admin-tarifs]', error);
    return json({ error: STORE_ERROR }, 500);
  }
};

async function handle(request: Request, context?: FunctionContext): Promise<Response> {
  if (!adminConfigured()) return json({ error: NOT_CONFIGURED }, 500);
  if (!isAuthorized(request)) return json({ error: 'Session expirée : reconnectez-vous.' }, 401);

  const deployContext = context?.deploy?.context ?? process.env.CONTEXT;
  const production = isProduction(deployContext);

  // --- Lecture ---
  if (request.method === 'GET') {
    const stored = await readStoredSeason(deployContext);
    return json({ season: stored ?? seedSeason(), source: stored ? 'admin' : 'depart', production });
  }

  // --- Enregistrement + publication ---
  if (request.method === 'PUT') {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ error: 'Données trop volumineuses.' }, 413);

    let season;
    try {
      season = parseSeason(JSON.parse(raw));
    } catch (error) {
      const message = error instanceof Error && error.message.startsWith('Tarifs invalides') ? error.message : 'Données illisibles.';
      return json({ error: message }, 400);
    }

    await openSeasonStore(deployContext).setJSON(SEASON_KEY, season, {
      metadata: { updatedAt: new Date().toISOString() },
    });

    // Republication du site en ligne (≈ 1 à 2 minutes chez Netlify).
    let published = false;
    const hook = process.env.BUILD_HOOK_URL;
    if (production && hook) {
      // Les données sont déjà enregistrées : un échec ici n'est pas bloquant
      // (l'admin affiche « enregistré, mais pas republié »).
      try {
        published = (await fetch(hook, { method: 'POST' })).ok;
      } catch (error) {
        console.error('[admin-tarifs] Republication impossible', error);
      }
    }
    return json({ ok: true, published, production });
  }

  return json({ error: 'Méthode non autorisée.' }, 405);
}

export const config = { path: '/api/admin/tarifs' };
