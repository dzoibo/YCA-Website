import { connection } from "next/server";
import { LandingPage } from "../components/LandingPage";
import type { YcaEvent } from "../lib/events";
import { getPublishedEvents } from "../lib/events-service";

export default async function Page() {
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
  return <LandingPage events={events} eventsError={eventsError} />;
}
