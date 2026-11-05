/**
 * Noms des petites mémoires du navigateur utilisées par l'écran d'entrée
 * (CLAUDE.md §5.8). Ce ne sont pas des cookies : rien n'est envoyé au serveur.
 *
 * - INTRO_SEEN_KEY (sessionStorage, propre à l'onglet, effacé à sa fermeture) :
 *   « l'écran d'entrée a déjà été montré ». Commun à « / » et « /en/ ».
 * - LANG_CHOICE_KEY (localStorage, conservé entre les visites) :
 *   langue choisie par le visiteur (« fr » ou « en »), via l'écran d'entrée
 *   ou le sélecteur FR | EN de l'en-tête.
 */
export const INTRO_SEEN_KEY = 'chalet-yolo-intro-vue';
export const LANG_CHOICE_KEY = 'chalet-yolo-langue';

/** Paramètre d'adresse qui force l'affichage de l'écran (tests) : « ?intro=1 ». */
export const INTRO_FORCE_PARAM = 'intro';
