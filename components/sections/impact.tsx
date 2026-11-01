"use client";

import { ArrowRight } from "lucide-react";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { stats } from "@/lib/content/media";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export function Impact() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden bg-sand py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14px_14px,rgba(28,73,60,.28)_2px,transparent_2.5px),repeating-linear-gradient(45deg,rgba(28,73,60,.1)_0_2px,transparent_2px_12px)] bg-size-[56px_56px,18px_18px] opacity-[.15]" />
      <Reveal className="page-width relative">
        <SectionHeading
          eyebrow={t.impact.eyebrow}
          title={t.impact.title}
          intro={t.impact.body}
          titleClassName="max-w-[18ch] text-[clamp(2rem,3.4vw,2.8rem)] leading-[1.08]"
          introClassName="text-[17px] text-ink"
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((number, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <Card className="gap-0 rounded-[10px] border border-teal-900/20 bg-teal-900 p-6 ring-0">
                <CountUp
                  value={number}
                  className={cn(
                    "font-display block text-5xl font-extrabold",
                    i % 2 ? "text-cream" : "text-yellow-400",
                  )}
                />
                <div className="mt-3 text-[13px] font-semibold text-cream/75">
                  {t.impact.stats[i]}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[#6a7563]">
          {t.impact.founding}
        </p>
        <Button asChild variant="forest" size="pill" className="mt-7 font-medium">
          <a href="#programs">
            {t.impact.cta}
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover/button:translate-x-1"
              size={16}
            />
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
