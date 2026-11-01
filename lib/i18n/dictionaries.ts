import type { Lang } from "./config";
import { en, type Dict } from "./en";
import { fr } from "./fr";

export type { Dict };

const dictionaries: Record<Lang, Dict> = { en, fr };

/** Copy for a language; usable from both server and client code. */
export const getDictionary = (lang: Lang) => dictionaries[lang];
