"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment } from "react";
import { SCROLL_SENTINEL_ID } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/context";
import { easeCalm } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeCalm } },
};

const titleClass =
  "font-display text-[clamp(3rem,6.1vw,5rem)] font-extrabold leading-[.98]";

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const variant = reduce ? undefined : item;
  return (
    <section
      id="top"
      className="relative flex min-h-175 items-center overflow-hidden bg-teal-900 pt-16 text-white"
    >
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 22, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <Image
          src="/assets/hero-steps.png"
          alt={t.hero.imageAlt}
          fill
          priority
          className="object-cover object-[72%_42%]"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,73,60,.91),rgba(28,73,60,.82)_34%,rgba(28,73,60,.57)_52%,rgba(28,73,60,.1)_82%,transparent)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent via-teal-900/60 to-teal-900" />
      <div
        id={SCROLL_SENTINEL_ID}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 h-20 w-px"
      />
      <div className="page-width relative py-24 sm:py-28">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate="visible"
          variants={reduce ? undefined : container}
          className="max-w-162.5"
        >
          <motion.span
            variants={variant}
            className="inline-block border border-red-500/60 px-3 py-2 text-[10px] font-extrabold tracking-[.22em] text-yellow-400"
          >
            YCA OTTAWA
          </motion.span>
          <motion.div variants={variant} className="relative mt-6">
            <h1 className={titleClass}>
              <span className="block text-yellow-400">{t.hero.line1}</span>
              <span>{t.hero.line2}</span>
            </h1>
            {/* Decorative light sweep over the title (hidden with reduced motion). */}
            <p
              aria-hidden="true"
              className={`hero-shine pointer-events-none absolute inset-0 m-0 select-none ${titleClass}`}
            >
              <span className="block">{t.hero.line1}</span>
              <span>{t.hero.line2}</span>
            </p>
          </motion.div>
          <motion.p
            variants={variant}
            className="mt-7 max-w-162.5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-white/93"
          >
            {t.hero.body}
          </motion.p>
          <motion.div variants={variant} className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="yellow" size="pill">
              <a href="#join">{t.hero.ctaJoin}</a>
            </Button>
            <Button asChild variant="forest" size="pill">
              <a href="#join">{t.hero.ctaInvolved}</a>
            </Button>
            <Button asChild variant="outline-light" size="pill">
              <a href="#events">{t.hero.ctaEvents}</a>
            </Button>
          </motion.div>
          <motion.div variants={variant} className="mt-8 flex flex-wrap gap-1.5">
            {t.hero.tags.map((tag, i) => (
              <Fragment key={tag}>
                <span className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/85">
                  {tag}
                </span>
                {i < t.hero.tags.length - 1 && <span>-</span>}
              </Fragment>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/** Thin dashed yellow/red rule under the hero. */
export function HeroRule() {
  return (
    <div className="h-0.75 bg-[repeating-linear-gradient(90deg,rgba(254,209,4,.5)_0_14px,rgba(252,14,14,.22)_14px_22px,transparent_22px_40px)]" />
  );
}
