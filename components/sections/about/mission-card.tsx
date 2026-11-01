"use client";

import { motion, useReducedMotion } from "motion/react";
import { Compass, Handshake, Users } from "lucide-react";
import { Eyebrow } from "@/components/shared/section-heading";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLang } from "@/lib/i18n/context";
import { easeCalm } from "@/lib/motion";

// One icon per value, in the order of t.about.values.
const valueIcons = [Compass, Handshake, Users];

const MotionCard = motion.create(Card);

/** Dark green card with the mission statement and the core values. */
export function MissionCard() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  return (
    <MotionCard
      initial={reduce ? false : { opacity: 0, rotate: 0 }}
      whileInView={reduce ? {} : { opacity: 1, rotate: -2 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, delay: 0.1, ease: easeCalm }}
      className="block gap-0 overflow-visible rounded-2xl bg-pine p-7 text-base ring-0 sm:p-8"
    >
      <Eyebrow className="text-yellow-400">{t.about.missionEyebrow}</Eyebrow>
      <p className="mt-3 text-[15px] leading-relaxed text-white/90">
        {t.about.mission}
      </p>
      <Separator className="mt-7 bg-white/10" />
      <h3 className="font-display pt-6 text-2xl font-bold text-white">
        {t.about.valuesTitle}
      </h3>
      <ul className="mt-6 grid gap-5">
        {t.about.values.map(([title, copy], i) => {
          const Icon = valueIcons[i];
          return (
            <li
              key={title}
              className="flex gap-4 border-white/10 pb-5 not-last:border-b"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-lg border border-yellow-400/50 text-yellow-400">
                <Icon size={20} />
              </div>
              <div>
                <p className="font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-yellow-400/80">
                  {copy}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </MotionCard>
  );
}
