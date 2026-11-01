// Locale routing, shared by the proxy, server pages and client components.
// French is the default and lives at the root ("/"); English lives under "/en".

export const locales = ["fr", "en"] as const;
export type Lang = (typeof locales)[number];

export const defaultLang: Lang = "fr";

/** Cookie remembering a language picked in the switcher (read by proxy.ts). */
export const LANG_COOKIE = "yca-lang";

export const hasLang = (value: string): value is Lang =>
  (locales as readonly string[]).includes(value);

/** Public URL path of the home page in a language. */
export const homePath = (lang: Lang) => (lang === defaultLang ? "/" : `/${lang}`);

/** BCP 47 tags used for hreflang, <html lang> and structured data. */
export const languageTags: Record<Lang, string> = { fr: "fr-CA", en: "en-CA" };

/** Open Graph locales. */
export const ogLocales: Record<Lang, string> = { fr: "fr_CA", en: "en_CA" };
