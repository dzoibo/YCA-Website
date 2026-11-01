"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/context";
import { easeCalm } from "@/lib/motion";
import { navHrefs } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

/** Element id the header watches: once it scrolls past, the bar turns into a floating pill. */
export const SCROLL_SENTINEL_ID = "scroll-sentinel";

function useScrolledPastSentinel() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => {
      const sentinel = document.getElementById(SCROLL_SENTINEL_ID);
      const distance = sentinel
        ? sentinel.getBoundingClientRect().bottom
        : 80 - window.scrollY;
      // Hysteresis: switch at 20px going down but only back at 40px going up, so stopping
      // right at the threshold doesn't make the bar flip back and forth.
      setScrolled((scrolled) => distance <= (scrolled ? 40 : 20));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return scrolled;
}

/**
 * Fixed top bar. Past the hero's first lines it eases into a floating pill: the change is a
 * pure CSS transition on width, padding, radius and shadow (see .nav-bar in globals.css), so
 * the white bar never gets stretched by transforms.
 */
export function SiteHeader() {
  const { t } = useLang();
  const isScrolled = useScrolledPastSentinel();
  const reduceMotion = useReducedMotion();
  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: easeCalm }}
      className={cn("nav-header", isScrolled && "is-scrolled")}
    >
      <div className={cn("nav-bar", isScrolled && "is-scrolled")}>
        <a href="#top" aria-label={t.nav.home} className="shrink-0">
          <Image
            src="/assets/yca-logo.png"
            alt="YCA OTTAWA"
            width={125}
            height={48}
            className="h-11 w-auto mix-blend-multiply"
            priority
          />
        </a>
        <nav className="ml-auto hidden items-center gap-7 text-sm font-semibold text-black md:flex">
          {t.nav.links.map((label, i) => (
            <a
              key={navHrefs[i]}
              href={navHrefs[i]}
              className="transition-colors hover:text-yellow-400"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>
          <Button
            asChild
            variant="sage"
            size="pill-sm"
            className="hidden md:inline-flex"
          >
            <a href="#join">{t.nav.join}</a>
          </Button>
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
