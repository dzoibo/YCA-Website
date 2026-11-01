"use client";

import Image from "next/image";
import { Eyebrow } from "@/components/shared/section-heading";
import { Separator } from "@/components/ui/separator";
import { useLang } from "@/lib/i18n/context";
import { EMAIL, links, navHrefs } from "@/lib/site";

export function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="bg-sage py-14 pb-8 text-white">
      <div className="page-width grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Image
            src="/assets/yca-logo.png"
            alt={t.footer.logoAlt}
            width={132}
            height={54}
            className="h-12 w-auto mix-blend-multiply"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <Eyebrow className="text-yellow-400">{t.footer.explore}</Eyebrow>
          <div className="mt-4 grid gap-2.5 text-sm text-white/90">
            {t.nav.links.map((label, i) => (
              <a
                key={navHrefs[i]}
                href={navHrefs[i]}
                className="transition-colors hover:text-yellow-400"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <Eyebrow className="text-yellow-400">{t.footer.connect}</Eyebrow>
          <div className="mt-4 grid gap-2.5 text-sm text-white/90">
            <a className="font-bold text-yellow-400" href={links.email}>
              {EMAIL}
            </a>
            <a href={links.instagram} target="_blank" rel="noopener noreferrer">
              Instagram: @ycaottawagatineau
            </a>
            <a href={links.tiktok} target="_blank" rel="noopener noreferrer">
              TikTok: @yca.ottawagatineau
            </a>
            <p>Facebook: YCA Ottawa-Gatineau</p>
            <p>{t.footer.location}</p>
          </div>
        </div>
      </div>
      <div className="page-width mt-10">
        <Separator className="bg-white/20" />
        <div className="flex flex-col gap-2 pt-5 text-xs text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footer.copyright}</p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
