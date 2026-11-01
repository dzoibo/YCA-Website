"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Callout } from "@/components/shared/callout";
import { Eyebrow, SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/i18n/context";
import { TeamCarousel } from "./team-carousel";

export function TeamSection() {
  const { t } = useLang();
  return (
    <section id="team" className="bg-white pb-20">
      <div className="page-width">
        <Reveal>
          <SectionHeading
            eyebrow={t.team.eyebrow}
            title={t.team.title}
            intro={t.team.intro}
            titleClassName="text-[clamp(2rem,3.2vw,2.65rem)]"
          />
        </Reveal>
        <Reveal className="mt-10">
          <Eyebrow>{t.team.peopleEyebrow}</Eyebrow>
          <p className="mt-3 max-w-xl text-[16.5px] leading-relaxed text-stone">
            {t.team.peopleIntro}
          </p>
        </Reveal>
      </div>
      <TeamCarousel />
      <div className="page-width">
        <Reveal>
          <Callout
            title={t.team.joinTitle}
            className="mt-8"
            action={
              <Button asChild variant="forest" size="pill" className="shrink-0">
                <a href="#join">
                  {t.team.joinCta}
                  <ArrowRight
                    className="transition-transform duration-300 group-hover/button:translate-x-1"
                    size={16}
                  />
                </a>
              </Button>
            }
          >
            {t.team.joinIntro} {t.team.openRoles.join(", ")}.
          </Callout>
        </Reveal>
      </div>
    </section>
  );
}
