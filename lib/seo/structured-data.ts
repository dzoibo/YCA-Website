import { dateParts, type YcaEvent } from "@/lib/events";
import { homePath, languageTags, type Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { EMAIL, links, ORG_NAME, ORG_NAME_FR, SITE_NAME, SITE_URL } from "@/lib/site";

// schema.org JSON-LD for the home page, so search engines and AI assistants understand who
// YCA is, what the site offers and which events are coming up.

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const absoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;

export const ogImagePath = (lang: Lang) => `/og/og-${lang}.jpg`;

/** "18:30", "18h30", "6:30 PM"... -> "18:30", or null when the cell isn't a clock time. */
function parseTime(value?: string) {
  const match = value?.trim().match(/^(\d{1,2})\s*[:hH.]\s*(\d{2})?\s*(am|pm)?/i);
  if (!match) return null;
  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3]?.toLowerCase();
  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

/** UTC offset of Ottawa on a given day, e.g. "-04:00" in summer and "-05:00" in winter. */
function ottawaOffset(date: string) {
  const name = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    timeZoneName: "longOffset",
  })
    .formatToParts(new Date(`${date}T12:00:00Z`))
    .find((part) => part.type === "timeZoneName")?.value;
  return name?.replace("GMT", "") || "-05:00";
}

/** Events with an exact day (Google requires a full start date). */
function eventNodes(events: YcaEvent[], lang: Lang) {
  const t = getDictionary(lang);
  return events
    .filter((event) => dateParts(event.date).day !== undefined)
    .map((event) => {
      const time = parseTime(event.time);
      const startDate = time
        ? `${event.date}T${time}:00${ottawaOffset(event.date)}`
        : event.date;
      const name = (lang === "fr" && event.titleFr) || event.title;
      const description =
        (lang === "fr" && event.descriptionFr) || event.description;
      const place = event.location ?? "Ottawa-Gatineau";
      return {
        "@type": "Event",
        name,
        ...(description && { description }),
        startDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        inLanguage: languageTags[lang],
        location: {
          "@type": "Place",
          name: place,
          address: { "@type": "PostalAddress", addressLocality: place, addressCountry: "CA" },
        },
        image: [absoluteUrl(event.image ?? ogImagePath(lang))],
        organizer: { "@id": ORG_ID },
        url: event.registrationUrl ?? `${absoluteUrl(homePath(lang))}#events`,
        ...(event.registrationUrl && {
          offers: { "@type": "Offer", url: event.registrationUrl, availability: "https://schema.org/InStock" },
        }),
        ...(event.category && t.events.categories[event.category as keyof typeof t.events.categories] && {
          keywords: t.events.categories[event.category as keyof typeof t.events.categories],
        }),
      };
    });
}

export function homeJsonLd(lang: Lang, events: YcaEvent[]) {
  const t = getDictionary(lang);
  const pageUrl = absoluteUrl(homePath(lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NGO",
        "@id": ORG_ID,
        name: lang === "fr" ? ORG_NAME_FR : ORG_NAME,
        alternateName: [SITE_NAME, "YCA Ottawa", "YCA OTTAWA", lang === "fr" ? ORG_NAME : ORG_NAME_FR],
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: absoluteUrl("/icon.png"), width: 512, height: 512 },
        image: absoluteUrl(ogImagePath(lang)),
        description: t.meta.description,
        slogan: `${t.hero.line1} ${t.hero.line2}`,
        email: EMAIL,
        foundingDate: "2025-05",
        knowsLanguage: ["fr", "en"],
        areaServed: [
          { "@type": "City", name: "Ottawa", sameAs: "https://en.wikipedia.org/wiki/Ottawa" },
          { "@type": "City", name: "Gatineau", sameAs: "https://en.wikipedia.org/wiki/Gatineau" },
        ],
        audience: { "@type": "PeopleAudience", suggestedMinAge: 18, suggestedMaxAge: 35 },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "general inquiries",
          email: EMAIL,
          availableLanguage: ["French", "English"],
        },
        sameAs: [links.instagram, links.tiktok],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: [languageTags.fr, languageTags.en],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: languageTags[lang],
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORG_ID },
        primaryImageOfPage: absoluteUrl(ogImagePath(lang)),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: languageTags[lang],
        mainEntity: t.faq.items.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
      ...eventNodes(events, lang),
    ],
  };
}

/** Serializes JSON-LD for a <script> tag, escaping "<" so content can't close the tag. */
export const jsonLdScript = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
