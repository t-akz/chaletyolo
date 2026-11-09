/**
 * Tarifs à la semaine — onglet « Offre » de la page Offre & Contact.
 *
 * Les données NE SONT PAS écrites ici : elles se gèrent depuis le panneau
 * d'administration (/admin/), qui les enregistre chez Netlify (Netlify Blobs)
 * puis republie le site. Le fichier src/content/tarifs.json sert de données
 * de départ (en local, et tant que l'admin n'a jamais été utilisé).
 *
 * Règles (vérifiées par parseSeason, au build ET à chaque enregistrement de l'admin) :
 * - un mois = « AAAA-MM », dans l'ordre, sans doublon ;
 * - une semaine va du SAMEDI au SAMEDI (confirmé par le client le 08/11/2026) ;
 *   elle est rangée dans le mois de son samedi d'arrivée ;
 * - « price » = prix TOTAL de la semaine en euros (nombre entier), ou null → « [À FOURNIR] » ;
 * - « booked » = semaine réservée → carte grisée, « Réservée », sans prix ni lien « Réserver » ;
 * - « badge » = mention spéciale facultative (ex. « Promo »), en français ET en anglais.
 *
 * Ce fichier ne dépend pas d'Astro : il est aussi utilisé par les fonctions
 * Netlify (netlify/functions/) et par le script de la page d'admin.
 */
import seed from './tarifs.json';

export type Badge = { fr: string; en: string };

export type Week = {
  /** Samedi d'arrivée, au format AAAA-MM-JJ. Le départ est calculé (+ 7 jours). */
  start: string;
  /** Prix total de la semaine en euros, ou null si pas encore fourni. */
  price: number | null;
  /** Vrai si la semaine est réservée. */
  booked: boolean;
  /** Mention spéciale (promo, exclu web…), ou null. */
  badge: Badge | null;
};

export type Month = {
  /** Mois au format AAAA-MM, ex. « 2026-12 ». */
  month: string;
  weeks: Week[];
};

export type Season = { months: Month[] };

/** Devise des prix. */
export const currency = 'EUR';

/** Nombre de nuits d'une semaine (sert au calcul du prix par nuit). */
export const nightsPerWeek = 7;

/** Longueur maximale d'une mention spéciale (pour qu'elle tienne sur la carte). */
export const badgeMaxLength = 25;

/** Prix maximal accepté (garde-fou contre une faute de frappe). */
export const priceMax = 1_000_000;

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Date lue en temps universel (pas de décalage d'un jour selon le fuseau horaire). */
const toUtcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Tous les samedis d'un mois (« 2027-01 » → ['2027-01-02', '2027-01-09', …]). */
export function saturdaysOf(month: string): string[] {
  const [year, monthIndex] = month.split('-').map(Number) as [number, number];
  const days: string[] = [];
  const date = new Date(Date.UTC(year, monthIndex - 1, 1));
  while (date.getUTCDay() !== 6) date.setUTCDate(date.getUTCDate() + 1);
  while (date.getUTCMonth() === monthIndex - 1) {
    days.push(date.toISOString().slice(0, 10));
    date.setUTCDate(date.getUTCDate() + 7);
  }
  return days;
}

/** Nouveau mois avec toutes ses semaines (sans prix, disponibles, sans mention). */
export function newMonth(month: string): Month {
  return { month, weeks: saturdaysOf(month).map((start) => ({ start, price: null, booked: false, badge: null })) };
}

/**
 * Vérifie et nettoie des données de saison venues de l'extérieur (fichier, admin).
 * Lève une erreur en français, précise, au premier problème trouvé.
 */
export function parseSeason(data: unknown): Season {
  const fail = (message: string): never => {
    throw new Error(`Tarifs invalides : ${message}`);
  };
  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null && !Array.isArray(value);

  if (!isObject(data) || !Array.isArray(data.months)) fail('la liste des mois est absente.');
  const rawMonths = (data as { months: unknown[] }).months;

  const months: Month[] = [];
  let previousMonth = '';
  for (const rawMonth of rawMonths) {
    if (!isObject(rawMonth)) fail('un mois est mal formé.');
    const m = rawMonth as Record<string, unknown>;
    const month = m.month;
    if (typeof month !== 'string' || !MONTH_RE.test(month)) fail(`mois « ${String(month)} » incorrect (attendu AAAA-MM).`);
    const monthKey = month as string;
    if (monthKey <= previousMonth) fail(`le mois ${monthKey} est en double ou dans le désordre.`);
    previousMonth = monthKey;
    if (!Array.isArray(m.weeks)) fail(`les semaines du mois ${monthKey} sont absentes.`);

    const saturdays = saturdaysOf(monthKey);
    const weeks: Week[] = [];
    let previousStart = '';
    for (const rawWeek of m.weeks as unknown[]) {
      if (!isObject(rawWeek)) fail(`une semaine de ${monthKey} est mal formée.`);
      const w = rawWeek as Record<string, unknown>;
      const start = w.start;
      if (typeof start !== 'string' || !DAY_RE.test(start) || !saturdays.includes(start)) {
        fail(`la semaine « ${String(start)} » n'est pas un samedi de ${monthKey}.`);
      }
      const startKey = start as string;
      if (startKey <= previousStart) fail(`la semaine du ${startKey} est en double ou dans le désordre.`);
      previousStart = startKey;

      const price = w.price ?? null;
      if (price !== null && (typeof price !== 'number' || !Number.isInteger(price) || price <= 0 || price > priceMax)) {
        fail(`prix de la semaine du ${startKey} incorrect (nombre entier d'euros, ou vide).`);
      }

      const booked = w.booked ?? false;
      if (typeof booked !== 'boolean') fail(`« réservée » de la semaine du ${startKey} incorrect.`);

      let badge: Badge | null = null;
      if (w.badge !== null && w.badge !== undefined) {
        if (!isObject(w.badge)) fail(`mention de la semaine du ${startKey} mal formée.`);
        const b = w.badge as Record<string, unknown>;
        const fr = typeof b.fr === 'string' ? b.fr.trim() : '';
        const en = typeof b.en === 'string' ? b.en.trim() : '';
        if (fr || en) {
          if (!fr || !en) fail(`la mention de la semaine du ${startKey} doit être remplie en français ET en anglais.`);
          if (fr.length > badgeMaxLength || en.length > badgeMaxLength) {
            fail(`la mention de la semaine du ${startKey} dépasse ${badgeMaxLength} caractères.`);
          }
          badge = { fr, en };
        }
      }

      weeks.push({ start: startKey, price: price as number | null, booked: booked as boolean, badge });
    }
    months.push({ month: monthKey, weeks });
  }
  return { months };
}

/** Date de départ d'une semaine (samedi suivant), au format AAAA-MM-JJ. */
export function weekEnd(start: string): string {
  const date = toUtcDate(start);
  date.setUTCDate(date.getUTCDate() + 7);
  return date.toISOString().slice(0, 10);
}

/**
 * Données de la saison pour la construction du site.
 * Étape 1 : données de départ (src/content/tarifs.json).
 * Étape 2 (à venir) : données enregistrées par l'admin chez Netlify, si elles existent.
 */
export async function loadSeason(): Promise<Season> {
  return parseSeason(seed);
}
