import { dateParts, type YcaEvent } from "@/lib/events";
import { getPublishedEvents } from "@/lib/events-service";
import { homePath, type Lang } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { absoluteUrl } from "@/lib/seo/structured-data";
import { EMAIL, links, ORG_NAME, ORG_NAME_FR, SITE_NAME } from "@/lib/site";

// /llms.txt: a plain Markdown summary of YCA for AI assistants (https://llmstxt.org).
// It reuses the site copy and the events sheet, so it stays in sync without extra editing.
export const revalidate = 300;

function eventLine(event: YcaEvent, lang: Lang) {
  const t = getDictionary(lang);
  const { year, month, day } = dateParts(event.date);
  const monthName = t.events.months[month - 1].toLowerCase();
  const when = day ? `${day} ${monthName} ${year}` : `${monthName} ${year}`;
  const title = (lang === "fr" && event.titleFr) || event.title;
  const details = [event.time, event.location].filter(Boolean).join(", ");
  return `- ${when}: ${title}${details ? ` (${details})` : ""}`;
}

function section(lang: Lang, events: YcaEvent[] | null) {
  const t = getDictionary(lang);
  const fr = lang === "fr";
  const lines = [
    `## ${fr ? "En français" : "In English"}`,
    "",
    t.about.mission,
    "",
    t.hero.body,
    "",
    `### ${fr ? "Activités" : "Activities"}`,
    ...t.programs.items.map(([title, meta, copy]) => `- ${title} (${meta}): ${copy}`),
    "",
    `### ${fr ? "Prochains événements" : "Upcoming events"}`,
    ...(events === null
      ? [fr ? "- Voir le site pour les dates à jour." : "- See the website for current dates."]
      : events.length
        ? events.map((event) => eventLine(event, lang))
        : [`- ${t.events.emptyTitle}`]),
    "",
    `### ${fr ? "Questions fréquentes" : "Frequently asked questions"}`,
    ...t.faq.items.flatMap(([question, answer]) => [`**${question}**`, answer, ""]),
    `Page: ${absoluteUrl(homePath(lang))}`,
  ];
  return lines.join("\n");
}

export async function GET() {
  const events = await getPublishedEvents().catch(() => null);
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${ORG_NAME_FR} (${ORG_NAME}). ${getDictionary("fr").meta.description}`,
    "",
    `- Site: ${absoluteUrl("/")} (français) · ${absoluteUrl("/en")} (English)`,
    `- Courriel / Email: ${EMAIL}`,
    `- Instagram: ${links.instagram}`,
    `- TikTok: ${links.tiktok}`,
    "- Facebook: YCA Ottawa-Gatineau",
    "- Zone / Area: Ottawa (Ontario) et/and Gatineau (Québec), Canada",
    "",
    section("fr", events),
    "",
    section("en", events),
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
