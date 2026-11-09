/**
 * Fonction Netlify — connexion à l'admin des tarifs.
 * POST /api/admin/login   corps : { "password": "…" }
 * → 200 { token, expiresAt } | 401 mot de passe incorrect | 500 admin non configurée.
 */
import { NOT_CONFIGURED, adminConfigured, checkPassword, createToken, json, pause } from '../lib/admin-auth';

export default async (request: Request): Promise<Response> => {
  if (request.method !== 'POST') return json({ error: 'Méthode non autorisée.' }, 405);
  if (!adminConfigured()) return json({ error: NOT_CONFIGURED }, 500);

  let attempt: unknown;
  try {
    attempt = ((await request.json()) as { password?: unknown }).password;
  } catch {
    attempt = undefined;
  }

  if (typeof attempt !== 'string' || !checkPassword(attempt)) {
    await pause(1500); // ralentit les essais au hasard
    return json({ error: 'Mot de passe incorrect.' }, 401);
  }
  return json(createToken());
};

export const config = { path: '/api/admin/login' };
