"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { en, type Dict } from "./en";
import { fr } from "./fr";

export type Lang = "en" | "fr";
export type { Dict };

export const languages = [
  ["en", "English"],
  ["fr", "Français"],
] as const satisfies readonly (readonly [Lang, string])[];

const STORAGE_KEY = "yca-lang";
const dictionaries: Record<Lang, Dict> = { en, fr };

type LangContextValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict };

const LangContext = createContext<LangContextValue | null>(null);

function preferredLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {}
  const browser = navigator.languages?.[0] ?? navigator.language ?? "en";
  return browser.toLowerCase().startsWith("fr") ? "fr" : "en";
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(preferredLang());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const desired = dictionaries[lang].meta.title;
    const apply = () => {
      if (document.title !== desired) document.title = desired;
    };
    apply();
    // Next.js streams its static metadata title in after hydration and would overwrite ours.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      subtree: true,
      childList: true,
      characterData: true,
    });
    return () => observer.disconnect();
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
