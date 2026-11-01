"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { partners } from "@/lib/content/media";
import { useLang } from "@/lib/i18n/context";

// The list is rendered twice so the marquee can loop seamlessly (it scrolls by -50%).
const marquee = [...partners, ...partners];

export function Partners() {
  const { t } = useLang();
  return (
    <section
      aria-labelledby="partners-heading"
      className="overflow-hidden border-b border-teal-900/8 bg-white py-16"
    >
      <Reveal className="page-width">
        <SectionHeading
          id="partners-heading"
          eyebrow={t.partners.eyebrow}
          title={t.partners.title}
          titleClassName="mt-3 text-[clamp(1.8rem,2.7vw,2.2rem)]"
        />
      </Reveal>
      <div className="partner-marquee mt-10" aria-label={t.partners.aria}>
        <div className="partner-track">
          {marquee.map(({ logo, name }, index) => (
            <span
              className="partner-logo"
              key={`${logo}-${index}`}
              aria-hidden={index >= partners.length || undefined}
            >
              <Image
                src={`/assets/partners/${logo}`}
                alt={name}
                width={160}
                height={110}
                className="h-full w-auto object-contain"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
