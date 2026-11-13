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
 * - une « période » (une carte du site) va en principe du SAMEDI au SAMEDI (confirmé
 *   par le client le 08/11/2026) : c'est le cas quand « end » est absent (départ = arrivée + 7 jours) ;
 * - périodes spéciales (13/11/2026, ex. 2 nuits du jeudi 7 au samedi 9 janvier pour reprendre
 *   le rythme du samedi, ou une réservation de 12 nuits) : « end » = date de départ choisie ;
 *   arrivée n'importe quel jour, de 1 à {maxNights} nuits ;
 * - une période est rangée dans le mois de son arrivée ; les périodes sont dans l'ordre
 *   et ne se chevauchent pas, sur toute la saison (un trou entre deux périodes est permis) ;
 * - « price » = prix TOTAL de la période en euros (nombre entier), ou null → « [À FOURNIR] » ;
 * - « booked » = semaine réservée → carte grisée, « Réservée », sans prix ni lien « Réserver » ;
 * - « badge » = mention spéciale facultative (ex. « Promo »), en français ET en anglais.
 *
 * Ce fichier ne dépend ni d'Astro ni de Netlify : il est utilisé par la construction
 * du site, par les fonctions Netlify (netlify/functions/) et par le script de la
 * page d'admin (navigateur). Le stockage, lui, est dans tarifs-store.ts (serveur).
 */

export type Badge = { fr: string; en: string };

export type Week = {
  /** Date d'arrivée, au format AAAA-MM-JJ (un samedi pour une semaine normale). */
  start: string;
  /**
   * Date de départ (AAAA-MM-JJ), seulement pour une période spéciale.
   * Absente = semaine normale : départ 7 jours après l'arrivée (voir weekEnd).
   */
  end?: string;
  /** Prix total de la période en euros, ou null si pas encore fourni. */
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

/** Nombre de nuits d'une semaine normale. */
export const nightsPerWeek = 7;

/** Nombre maximal de nuits d'une période (garde-fou contre une faute de frappe). */
export const maxNights = 31;

/** Longueur maximale d'une mention spéciale (pour qu'elle tienne sur la carte). */
export const badgeMaxLength = 25;

/** Prix maximal accepté (garde-fou contre une faute de frappe). */
export const priceMax = 1_000_000;

const MONTH_RE = /^\d{4}-(0[1-9]|1[0-2])$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Date lue en temps universel (pas de décalage d'un jour selon le fuseau horaire). */
const toUtcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

/** Vrai si « iso » est une date réelle au format AAAA-MM-JJ (refuse « 2027-02-30 »). */
export const isRealDate = (iso: unknown): iso is string =>
  typeof iso === 'string' && DAY_RE.test(iso) && !Number.isNaN(toUtcDate(iso).getTime()) &&
  toUtcDate(iso).toISOString().slice(0, 10) === iso;

/** Date « iso » décalée de « days » jours. */
export function addDays(iso: string, days: number): string {
  const date = toUtcDate(iso);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Nombre de nuits entre deux dates (arrivée → départ). */
export const nightsBetween = (start: string, end: string) =>
  Math.round((toUtcDate(end).getTime() - toUtcDate(start).getTime()) / 86_400_000);

/** Date de départ d'une période : « end » si c'est une période spéciale, sinon arrivée + 7 jours. */
export const periodEnd = (week: Pick<Week, 'start' | 'end'>) => week.end ?? weekEnd(week.start);

/** Nombre de nuits d'une période (7 pour une semaine normale). */
export const periodNights = (week: Pick<Week, 'start' | 'end'>) => nightsBetween(week.start, periodEnd(week));

/** Date en clair pour les messages d'erreur, ex. « 07/01/2027 ». */
const frDate = (iso: string) => iso.split('-').reverse().join('/');

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
  // Départ de la période précédente (toute la saison) : la suivante ne peut pas arriver avant.
  let previousEnd = '';
  for (const rawMonth of rawMonths) {
    if (!isObject(rawMonth)) fail('un mois est mal formé.');
    const m = rawMonth as Record<string, unknown>;
    const month = m.month;
    if (typeof month !== 'string' || !MONTH_RE.test(month)) fail(`mois « ${String(month)} » incorrect (attendu AAAA-MM).`);
    const monthKey = month as string;
    if (monthKey <= previousMonth) fail(`le mois ${monthKey} est en double ou dans le désordre.`);
    previousMonth = monthKey;
    if (!Array.isArray(m.weeks)) fail(`les semaines du mois ${monthKey} sont absentes.`);

    const weeks: Week[] = [];
    for (const rawWeek of m.weeks as unknown[]) {
      if (!isObject(rawWeek)) fail(`une période de ${monthKey} est mal formée.`);
      const w = rawWeek as Record<string, unknown>;
      const start = w.start;
      if (!isRealDate(start)) fail(`date d'arrivée « ${String(start)} » incorrecte (attendu AAAA-MM-JJ).`);
      const startKey = start as string;
      if (startKey.slice(0, 7) !== monthKey) fail(`la période du ${frDate(startKey)} n'arrive pas en ${monthKey} : rangez-la dans son mois d'arrivée.`);

      // Départ : absent (ou égal à arrivée + 7 jours) = semaine normale, on ne garde pas « end ».
      let end: string | undefined;
      if (w.end !== undefined && w.end !== null && w.end !== '') {
        if (!isRealDate(w.end)) fail(`date de départ de la période du ${frDate(startKey)} incorrecte.`);
        const nights = nightsBetween(startKey, w.end as string);
        if (nights < 1) fail(`la période du ${frDate(startKey)} doit partir après son arrivée.`);
        if (nights > maxNights) fail(`la période du ${frDate(startKey)} dépasse ${maxNights} nuits.`);
        if (w.end !== weekEnd(startKey)) end = w.end as string;
      }
      const endKey = end ?? weekEnd(startKey);
      if (previousEnd && startKey < previousEnd) {
        fail(`la période du ${frDate(startKey)} commence avant la fin de la précédente (départ le ${frDate(previousEnd)}) : elles se chevauchent ou sont dans le désordre.`);
      }
      previousEnd = endKey;

      const price = w.price ?? null;
      if (price !== null && (typeof price !== 'number' || !Number.isInteger(price) || price <= 0 || price > priceMax)) {
        fail(`prix de la période du ${frDate(startKey)} incorrect (nombre entier d'euros, ou vide).`);
      }

      const booked = w.booked ?? false;
      if (typeof booked !== 'boolean') fail(`« réservée » de la période du ${frDate(startKey)} incorrect.`);

      let badge: Badge | null = null;
      if (w.badge !== null && w.badge !== undefined) {
        if (!isObject(w.badge)) fail(`mention de la période du ${frDate(startKey)} mal formée.`);
        const b = w.badge as Record<string, unknown>;
        const fr = typeof b.fr === 'string' ? b.fr.trim() : '';
        const en = typeof b.en === 'string' ? b.en.trim() : '';
        if (fr || en) {
          if (!fr || !en) fail(`la mention de la période du ${frDate(startKey)} doit être remplie en français ET en anglais.`);
          if (fr.length > badgeMaxLength || en.length > badgeMaxLength) {
            fail(`la mention de la période du ${frDate(startKey)} dépasse ${badgeMaxLength} caractères.`);
          }
          badge = { fr, en };
        }
      }

      weeks.push({ start: startKey, ...(end ? { end } : {}), price: price as number | null, booked: booked as boolean, badge });
    }
    months.push({ month: monthKey, weeks });
  }
  return { months };
}

/** Date de départ d'une semaine normale (arrivée + 7 jours), au format AAAA-MM-JJ. */
export function weekEnd(start: string): string {
  return addDays(start, nightsPerWeek);
}
