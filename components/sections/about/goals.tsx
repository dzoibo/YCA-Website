"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLang } from "@/lib/i18n/context";
import { easeCalm } from "@/lib/motion";

/** Numbered goals on a timeline line that draws itself in on desktop. */
export function Goals() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  return (
    <div className="mt-24">
      <Reveal>
        <SectionHeading
          as="h3"
          eyebrow={t.about.goalsEyebrow}
          title={t.about.goalsTitle}
          titleClassName="text-[clamp(1.8rem,2.8vw,2.3rem)] leading-[1.1]"
        />
      </Reveal>
      <div className="relative mt-10 sm:mt-12">
        <motion.div
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? {} : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: easeCalm }}
          className="absolute inset-x-0 top-[2.1rem] hidden h-px origin-left bg-linear-to-r from-yellow-400 via-sage to-teal-900/30 lg:block"
        />
        <ol className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-8">
          {t.about.goals.map(([title, copy], i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease: easeCalm }}
              className="group relative"
            >
              <div className="relative z-10 inline-flex items-center gap-3 bg-white pr-3">
                <span className="goal-number font-display text-[2.8rem] font-extrabold leading-none sm:text-[3.6rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative z-10 size-3 rotate-45 border-2 border-yellow-400 bg-white transition-colors duration-300 group-hover:bg-yellow-400" />
              </div>
              <h4 className="font-display mt-4 text-xl font-bold text-teal-900 sm:mt-6">
                {title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-stone">{copy}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
