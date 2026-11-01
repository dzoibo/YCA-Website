import type { MetadataRoute } from "next";
import { homePath, locales } from "@/lib/i18n/config";
import { absoluteUrl } from "@/lib/seo/structured-data";

// Both language versions of the home page, linked to each other with hreflang.
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((lang) => [lang, absoluteUrl(homePath(lang))]),
  );
  return locales.map((lang) => ({
    url: absoluteUrl(homePath(lang)),
    changeFrequency: "weekly",
    priority: lang === "fr" ? 1 : 0.9,
    alternates: { languages },
  }));
}
