import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { LandingPage } from "@/components/landing-page";
import type { YcaEvent } from "@/lib/events";
import { getPublishedEvents } from "@/lib/events-service";
import { hasLang, homePath, ogLocales, type Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { homeJsonLd, jsonLdScript, ogImagePath } from "@/lib/seo/structured-data";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLang(lang)) return {};
  const { meta } = getDictionary(lang);
  const other: Lang = lang === "fr" ? "en" : "fr";
  const image = { url: ogImagePath(lang), width: 1200, height: 630, alt: meta.ogAlt };
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: {
      canonical: homePath(lang),
      languages: { fr: homePath("fr"), en: homePath("en"), "x-default": homePath("fr") },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: homePath(lang),
      title: meta.title,
      description: meta.description,
      locale: ogLocales[lang],
      alternateLocale: [ogLocales[other]],
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLang(lang)) notFound();
  let events: YcaEvent[] = [];
  let eventsError = false;
  try {
    events = await getPublishedEvents();
  } catch (error) {
    console.error("[events] Could not load events from the Google Sheet:", error);
    eventsError = true;
    // Opt this render out of the static cache so a temporary Google Sheets failure is not
    // cached; during background revalidation Next keeps the last good page instead.
    await connection();
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(homeJsonLd(lang, events)) }}
      />
      <LandingPage events={events} eventsError={eventsError} />
    </>
  );
}
