"use client";

import { Badge } from "@/components/ui/badge";
import { EVENT_CATEGORIES, type KnownCategory } from "@/lib/events";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

const categoryStyles: Record<KnownCategory, string> = {
  culture: "bg-forest text-white",
  sports: "bg-yellow-400 text-night",
  wellness: "bg-sage text-white",
};

const isKnownCategory = (value: string): value is KnownCategory =>
  EVENT_CATEGORIES.includes(value as KnownCategory);

/**
 * Event category pill. Known categories (see EVENT_CATEGORIES) are translated and colored;
 * anything else typed in the sheet is shown as-is in a neutral pill.
 */
export function CategoryBadge({
  category,
  className,
}: {
  category: string;
  className?: string;
}) {
  const { t } = useLang();
  const known = isKnownCategory(category);
  return (
    <Badge
      className={cn(
        "h-auto rounded-full border-0 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[.12em]",
        known ? categoryStyles[category] : "bg-teal-900/10 text-teal-900",
        className,
      )}
    >
      {known ? t.events.categories[category] : category}
    </Badge>
  );
}
