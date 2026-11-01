"use client";

import { ChevronDown, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages, useLang, type Lang } from "@/lib/i18n/context";

/** EN/FR picker. `up` opens the menu above the trigger (bottom of the mobile menu). */
export function LanguageSwitcher({ up = false }: { up?: boolean }) {
  const { lang, setLang, t } = useLang();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={t.nav.language}
        className="group flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm text-teal-900 outline-none transition-colors hover:bg-teal-900/5 focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:bg-teal-900/5"
      >
        <Globe size={17} strokeWidth={1.8} />
        <span className="font-bold">{lang.toUpperCase()}</span>
        <ChevronDown
          size={15}
          strokeWidth={2.2}
          className="transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={up ? "top" : "bottom"}
        align={up ? "start" : "end"}
        sideOffset={8}
        className="z-80 w-48 rounded-2xl border border-teal-900/10 p-1.5 shadow-[0_18px_40px_-18px_rgba(15,54,43,.35)] ring-0"
      >
        <DropdownMenuRadioGroup
          value={lang}
          onValueChange={(value) => setLang(value as Lang)}
        >
          {languages.map(([code, label]) => (
            <DropdownMenuRadioItem
              key={code}
              value={code}
              lang={code}
              className="group rounded-xl py-2.5 pl-3.5 pr-9 text-[15px] text-teal-900 focus:bg-teal-900/5 focus:text-teal-900 data-[state=checked]:bg-sand data-[state=checked]:font-bold data-[state=checked]:text-forest [&_svg]:text-sage"
            >
              {label}
              <span className="ml-auto text-[11px] font-bold tracking-[.12em] text-teal-900/40 group-data-[state=checked]:text-sage">
                {code.toUpperCase()}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
