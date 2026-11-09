/**
 * Connexion à l'admin des tarifs (utilisé par netlify/functions/).
 *
 * - Un seul mot de passe partagé, stocké dans les réglages Netlify
 *   (variable ADMIN_PASSWORD, 12 caractères minimum) — jamais dans le code.
 * - Après connexion, l'admin reçoit un « jeton » valable 8 heures, signé avec
 *   ADMIN_SECRET (32 caractères minimum). Le navigateur le garde le temps de
 *   l'onglet (sessionStorage) et le renvoie à chaque requête : AUCUN cookie.
 * - Changer ADMIN_SECRET déconnecte immédiatement tout le monde.
 */
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';

/** Durée d'une session d'admin. */
const SESSION_HOURS = 8;

const password = () => process.env.ADMIN_PASSWORD ?? '';
const secret = () => process.env.ADMIN_SECRET ?? '';

/** Vrai si le mot de passe et la clé de signature sont correctement configurés chez Netlify. */
export const adminConfigured = () => password().length >= 12 && secret().length >= 32;

/** Message renvoyé tant que la configuration Netlify manque. */
export const NOT_CONFIGURED =
  'Admin non configurée : ADMIN_PASSWORD (12 caractères minimum) et ADMIN_SECRET (32 caractères minimum) ' +
  'doivent être renseignés dans les réglages Netlify (voir README).';

/** Comparaison en temps constant (ne révèle rien par la durée de la réponse). */
function sameText(a: string, b: string): boolean {
  return timingSafeEqual(createHash('sha256').update(a).digest(), createHash('sha256').update(b).digest());
}

const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('base64url');

/** Vrai si le mot de passe saisi est le bon. */
export const checkPassword = (attempt: string) => adminConfigured() && sameText(attempt, password());

/** Nouveau jeton de session : « données.signature », valable SESSION_HOURS heures. */
export function createToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + SESSION_HOURS * 3_600_000;
  const payload = Buffer.from(JSON.stringify({ exp: expiresAt })).toString('base64url');
  return { token: `${payload}.${sign(payload)}`, expiresAt };
}

/** Vrai si la requête porte un jeton valide et non expiré (en-tête « Authorization: Bearer … »). */
export function isAuthorized(request: Request): boolean {
  if (!adminConfigured()) return false;
  const match = /^Bearer ([\w-]+)\.([\w-]+)$/.exec(request.headers.get('authorization') ?? '');
  if (!match) return false;
  const [, payload = '', signature = ''] = match;
  if (!sameText(signature, sign(payload))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { exp?: unknown };
    return typeof exp === 'number' && exp > Date.now();
  } catch {
    return false;
  }
}

/** Réponse JSON jamais mise en cache. */
export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** Petite pause (ralentit les essais de mots de passe au hasard). */
export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
