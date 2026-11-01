"use client";

import { ArrowRight, CalendarDays } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Callout } from "@/components/shared/callout";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EVENT_CATEGORIES, type YcaEvent } from "@/lib/events";
import { useLang } from "@/lib/i18n/context";
import { links } from "@/lib/site";
import { CategoryBadge } from "./category-badge";
import { EventRow } from "./event-row";

/** Shown instead of the list when there are no upcoming events or the sheet failed to load. */
function EventsPlaceholder({ error }: { error: boolean }) {
  const { t } = useLang();
  return (
    <Card
      role={error ? "alert" : "status"}
      className="block rounded-2xl border border-dashed border-teal-900/20 bg-cream px-6 py-10 text-center ring-0"
    >
      <CalendarDays
        className="mx-auto text-sage"
        size={28}
        strokeWidth={1.6}
      />
      <p className="font-display mt-4 text-lg font-bold text-teal-900">
        {error ? t.events.errorTitle : t.events.emptyTitle}
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone">
        {error ? t.events.errorBody : t.events.emptyBody}
      </p>
    </Card>
  );
}

/** Upcoming events, loaded on the server from the Google Sheet (see lib/events-service.ts). */
export function EventsSection({
  events,
  error,
}: {
  events: YcaEvent[];
  error: boolean;
}) {
  const { t } = useLang();
  return (
    <section id="events" className="bg-white py-20">
      <div className="page-width grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionHeading
              eyebrow={t.events.eyebrow}
              title={t.events.title}
              intro={t.events.body}
              titleClassName="max-w-[20ch] text-[clamp(1.8rem,2.8vw,2.2rem)]"
              introClassName="max-w-md text-[15px]"
            />
            <Callout title={t.events.loopTitle} className="mt-7">
              {t.events.loopBody}
            </Callout>
            <div className="mt-7 flex flex-wrap gap-2">
              {EVENT_CATEGORIES.map((category) => (
                <CategoryBadge
                  key={category}
                  category={category}
                  className="py-1.5 tracking-[.14em]"
                />
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          {events.length > 0 ? (
            <div className="divide-y divide-teal-900/10 border-t border-teal-900/10">
              {events.map((event, i) => (
                <EventRow key={event.id} event={event} index={i} />
              ))}
            </div>
          ) : (
            <EventsPlaceholder error={error} />
          )}
          <Button asChild variant="outline-brand" size="pill" className="mt-7">
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">
              {t.events.cta}
              <ArrowRight
                className="transition-transform duration-300 group-hover/button:translate-x-1"
                size={16}
              />
            </a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
