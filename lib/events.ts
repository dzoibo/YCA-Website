export const EVENT_CATEGORIES = ["culture", "sports", "wellness"] as const;
export type KnownCategory = (typeof EVENT_CATEGORIES)[number];

export interface YcaEvent {
  id: string;
  title: string;
  titleFr?: string;
  /** YYYY-MM-DD, or YYYY-MM when the exact day is not confirmed yet. */
  date: string;
  time?: string;
  location?: string;
  description?: string;
  descriptionFr?: string;
  image?: string;
  category?: string;
  published: boolean;
  featured: boolean;
  registrationUrl?: string;
}

// Accepts 2026-10-18, 2026-10, 2026/10/18 and 2026/10 (Sheets sometimes rewrites dashes).
const DATE_RE = /^(\d{4})[-/](\d{1,2})(?:[-/](\d{1,2}))?$/;
const TRUE_VALUES = ["true", "yes", "oui", "1", "x", "✓"];
const PUBLISHED_VALUES = ["published", "publié", "publie", "public", "yes", "oui", "true"];

const text = (value: unknown) => (value == null ? "" : String(value).trim());
const optional = (value: unknown) => text(value) || undefined;

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeDate(value: string) {
  const match = DATE_RE.exec(value);
  if (!match) return null;
  const [, year, m, d] = match;
  const month = Number(m);
  if (month < 1 || month > 12) return null;
  const mm = String(month).padStart(2, "0");
  if (!d) return `${year}-${mm}`;
  const day = Number(d);
  const check = new Date(Date.UTC(Number(year), month - 1, day));
  if (check.getUTCDate() !== day) return null;
  return `${year}-${mm}-${String(day).padStart(2, "0")}`;
}

/** Turns one spreadsheet row into an event, or null when the title or date is unusable. */
export function parseRow(row: Record<string, string>, index: number): YcaEvent | null {
  const title = text(row.title);
  const date = normalizeDate(text(row.date));
  if (!title || !date) return null;
  return {
    id: `${slugify(title)}-${date}-${index}`,
    title,
    titleFr: optional(row.titlefr),
    date,
    time: optional(row.time),
    location: optional(row.location),
    description: optional(row.description),
    descriptionFr: optional(row.descriptionfr),
    image: optional(row.image),
    category: optional(row.category)?.toLowerCase(),
    published: PUBLISHED_VALUES.includes(text(row.status).toLowerCase()),
    featured: TRUE_VALUES.includes(text(row.featured).toLowerCase()),
    registrationUrl: optional(row.registrationurl),
  };
}

/** Minimal RFC 4180 CSV parser (handles quoted fields, escaped quotes and newlines in cells). */
export function parseCsv(input: string): Record<string, string>[] {
  const csv = input.replace(/^﻿/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (quoted) {
      if (c === '"' && csv[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && csv[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  const [header = [], ...data] = rows;
  const keys = header.map((h) => h.trim().toLowerCase());
  return data
    .filter((r) => r.some((cell) => cell.trim()))
    .map((r) => Object.fromEntries(keys.map((key, i) => [key, r[i] ?? ""])));
}

/** Last calendar day (YYYY-MM-DD) an event is still "upcoming", handling month-only dates. */
function lastDay(date: string) {
  if (date.length === 10) return date;
  const [year, month] = date.split("-").map(Number);
  const end = new Date(Date.UTC(year, month, 0)).getUTCDate();
  return `${date}-${String(end).padStart(2, "0")}`;
}

export function isUpcoming(event: YcaEvent, today: string) {
  return lastDay(event.date) >= today;
}

/** Earliest first; month-only dates sort at the start of their month. */
export function compareByDate(a: YcaEvent, b: YcaEvent) {
  return a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? "");
}

/** Today's date in Ottawa, as YYYY-MM-DD. */
export function todayInOttawa(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function dateParts(date: string) {
  const [year = "", month = "1", day] = date.split("-");
  return { year, month: Number(month), day: day ? Number(day) : undefined };
}
