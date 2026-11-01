"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLang } from "@/lib/i18n/context";
import { navHrefs } from "@/lib/site";
import { LanguageSwitcher } from "./language-switcher";

/** Hamburger button and slide-in side menu, below the `md` breakpoint. */
export function MobileNav() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  // Section picked in the menu. We scroll to it once the sheet has closed and released its
  // scroll lock, instead of letting the anchor jump while the page is still locked.
  const target = useRef<string | null>(null);
  const goTo = (href: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    target.current = href;
    setOpen(false);
  };
  const scrollToTarget = (event: Event) => {
    const href = target.current;
    target.current = null;
    if (!href) return;
    event.preventDefault(); // don't move focus back to the hamburger button
    document.querySelector(href)?.scrollIntoView();
    history.replaceState(null, "", href);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={t.nav.open}
        className="ml-auto grid size-10 shrink-0 place-items-center rounded-full border border-teal-900/15 text-teal-900 md:hidden"
      >
        <Menu size={19} />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        aria-describedby={undefined}
        onCloseAutoFocus={scrollToTarget}
        overlayClassName="bg-teal-950/55 supports-backdrop-filter:backdrop-blur-none"
        className="gap-0 border-l-0 bg-white px-6 py-6 shadow-2xl data-[side=right]:w-[82%] data-[side=right]:max-w-xs md:hidden"
      >
        <SheetTitle className="sr-only">{t.nav.home}</SheetTitle>
        <div className="flex items-center justify-between">
          <Image
            src="/assets/yca-logo.png"
            alt="YCA OTTAWA"
            width={110}
            height={44}
            className="h-10 w-auto mix-blend-multiply"
          />
          <SheetClose
            aria-label={t.nav.close}
            className="grid size-10 place-items-center rounded-full border border-teal-900/15 text-teal-900"
          >
            <X size={19} />
          </SheetClose>
        </div>
        <nav className="mt-8 grid gap-1">
          {t.nav.links.map((label, i) => (
            <a
              key={navHrefs[i]}
              href={navHrefs[i]}
              onClick={goTo(navHrefs[i])}
              className="border-b border-teal-900/8 py-3.5 text-base font-semibold text-teal-900"
            >
              {label}
            </a>
          ))}
        </nav>
        <Button asChild variant="sage" size="pill" className="mt-auto">
          <a href="#join" onClick={goTo("#join")}>
            {t.nav.join}
          </a>
        </Button>
        <div className="-ml-2.5 mt-4 border-t border-teal-900/8 pt-4">
          <LanguageSwitcher up />
        </div>
      </SheetContent>
    </Sheet>
  );
}
