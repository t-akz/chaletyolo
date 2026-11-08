/**
 * Tarifs à la semaine — onglet « Offre » de la page Offre & Contact.
 *
 * - Saison affichée : novembre 2026 → avril 2027 inclus (demande du client du 08/11/2026).
 * - Semaines du SAMEDI au SAMEDI (confirmé par le client le 08/11/2026).
 * - Une semaine est rangée dans le mois de son samedi d'arrivée.
 * - « price » = prix TOTAL de la semaine, en euros, sans espace ni symbole (ex. 12500).
 *   Tant qu'il vaut « null », la carte affiche « [À FOURNIR] ».
 *   Le prix par nuit (total ÷ 7, arrondi à l'euro) est calculé automatiquement.
 *
 * Pour mettre à jour un prix : remplacer « null » par le montant, ex.
 *   { start: '2026-12-19', price: 18500 },
 * Pour ajouter une saison : ajouter les samedis d'arrivée à la liste, dans l'ordre.
 */

export type Week = {
  /** Samedi d'arrivée, au format AAAA-MM-JJ. Le départ est calculé (+ 7 jours). */
  start: string;
  /** Prix total de la semaine en euros, ou null si pas encore fourni. */
  price: number | null;
};

/** Devise des prix. */
export const currency = 'EUR';

/** Nombre de nuits d'une semaine (sert au calcul du prix par nuit). */
export const nightsPerWeek = 7;

export const weeks: Week[] = [
  { start: '2026-11-07', price: null },
  { start: '2026-11-14', price: null },
  { start: '2026-11-21', price: null },
  { start: '2026-11-28', price: null },
  { start: '2026-12-05', price: null },
  { start: '2026-12-12', price: null },
  { start: '2026-12-19', price: null },
  { start: '2026-12-26', price: null },
  { start: '2027-01-02', price: null },
  { start: '2027-01-09', price: null },
  { start: '2027-01-16', price: null },
  { start: '2027-01-23', price: null },
  { start: '2027-01-30', price: null },
  { start: '2027-02-06', price: null },
  { start: '2027-02-13', price: null },
  { start: '2027-02-20', price: null },
  { start: '2027-02-27', price: null },
  { start: '2027-03-06', price: null },
  { start: '2027-03-13', price: null },
  { start: '2027-03-20', price: null },
  { start: '2027-03-27', price: null },
  { start: '2027-04-03', price: null },
  { start: '2027-04-10', price: null },
  { start: '2027-04-17', price: null },
  { start: '2027-04-24', price: null },
];
