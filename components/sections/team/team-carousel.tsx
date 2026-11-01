"use client";

import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { departments } from "@/lib/content/team";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { DepartmentCard } from "./department-card";

/**
 * Snap each card to the page content edge rather than the screen edge: 20px on phones, the
 * .page-width gutter from `sm` up. The track uses the same gutter as its left padding and as
 * the last card's right margin (Embla ignores the container's right padding).
 */
const alignToPageEdge = (viewSize: number) =>
  viewSize < 640 ? 20 : Math.max(28, (viewSize - 1180) / 2);

const carouselOptions = { align: alignToPageEdge };

/** Full-bleed carousel of the working teams, with arrows and dots below. */
export function TeamCarousel() {
  const { t } = useLang();
  const reduce = useReducedMotion() ?? false;
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const last = departments.length - 1;

  const sync = useCallback((embla: NonNullable<CarouselApi>) => {
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
    // Trailing cards share the final snap point, so treat "can't go further" as the last team.
    setActive(embla.canScrollNext() ? embla.selectedScrollSnap() : last);
  }, [last]);

  useEffect(() => {
    if (!api) return;
    sync(api);
    api.on("select", sync).on("reInit", sync);
    return () => {
      api.off("select", sync).off("reInit", sync);
    };
  }, [api, sync]);

  const goTo = (index: number) => {
    if (!api) return;
    api.scrollTo(Math.min(index, api.scrollSnapList().length - 1), reduce);
  };

  return (
    <Reveal className="mt-8">
      <Carousel
        setApi={setApi}
        opts={carouselOptions}
        aria-label={t.team.carousel}
        tabIndex={0}
        className="@container outline-none"
      >
        <CarouselContent className="ml-0 pb-6 pl-5 pt-2 sm:pl-[max(1.75rem,calc((100cqw-1180px)/2))]">
          {departments.map((department, i) => (
            <CarouselItem
              key={department.key}
              aria-label={`${t.team.departments[department.key].name}, ${t.team.members(department.members.length)}`}
              className="mr-5 basis-[86%] pl-0 sm:basis-[72%] sm:last:mr-[max(1.75rem,calc((100cqw-1180px)/2))] lg:basis-[min(620px,54%)]"
            >
              <DepartmentCard department={department} active={i === active} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="page-width mt-2 flex items-center justify-center gap-5">
        <Button
          variant="outline-round"
          size="icon-round"
          aria-label={t.team.previous}
          onClick={() => api?.scrollPrev(reduce)}
          disabled={!canPrev}
        >
          <ArrowLeft size={18} />
        </Button>
        <div className="flex items-center gap-2">
          {departments.map(({ key }, i) => (
            <button
              key={key}
              type="button"
              aria-label={t.team.show(t.team.departments[key].name)}
              aria-current={i === active}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === active
                  ? "w-7 bg-teal-900"
                  : "w-2 bg-teal-900/25 hover:bg-teal-900/50",
              )}
            />
          ))}
        </div>
        <Button
          variant="outline-round"
          size="icon-round"
          aria-label={t.team.next}
          onClick={() => api?.scrollNext(reduce)}
          disabled={!canNext}
        >
          <ArrowRight size={18} />
        </Button>
      </div>
    </Reveal>
  );
}
