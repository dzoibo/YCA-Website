import "server-only";
import {
  compareByDate,
  isUpcoming,
  parseCsv,
  parseRow,
  todayInOttawa,
  type YcaEvent,
} from "./events";

// The site re-reads the Google Sheet at most every 5 minutes, so edits show up within ~5 minutes.
const REFRESH_SECONDS = 5 * 60;

// "YCA – Événements" in Google Drive. Read-only link, not a secret; override with EVENTS_SHEET_URL.
const DEFAULT_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1VsYHGlsHU_BoacnDT2z-kx6-p0weoozWUXruFbwwoiQ/edit";

/**
 * Accepts either the normal sheet link from the browser address bar
 * (https://docs.google.com/spreadsheets/d/<id>/edit#gid=<tab>) or an already-CSV link,
 * and returns a URL that downloads the tab as CSV. The sheet must be shared
 * "Anyone with the link: Viewer" (or published to the web).
 */
export function toCsvUrl(link: string) {
  const url = new URL(link.trim());
  const match = url.pathname.match(/^\/spreadsheets\/d\/([a-zA-Z0-9_-]+)(\/.*)?$/);
  if (url.hostname !== "docs.google.com" || !match || match[2]?.startsWith("/e/")) return url.toString();
  if (url.pathname.endsWith("/export") || url.searchParams.get("output") === "csv") return url.toString();
  // Without a gid, Google exports the first tab (sheets created from a CSV import have no gid=0).
  const gid = url.hash.match(/gid=(\d+)/)?.[1] ?? url.searchParams.get("gid");
  const csv = `https://docs.google.com/spreadsheets/d/${match[1]}/export?format=csv`;
  return gid ? `${csv}&gid=${gid}` : csv;
}

/** Published, upcoming events from the events Google Sheet. */
export async function getPublishedEvents(): Promise<YcaEvent[]> {
  const link =
    process.env.EVENTS_SHEET_URL ?? process.env.EVENTS_SHEET_CSV_URL ?? DEFAULT_SHEET_URL;
  const res = await fetch(toCsvUrl(link), { next: { revalidate: REFRESH_SECONDS } });
  if (!res.ok) throw new Error(`Events sheet request failed: ${res.status}`);
  const body = await res.text();
  if (body.trimStart().startsWith("<")) {
    throw new Error(
      "Events sheet returned HTML instead of CSV: share it as 'Anyone with the link: Viewer'.",
    );
  }
  const today = todayInOttawa();
  return parseCsv(body)
    .map(parseRow)
    .filter((event): event is YcaEvent => event !== null)
    .filter((event) => event.published && isUpcoming(event, today))
    .sort(compareByDate);
}
