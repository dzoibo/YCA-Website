"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { SCROLL_SENTINEL_ID } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

// Entrance animation in CSS (tw-animate-css), so the hero is painted from the server HTML
// without waiting for JavaScript; each block is staggered with an animation delay.
const enter =
  "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500 ease-[cubic-bezier(.22,1,.36,1)]";
const delay = (step: number) => ({ animationDelay: `${50 + step * 90}ms` });

export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
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
        <div className="max-w-162.5">
          {/* The h1 names the organization and city, then the slogan. */}
          <h1 className="font-display font-extrabold">
            <span
              className={cn(
                "inline-block border border-red-500/60 px-3 py-2 text-[10px] tracking-[.22em] text-yellow-400",
                enter,
              )}
              style={delay(0)}
            >
              YCA OTTAWA-GATINEAU
            </span>
            <span
              className={cn(
                "hero-shine relative mt-6 block text-[clamp(3rem,6.1vw,5rem)] leading-[.98]",
                enter,
              )}
              style={delay(1)}
              data-shine={`${t.hero.line1}\n${t.hero.line2}`}
            >
              <span className="block text-yellow-400">{t.hero.line1}</span>
              <span className="block">{t.hero.line2}</span>
            </span>
          </h1>
          <p
            className={cn(
              "mt-7 max-w-162.5 text-[clamp(1rem,1.3vw,1.16rem)] leading-relaxed text-white/93",
              enter,
            )}
            style={delay(2)}
          >
            {t.hero.body}
          </p>
          <div className={cn("mt-9 flex flex-wrap gap-3", enter)} style={delay(3)}>
            <Button asChild variant="yellow" size="pill">
              <a href="#join">{t.hero.ctaJoin}</a>
            </Button>
            <Button asChild variant="forest" size="pill">
              <a href="#join">{t.hero.ctaInvolved}</a>
            </Button>
            <Button asChild variant="outline-light" size="pill">
              <a href="#events">{t.hero.ctaEvents}</a>
            </Button>
          </div>
          <div className={cn("mt-8 flex flex-wrap gap-1.5", enter)} style={delay(4)}>
            {t.hero.tags.map((tag, i) => (
              <Fragment key={tag}>
                <span className="px-3.5 py-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/85">
                  {tag}
                </span>
                {i < t.hero.tags.length - 1 && <span>-</span>}
              </Fragment>
            ))}
          </div>
        </div>
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
