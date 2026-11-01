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
      setScrolled(
        sentinel
          ? sentinel.getBoundingClientRect().bottom <= 20
          : window.scrollY > 60,
      );
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

export function SiteHeader() {
  const { t } = useLang();
  const isScrolled = useScrolledPastSentinel();
  const reduceMotion = useReducedMotion();
  const layout = !reduceMotion;
  const layoutTransition = {
    layout: { duration: reduceMotion ? 0 : 0.45, ease: easeCalm },
  };
  return (
    <motion.header
      layout={layout}
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        ...layoutTransition,
        default: { duration: 0.6, ease: easeCalm },
      }}
      className={cn("nav-header", isScrolled && "is-scrolled")}
    >
      <motion.div
        layout={layout}
        transition={layoutTransition}
        className={cn("nav-bar", isScrolled && "is-scrolled")}
      >
        <motion.a
          layout={layout}
          transition={layoutTransition}
          href="#top"
          aria-label={t.nav.home}
        >
          <Image
            src="/assets/yca-logo.png"
            alt="YCA OTTAWA"
            width={125}
            height={48}
            className="h-11 w-auto mix-blend-multiply"
            priority
          />
        </motion.a>
        <motion.nav
          layout={layout}
          transition={layoutTransition}
          className="ml-auto hidden items-center gap-7 text-sm font-semibold text-black md:flex"
        >
          {t.nav.links.map((label, i) => (
            <a
              key={navHrefs[i]}
              href={navHrefs[i]}
              className="transition-colors hover:text-yellow-400"
            >
              {label}
            </a>
          ))}
        </motion.nav>
        <motion.div
          layout={layout}
          transition={layoutTransition}
          className="flex items-center gap-3"
        >
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
        </motion.div>
      </motion.div>
    </motion.header>
  );
}
