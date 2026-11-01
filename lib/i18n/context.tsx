"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { homePath, LANG_COOKIE, type Lang } from "./config";
import { getDictionary, type Dict } from "./dictionaries";

export type { Dict, Lang };

export const languages = [
  ["fr", "Français"],
  ["en", "English"],
] as const satisfies readonly (readonly [Lang, string])[];

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict };

const LangContext = createContext<LangContextValue | null>(null);

/** Provides the language of the current URL ("/" French, "/en" English) to client components. */
export function LangProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const setLang = (next: Lang) => {
    if (next === lang) return;
    // Remember the choice for a year so proxy.ts doesn't send the visitor back.
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.push(homePath(next) + window.location.hash, { scroll: false });
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: getDictionary(lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
