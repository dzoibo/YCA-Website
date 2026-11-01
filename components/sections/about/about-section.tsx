"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useLang } from "@/lib/i18n/context";
import { Goals } from "./goals";
import { MissionCard } from "./mission-card";
import { PhotoCollage } from "./photo-collage";

/** "Who we are": title + photo collage, story and mission, then the goals. */
export function AboutSection() {
  const { t } = useLang();
  const [logoBefore, logoStrong, logoAfter] = t.about.logoText;
  return (
    <section id="who" className="overflow-x-clip bg-white py-20">
      <div className="page-width">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-center lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow={t.about.eyebrow}
              title={t.about.title}
              intro={t.about.subtitle}
              titleClassName="text-[clamp(2.2rem,4vw,3.3rem)] leading-[1.05]"
              introClassName="mt-4 max-w-[26ch]"
            />
          </Reveal>
          <PhotoCollage />
        </div>
        <Reveal delay={0.16}>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="font-display text-6xl leading-none text-yellow-400">
                &ldquo;
              </span>
              <p className="-mt-4 max-w-[38ch] text-[clamp(1.1rem,1.5vw,1.35rem)] italic leading-relaxed text-teal-900">
                {t.about.quote}
              </p>
              <div className="mt-7 flex items-center gap-4 rounded-2xl bg-sand p-6">
                <Image
                  src="/assets/yca-logo.png"
                  alt={t.about.logoAlt}
                  width={72}
                  height={72}
                  className="h-14 w-auto shrink-0 mix-blend-multiply"
                />
                <div>
                  <div className="mb-2 flex gap-1" aria-hidden="true">
                    <span className="size-2.5 rounded-sm bg-teal-900" />
                    <span className="size-2.5 rounded-sm bg-red-600" />
                    <span className="size-2.5 rounded-sm bg-yellow-400" />
                  </div>
                  <p className="text-sm leading-relaxed text-ink">
                    {logoBefore}
                    <strong className="text-teal-900">{logoStrong}</strong>
                    {logoAfter}
                  </p>
                </div>
              </div>
              <p className="mt-7 text-[15px] leading-relaxed text-ink">
                {t.about.body}
              </p>
            </div>
            <MissionCard />
          </div>
        </Reveal>
        <Goals />
      </div>
    </section>
  );
}
