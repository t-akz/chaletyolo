/** Langues du site. Le français est la langue par défaut (à la racine « / »). */
export const languages = ['fr', 'en'] as const;

export type Lang = (typeof languages)[number];

export const defaultLang: Lang = 'fr';

/** Code de langue complet, utilisé pour hreflang et Open Graph. */
export const locales: Record<Lang, { hreflang: string; og: string }> = {
  fr: { hreflang: 'fr', og: 'fr_FR' },
  en: { hreflang: 'en', og: 'en_GB' },
};

/** Texte bilingue : une valeur par langue. */
export type Localized<T = string> = Record<Lang, T>;
