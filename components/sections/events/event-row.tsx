"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { dateParts, type YcaEvent } from "@/lib/events";
import { useLang } from "@/lib/i18n/context";
import { CategoryBadge } from "./category-badge";

/** One upcoming event: date column, title, meta, description, category and registration link. */
export function EventRow({ event, index }: { event: YcaEvent; index: number }) {
  const { t, lang } = useLang();
  const { year, month, day } = dateParts(event.date);
  const monthLabel = t.events.months[month - 1];
  const dateLabel =
    day === undefined
      ? monthLabel
      : lang === "fr"
        ? `${day} ${monthLabel}`
        : `${monthLabel} ${String(day).padStart(2, "0")}`;
  const title = (lang === "fr" && event.titleFr) || event.title;
  const description =
    (lang === "fr" && event.descriptionFr) || event.description;
  const meta = [event.time, event.location].filter(Boolean).join(" · ");
  return (
    <Reveal delay={Math.min(0.1 + index * 0.05, 0.3)}>
      <article className="flex gap-6 py-5">
        <p className="w-20 shrink-0 text-xs font-bold uppercase leading-relaxed tracking-widest text-forest">
          {dateLabel}
          <span className="block font-medium text-sage">{year}</span>
        </p>
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-lg font-bold text-teal-900">
                {title}
                {event.featured && (
                  <Badge className="ml-2 h-auto -translate-y-0.5 rounded-full border-0 bg-yellow-400/25 px-2 py-0.5 align-middle text-[9px] font-extrabold uppercase tracking-[.12em] text-night">
                    {t.events.featured}
                  </Badge>
                )}
              </h3>
              {meta && <p className="mt-1 text-sm text-stone">{meta}</p>}
              {description && (
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-stone">
                  {description}
                </p>
              )}
            </div>
            {event.image && (
              <div className="relative hidden size-16 shrink-0 overflow-hidden rounded-xl border border-teal-900/10 sm:block">
                <Image
                  src={event.image}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            {event.category && <CategoryBadge category={event.category} />}
            {event.registrationUrl && (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-xs font-bold text-forest underline-offset-4 hover:underline"
              >
                {t.events.register}
                <ArrowRight
                  size={13}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
